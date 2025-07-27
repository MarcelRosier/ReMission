import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stoolEntries = sqliteTable("stool_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  timestamp: text("timestamp").notNull(), // ISO string, date+time combined
  bristol: integer("bristol"), // nullable, skip if wipe-only
  amount: integer("amount").notNull(), // 0–5 scale
  wipe_only: integer("wipe_only").notNull().default(0), // 0 = no, 1 = yes
  blood: text("blood").notNull(), // e.g. 'none', 'trace', 'visible'
  mucus: text("mucus").notNull(), // e.g. 'none', 'slight', 'moderate', 'a lot'
  urgency: text("urgency").notNull(), // e.g. 'none', 'mild', 'severe'
  pain: integer("pain").notNull(), // 0-10 scale
  incomplete: integer("incomplete").notNull(), // 0 or 1 boolean flag for incomplete evacuation
  color: text("color").notNull(), // optional: e.g. 'brown', 'green', 'yellow'
  time_spent_minutes: integer("time_spent_minutes"), // new field
  notes: text("notes"), // nullable free text
  image_uri: text("image_uri"), // nullable string, local file path or URI
});

// Export TypeScript type for use in app
export type StoolEntry = typeof stoolEntries.$inferSelect;
