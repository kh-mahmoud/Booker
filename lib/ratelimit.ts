import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

const ratelimit = new Ratelimit({
  redis,
  analytics: true,
  limiter: Ratelimit.fixedWindow(3, "1m"), // Only 2 requests per 10 seconds
  timeout: 1000,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
