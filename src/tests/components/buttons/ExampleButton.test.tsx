import React from "react";

import { render } from "@testing-library/react";

import { ExampleButton } from "components/buttons";

describe("example button properly renders", () => {
  it("renders with default classes", () => {
    const { container } = render(<ExampleButton>Test</ExampleButton>);
    expect(container.firstChild).toHaveClass("example-button");
  });
});
