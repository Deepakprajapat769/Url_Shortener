import { createClient } from "redis";

const redisClient = createClient({
  socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }, // Adjust if needed
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

await redisClient.connect(); // Connect to Redis
export default redisClient;
