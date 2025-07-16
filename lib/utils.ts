import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import redis from "./redis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  const parts = name.split(" ");
  const initials = parts.map((part) => part[0].toUpperCase());
  return initials.join("");
};

export const getOrSetCache = async<T> (key: string, cb: () => Promise<any>) : Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const cached = await redis.get(key) as T;

      if (cached == null) {
        const freshData = await cb();
        await redis.setex(key, 3600, JSON.stringify(freshData)); 
        return resolve(freshData) as T;
      }

      return resolve(cached) as T; // parse cached JSON
    } catch (err) {
      reject(err);
    }
  });
};

