import type { AppProps } from "next/app";

import "style/globals/index.scss";

const ExampleApp = ({ Component, ...props }: AppProps) => <Component {...props} />;

export default ExampleApp;
