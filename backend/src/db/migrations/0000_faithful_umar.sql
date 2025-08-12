CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"jobId" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"jobDate" text,
	"positions" text,
	"createdAt" timestamp DEFAULT now()
);
