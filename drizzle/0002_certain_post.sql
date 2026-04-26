CREATE TABLE `promotionalMaterials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` enum('poster','flyer','whatsapp','newsletter','announcement','other') NOT NULL DEFAULT 'other',
	`description` text,
	`fileUrl` varchar(1024) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `promotionalMaterials_id` PRIMARY KEY(`id`)
);
