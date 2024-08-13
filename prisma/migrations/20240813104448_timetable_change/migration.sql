/*
  Warnings:

  - A unique constraint covering the columns `[teacherId]` on the table `Timetable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Timetable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "timetableId" INTEGER;

-- AlterTable
ALTER TABLE "Timetable" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_teacherId_key" ON "Timetable"("teacherId");

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
