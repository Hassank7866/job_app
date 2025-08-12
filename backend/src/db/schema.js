import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  jobId: integer("jobId").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  jobDate: text("jobDate"),
  positions: text("positions"),
  createdAt: timestamp("createdAt").defaultNow(),
});
