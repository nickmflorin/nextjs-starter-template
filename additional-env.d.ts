declare global {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
  }
}

export {};
