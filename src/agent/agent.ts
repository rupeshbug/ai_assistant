import { tavilySearch } from "./tools";
import {
  START,
  END,
  StateGraph,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const tools = [tavilySearch];

const llmWithTools = new ChatGroq({
  model: "qwen/qwen3-32b",
  temperature: 0.3,
  apiKey: process.env.GROQ_API_KEY,
}).bindTools(tools);

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llmWithTools.invoke(state["messages"]);
  return { messages: response };
};

const shouldContinue = (state: typeof MessagesAnnotation.State) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
  if (
    "tool_calls" in lastMessage &&
    Array.isArray(lastMessage.tool_calls) &&
    lastMessage.tool_calls?.length
  ) {
    return "tools";
  }
  return END;
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", new ToolNode(tools))
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue, ["tools", END])
  .addEdge("tools", "agent");

export const app = graph.compile();
