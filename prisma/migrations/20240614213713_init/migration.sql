-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ds_produto` VARCHAR(50) NOT NULL,
    `vl_unitario` DECIMAL(12, 2) NOT NULL,
    `vl_total` DECIMAL(12, 2) NOT NULL,
    `qt_quantidade` VARCHAR(5) NOT NULL,
    `ds_observacao` VARCHAR(150) NOT NULL,
    `dt_compra` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_cliente` VARCHAR(50) NOT NULL,
    `dt_nascimento` DATETIME NOT NULL,
    `cd_cpf` VARCHAR(11) NOT NULL,
    `ds_telefone_cliente` VARCHAR(15) NOT NULL,
    `ds_email_cliente` VARCHAR(150) NOT NULL,
    `ds_logradouro_cliente` VARCHAR(150) NOT NULL,
    `cd_numero_logradouro_cliente` VARCHAR(5) NOT NULL,
    `ds_complemento_logradouro_cliente` VARCHAR(150) NOT NULL,
    `cd_cep_cliente` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
