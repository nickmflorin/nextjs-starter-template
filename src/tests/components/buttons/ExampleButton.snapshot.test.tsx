import React from "react";

import renderer from "react-test-renderer";

import { ExampleButton } from "components/buttons";

describe("example button properly renders", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<ExampleButton>Test</ExampleButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
