import * as redis from "redis";
import { promisify } from "util";

// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   password: process.env.REDIS_PASS,
//   port: Number(process.env.REDIS_PORT),
// });
let cache: redis.RedisClient;

const getClient = () => {
  if (cache) return cache;

  const client = redis.createClient(
    Number(process.env.REDIS_PORT),
    process.env.REDIS_HOST
  );
  client.auth(process.env.REDIS_PASS);

  return (cache = client);
};

export const get: (key: string) => Promise<string> = (key) =>
  promisify(getClient().get).bind(getClient())(key);

export const set: (key: string, value: string) => Promise<string> = (
  key,
  value
) => promisify(getClient().set).bind(getClient())(key, value);

export const setex: (
  key: string,
  seconds: number,
  value: string
) => Promise<string> = (key, seconds, value) =>
  promisify(getClient().setex).bind(getClient())(key, seconds, value);
