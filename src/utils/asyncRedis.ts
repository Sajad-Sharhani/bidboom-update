import * as redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
});

client
  .on("connect", function () {
    console.log("redis connected");
    console.log(`connected ${client.connected}`);
  })
  .on("error", function (error) {
    console.log(error);
  });

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
