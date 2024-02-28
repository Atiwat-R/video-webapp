import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '', 
});

export default redis;

//// For Debug
// let latencyStart = Date.now();

// let latency = Date.now() - latencyStart;
// console.log("REDIS**************")
// console.log(latency)
// console.log("******************")