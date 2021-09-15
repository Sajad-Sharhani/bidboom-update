import NodeEnvironment from 'jest-environment-node';
import { app } from "../dist/server.js";

class CustomEnvironment extends NodeEnvironment {
  constructor(config: any) {
    super(config);
  }

  async setup() {
    await super.setup();
    console.log('hello')

    // @ts-ignore
  global.httpServer = app();
    // @ts-ignore
  const c = await global.httpServer.listen();
  console.log(c)

  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
