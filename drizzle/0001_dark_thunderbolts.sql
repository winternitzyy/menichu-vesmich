CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`sessionId` int NOT NULL,
	`stage` enum('trying_to_conceive','pregnant','postnatal_0_6m','postnatal_6_12m','postnatal_12m_plus','other') NOT NULL,
	`creche` boolean NOT NULL DEFAULT false,
	`consent` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionDate` date NOT NULL,
	`startTime` varchar(8) NOT NULL DEFAULT '10:00',
	`endTime` varchar(8) NOT NULL DEFAULT '12:00',
	`title` varchar(255) NOT NULL,
	`topic` varchar(255) NOT NULL,
	`type` enum('antenatal','postnatal','community','health','wellbeing','nutrition','mental_health','practical','guest_speaker') NOT NULL DEFAULT 'community',
	`description` text,
	`venue` varchar(255) NOT NULL DEFAULT 'Miriam Bineth Community Hall, Southend-on-Sea',
	`isPast` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
