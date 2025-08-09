import { TavilySearch } from "@langchain/tavily";

export const tavilySearch = new TavilySearch({
  tavilyApiKey: process.env.TAVILY_API_KEY!,
  maxResults: 1,
  includeRawContent: false,
});
