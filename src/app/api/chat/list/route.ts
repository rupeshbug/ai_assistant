import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { chats } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const allChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId));

  return NextResponse.json(allChats);
}
