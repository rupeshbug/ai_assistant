import { TavilySearch } from "@langchain/tavily";
import { SERPGoogleScholarAPITool } from "@langchain/community/tools/google_scholar";

export const tavilySearch = new TavilySearch({
  tavilyApiKey: process.env.TAVILY_API_KEY!,
  maxResults: 1,
  includeRawContent: false,
});

export const googleScholar = new SERPGoogleScholarAPITool({
  apiKey: process.env.SERPAPI_API_KEY!,
});

export const tools = [tavilySearch, googleScholar];
