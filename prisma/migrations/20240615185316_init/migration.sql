/*
  Warnings:

  - You are about to alter the column `dt_nascimento` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_compra` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `dt_nascimento` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `produto` MODIFY `dt_compra` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
