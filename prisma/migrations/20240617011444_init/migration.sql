/*
  Warnings:

  - You are about to alter the column `dt_nascimento` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_compra` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `dt_nascimento` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `produto` MODIFY `dt_compra` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(100) NOT NULL;
