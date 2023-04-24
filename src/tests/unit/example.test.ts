import { example } from "lib";

describe("example.testSum() properly returns", () => {
  it("should add two numeric arguments and return resulting sum", () => {
    expect(example.testSum(1, 1)).toBe(2);
  });
});
