import { Redis } from "@upstash/redis";
import config from "./config";



const redis = new Redis({
  url: config.env.upshatsh.redisUrl,
  token: config.env.upshatsh.rediToken,
});

export default redis