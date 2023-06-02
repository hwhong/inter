import { Scanner } from "./py-scanner";
import { TokenType } from "./py-type";

describe("main", () => {
  it("parses the correct tokens - simple expression", () => {
    const str = `
    test = "interpreter"
    `;

    const tokens = new Scanner(str).scan();
    expect(tokens).toStrictEqual([
      { type: TokenType.IDENTIFIER, lineNumber: 1, lexeme: "test" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 1 },
      { type: TokenType.STRING, lexeme: "interpreter", lineNumber: 1 },
      { type: TokenType.EOF, lexeme: ``, lineNumber: 1 },
    ]);
  });

  it("parses the correct tokens - complex expression", () => {
    const str = `
    num1 = 68
    num2 = 70
    if num1 < num2: 
    \tname2 = "bts"
    `;

    const tokens = new Scanner(str).scan();
    expect(tokens).toStrictEqual([
      { type: TokenType.IDENTIFIER, lineNumber: 1, lexeme: "num1" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 1 },
      { type: TokenType.NUMBER, lexeme: 68, lineNumber: 1 },

      { type: TokenType.IDENTIFIER, lineNumber: 2, lexeme: "num2" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 2 },
      { type: TokenType.NUMBER, lexeme: 70, lineNumber: 2 },

      { type: TokenType.IF, lexeme: "if", lineNumber: 3 },
      { type: TokenType.IDENTIFIER, lineNumber: 3, lexeme: "num1" },
      { type: TokenType.LESS, lineNumber: 3, lexeme: "<" },
      { type: TokenType.IDENTIFIER, lineNumber: 3, lexeme: "num2" },
      { type: TokenType.COLON, lineNumber: 3, lexeme: ":" },

      { type: TokenType.TAB, lineNumber: 4, lexeme: "\t" },
      { type: TokenType.IDENTIFIER, lineNumber: 4, lexeme: "name2" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 4 },
      { type: TokenType.STRING, lexeme: "bts", lineNumber: 4 },

      { type: TokenType.EOF, lexeme: ``, lineNumber: 4 },
    ]);
  });

  it("parses the correct tokens - simple expression", () => {
    const str = `
    print("hello")
    `;

    const tokens = new Scanner(str).scan();
    expect(tokens).toStrictEqual([
      { type: TokenType.PRINT, lineNumber: 1, lexeme: "print" },
      // { type: TokenType.LEFT_PAREN, lexeme: "(", lineNumber: 1 },
      { type: TokenType.STRING, lexeme: "hello", lineNumber: 1 },
      // { type: TokenType.RIGHT_PAREN, lexeme: ")", lineNumber: 1 },
      { type: TokenType.EOF, lexeme: ``, lineNumber: 1 },
    ]);
  });

  it("parses the correct tokens - function", () => {
    const str = `
    def my_function(arg, arg1):
    \tprint("hello")
    `;

    const tokens = new Scanner(str).scan();
    expect(tokens).toStrictEqual([
      { type: TokenType.DEF, lineNumber: 1, lexeme: "def" },
      { type: TokenType.IDENTIFIER, lexeme: "my_function", lineNumber: 1 },
      // { type: TokenType.LEFT_PAREN, lexeme: "(", lineNumber: 1 },
      { type: TokenType.IDENTIFIER, lexeme: "arg", lineNumber: 1 },
      { type: TokenType.COMMA, lexeme: ",", lineNumber: 1 },
      { type: TokenType.IDENTIFIER, lexeme: "arg1", lineNumber: 1 },
      // { type: TokenType.RIGHT_PAREN, lexeme: ")", lineNumber: 1 },
      { type: TokenType.COLON, lexeme: ":", lineNumber: 1 },

      { type: TokenType.TAB, lineNumber: 2, lexeme: "\t" },
      { type: TokenType.PRINT, lineNumber: 2, lexeme: "print" },
      // { type: TokenType.LEFT_PAREN, lexeme: "(", lineNumber: 2 },
      { type: TokenType.STRING, lexeme: "hello", lineNumber: 2 },
      // { type: TokenType.RIGHT_PAREN, lexeme: ")", lineNumber: 2 },
      { type: TokenType.EOF, lexeme: ``, lineNumber: 2 },
    ]);
  });
});
