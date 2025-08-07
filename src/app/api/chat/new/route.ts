import { db } from "@/db/drizzle";
import { chats } from "@/db/schemas";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const [chat] = await db.insert(chats).values({ userId }).returning();

  return NextResponse.json(chat);
}
