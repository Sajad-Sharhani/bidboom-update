import * as redis from "redis";
import { promisify } from "util";

const client = redis.createClient();

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
