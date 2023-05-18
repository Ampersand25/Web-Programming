-- CREARE BAZA DE DATE
DROP DATABASE IF EXISTS `sql_pw_ajax`;
CREATE DATABASE `sql_pw_ajax`;
USE `sql_pw_ajax`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

-- CREARE TABEL `trenuri` PENTRU PRIMA PROBLEMA
CREATE TABLE `trenuri` (
	`plecare` VARCHAR(100) NOT NULL,
	`sosire` VARCHAR(100) NOT NULL,
    CONSTRAINT PRIMARY KEY (`plecare`, `sosire`),
    CONSTRAINT CHECK (`plecare` <> `sosire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- INSERARE DATE/INREGISTRARI IN TABELUL/TABELA `trenuri`
INSERT INTO `trenuri` VALUES
('Cluj-Napoca', 'Bucuresti'),
('Iasi', 'Suceava'),
('Timisoara', 'Cluj-Napoca'),
('Bistrita', 'Buzau'),
('Calarasi', 'Bucuresti'),
('Bucuresti', 'Vaslui'),
('Buzau', 'Iasi'),
('Calarasi', 'Cluj-Napoca'),
('Suceava', 'Buzau'),
('Cluj-Napoca', 'Iasi'),
('Bucuresti', 'Constanta'),
('Mioveni', 'Ploiesti'),
('Buzau', 'Vaslui'),
('Iasi', 'Cluj-Napoca'),
('Ploiesti', 'Buzau'),
('Iasi', 'Vaslui'),
('Constanta', 'Bucuresti'),
('Ploiesti', 'Bistrita'),
('Buzau', 'Suceava'),
('Bucuresti', 'Ploiesti');

-- SELECTAM TOATE LINIILE (TRENURILE) DIN TABELUL/TABELA `trenuri`
SELECT * FROM `trenuri`;

-- SELECTAM TOATE ORASELE DIN TABELUL/TABELA `trenuri`
SELECT `plecare` AS `oras`
FROM `trenuri`
UNION
SELECT `sosire`
FROM `trenuri`;

-- CREARE TABEL `clienti` PENTRU A DOUA PROBLEMA
CREATE TABLE `clienti` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`nume` NVARCHAR(40) NOT NULL,
	`prenume` NVARCHAR(40) NOT NULL,
    `telefon` VARCHAR(20) NOT NULL UNIQUE,
    `email` VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- INSERARE DATE/INREGISTRARI IN TABELUL/TABELA `clienti`
INSERT INTO `clienti` (`nume`, `prenume`, `email`, `telefon`) VALUES
('Bast', 'Alcmene', 'balcmene13@gmail.com', '(206) 342-8631'),
('Níam', 'Simon', 'nsimon25@yahoo.com', '(717) 550-1675'),
('Metis', 'Aella', 'maella8@gmail.com', '(248) 762-0356'),
('Alfr', 'Gerðr', 'alfr99@gmail.com', '(253) 644-2182'),
('Praxis', 'Aeolus', 'prazis@yahoo.com', '(212) 658-3916'),
('Parthalán', 'Anthea', 'panthea18@outlook.com', '(209) 300-2557'),
('Arachne', 'Phrixos', 'aphrixos5@yahoo.com', '(262) 162-1585'),
('Leda', 'Hoder', 'leda_hoder89@gmail.com', '(252) 258-3799'),
('Clíodhna', 'Kore', 'ckore27@outlook.com', '(234) 109-6666'),
('Rigantona', 'Erato', 'rigantona_erato@gmail.com', '(201) 874-8593'),
('Yngvi', 'Diomedes', 'ydiomedes@gmail.com', '(815) 922-6178');

-- SELECTAM TOATE INREGISTRARILE/LINIILE DIN TABELUL/TABELA `clienti`
SELECT * FROM `clienti`;

-- SELECTAM NUMARUL DE CLIENTI DIN TABELUL `clienti`
SELECT COUNT(*) AS `numar clienti` FROM `clienti`;