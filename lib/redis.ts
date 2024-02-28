import { Redis } from "ioredis";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) return process.env.REDIS_URL
    throw new Error("REDIS_URL not found")
}

export default new Redis(getRedisUrl())





//// For Debug
// let latencyStart = Date.now();

// let latency = Date.now() - latencyStart;
// console.log("REDIS**************")
// console.log(latency)
// console.log("******************")