import { CSSProperties, ReactNode } from "react";

import classNames from "classnames";

export type ExampleButtonProps = {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
};

export const ExampleButton = (props: ExampleButtonProps): JSX.Element => (
  <button {...props} className={classNames("example-button", props.className)} />
);
