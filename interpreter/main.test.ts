import { execute } from "./main";
import { TokenType } from "./type";

describe("main", () => {
  it("parses the correct tokens - simple expression", () => {
    const str = `
    var test = "interpreter"
    `;

    const tokens = execute(str);
    expect(tokens).toStrictEqual([
      { type: TokenType.VAR, lineNumber: 1, lexeme: "var" },
      { type: TokenType.IDENTIFIER, lineNumber: 1, lexeme: "test" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 1 },
      { type: TokenType.STRING, lexeme: "interpreter", lineNumber: 1 },
      { type: TokenType.EOF, lexeme: ``, lineNumber: 1 },
    ]);
  });

  it("parses the correct tokens - complex expression", () => {
    const str = `
    var num1 = 68;
    var num2 = 70;
    var name1 = "john mayer";
    if(num1 < num2) {
      var name2 = "bts"
    }
    `;

    const tokens = execute(str);
    expect(tokens).toStrictEqual([
      { type: TokenType.VAR, lineNumber: 1, lexeme: "var" },
      { type: TokenType.IDENTIFIER, lineNumber: 1, lexeme: "num1" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 1 },
      { type: TokenType.NUMBER, lexeme: 68, lineNumber: 1 },
      { type: TokenType.SEMICOLON, lexeme: ";", lineNumber: 1 },

      { type: TokenType.VAR, lineNumber: 2, lexeme: "var" },
      { type: TokenType.IDENTIFIER, lineNumber: 2, lexeme: "num2" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 2 },
      { type: TokenType.NUMBER, lexeme: 70, lineNumber: 2 },
      { type: TokenType.SEMICOLON, lexeme: ";", lineNumber: 2 },

      { type: TokenType.VAR, lineNumber: 3, lexeme: "var" },
      { type: TokenType.IDENTIFIER, lineNumber: 3, lexeme: "name1" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 3 },
      { type: TokenType.STRING, lexeme: "john mayer", lineNumber: 3 },
      { type: TokenType.SEMICOLON, lexeme: ";", lineNumber: 3 },

      { type: TokenType.IF, lexeme: "if", lineNumber: 4 },
      { type: TokenType.LEFT_PAREN, lexeme: "(", lineNumber: 4 },
      { type: TokenType.IDENTIFIER, lineNumber: 4, lexeme: "num1" },
      { type: TokenType.LESS, lineNumber: 4, lexeme: "<" },
      { type: TokenType.IDENTIFIER, lineNumber: 4, lexeme: "num2" },
      { type: TokenType.RIGHT_PAREN, lineNumber: 4, lexeme: ")" },
      { type: TokenType.LEFT_BRACE, lineNumber: 4, lexeme: "{" },

      { type: TokenType.VAR, lineNumber: 5, lexeme: "var" },
      { type: TokenType.IDENTIFIER, lineNumber: 5, lexeme: "name2" },
      { type: TokenType.EQUAL, lexeme: "=", lineNumber: 5 },
      { type: TokenType.STRING, lexeme: "bts", lineNumber: 5 },

      { type: TokenType.RIGHT_BRACE, lineNumber: 6, lexeme: "}" },
      { type: TokenType.EOF, lexeme: ``, lineNumber: 6 },
    ]);
  });
});
