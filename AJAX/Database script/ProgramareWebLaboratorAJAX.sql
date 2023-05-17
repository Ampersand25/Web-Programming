DROP DATABASE IF EXISTS `sql_pw_ajax`;
CREATE DATABASE `sql_pw_ajax`;
USE `sql_pw_ajax`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE `trenuri` (
	`plecare` VARCHAR(100) NOT NULL,
	`sosire` VARCHAR(100) NOT NULL,
    CONSTRAINT PRIMARY KEY (`plecare`, `sosire`),
    CONSTRAINT CHECK (`plecare` <> `sosire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `trenuri` (`plecare`, `sosire`) VALUES
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

SELECT * FROM `trenuri`;

SELECT `plecare` AS `oras`
FROM `trenuri`
UNION
SELECT `sosire`
FROM `trenuri`;