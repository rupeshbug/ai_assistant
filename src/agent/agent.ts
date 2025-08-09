import { tools } from "./tools";
import {
  START,
  END,
  StateGraph,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an AI assistant with access to tools like web search and Google Scholar.
     Use these tools to answer user queries when relevant.
     If the question is general knowledge or unclear, respond directly.
     Always try to use the tools for research or up-to-date information.
     Only output the assistant's reply as if talking directly to the user making it sound human.`,
  ],
  new MessagesPlaceholder("messages"),
]);

const llmWithTools = new ChatGroq({
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  temperature: 0.3,
  apiKey: process.env.GROQ_API_KEY,
}).bindTools(tools);

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const messages = state["messages"];

  // Format messages with the system prompt applied
  const formattedMessages = await prompt.formatMessages({ messages });

  // Invoke the LLM with tools
  const response = await llmWithTools.invoke(formattedMessages);

  // response is a single message, so no indexing needed
  const lastResponse = response;

  if (
    lastResponse.tool_calls &&
    Array.isArray(lastResponse.tool_calls) &&
    lastResponse.tool_calls.length > 0
  ) {
    console.log("🔧 Tool calls detected:", lastResponse.tool_calls);
  } else {
    console.log("🧠 No tool calls in LLM response");
  }

  return { messages: [response] };
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
