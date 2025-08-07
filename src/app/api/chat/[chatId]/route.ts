import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { chats } from "@/db/schemas";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const chatId = resolvedParams.chatId;

  try {
    await db
      .delete(chats)
      .where(and(eq(chats.id, chatId), eq(chats.userId, userId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
