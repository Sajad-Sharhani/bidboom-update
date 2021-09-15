import { app } from "./src/server";

declare global {
  const httpServer: ReturnType<typeof app>;
}

