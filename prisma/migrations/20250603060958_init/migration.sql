-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ratable" BOOLEAN NOT NULL,
    "rate" INTEGER,
    "value" TEXT NOT NULL,
    "logId" INTEGER NOT NULL,
    CONSTRAINT "Field_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
