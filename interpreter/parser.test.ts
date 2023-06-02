import { Parser } from "./parser";
import { Scanner } from "./py-scanner";
import { Expression, NodeType } from "./py-type";

describe("parser", () => {
  it("returns the correct ast - 1", () => {
    const tokens = new Scanner("12 > 5").scan();
    const parsed = new Parser(tokens).parse();

    const expected: Expression = {
      node: NodeType.BINARY_OP,
      op: ">",
      left: {
        node: NodeType.NUMBER,
        value: 12,
      },
      right: {
        node: NodeType.NUMBER,
        value: 5,
      },
    };

    expect(parsed).toStrictEqual([expected]);
  });

  //   it("returns the correct ast - 2", () => {
  //     const tokens = new Scanner("a > b and c < a").scan();
  //     const parsed = new Parser(tokens).parse();
  //     console.log(JSON.stringify(parsed));

  //     const expected: Expression = {
  //       node: NodeType.BINARY_OP,
  //       op: "and",
  //       left: {
  //         node: NodeType.BINARY_OP,
  //         op: ">",
  //         left: {
  //           node: NodeType.IDENTIFIER,
  //           value: "a",
  //         },
  //         right: {
  //           node: NodeType.IDENTIFIER,
  //           value: "b",
  //         },
  //       },
  //       right: {
  //         node: NodeType.BINARY_OP,
  //         op: "<",
  //         left: {
  //           node: NodeType.IDENTIFIER,
  //           value: "c",
  //         },
  //         right: {
  //           node: NodeType.IDENTIFIER,
  //           value: "a",
  //         },
  //       },
  //     };

  //     expect(parsed).toStrictEqual([expected]);
  //   });

  it("returns the correct ast - 2", () => {
    const tokens = new Scanner("print(12 > 5)").scan();
    console.log(tokens);
    const parsed = new Parser(tokens).parse();
    console.log(JSON.stringify(parsed));
    const expected: Expression = {
      node: NodeType.PRINT,
      value: {
        node: NodeType.BINARY_OP,
        op: ">",
        left: {
          node: NodeType.NUMBER,
          value: 12,
        },
        right: {
          node: NodeType.NUMBER,
          value: 5,
        },
      },
    };

    expect(parsed).toStrictEqual([expected]);
  });
});
