DROP DATABASE IF EXISTS `sql_pw_php`;
CREATE DATABASE `sql_pw_php`;
USE `sql_pw_php`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

-- PROBLEMA 1 (TRENURI)
-- O baza de date contine trenuri caracterizate de: nr. tren, tip tren, localitate plecare, localitate sosire, ora plecare, ora sosire. 
-- Un calator va putea cauta trenuri intre doua localitati, specificand prin intermediul unui check box daca doreste numai curse directe sau si curse cu legatura (schimbarea trenului intr-o localitate intermediara).
CREATE TABLE `trenuri` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`nr_tren` INT NOT NULL,
	`tip_tren` VARCHAR(50) NOT NULL,
    `localitate_plecare` VARCHAR(50) NOT NULL,
    `localitate_sosire` VARCHAR(50) NOT NULL,
    `ora_plecare` TIME NOT NULL,
    `ora_sosire` TIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- INSERAM INREGISTRARI (RECORDS/LINES/ROWS) IN TABELUL/TABELA `trenuri`
INSERT INTO `trenuri` (`nr_tren`, `tip_tren`, `localitate_plecare`, `localitate_sosire`, `ora_plecare`, `ora_sosire`) VALUES
(1234, 'InterCity', 'Bucuresti Nord', 'Cluj-Napoca', '08:00', '15:30'),
(5678, 'Regio', 'Timisoara Nord', 'Suceava', '14:30', '21:10'),
(9012, 'InterRegio', 'Iasi', 'Constanta', '14:30', '21:10'),
(3456, 'Accelerat', 'Brasov', 'Bucuresti Nord', '07:15', '11:45'),
(7890, 'InterCity', 'Vaslui', 'Brasov', '9:30', '12:05'),
(2345, 'Regio', 'Cluj-Napoca', 'Targu Mures', '11:20', '13:10'),
(6789, 'InterRegio', 'Constanta', 'Brasov', '16:45', '22:35'),
(9012, 'Accelerat', 'Suceava', 'Timisoara Nord', '13:30', '14:50'),
(4567, 'InterCity', 'Bucuresti Nord', 'Iasi', '10:00', '16:45'),
(8901, 'Regio', 'Oradea', 'Cluj-Napoca', '12:15', '16:30'),
(2345, 'InterRegio', 'Targu Mures', 'Vaslui', '8:45', '10:30'),
(6789, 'Accelerat', 'Brasov', 'Timisoara Nord', '13:20', '18:00'),
(1234, 'InterCity', 'Cluj-Napoca', 'Bucuresti Nord', '9:30', '17:15'),
(5678, 'Regio', 'Suceava', 'Timisoara Nord', '11:40', '12:50'),
(9012, 'InterRegio', 'Constanta', 'Iasi', '15:20', '21:05'),
(3456, 'Accelerat', 'Bucuresti Nord', 'Brasov', '12:30', '16:55'),
(7890, 'InterCity', 'Brasov', 'Vaslui', '14:10', '15:50'),
(2345, 'Regio', 'Targu Mures', 'Cluj-Napoca', '13:15', '14:40'),
(6789, 'InterRegio', 'Timisoara Nord', 'Suceava', '17:00', '17:50'),
(9012, 'Accelerat', 'Iasi', 'Bucuresti Nord', '10:45', '17:30');

-- MAI INSERAM INCA 6 INREGISTRARI IN TABELUL/TABELA `trenuri`
INSERT INTO `trenuri` (`nr_tren`, `tip_tren`, `localitate_plecare`, `localitate_sosire`, `ora_plecare`, `ora_sosire`) VALUES
(5893, 'Regio', 'Iasi', 'Constanta', '09:35', '14:20'),
(7261, 'InterRegio', 'Iasi', 'Constanta', '17:55', '10:50'),
(4037, 'Accelerat', 'Brasov', 'Vaslui', '21:10', '08:00'),
(8462, 'InterCity', 'Ploiesti', 'Mioveni', '15:35', '18:25'),
(8462, 'InterRegio', 'Ploiesti', 'Suceava', '09:40', '12:05'),
(8462, 'InterRegio', 'Suceava', 'Mioveni', '14:50', '17:55');

-- AFISAM TOATE ORASELE DIN TABELUL/TABELA `trenuri` (TOATE ORASELE CARE SUNT FIE STATII DE PLECARE FIE DE SOSIRE)
-- SORTAM CRESCATOR (ALFABETIC/LEXICOGRAFIC) RESULT SET-UL (TABELUL OBTINUT IN URMA EXECUTIEI INTEROGARII)
SELECT `localitate_plecare` AS `oras`
FROM `trenuri`
UNION
SELECT `localitate_sosire`
FROM `trenuri`
ORDER BY `oras` ASC;

-- PRINTAM TOATE TRENURILE (TOATE INREGISTRARILE DIN TABELUL/TABELA `trenuri`)
SELECT * FROM `trenuri` ORDER BY `localitate_plecare`;

-- CURSE DIRECTE DE LA Iasi (ORAS DE PLECARE (SURSA)) LA Brasov (ORAS DE SOSIRE (DESTINATIE))
SELECT * FROM `trenuri` WHERE `localitate_plecare` = 'Iasi' AND `localitate_sosire` = 'Brasov';

-- CURSE CU LEGATURA DE LA Iasi (ORAS DE PLECARE (SURSA)) LA Brasov (ORAS DE SOSIRE (DESTINATIE))
SELECT * FROM `trenuri` `T1` INNER JOIN `trenuri` `T2` ON `T1`.`localitate_sosire` = `T2`.`localitate_plecare` WHERE `T1`.`localitate_plecare` = 'Iasi' AND `T2`.`localitate_sosire` = 'Brasov';

-- PROBLEMA 2 (PRODUSE)
-- O tabela din cadrul unei baze de date mentinuta server side contine produse descrise prin mai multe atribute.
-- Un script php va afisa aceste produse impreuna cu atributele lor paginat (n pe pagina) afisandu-se in acelasi timp link-uri spre urmatoarele respectiv anterioarele n produse.
-- Prin intermediul unui formular ce contine un combobox, scriptul php va putea fi configurat cu numarul n specificat de vizitator.
CREATE TABLE `produse` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`nume` NVARCHAR(100) NOT NULL,
    `tip` NVARCHAR(100) NOT NULL,
    `material` NVARCHAR(100) NOT NULL,
    `culoare` NVARCHAR(100) NOT NULL,
    `pret` FLOAT NOT NULL CHECK (`pret` > 0.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- INSERAM PRODUSE (LINII) IN TABELUL/TABELA `produse`
INSERT INTO `produse` (`nume`, `tip`, `material`, `culoare`, `pret`) VALUES
('Smartphone', 'Electronics', 'Glass/Metal', 'Black', 899.99),
('Running Shoes', 'Footwear', 'Mesh/Synthetic', 'Gray/Blue', 79.99),
('Leather Wallet', 'Accessories', 'Genuine Leather', 'Brown', 49.99),
('Digital Camera', 'Electronics', 'Plastic/Metal', 'Silver', 399.99),
('Cotton T-Shirt', 'Apparel', 'Cotton', 'White', 19.99),
('Stainless Steel Watch', 'Accessories', 'Stainless Steel', 'Silver', 149.99),
('Wooden Dining Table', 'Furniture', 'Wood', 'Natural', 399.99),
('Bluetooth Speaker', 'Electronics', 'Plastic', 'Black', 59.99),
('Denim Jeans', 'Apparel', 'Denim', 'Blue', 59.99),
('Canvas Backpack', 'Bags', 'Canvas', 'Green', 39.99),
('Fitness Tracker', 'Electronics', 'Plastic', 'Black', 79.99),
('Ceramic Mug', 'Kitchenware', 'Ceramic', 'Red', 9.99),
('Leather Belt', 'Accessories', 'Genuine Leather', 'Black', 29.99),
('Sports Water Bottle', 'Accessories', 'Plastic', 'Blue', 14.99),
('Silver Earrings', 'Jewelry', 'Sterling Silver', 'Silver', 49.99),
('Porcelain Dinner Set', 'Kitchenware', 'Porcelain', 'White', 89.99),
('Sunglasses', 'Accessories', 'Plastic/Metal', 'Black', 69.99),
('Hiking Boots', 'Footwear', 'Leather/Synthetic', 'Brown', 129.99),
('Gaming Mouse', 'Electronics', 'Plastic', 'Black', 49.99),
('Aluminum Water Bottle', 'Accessories', 'Aluminum', 'Silver', 19.99);

-- INSERAM MAI MULTE PRODUSE (LINII) IN TABELUL/TABELA `produse`
INSERT INTO produse (nume, tip, material, culoare, pret) VALUES
('Leather Jacket', 'Apparel', 'Leather', 'Black', 199.99),
('Wireless Headphones', 'Electronics', 'Plastic/Metal', 'White', 129.99),
('Cotton Socks', 'Apparel', 'Cotton', 'Black', 9.99),
('Stainless Steel Water Bottle', 'Accessories', 'Stainless Steel', 'Blue', 24.99),
('Office Chair', 'Furniture', 'Leather/Metal', 'Black', 199.99),
('Laptop', 'Electronics', 'Plastic/Metal', 'Silver', 1299.99),
('Casual Sneakers', 'Footwear', 'Canvas/Synthetic', 'White', 89.99),
('Designer Handbag', 'Bags', 'Leather', 'Brown', 299.99),
('Smart TV', 'Electronics', 'Plastic/Metal', 'Black', 999.99),
('Cotton Pillowcase Set', 'Home Decor', 'Cotton', 'White', 19.99),
('Gold Necklace', 'Jewelry', 'Gold', 'Gold', 199.99),
('Acrylic Paint Set', 'Art Supplies', 'Acrylic', 'Assorted', 29.99),
('Leather Boots', 'Footwear', 'Leather', 'Brown', 149.99),
('Wireless Mouse', 'Electronics', 'Plastic', 'Black', 19.99),
('Wooden Cutting Board', 'Kitchenware', 'Wood', 'Natural', 24.99),
('Classic Novels Set', 'Books', 'Paper', 'Assorted', 49.99),
('Wool Sweater', 'Apparel', 'Wool', 'Gray', 79.99),
('Ceramic Flower Vase', 'Home Decor', 'Ceramic', 'White', 14.99),
('Diamond Ring', 'Jewelry', 'Diamond/Gold', 'Silver', 999.99),
('Outdoor Tent', 'Camping', 'Nylon/Fiberglass', 'Green', 149.99),
('Laptop Bag', 'Bags', 'Nylon', 'Black', 39.99),
('Portable Charger', 'Electronics', 'Plastic', 'Black', 39.99),
('Cotton Bath Towel Set', 'Home Decor', 'Cotton', 'White', 29.99),
('Running Shorts', 'Apparel', 'Polyester', 'Black', 24.99),
('Stainless Steel Cutlery Set', 'Kitchenware', 'Stainless Steel', 'Silver', 39.99),
('Bluetooth Earbuds', 'Electronics', 'Plastic/Metal', 'Black', 79.99),
('Leather Wallet', 'Accessories', 'Genuine Leather', 'Black', 49.99),
('Watercolor Paint Set', 'Art Supplies', 'Watercolor', 'Assorted', 19.99),
('Silk Scarf', 'Accessories', 'Silk', 'Purple', 34.99),
('Gym Bag', 'Bags', 'Polyester', 'Black', 29.99);

-- AFISAM TOATE PRODUSELE DIN TABELUL/TABELA `produse`
SELECT * FROM `produse`;