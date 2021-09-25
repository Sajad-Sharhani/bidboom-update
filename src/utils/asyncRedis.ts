import * as redis from "redis";
import { promisify } from "util";

// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   password: process.env.REDIS_PASS,
//   port: Number(process.env.REDIS_PORT),
// });
const client = redis.createClient(
  Number(process.env.REDIS_PORT),
  process.env.REDIS_HOST
);
client.auth(process.env.REDIS_PASS);

export const get: (key: string) => Promise<string> = promisify(client.get).bind(
  client
);

export const set: (key: string, value: string) => Promise<string> = promisify(
  client.set
).bind(client);

export const setex: (
  key: string,
  seconds: number,
  value: string
) => Promise<string> = promisify(client.setex).bind(client);
