CREATE TABLE `stool_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text NOT NULL,
	`bristol` integer,
	`amount` integer NOT NULL,
	`wipe_only` integer DEFAULT 0 NOT NULL,
	`blood` text NOT NULL,
	`mucus` text NOT NULL,
	`urgency` text NOT NULL,
	`pain` integer NOT NULL,
	`incomplete` integer NOT NULL,
	`color` text NOT NULL,
	`time_spent_minutes` integer,
	`notes` text,
	`image_uri` text
);
