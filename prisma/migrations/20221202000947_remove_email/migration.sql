/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider_id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("hashed_password", "id", "isAdmin", "provider_id", "username") SELECT "hashed_password", "id", "isAdmin", "provider_id", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
CREATE UNIQUE INDEX "user_provider_id_key" ON "user"("provider_id");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
