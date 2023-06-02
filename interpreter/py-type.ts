export interface Token {
  type: TokenType;
  lexeme: string | number;
  lineNumber: number;
}

export enum TokenType {
  // Single-character tokens.
  LEFT_PAREN,
  RIGHT_PAREN,
  DEF,
  COMMA,
  TAB,
  // Arithmetic
  PLUS,
  SLASH,
  STAR,
  COLON,
  MINUS,
  // Equality & assigment
  BANG_EQUAL,
  EQUAL,
  EQUAL_EQUAL,
  GREATER,
  GREATER_EQUAL,
  LESS,
  LESS_EQUAL,
  NOT,
  AND,
  OR,
  // Literals,
  IDENTIFIER,
  STRING,
  NUMBER,
  ELSE,
  FALSE,
  IF,
  NONE,
  PRINT,
  RETURN,
  TRUE,
  EOF,
}

export enum NodeType {
  // Atom
  STRING,
  NUMBER,
  BOOLEAN,
  IDENTIFIER,

  FUNCTION_DEF,
  FUNCTION_USE,
  ASSIGN,
  BINARY_OP,
  // Expr
  CONDITIONAL,
  PRINT,
}

export type Expression = PrintNode | BinaryOpNode | Atom;

export type Atom = StringNode | NumberNode | BooleanNode | IdentifierNode;

export interface ConditionalNode {
  node: NodeType.CONDITIONAL;
  condition: Expression;

  body: Expression;
}

export interface IdentifierNode {
  node: NodeType.IDENTIFIER;
  value: string;
}

export interface StringNode {
  node: NodeType.STRING;
  value: string;
}

export interface NumberNode {
  node: NodeType.NUMBER;
  value: number;
}

export interface BooleanNode {
  node: NodeType.BOOLEAN;
  value: boolean;
}

export interface BinaryOpNode {
  node: NodeType.BINARY_OP;
  op: string;
  left: Expression;
  right: Expression;
}

export interface PrintNode {
  node: NodeType.PRINT;
  value: Expression;
}

/**
 *
 *
 * Expression = Conditional | Assignment | Return | Print | Binary operations
 *
 *
 */
