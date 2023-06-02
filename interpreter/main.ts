import { Scanner } from "./scanner";

export function execute(program: string) {
  const scanner = new Scanner(program);
  return scanner.scan();
}
