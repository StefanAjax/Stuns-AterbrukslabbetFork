/*
  Warnings:

  - Added the required column `reporterId` to the `ReportedPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportedPosts" ADD COLUMN     "reporterId" TEXT NOT NULL;
