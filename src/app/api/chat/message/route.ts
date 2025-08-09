import { NextResponse } from "next/server";
import { app } from "../../../../agent/agent";
import { getMemoryForUser } from "../../../../agent/memory";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();
  if (!message)
    return NextResponse.json({ error: "Missing message" }, { status: 400 });

  // Load past messages from memory store
  const memory = getMemoryForUser(userId);
  const memoryMessages = await memory.chatHistory.getMessages();

  // Append current user message to messages array
  const messages = [...memoryMessages, { role: "user", content: message }];

  // Run through your agent graph with messages
  const state = { messages };

  const result = await app.invoke(state);

  // Save context: user input and assistant response to memory
  await memory.saveContext(
    { input: message },
    { output: result.messages[result.messages.length - 1].content }
  );

  return NextResponse.json({
    response: result.messages[result.messages.length - 1].content,
  });
}
