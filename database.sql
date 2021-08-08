CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (255) NOT NULL,
	"due" DATE,
	"isCompleted" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("task", "due")
VALUES
	('Fold my laundry', '2021-08-09');