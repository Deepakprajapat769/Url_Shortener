import { createClient } from "redis";

const redisClient = createClient({
   url: process.env.REDIS_HOST, // Adjust if needed
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

await redisClient.connect(); // Connect to Redis
console.log("Redis Connected")
export default redisClient;
