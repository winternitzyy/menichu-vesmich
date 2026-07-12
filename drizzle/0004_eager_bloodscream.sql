CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`email` varchar(320),
	`overallExperience` enum('excellent','good','okay','poor') NOT NULL,
	`mostValuable` text,
	`improvements` text,
	`nextProjectWhen` enum('asap','3_months','6_months','12_months','not_sure') NOT NULL,
	`nextProjectHow` text,
	`recommend` enum('yes','maybe','no') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
