/*
  Warnings:

  - You are about to drop the column `filePath` on the `Tip` table. All the data in the column will be lost.
  - Added the required column `mediaFileUrl` to the `Tip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tip" DROP COLUMN "filePath",
ADD COLUMN     "mediaFileUrl" TEXT NOT NULL;
