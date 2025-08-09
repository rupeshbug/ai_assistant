import { NextResponse } from "next/server";
import { app } from "../../../agent/agent";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const result = await app.invoke({
      messages: [{ role: "user", content: query }],
    });

    const lastMessage = result.messages[result.messages.length - 1];
    const content =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : JSON.stringify(lastMessage.content);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in /api/test-agent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
