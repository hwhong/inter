import { Expression, NodeType, TokenType, Token, Atom } from "./py-type";

export class Parser {
  public tokens: Token[];
  public current: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  /** helper methods */
  peek() {
    return this.tokens[this.current];
  }

  isEnd() {
    return this.peek().type === TokenType.EOF;
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  advance() {
    if (!this.isEnd()) {
      this.current++;
    }
    return this.previous();
  }

  /** parsing */
  parse() {
    const nodes: Expression[] = [];
    while (this.isEnd()) {
      nodes.push(this.expression());
    }

    return nodes;
  }

  expression(): Expression {
    const token = this.advance();

    if (token.type === TokenType.PRINT) {
      const valueToPrint = this.expression();
      return {
        node: NodeType.PRINT,
        value: valueToPrint,
      };
    }

    if (
      [
        TokenType.AND,
        TokenType.OR,
        TokenType.LESS_EQUAL,
        TokenType.LESS,
        TokenType.GREATER_EQUAL,
        TokenType.GREATER,
        TokenType.EQUAL_EQUAL,
        TokenType.BANG_EQUAL,
      ].includes(this.peek().type)
    ) {
      const token = this.advance();
      const left = this.expression();
      const right = this.expression();

      return {
        node: NodeType.BINARY_OP,
        op: token.lexeme as string,
        left,
        right,
      };
    }

    return this.atom();
  }

  atom(): Atom {
    return {
      node: NodeType.STRING,
      value: "",
    };
  }

  // binary(): Expression {

  //   return
  // }

  //    Expr equality() {
  //     Expr expr = comparison();

  //     while (match(BANG_EQUAL, EQUAL_EQUAL)) {
  //       Token operator = previous();
  //       Expr right = comparison();
  //       expr = new Expr.Binary(expr, operator, right);
  //     }

  //     return expr;
  //   }
}
