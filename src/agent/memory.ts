import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

export const getMemoryForUser = (userId: string) => {
  return new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: userId,
      config: {
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      },
    }),
    returnMessages: true,
    memoryKey: "history",
  });
};
