import { Token, TokenType } from "././py-type";

export class Scanner {
  public program: string;
  // start of the current lexeme
  private start: number;
  // current char in the scanning process
  private current: number;
  private line: number;
  private tokens: Token[];

  private keywords: Record<string, TokenType> = {
    and: TokenType.AND,
    not: TokenType.NOT,
    def: TokenType.DEF,
    else: TokenType.ELSE,
    false: TokenType.FALSE,
    if: TokenType.IF,
    or: TokenType.OR,
    print: TokenType.PRINT,
    return: TokenType.RETURN,
    true: TokenType.TRUE,
  };

  constructor(program: string) {
    this.program = program.trim();
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.tokens = [];
  }

  scan() {
    while (!this.isEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.tokens.push({
      type: TokenType.EOF,
      lexeme: "",
      lineNumber: this.line,
    });
    return this.tokens;
  }

  scanToken() {
    const char = this.advance();

    switch (char) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      /** arithmetic */
      case "-":
        this.addToken(TokenType.MINUS);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case ":":
        this.addToken(TokenType.COLON);
        break;
      case "*":
        this.addToken(TokenType.STAR);
        break;
      /** special */
      case "!":
        if (this.match("=")) {
          this.addToken(TokenType.BANG_EQUAL);
        }
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case " ":
      case "\r":
        break;
      case "\t":
        this.addToken(TokenType.TAB);
        break;
      case "\n":
        this.line++;
        break;
      case `"`:
        this.getString();
        break;
      default: {
        if (this.isDigit(char)) {
          this.getNumber();
        } else if (this.isAlpha(char)) {
          this.identifier();
        }
        break;
      }
    }
  }

  isAlphaNumeric(c: string) {
    return this.isAlpha(c) || this.isDigit(c);
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.program.substring(this.start, this.current);
    let type: TokenType = this.keywords[text];
    if (type == null) {
      type = TokenType.IDENTIFIER;
    }
    this.tokens.push({
      type,
      lexeme: this.program.substring(this.start, this.current),
      lineNumber: this.line,
    });
  }

  isAlpha(c: string) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_";
  }

  peekNext() {
    if (this.current + 1 >= this.program.length) return "\0";
    return this.program.charAt(this.current + 1);
  }

  getNumber() {
    while (this.isDigit(this.peek())) this.advance();

    // Look for a fractional part.
    if (this.peek() == "." && this.isDigit(this.peekNext())) {
      // Consume the "."
      this.advance();

      while (this.isDigit(this.peek())) this.advance();
    }

    this.tokens.push({
      type: TokenType.NUMBER,
      lexeme: parseFloat(this.program.substring(this.start, this.current)),
      lineNumber: this.line,
    });
  }

  isDigit(c: string) {
    return /^-?\d+$/.test(c);
  }

  getString() {
    while (this.peek() !== `"` && !this.isEnd()) {
      if (this.peek() === "\n") {
        this.line++;
      }
      this.advance();
    }

    this.advance();
    const lexeme = this.program.substring(this.start + 1, this.current - 1);
    this.tokens.push({ type: TokenType.STRING, lexeme, lineNumber: this.line });
  }

  peek() {
    if (this.isEnd()) return "\0";
    return this.program.charAt(this.current);
  }

  match(expected: string) {
    if (this.isEnd()) return false;
    if (this.program.charAt(this.current) != expected) return false;

    this.current++;
    return true;
  }

  advance() {
    return this.program.charAt(this.current++);
  }

  addToken(type: TokenType) {
    const lexeme = this.program.substring(this.start, this.current);
    this.tokens.push({ type, lexeme, lineNumber: this.line });
  }

  isEnd() {
    return this.current >= this.program.length;
  }
}
