/*
  Warnings:

  - Added the required column `templateFieldId` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TemplateField" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "ratable" BOOLEAN NOT NULL,
    "defaultValue" TEXT,
    "templateId" INTEGER NOT NULL,
    CONSTRAINT "TemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ratable" BOOLEAN NOT NULL,
    "rate" INTEGER,
    "value" TEXT NOT NULL,
    "logId" INTEGER NOT NULL,
    "templateFieldId" TEXT NOT NULL,
    CONSTRAINT "Field_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Field_templateFieldId_fkey" FOREIGN KEY ("templateFieldId") REFERENCES "TemplateField" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Field" ("id", "logId", "ratable", "rate", "value") SELECT "id", "logId", "ratable", "rate", "value" FROM "Field";
DROP TABLE "Field";
ALTER TABLE "new_Field" RENAME TO "Field";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
