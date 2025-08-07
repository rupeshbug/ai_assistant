import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").default("New Chat").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
