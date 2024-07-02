-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 03 jan. 2024 à 12:17
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `automotive`
--

-- --------------------------------------------------------

--
-- Structure de la table `agencelongtermrentals`
--

DROP TABLE IF EXISTS `agencelongtermrentals`;
CREATE TABLE IF NOT EXISTS `agencelongtermrentals` (
  `AgenceId` int NOT NULL,
  `LongTermRentalId` int NOT NULL,
  PRIMARY KEY (`AgenceId`,`LongTermRentalId`),
  KEY `IX_AgenceLongTermRentals_LongTermRentalId` (`LongTermRentalId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `agencelongtermrentals`
--

INSERT INTO `agencelongtermrentals` (`AgenceId`, `LongTermRentalId`) VALUES
(5, 11),
(5, 12),
(5, 13),
(5, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(6, 11),
(6, 12),
(6, 13),
(6, 14),
(6, 15),
(6, 16),
(6, 17),
(6, 18),
(6, 19),
(6, 20),
(6, 21),
(6, 22),
(6, 23),
(6, 24),
(7, 11),
(7, 12),
(7, 13),
(7, 14),
(7, 15),
(7, 16),
(7, 17),
(7, 18),
(7, 19),
(7, 20),
(7, 21),
(7, 22),
(7, 23),
(7, 24),
(8, 11),
(8, 12),
(8, 13),
(8, 14),
(8, 15),
(8, 16),
(8, 17),
(8, 18),
(8, 19),
(8, 20),
(8, 21),
(8, 22),
(8, 23),
(8, 24),
(100, 13),
(100, 14),
(100, 15),
(100, 16),
(100, 17),
(100, 18),
(100, 19),
(100, 20),
(100, 21),
(100, 22),
(100, 23),
(100, 24),
(101, 12),
(101, 13),
(101, 14),
(101, 15),
(101, 16),
(101, 17),
(101, 18),
(101, 19),
(101, 20),
(101, 21),
(101, 22),
(101, 23),
(101, 24),
(106, 12),
(106, 13),
(106, 14),
(106, 15),
(106, 16),
(106, 17),
(106, 18),
(106, 19),
(106, 20),
(106, 21),
(106, 22),
(106, 23),
(106, 24),
(107, 12),
(107, 13),
(107, 14),
(107, 15),
(107, 16),
(107, 17),
(107, 18),
(107, 19),
(107, 20),
(107, 21),
(107, 22),
(107, 23),
(107, 24),
(108, 12),
(108, 13),
(108, 14),
(108, 15),
(108, 16),
(108, 17),
(108, 18),
(108, 19),
(108, 20),
(108, 21),
(108, 22),
(108, 23),
(108, 24),
(109, 12),
(109, 13),
(109, 14),
(109, 15),
(109, 16),
(109, 17),
(109, 18),
(109, 19),
(109, 20),
(109, 21),
(109, 22),
(109, 23),
(109, 24),
(110, 12),
(110, 13),
(110, 14),
(110, 15),
(110, 16),
(110, 17),
(110, 18),
(110, 19),
(110, 20),
(110, 21),
(110, 22),
(110, 23),
(110, 24),
(111, 12),
(111, 13),
(111, 14),
(111, 15),
(111, 16),
(111, 17),
(111, 18),
(111, 19),
(111, 20),
(111, 21),
(111, 22),
(111, 23),
(111, 24);

-- --------------------------------------------------------

--
-- Structure de la table `agences`
--

DROP TABLE IF EXISTS `agences`;
CREATE TABLE IF NOT EXISTS `agences` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `Tel` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Address` longtext NOT NULL,
  `City` longtext,
  `ZipCode` longtext,
  `Latitude` double DEFAULT NULL,
  `Longitude` double DEFAULT NULL,
  `IsVerified` tinyint(1) NOT NULL,
  `ParentId` int DEFAULT NULL,
  `Logo` longtext,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `agences`
--

INSERT INTO `agences` (`Id`, `Name`, `Tel`, `Email`, `Address`, `City`, `ZipCode`, `Latitude`, `Longitude`, `IsVerified`, `ParentId`, `Logo`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Direct Accounts Administrator', '921.380.7408 x161', 'Alfonso.Koelpin@yahoo.com', '0370 Goodwin Knolls', 'Oujda', '60087', -35.6936, 69.0297, 0, NULL, NULL, '2022-11-03 10:41:12.165565', NULL, NULL),
(2, 'Regional Security Associate', '330.726.9500 x9784', 'Antoinette_VonRueden77@yahoo.com', '9197 Schaden Mountains', 'Salé', '14139-7675', 13.7901, 137.3398, 0, NULL, NULL, '2023-03-30 14:32:23.120937', NULL, NULL),
(3, 'National Implementation Supervisor', '1-351-866-5893', 'Kailyn_Cormier85@gmail.com', '902 Arjun Lights', 'Beni-mellal', '97173', 69.2556, -65.0191, 0, NULL, NULL, '2023-07-16 01:59:43.159799', NULL, NULL),
(4, 'Regional Directives Developer', '484-586-5914', 'Steve53@hotmail.com', '189 McKenzie Port', 'Casablanca', '22311', 32.4101, -103.2476, 0, NULL, NULL, '2023-04-07 05:38:22.058341', NULL, NULL),
(5, 'District Markets Consultant', '(289) 795-5376', 'Mariam_Haag33@yahoo.com', '64859 Isaias Court', 'Nador', '33693', 73.4182, -88.7549, 1, NULL, 'Logos/5\\logo.png', '2023-07-06 17:28:50.523024', '2023-12-03 19:24:29.014553', NULL),
(6, 'Investor Quality Designer', '(375) 503-2860 ', 'Shyann56@hotmail.com', '777 Schamberger Islands', 'Safi', '51798', 6.9449, 52.5029, 1, NULL, 'Logos/6\\logo.png', '2023-06-08 15:31:35.541984', '2023-12-01 16:36:45.650996', NULL),
(7, 'Investor Security Associate', '0606067878', 'Jesus.Dietrich@hotmail.com', '6189 Antonette Passage', 'Marrakech', '24489-4925', -44.672, 158.9875, 1, NULL, 'Logos/7\\logo.png', '2022-12-27 12:10:21.536410', '2023-12-01 16:38:20.337119', NULL),
(8, 'Chief Data Producer', '1-995-854-6389 x366', 'Sandy32@yahoo.com', '51421 Larson Parks', 'Safi', '46174', 59.4349, -10.0952, 1, NULL, 'Logos/8\\logo.png', '2022-12-15 14:47:37.081448', '2023-12-01 16:38:56.477424', NULL),
(9, 'Investor Data Developer', '1-778-573-7747', 'Louie.Conn70@hotmail.com', '36517 Johnpaul Flats', 'Meknès', '72672-9830', 15.696, 138.039, 0, NULL, NULL, '2023-08-06 14:34:16.190527', NULL, NULL),
(10, 'Central Metrics Assistant', '348.771.2009 x9966', 'Rashawn_Johns15@yahoo.com', '6459 Donnelly Stravenue', 'Oujda', '99920-1114', -78.9666, -78.5458, 0, NULL, NULL, '2022-11-26 00:41:13.870096', NULL, NULL),
(100, 'Master Car', '0661665543', 'Master@gmail.com', '0370 Goodwin Knolls', 'Casablanca', '12343', -35.6936, 69.0297, 1, NULL, NULL, '2022-11-03 10:41:12.165565', '2023-12-03 03:11:47.219505', NULL),
(101, 'Hertz Associate', '330.726.9500 ', 'Hertz@yahoo.com', '9197 Schaden Mountains', 'Salé', '14139-7675', 13.7901, 137.3398, 1, NULL, 'Logos/101\\logo.png', '2023-03-30 14:32:23.120937', '2023-12-01 16:42:35.356492', NULL),
(102, 'Car Central ', '330.726.9500 ', 'central@gmail.com', '6000 Schaden ', 'Casablanca', '14139-7675', 13.7901, 137.3398, 0, NULL, NULL, '2023-08-20 14:32:23.120937', NULL, NULL),
(106, 'Car Central ', '330.726.9500 ', 'central@gmail.com', '6000 Schaden ', 'Casablanca', '14139-7675', 13.7901, 137.3398, 1, NULL, 'Logos/106\\logo.png', '2023-08-20 14:32:23.120937', '2023-12-01 16:42:56.990310', NULL),
(107, 'Car Associate', '330.726.9500', 'Associate@gmail.com', '9197 Boulevard La Résistance Bourgone', 'Casablanca', '14139-7675', 13.7901, 137.3398, 1, NULL, NULL, '2023-06-10 14:32:23.120937', NULL, NULL),
(108, 'Verder Rental', '330.726.9500 ', 'Verder@gmail.com', '9197 Avenue Al haouz Hay Nahda', 'Safi', '14139-7675', 13.7901, 137.3398, 1, NULL, NULL, '2023-03-30 14:32:23.120937', NULL, NULL),
(109, 'YourCar', '0780801731', 'YourCar@gmail.com', 'Hay Riad 123 Boulevard addolb', 'Rabat', '14139-7675', 13.7901, 137.3398, 1, NULL, NULL, '2023-03-30 14:32:23.120937', NULL, NULL),
(110, 'Car Central ', '330.726.9500 ', 'central@gmail.com', '6000 Schaden ', 'Casablanca', '14139-7675', 13.7901, 137.3398, 1, NULL, NULL, '2023-08-20 14:32:23.120937', NULL, NULL),
(111, 'Aya DOUMA', '0771430563', 'aya10douma@gmail.com', 'N 10 LOT EL FARAH 1 HAY RIAD', 'Casablanca', '25000', 2, NULL, 1, NULL, 'Logos/111\\logo.png', '2023-12-01 16:02:10.138624', '2023-12-01 16:23:38.471748', NULL),
(112, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:10:41.844827', NULL, NULL),
(113, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/113\\logo.png', '2023-12-03 01:11:20.769533', NULL, NULL),
(114, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/114\\logo.svg', '2023-12-03 01:13:07.777269', NULL, NULL),
(115, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:24:38.261977', NULL, NULL),
(116, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:26:20.364200', NULL, NULL),
(117, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:29:59.151857', NULL, NULL),
(118, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:30:24.782596', NULL, NULL),
(119, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiae2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:30:35.384931', NULL, NULL),
(120, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/120\\logo.svg', '2023-12-03 01:34:22.716416', NULL, NULL),
(121, 'SOUFIANE ANIBA', '+212656039763', 'anibasoufiane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 01:36:25.949097', NULL, NULL),
(122, 'Aniba Soufiane', '0620431737', 'anibasoufia.ne2001@gmail.com', 'Ain Chok rue 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 02:04:25.277013', NULL, NULL),
(123, 'Aniba Soufiane', '0620431737', 'anibasoufia.ne001@gmail.com', 'Ain Chok rue 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 02:04:56.600249', NULL, NULL),
(124, 'SOUFIANE ANIBA', '+212656039763', 'anibasouane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 02:05:06.651151', NULL, NULL),
(125, 'SOUFIANE ANIBA', '+212656039763', 'anibasouane2001@gmail.com', 'AIN CHOK RUE 35 N° 12', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-03 02:05:30.232145', NULL, NULL),
(126, 'Amjad Chokairi', '0786121234', 'aniba.soufiane.2.001@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/126\\logo.png', '2023-12-03 18:35:08.903916', NULL, NULL),
(127, 'Test', '0786121234', 'Test@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/127\\logo.svg', '2023-12-04 12:02:52.849704', NULL, NULL),
(128, 'Test', '0786121234', 'Teeest@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/128\\logo.svg', '2023-12-04 12:06:10.516576', NULL, NULL),
(129, 'Test', '0786121234', 'Teees123t@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/129\\logo.svg', '2023-12-04 12:06:42.829571', NULL, NULL),
(130, 'Amjad Chokairi', '0786121234', 'aniba.soufiane.20.01@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, 'Logos/130\\logo.svg', '2023-12-04 12:07:50.953497', NULL, NULL),
(131, 'Amjad Chokairi', '0786121234', 'aniba.soufiane.20.01@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-04 14:50:58.024235', NULL, NULL),
(132, 'Amjad Chokairi', '0786121234', 'aniba.soufiane.2.01@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-04 14:52:14.961091', NULL, NULL),
(133, 'Amjad Chokairi', '0786121234', 'aiba.soufiane.2001@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-04 14:54:39.516168', NULL, NULL),
(134, 'Amjad Chokairi', '0786121234', 'aiba.soufine.2001@gmail.com', 'Casablanca', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2023-12-04 15:14:09.106584', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` longtext NOT NULL,
  `LastName` longtext NOT NULL,
  `Tel` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Ville` longtext NOT NULL,
  `Password` longtext,
  `ZipCode` longtext,
  `Adresse` longtext,
  `Adresse2` longtext,
  `PermisRecto` longtext,
  `PermisVerso` longtext,
  `IsVerified` tinyint(1) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`Id`, `FirstName`, `LastName`, `Tel`, `Email`, `Ville`, `Password`, `ZipCode`, `Adresse`, `Adresse2`, `PermisRecto`, `PermisVerso`, `IsVerified`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Giuseppe', 'Kutch', '(554) 675-8054 x46104', 'Kailyn_Schinner@yahoo.com', 'East Lesley', NULL, '06033-1663', '50660 Zelma Gateway', '9068 Dorthy Shore', 'https://picsum.photos/640/480/?image=589', 'https://picsum.photos/640/480/?image=861', 0, '2022-10-10 00:20:47.159920', NULL, NULL),
(2, 'Elmo', 'DuBuque', '(504) 465-1608', 'Simone.Wilderman@yahoo.com', 'Jerdemouth', NULL, '08452', '5788 Lavinia Bridge', '7444 Gleason Run', 'https://picsum.photos/640/480/?image=423', 'https://picsum.photos/640/480/?image=930', 0, '2023-04-18 08:19:31.281474', NULL, NULL),
(3, 'Abigail', 'Stracke', '1-754-533-6984', 'Estell.Legros90@gmail.com', 'Sunnyville', NULL, '66739', '557 Corbin Pine', '5334 Murray Locks', 'https://picsum.photos/640/480/?image=170', 'https://picsum.photos/640/480/?image=665', 0, '2022-09-01 05:47:54.613537', NULL, NULL),
(4, 'Dortha', 'Lang', '571-269-7485', 'Art_Romaguera44@hotmail.com', 'North Jaronview', NULL, '38427', '5365 Sid Harbor', '54418 Meredith Fords', 'https://picsum.photos/640/480/?image=165', 'https://picsum.photos/640/480/?image=23', 0, '2023-05-12 15:20:16.878323', NULL, NULL),
(5, 'Joaquin', 'Strosin', '1-337-857-2395', 'Diego55@yahoo.com', 'Mollyburgh', NULL, '85442-2351', '922 Weber Stravenue', '367 Orn Points', 'https://picsum.photos/640/480/?image=1055', 'https://picsum.photos/640/480/?image=709', 0, '2023-03-14 07:24:49.813161', NULL, NULL),
(6, 'Seth', 'Sawayn', '766-291-2046 x74567', 'Laila.Schmeler49@hotmail.com', 'South Alethachester', NULL, '84845-4078', '7664 Mills Square', '3817 Langosh Estates', 'https://picsum.photos/640/480/?image=199', 'https://picsum.photos/640/480/?image=219', 0, '2023-07-02 23:53:04.492320', NULL, NULL),
(7, 'Anahi', 'Bednar', '296.404.0018 x88791', 'Raul.Cormier8@hotmail.com', 'Lake Clinton', NULL, '98808', '2585 Roderick Streets', '0476 Ryan Summit', 'https://picsum.photos/640/480/?image=1043', 'https://picsum.photos/640/480/?image=574', 0, '2023-07-02 08:39:51.524694', NULL, NULL),
(8, 'Malvina', 'Wiegand', '425-918-8771', 'Jarrett45@hotmail.com', 'North Luellabury', NULL, '82526-6005', '0737 Stehr Union', '3049 Hirthe Turnpike', 'https://picsum.photos/640/480/?image=1022', 'https://picsum.photos/640/480/?image=526', 0, '2023-02-09 13:28:57.648063', NULL, NULL),
(9, 'Alexis', 'Goodwin', '(338) 834-1581', 'Nils.Murazik@hotmail.com', 'New Ruth', NULL, '79644-9594', '6715 Jenkins Row', '22278 Cassin Loaf', 'https://picsum.photos/640/480/?image=947', 'https://picsum.photos/640/480/?image=916', 0, '2023-01-21 00:51:57.137012', NULL, NULL),
(10, 'Anika', 'Price', '1-790-389-1182 x949', 'Gene.McGlynn99@gmail.com', 'New Unique', NULL, '19859', '6881 Shields Roads', '19319 Deshaun Village', 'https://picsum.photos/640/480/?image=312', 'https://picsum.photos/640/480/?image=92', 0, '2023-05-23 16:20:06.347427', NULL, NULL),
(11, 'Ahmed', 'Ali', '0619213378', 'Ali@gmail.com', 'Casablanca', NULL, NULL, 'Maarif', NULL, NULL, NULL, 0, '2023-11-27 16:18:06.809311', NULL, NULL),
(12, 'Soufiane', 'Aniba', '0620431737', 'sou.dev.2001@gmail.com', 'Agadir', '$2a$11$1tR8n4SGBTMkN47dsk.3m.LsWyixJAY7WieUqajUbgJUBda8EK66i', '1222', 'Quartier zohr', NULL, 'Permis/12\\permisRecto.svg', 'Permis/12\\permisVerso.jpg', 0, '2023-11-27 16:49:22.473564', '2023-12-03 02:02:00.122185', NULL),
(13, 'SOUFIANE', 'testeur', '+212656039763', 'atlas@gmail.com', 'Agadir', '$2a$11$H/14LPAD9lfUbcAxhK.bo.CP.eJQNEO/fUfCZjm/6e/ms/rsUcWqi', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 00:50:45.882620', NULL, NULL),
(14, 'Hamza', 'Ali', '0786543218', 'Atlas123@gmail.com', 'Tanger', '$2a$11$OzSpPiJQY4LyBC29yFVX1O3J/S11vAqTvgmT2Hux2o8p4nw5K2.KW', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 00:51:44.974206', NULL, NULL),
(15, 'SOUFIANE', 'ANIBA', '+212656039763', 'test@live.com', 'Ben Ahmed', '$2a$11$h03Eqa3iCSAqMkhJf2NtHO2vb.6wiRIMARc/6rylciMhxyR617xZ6', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 00:52:42.935550', NULL, NULL),
(16, 'SOUFIANE', 'ANIBA', '+212656039763', 'atlass@live.com', 'Agadir', '$2a$11$xuenaJR/V2eCg13N9wcAp.X2EwPuYIx5nrpVGuL3Ml9LQX4miL.DG', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 00:53:25.705123', NULL, NULL),
(17, 'SOUFIANE', 'ANIBA', '+212656039763', 'ATLAS1234@gmail.com', 'Témara', '$2a$11$MTYwTLbXok6LggOD8TMgjuVh0BHqAhhaBpFd/l0pkqdUmnGHyM6DO', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 00:55:48.356811', NULL, NULL),
(18, 'Soufiane', 'Dev', '0677824644', 'soudev2001@gmail.com', 'Rabat', '$2a$11$LEi4sjrKXJfetEverGk3X.VRvtnzpAEElESHS2CZwsrMiHWc9x4Tu', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 15:36:27.147786', NULL, NULL),
(19, 'SOUFIANE', 'ANIBA', '+212656039763', 'sou.dev2001@gmail.com', 'Rabat', '$2a$11$FQA3morWxqyeYHKeYAsguONAtFawjki7kxmEctujoyaMDxiFBEG1m', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-29 15:39:31.870220', NULL, NULL),
(20, 'Ali', 'Ali', '078998989', 'ali@gmail.com', 'Agadir', '$2a$11$mCLbGsvE3Rqzf0ZrwRb2JOXCdpmtWu1PGQss/bEogdP5H/MJ9pNPC', NULL, NULL, NULL, NULL, NULL, 0, '2023-11-30 17:01:50.037244', NULL, NULL),
(21, 'Soufiane', 'Aniba', '0620431737', 'absou@gmail.com', 'Casablanca', '$2a$11$Udb116Ab72sr1h1fGv2wbOSF.5PbBtjiYvr9KjC/cszoNtI/A79mO', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 02:08:55.038294', NULL, NULL),
(22, 'Soufiane', 'Aniba', '0620431737', 'abou@gmail.com', 'Casablanca', '$2a$11$x4jHw7PHGKC4woeEU2coLeKXF4f3PHKgtQm739Zqs6ycuxe0npmz6', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 02:09:30.373860', NULL, NULL),
(23, 'Soufiane', 'Aniba', '0620431737', 'atlasslm@gmail.com', 'Casablanca', '$2a$11$/ktYrMurQ7yxgSYm0iCsi.fopUcLi5M2HmSUxVJiDU1N9tHyVV9i2', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 02:10:29.853655', NULL, NULL),
(24, 'Amjad', 'Chokairi', '0786121234', 'Amjad@gmail.com', 'Casablanca', '$2a$11$O8nrb7UbDA90wWxNlYUQA.TwBh8rap1il16fRCIBK1LhcJMUXSVWa', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 05:09:59.260565', NULL, NULL),
(25, 'Amjad', 'Chokairi', '0786121234', 'soudev.2001@gmail.com', 'Casablanca', '$2a$11$Bw7syfIuQY6HhdkdkrzzZuCl8zzHq7gAdsYiSR3lApUJVsrQmCpsq', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 05:10:38.425680', NULL, NULL),
(26, 'Amjad', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Casablanca', '$2a$11$sy7uiJdanlrv79woGlSWOOYqAepMF5x2sIxR.fyvm4ys.ak44s4Mu', NULL, 'Casablanca', NULL, 'Permis/26\\permisRecto.svg', 'Permis/26\\permisVerso.svg', 0, '2023-12-03 05:11:46.715868', '2023-12-04 01:47:35.788570', NULL),
(27, 'Amjaddd', 'Chokairiii', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Agadir', NULL, NULL, 'Agadir', NULL, NULL, NULL, 0, '2023-12-03 18:46:47.415288', NULL, NULL),
(28, 'Amjadoo', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Agadir', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-03 18:57:13.237572', NULL, NULL),
(29, 'Amjad', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Casablanca', NULL, '12000', 'AIN CHOCK', NULL, NULL, NULL, 0, '2023-12-04 01:34:29.725790', NULL, NULL),
(30, 'Amjadoo', 'Chokairi', '0786121234', 'aniba.soufiane@gmail.com', 'Afourar', NULL, '12000', NULL, NULL, NULL, NULL, 0, '2023-12-04 01:34:29.799735', NULL, NULL),
(31, 'Achraf', 'Taki', '0612342121', 'Avhraf@gmail.com', 'Kénitra', NULL, '2555', 'Hay Chabab', NULL, 'Permis/31\\permisRecto.svg', 'Permis/31\\permisVerso.svg', 0, '2023-12-04 01:56:06.041793', NULL, NULL),
(32, 'Amine', 'Taki', '0613145522', 'Taki@gmail.com', 'Kénitra', NULL, '23334', NULL, NULL, NULL, NULL, 0, '2023-12-04 01:56:06.068580', NULL, NULL),
(33, 'Amine', 'Taki', '0613145522', 'Taki@gmail.com', 'Meknès', NULL, '23334', 'Casablanca Ain chok', NULL, NULL, NULL, 0, '2023-12-04 02:05:32.133443', NULL, NULL),
(34, 'Moncef', 'Salhi', '0679334421', 'Moncef@gmail.com', 'Mohammadia', NULL, '678686', 'HAY WAFAA', NULL, 'Permis/34\\permisRecto.png', 'Permis/34\\permisVerso.png', 0, '2023-12-04 14:36:44.163326', NULL, NULL),
(35, 'Ali', 'Moncef', '061214457', 'Alll@gmail.com', 'Agadir', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 14:36:44.201132', NULL, NULL),
(36, 'Amjad', 'Moncef', '0613145522', 'Alll@gmail.com', 'Salé', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 14:39:33.806691', NULL, NULL),
(37, 'Amjad', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Afourar', NULL, NULL, 'Casablanca', NULL, NULL, NULL, 0, '2023-12-04 14:41:56.464568', NULL, NULL),
(38, 'Amjad', 'Moncef', '0613145522', 'Alll@gmail.com', 'Agadir', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 14:42:49.325429', NULL, NULL),
(39, 'Amjad', 'Moncef', '0613145522', 'Alll@gmail.com', 'Al Hoceïma', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 14:44:37.606936', NULL, NULL),
(40, 'Amjad', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Agadir', NULL, NULL, 'Casablanca', NULL, NULL, NULL, 0, '2023-12-04 14:45:45.929804', NULL, NULL),
(41, 'Amjad', 'Chokairi', '0786121234', 'aniba.soufiane.2001@gmail.com', 'Agadir', NULL, NULL, 'Casablanca', NULL, NULL, NULL, 0, '2023-12-04 14:48:01.938452', NULL, NULL),
(42, 'Amjad', 'Moncef', '0613145522', 'Alll@gmail.com', 'Agadir', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 14:49:41.002980', NULL, NULL),
(43, 'Ali', 'Moncef', '061214457', 'moncef.soufiane.2001@gmail.com', 'Agadir', '$2a$11$Oxrh3tuwehbpQgx76S.oguUjDhg/2b7/K0N3cwOQd.i1257JSJBNS', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-04 14:50:45.623905', NULL, NULL),
(44, 'Amjad', 'Moncef', '0613145522', 'Alll@gmail.com', 'Agdz', NULL, '1234', 'Hay Azhar', NULL, NULL, NULL, 0, '2023-12-04 15:14:33.636927', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `contrats`
--

DROP TABLE IF EXISTS `contrats`;
CREATE TABLE IF NOT EXISTS `contrats` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdClient` int NOT NULL,
  `IdReservation` int NOT NULL,
  `IsConducteur` tinyint(1) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Contrats_IdClient` (`IdClient`),
  KEY `IX_Contrats_IdReservation` (`IdReservation`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `contrats`
--

INSERT INTO `contrats` (`Id`, `IdClient`, `IdReservation`, `IsConducteur`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 7, 6, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 5, 7, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 4, 7, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(4, 5, 7, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(5, 7, 9, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(6, 8, 4, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(7, 5, 5, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(8, 4, 2, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(9, 9, 7, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(10, 5, 1, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(11, 11, 11, 0, '2023-11-27 16:18:07.241757', NULL, NULL),
(12, 12, 12, 0, '2023-11-29 17:37:43.734189', NULL, NULL),
(13, 12, 13, 0, '2023-12-03 01:52:37.092100', NULL, NULL),
(14, 12, 14, 0, '2023-12-03 01:53:58.546883', NULL, NULL),
(15, 12, 15, 0, '2023-12-03 01:58:36.185932', NULL, NULL),
(16, 12, 16, 0, '2023-12-03 02:02:00.137256', NULL, NULL),
(17, 26, 17, 0, '2023-12-03 05:12:55.095682', NULL, NULL),
(18, 26, 18, 0, '2023-12-03 05:19:47.215914', NULL, NULL),
(19, 26, 19, 0, '2023-12-03 05:21:18.298969', NULL, NULL),
(20, 26, 20, 0, '2023-12-03 17:00:53.645513', NULL, NULL),
(21, 27, 21, 1, '2023-12-03 18:46:47.421946', NULL, NULL),
(22, 26, 21, 0, '2023-12-03 18:46:47.439586', NULL, NULL),
(23, 28, 22, 1, '2023-12-03 18:57:13.244134', NULL, NULL),
(24, 26, 22, 0, '2023-12-03 18:57:13.262171', NULL, NULL),
(25, 30, 23, 1, '2023-12-04 01:34:29.808850', NULL, NULL),
(26, 29, 23, 0, '2023-12-04 01:34:29.874181', NULL, NULL),
(27, 26, 24, 0, '2023-12-04 01:47:35.797863', NULL, NULL),
(28, 32, 25, 1, '2023-12-04 01:56:06.075153', NULL, NULL),
(29, 31, 25, 0, '2023-12-04 01:56:06.096195', NULL, NULL),
(30, 33, 26, 0, '2023-12-04 02:05:32.139285', NULL, NULL),
(31, 35, 27, 1, '2023-12-04 14:36:44.208154', NULL, NULL),
(32, 34, 27, 0, '2023-12-04 14:36:44.254247', NULL, NULL),
(33, 36, 28, 0, '2023-12-04 14:39:33.813703', NULL, NULL),
(34, 37, 29, 0, '2023-12-04 14:41:56.470303', NULL, NULL),
(35, 38, 30, 0, '2023-12-04 14:42:49.330556', NULL, NULL),
(36, 39, 31, 0, '2023-12-04 14:44:37.612323', NULL, NULL),
(37, 40, 32, 0, '2023-12-04 14:45:45.935188', NULL, NULL),
(38, 41, 33, 0, '2023-12-04 14:48:01.943494', NULL, NULL),
(39, 42, 34, 0, '2023-12-04 14:49:41.007303', NULL, NULL),
(40, 44, 35, 0, '2023-12-04 15:14:33.641673', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `emailverificationtokens`
--

DROP TABLE IF EXISTS `emailverificationtokens`;
CREATE TABLE IF NOT EXISTS `emailverificationtokens` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Token` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `ExpirationDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `emailverificationtokens`
--

INSERT INTO `emailverificationtokens` (`Id`, `Token`, `Email`, `ExpirationDate`) VALUES
(1, 'ed2d7a6d-5de8-4243-a1f3-366f0cfae502', 'atlass@gmail.com', '2023-11-27 17:19:22.678934'),
(2, 'a1633e22-a35e-4556-9ae7-9d6a589c70fe', 'atlas@gmail.com', '2023-11-29 01:20:45.952437'),
(3, '8d330d71-4d7e-4809-abad-d68c761cdf92', 'Atlas123@gmail.com', '2023-11-29 01:21:45.002421'),
(4, '75536a4b-4436-4d93-9ac1-1f9e34a2de5a', 'test@live.com', '2023-11-29 01:22:42.961705'),
(5, 'd10b50e2-7e46-4cf4-b008-38fb362b8180', 'atlass@live.com', '2023-11-29 01:23:25.753961'),
(6, '52f9fd62-1b97-4e87-8b24-be08041f8d23', 'ATLAS1234@gmail.com', '2023-11-29 01:25:48.431548'),
(7, 'd4acff16-880a-4668-9416-94dac2cec41c', 'soudev2001@gmail.com', '2023-11-29 16:06:27.438443'),
(8, '14179e65-aec4-4b2a-a7d5-940f5d94cde8', 'sou.dev2001@gmail.com', '2023-11-29 16:09:33.822997'),
(9, '83ebcacf-9d83-4af8-bfc1-7888c87e94da', 'ali@gmail.com', '2023-11-30 17:31:50.192392'),
(10, '406eb918-34b6-42b1-bb9a-1a2368744e51', 'Hertz@yahoo.com', '2023-12-01 00:21:34.534817'),
(11, '4e52e8f7-af69-4e5e-afbf-b00ef2b460a8', 'aya10douma@gmail.com', '2023-12-01 16:53:31.889926'),
(12, '56870b09-c495-4903-ad2e-8bb6e96dc6cd', 'absou@gmail.com', '2023-12-03 02:38:55.087321'),
(13, '125ffe29-a9cd-4f26-8723-3db9caf87c64', 'abou@gmail.com', '2023-12-03 02:39:30.398529'),
(14, '62836986-422a-41f5-8e89-c3e09016888c', 'atlasslm@gmail.com', '2023-12-03 02:40:29.907204'),
(15, 'f9e15206-5ca0-4a22-99f3-0b7537fb2683', 'Master@gmail.com', '2023-12-03 03:41:44.476111'),
(16, '959b22b9-bbd7-44ff-bf46-5ea41be8b40b', 'Amjad@gmail.com', '2023-12-03 05:39:59.607386'),
(17, '4d9af95c-1e89-46d8-9d53-cf3c1e1d05ff', 'soudev.2001@gmail.com', '2023-12-03 05:40:38.559696'),
(18, 'e0d0c188-b803-426e-b869-f7a133a58dd4', 'aniba.soufiane.2001@gmail.com', '2023-12-03 05:41:46.862638'),
(19, '298a5164-e6b8-4fe3-868f-0c7ef643ba39', 'moncef.soufiane.2001@gmail.com', '2023-12-04 15:20:45.657249');

-- --------------------------------------------------------

--
-- Structure de la table `lld_responses`
--

DROP TABLE IF EXISTS `lld_responses`;
CREATE TABLE IF NOT EXISTS `lld_responses` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `prix` int NOT NULL,
  `description` longtext NOT NULL,
  `idAgence` int DEFAULT NULL,
  `idLongTermRental` int NOT NULL,
  `isAgence` tinyint(1) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_lld_responses_idAgence` (`idAgence`),
  KEY `IX_lld_responses_idLongTermRental` (`idLongTermRental`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `lld_responses`
--

INSERT INTO `lld_responses` (`Id`, `prix`, `description`, `idAgence`, `idLongTermRental`, `isAgence`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 230, 'AAAAAAAAAAAKHIR TAMAN', 111, 12, 1, '2023-12-01 17:34:11.708181', NULL, NULL),
(2, 210, 'WA GHA CHOUF KI DIRI', 111, 12, 0, '2023-12-01 17:35:58.317492', NULL, NULL),
(3, 250, 'null', 111, 12, 1, '2023-12-01 17:36:47.213851', NULL, NULL),
(4, 220, 'DERNIER PRIX', 100, 13, 1, '2023-12-03 03:36:20.054271', NULL, NULL),
(5, 200, 'null', 100, 14, 1, '2023-12-03 19:15:57.851827', NULL, NULL),
(6, 200, 'null', 100, 14, 1, '2023-12-03 19:16:23.909344', NULL, NULL),
(7, 350, 'Disponible A Casa', 100, 16, 1, '2023-12-04 02:14:12.137754', NULL, NULL),
(8, 350, 'Disponible A Casa', 100, 16, 1, '2023-12-04 02:14:37.185916', NULL, NULL),
(9, 220, 'null', 100, 16, 1, '2023-12-04 02:15:56.688351', NULL, NULL),
(10, 300, 'Lorem Ipusm CaracterLorem Ipusm CaracterLorem Ipusm CaracterLorem Ipusm Caracter', 100, 16, 0, '2023-12-04 02:29:38.755723', NULL, NULL),
(11, 220, 'null', 100, 16, 1, '2023-12-04 02:32:14.070161', NULL, NULL),
(12, 300, 'Dernier Prix', 100, 16, 0, '2023-12-04 02:43:53.044371', NULL, NULL),
(13, 220, 'Dernier Prix A Casa', 100, 24, 1, '2023-12-04 16:54:34.213249', NULL, NULL),
(14, 200, 'Pas plus', 100, 24, 0, '2023-12-04 16:55:14.941847', NULL, NULL),
(15, 300, 'null', 100, 24, 0, '2023-12-04 18:56:13.380230', NULL, NULL),
(16, 220, 'null', 100, 17, 1, '2023-12-04 19:33:24.576509', NULL, NULL),
(17, 220, 'null', 100, 17, 1, '2023-12-04 19:33:58.267824', NULL, NULL),
(18, 220, 'null', 100, 17, 1, '2023-12-04 19:34:27.633095', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `log_journal`
--

DROP TABLE IF EXISTS `log_journal`;
CREATE TABLE IF NOT EXISTS `log_journal` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NameController` longtext NOT NULL,
  `NameFonction` longtext NOT NULL,
  `DescriptionMessage` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `log_journal`
--

INSERT INTO `log_journal` (`Id`, `NameController`, `NameFonction`, `DescriptionMessage`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '/api/v1/Agences/Villes/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 02:14:11.430310', NULL, NULL),
(2, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 02:14:11.476471', NULL, NULL),
(3, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 02:14:11.408420', NULL, NULL),
(4, '/api/v1/Marques/', 'GET', 'An exception has been raised that is likely due to a transient failure. Consider enabling transient error resiliency by adding \'EnableRetryOnFailure()\' to the \'UseMySql\' call.', '2023-11-27 02:14:11.688544', NULL, NULL),
(5, '/api/v1/Agences/Partenaires/', 'GET', 'Timeout en lecture des paquets reçus', '2023-11-27 02:34:13.462301', NULL, NULL),
(6, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 02:34:13.120534', NULL, NULL),
(7, '/api/v1/Agences/Villes/', 'GET', 'Timeout en lecture des paquets reçus', '2023-11-27 02:34:13.473348', NULL, NULL),
(8, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 02:34:13.094733', NULL, NULL),
(9, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:14:38.610898', NULL, NULL),
(10, '/api/v1/Agences/Villes/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:14:38.681451', NULL, NULL),
(11, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:14:38.484651', NULL, NULL),
(12, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:24:15.545804', NULL, NULL),
(13, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:24:15.545785', NULL, NULL),
(14, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-27 16:24:15.584773', NULL, NULL),
(15, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-27 16:38:29.289954', NULL, NULL),
(16, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-27 17:21:12.759786', NULL, NULL),
(17, '/api/v1/Agences/Villes/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-28 14:49:53.509740', NULL, NULL),
(18, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-28 14:49:53.509711', NULL, NULL),
(19, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-28 16:04:30.198967', NULL, NULL),
(20, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-28 16:08:30.546642', NULL, NULL),
(21, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-28 17:04:51.904611', NULL, NULL),
(22, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-28 17:05:46.781656', NULL, NULL),
(23, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-28 17:07:21.229326', NULL, NULL),
(24, '/api/v1/Agences/Villes/', 'GET', 'Operations that change non-concurrent collections must have exclusive access. A concurrent update was performed on this collection and corrupted its state. The collection\'s state is no longer correct.', '2023-11-28 21:10:43.111887', NULL, NULL),
(25, '/api/v1/clients/login/', 'POST', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 00:54:02.587713', NULL, NULL),
(26, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 01:36:30.978283', NULL, NULL),
(27, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:08:29.169176', NULL, NULL),
(28, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:09:56.457439', NULL, NULL),
(29, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:12:44.970591', NULL, NULL),
(30, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:13:33.542435', NULL, NULL),
(31, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:14:07.234840', NULL, NULL),
(32, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:20:49.236336', NULL, NULL),
(33, '/api/v1/LongTermRentals/maReservation', 'GET', 'Sequence contains no elements.', '2023-11-29 02:22:38.627602', NULL, NULL),
(34, '/api/v1/Agences/Villes/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 02:50:04.261744', NULL, NULL),
(35, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 02:50:04.262117', NULL, NULL),
(36, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 02:50:04.261686', NULL, NULL),
(37, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.361162', NULL, NULL),
(38, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.548142', NULL, NULL),
(39, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.298652', NULL, NULL),
(40, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.361584', NULL, NULL),
(41, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.190400', NULL, NULL),
(42, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.581845', NULL, NULL),
(43, '/api/v1/Agences/Villes/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:13:23.622759', NULL, NULL),
(44, '/api/v1/Agences/Villes/', 'GET', 'Timeout en lecture des paquets reçus', '2023-11-29 15:19:15.822235', NULL, NULL),
(45, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:19:14.843333', NULL, NULL),
(46, '/api/v1/Marques/', 'GET', 'Timeout en lecture des paquets reçus', '2023-11-29 15:19:15.822661', NULL, NULL),
(47, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 15:19:14.999705', NULL, NULL),
(48, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 17:25:30.132782', NULL, NULL),
(49, '/api/v1/Vehicules/reserved/10', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-11-29 17:25:29.908728', NULL, NULL),
(50, '/api/v1/Agences/Villes/', 'GET', 'Timeout en lecture des paquets reçus', '2023-11-29 17:25:30.772316', NULL, NULL),
(51, '/api/v1/Marques/', 'GET', 'Operations that change non-concurrent collections must have exclusive access. A concurrent update was performed on this collection and corrupted its state. The collection\'s state is no longer correct.', '2023-11-29 17:25:30.057055', NULL, NULL),
(52, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 01:05:45.356690', NULL, NULL),
(53, '/api/v1/Agences/agences/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 01:05:45.383299', NULL, NULL),
(54, '/api/v1/Clients/infos', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 01:05:45.356700', NULL, NULL),
(55, '/api/v1/Clients/12', 'PUT', 'email deja existant', '2023-12-03 01:50:48.236218', NULL, NULL),
(56, '/api/v1/Clients/12', 'PUT', 'email deja existant', '2023-12-03 01:51:06.032070', NULL, NULL),
(57, '/api/v1/Clients/12', 'PUT', 'email deja existant', '2023-12-03 01:51:44.505458', NULL, NULL),
(58, '/api/v1/LongTermRentals/', 'POST', 'erreur lors de l\'envoi du mail', '2023-12-03 03:19:53.617979', NULL, NULL),
(59, '/api/v1/Agences/Partenaires/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.361536', NULL, NULL),
(60, '/api/v1/Marques/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.448484', NULL, NULL),
(61, '/api/v1/Agences/agences/', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.361773', NULL, NULL),
(62, '/api/v1/Clients/infos', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.362153', NULL, NULL),
(63, '/api/v1/Notification/6', 'PUT', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.486189', NULL, NULL),
(64, '/api/v1/Reservations/agence/100', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.305504', NULL, NULL),
(65, '/api/v1/Notification/8', 'PUT', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.485959', NULL, NULL),
(66, '/api/v1/Notification/100', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-03 03:35:20.363695', NULL, NULL),
(67, '/api/v1/LongTermRentals/', 'POST', 'erreur lors de l\'envoi du mail', '2023-12-03 18:07:48.207756', NULL, NULL),
(68, '/api/v1/LongTermRentals/', 'POST', 'erreur lors de l\'envoi du mail', '2023-12-03 18:10:27.536641', NULL, NULL),
(69, '/api/v1/Notification/100', 'GET', 'An item with the same key has already been added. Key: server=127.0.0.1;user id=root;database=automotive', '2023-12-05 16:36:25.006538', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `long_term_rentals`
--

DROP TABLE IF EXISTS `long_term_rentals`;
CREATE TABLE IF NOT EXISTS `long_term_rentals` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `prenom` longtext NOT NULL,
  `nom` longtext NOT NULL,
  `phone` longtext NOT NULL,
  `ville` longtext NOT NULL,
  `email` longtext NOT NULL,
  `zip` longtext NOT NULL,
  `entreprise` longtext NOT NULL,
  `duree` int NOT NULL,
  `description` longtext NOT NULL,
  `NumeroReservation` longtext NOT NULL,
  `status` longtext NOT NULL,
  `idAgence` int DEFAULT NULL,
  `IdModele` int NOT NULL,
  `Gearbox` longtext NOT NULL,
  `Moteur` longtext NOT NULL,
  `Prix` double NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_long_term_rentals_idAgence` (`idAgence`),
  KEY `IX_long_term_rentals_IdModele` (`IdModele`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `long_term_rentals`
--

INSERT INTO `long_term_rentals` (`Id`, `prenom`, `nom`, `phone`, `ville`, `email`, `zip`, `entreprise`, `duree`, `description`, `NumeroReservation`, `status`, `idAgence`, `IdModele`, `Gearbox`, `Moteur`, `Prix`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Lehner', 'Maeve', '1-630-505-3820', 'Wardview', 'RyanGosling@drive.com', '62645', 'VonRueden LLC', 18, 'Welch', 'hxxvbwwgza', 'Enattente', NULL, 172, 'Manuelle', 'Diesel', 370, '2023-02-16 00:31:42.691197', NULL, NULL),
(2, 'Stoltenberg', 'Kathryne', '(499) 248-1914', 'Pedroshire', 'RyanGosling@drive.com', '62741', 'Bergstrom, Kshlerin and Stamm', 25, 'Walker', 'mvhsrepeyd', 'Enattente', NULL, 237, 'Manuelle', 'Essence', 267, '2023-07-23 04:52:09.489725', NULL, NULL),
(3, 'Emard', 'David', '(521) 761-7000', 'Leonardoport', 'RyanGosling@drive.com', '59012-4257', 'Quigley, Lemke and Mosciski', 30, 'Dickinson', 'puplwisbhx', 'Enattente', NULL, 134, 'Manuelle', 'Électrique', 461, '2023-06-02 00:10:56.095634', NULL, NULL),
(4, 'Aufderhar', 'Arnulfo', '785-269-8198 x406', 'Lake Maeganfurt', 'RyanGosling@drive.com', '03228', 'Mraz Inc', 19, 'Auer', 'azmsgvrdbk', 'Enattente', NULL, 43, 'Automatique', 'Électrique', 461, '2023-06-26 12:55:14.288056', NULL, NULL),
(5, 'Lueilwitz', 'Celestino', '(483) 565-1472 x45051', 'West Jeanside', 'RyanGosling@drive.com', '46679', 'Schuppe, Gerlach and Mayert', 27, 'Barrows', 'pjdxndyhdh', 'Enattente', NULL, 178, 'Automatique', 'Électrique', 493, '2023-04-20 11:48:50.469736', NULL, NULL),
(6, 'Klocko', 'Leopold', '(917) 379-3884', 'Padbergberg', 'RyanGosling@drive.com', '94367', 'Miller LLC', 22, 'O\'Hara', 'uttuyrdozq', 'Enattente', NULL, 242, 'Manuelle', 'Électrique', 332, '2023-06-12 03:46:19.974965', NULL, NULL),
(7, 'Maggio', 'Candice', '912-539-2491', 'Port Vitafurt', 'RyanGosling@drive.com', '74172-8270', 'Veum, Emard and Boyle', 26, 'Bashirian', 'istguancud', 'Enattente', NULL, 313, 'Automatique', 'Essence', 253, '2022-12-04 11:39:21.421537', NULL, NULL),
(8, 'Crona', 'Eloisa', '(910) 259-7103 x086', 'New Enrico', 'RyanGosling@drive.com', '33905-8380', 'Spinka - Upton', 21, 'Balistreri', 'grcbyfhing', 'Enattente', NULL, 306, 'Automatique', 'Électrique', 348, '2023-07-28 02:12:35.159705', NULL, NULL),
(9, 'Mayer', 'Gianni', '1-496-342-3118 x6210', 'Lake Haleigh', 'RyanGosling@drive.com', '19885', 'Flatley - Conroy', 18, 'Abbott', 'ydigjjffja', 'Enattente', NULL, 206, 'Automatique', 'Hybride', 498, '2023-03-19 07:09:04.575630', NULL, NULL),
(10, 'Kutch', 'Bernardo', '674.313.0002', 'East Elwin', 'RyanGosling@drive.com', '96731-0554', 'Corwin Group', 20, 'Hermann', 'zymvqsacof', 'Enattente', NULL, 302, 'Manuelle', 'Hybride', 211, '2023-06-29 20:09:39.445855', NULL, NULL),
(11, 'Chakir', 'Aymen', '0619218811', 'Rabat', 'AymenCh@gmail.com', '10000', 'OCP', 19, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.', '08-8d58-2c52', 'Enattente', NULL, 15, 'Automatique', 'Diesel', 0, '2023-11-28 16:03:23.939449', NULL, NULL),
(12, 'Aya', 'DOUMA', '0771430563', 'Khouribga', 'aya10douma@gmail.com', '25000', 'SILIAD', 20, 'hahahahahaha', '22-aa01-6ea5', 'Confirmé', 111, 2, 'Automatique', 'Électrique', 7500, '2023-12-01 17:31:11.136430', '2023-12-01 17:37:20.101187', NULL),
(13, 'SOUFIANE', 'testeur', '+212656039763', 'Agadir', 'atlas@gmail.com', '20222', 'EMSI', 20, 'DESCRIPTION', '69-fac1-fd96', 'Confirmé', 100, 14, 'Manuelle', 'Diesel', 6600, '2023-12-03 03:19:30.601566', '2023-12-03 19:14:37.305444', NULL),
(14, 'Amjad', 'Chokairi', '0786121234', 'Casablanca', 'aniba.soufiane.2001@gmail.com', '10000', 'ESEM', 20, 'DESCRIPTION', '79-bd7b-fde5', 'Enattente', NULL, 63, 'Automatique', 'Hybride', 0, '2023-12-03 18:07:24.834226', NULL, NULL),
(15, 'Amjad', 'Chokairi', '0786121234', 'Casablanca', 'aniba.soufiane.2001@gmail.com', '10000', 'ENSI', 20, 'TEST DESCRIPTIONNN', '13-adfb-9cfc', 'Enattente', NULL, 76, 'Automatique', 'Diesel', 0, '2023-12-03 18:10:04.423125', NULL, NULL),
(16, 'Amjad', 'Chokairi', '0786121234', 'Casablanca', 'aniba.soufiane.2001@gmail.com', '12222', 'EMSI', 21, 'Test Description En français', '38-f6de-9f88', 'Confirmé', 100, 79, 'Automatique', 'Essence', 6600, '2023-12-04 02:11:45.261515', '2023-12-04 02:45:22.128187', NULL),
(17, 'Ali', 'Moncef', '061214457', 'Fès', 'Alll@gmail.com', '1234', 'Oracle', 20, 'Description Description Description Description Description Description', '64-b0ad-af7a', 'Enattente', NULL, 5, 'Automatique', 'Diesel', 0, '2023-12-04 14:56:06.079623', NULL, NULL),
(18, 'Amjad', 'Moncef', '0613145522', 'Afourar', 'Alll@gmail.com', '1234', 'ABC', 20, 'Description', '51-1894-965f', 'Enattente', NULL, 14, 'Manuelle', 'Électrique', 0, '2023-12-04 14:59:06.545737', NULL, NULL),
(19, 'Amjad', 'Moncef', '0613145522', 'Meknès', 'Alll@gmail.com', '1234', 'ABC', 21, 'Des', '45-8bc9-a73c', 'Enattente', NULL, 15, 'Manuelle', 'Hybride', 0, '2023-12-04 15:01:12.962282', NULL, NULL),
(20, 'Ali', 'Moncef', '061214457', 'Agadir', 'Alll@gmail.com', '1234', 'Ese', 20, 'Description', '18-a3e2-d9e2', 'Enattente', NULL, 208, 'Automatique', 'Hybride', 0, '2023-12-04 15:05:04.691959', NULL, NULL),
(21, 'Amjad', 'Moncef', '0613145522', 'Agadir', 'Alll@gmail.com', '1234', 'Ems', 19, 'Des', '22-f04e-1a22', 'Enattente', NULL, 15, 'Manuelle', 'Hybride', 0, '2023-12-04 15:09:21.015729', NULL, NULL),
(22, 'Ali', 'Moncef', '061214457', 'Agadir', 'Alll@gmail.com', '1234', 'Eff', 19, 'SE', '14-1df9-6bb0', 'Enattente', NULL, 6, 'Automatique', 'Diesel', 0, '2023-12-04 15:10:37.764340', NULL, NULL),
(23, 'Amjad', 'Chokairi', '0786121234', 'Agdz', 'aniba.soufiane.2001@gmail.com', '23334', 'gjh', 20, 'AAA', '10-3242-0345', 'Enattente', NULL, 13, 'Manuelle', 'Hybride', 0, '2023-12-04 15:12:02.624223', NULL, NULL),
(24, 'Amjad', 'Moncef', '0613145522', 'Agadir', 'Alae@gmail.com', '1234', 'EE', 20, 'des\n', '08-2a02-6b09', 'Enattente', NULL, 13, 'Manuelle', 'Essence', 0, '2023-12-04 16:41:25.515979', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `marques`
--

DROP TABLE IF EXISTS `marques`;
CREATE TABLE IF NOT EXISTS `marques` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `marques`
--

INSERT INTO `marques` (`Id`, `Name`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'ABARTH', '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 'ALFA-ROMEO', '0001-01-01 00:00:00.000000', '2023-12-04 00:55:52.880486', NULL),
(3, 'ASTON-MARTIN', '0001-01-01 00:00:00.000000', NULL, NULL),
(4, 'AUDI', '0001-01-01 00:00:00.000000', NULL, NULL),
(5, 'BENTLEY', '0001-01-01 00:00:00.000000', NULL, NULL),
(6, 'BMW', '0001-01-01 00:00:00.000000', NULL, NULL),
(7, 'CHERY', '0001-01-01 00:00:00.000000', NULL, NULL),
(8, 'CITROEN', '0001-01-01 00:00:00.000000', NULL, NULL),
(9, 'CUPRA', '0001-01-01 00:00:00.000000', NULL, NULL),
(10, 'DACIA', '0001-01-01 00:00:00.000000', NULL, NULL),
(11, 'DFSK', '0001-01-01 00:00:00.000000', NULL, NULL),
(12, 'DS', '0001-01-01 00:00:00.000000', NULL, NULL),
(13, 'FERRARI', '0001-01-01 00:00:00.000000', NULL, NULL),
(14, 'FIAT', '0001-01-01 00:00:00.000000', NULL, NULL),
(15, 'FORD', '0001-01-01 00:00:00.000000', NULL, NULL),
(16, 'FOTON', '0001-01-01 00:00:00.000000', NULL, NULL),
(17, 'GAZ', '0001-01-01 00:00:00.000000', NULL, NULL),
(18, 'HONDA', '0001-01-01 00:00:00.000000', NULL, NULL),
(19, 'HYUNDAI', '0001-01-01 00:00:00.000000', NULL, NULL),
(20, 'ISUZU', '0001-01-01 00:00:00.000000', NULL, NULL),
(21, 'JAGUAR', '0001-01-01 00:00:00.000000', NULL, NULL),
(22, 'JEEP', '0001-01-01 00:00:00.000000', NULL, NULL),
(23, 'KIA', '0001-01-01 00:00:00.000000', NULL, NULL),
(24, 'LAND-ROVER', '0001-01-01 00:00:00.000000', NULL, NULL),
(25, 'LEXUS', '0001-01-01 00:00:00.000000', NULL, NULL),
(26, 'MAHINDRA', '0001-01-01 00:00:00.000000', NULL, NULL),
(27, 'MAZDA', '0001-01-01 00:00:00.000000', NULL, NULL),
(28, 'MERCEDES', '0001-01-01 00:00:00.000000', NULL, NULL),
(29, 'MG', '0001-01-01 00:00:00.000000', NULL, NULL),
(30, 'MINI', '0001-01-01 00:00:00.000000', NULL, NULL),
(31, 'MITSUBISHI', '0001-01-01 00:00:00.000000', NULL, NULL),
(32, 'NISSAN', '0001-01-01 00:00:00.000000', NULL, NULL),
(33, 'OPEL', '0001-01-01 00:00:00.000000', NULL, NULL),
(34, 'PEUGEOT', '0001-01-01 00:00:00.000000', NULL, NULL),
(35, 'PORSCHE', '0001-01-01 00:00:00.000000', NULL, NULL),
(36, 'RENAULT', '0001-01-01 00:00:00.000000', NULL, NULL),
(37, 'SEAT', '0001-01-01 00:00:00.000000', NULL, NULL),
(38, 'SERES', '0001-01-01 00:00:00.000000', NULL, NULL),
(39, 'SKODA', '0001-01-01 00:00:00.000000', NULL, NULL),
(40, 'SSANGYONG', '0001-01-01 00:00:00.000000', NULL, NULL),
(41, 'SUZUKI', '0001-01-01 00:00:00.000000', NULL, NULL),
(42, 'TATA', '0001-01-01 00:00:00.000000', NULL, NULL),
(43, 'TOYOTA', '0001-01-01 00:00:00.000000', NULL, NULL),
(44, 'VOLKSWAGEN', '0001-01-01 00:00:00.000000', NULL, NULL),
(45, 'VOLVO', '0001-01-01 00:00:00.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `modeles`
--

DROP TABLE IF EXISTS `modeles`;
CREATE TABLE IF NOT EXISTS `modeles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `IdMarque` int NOT NULL,
  `Image` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Modeles_IdMarque` (`IdMarque`)
) ENGINE=MyISAM AUTO_INCREMENT=327 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `modeles`
--

INSERT INTO `modeles` (`Id`, `Name`, `IdMarque`, `Image`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '595', 1, 'modeles/595.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(2, '595 cabriolet', 1, 'modeles/595-cabriolet.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(3, '4c', 2, 'modeles/4c.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(4, 'giulia', 2, 'modeles/giulia.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(5, 'giulietta', 2, 'modeles/giulietta.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(6, 'stelvio', 2, 'modeles/stelvio.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(7, 'tonale', 2, 'modeles/tonale.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(8, 'db11', 3, 'modeles/db11.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(9, 'dbs supperleggera', 3, 'modeles/dbs-supperleggera.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(10, 'dbx', 3, 'modeles/dbx.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(11, 'vantage', 3, 'modeles/vantage.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(12, 'a1', 4, 'modeles/a1.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(13, 'a3', 4, 'modeles/a3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(14, 'a3 berline', 4, 'modeles/a3-berline.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(15, 'a4', 4, 'modeles/a4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(16, 'a5 coupe', 4, 'modeles/a5-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(17, 'a5 SPORTBACK', 4, 'modeles/a5-sportback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(18, 'a6', 4, 'modeles/a6.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(19, 'a7', 4, 'modeles/a7.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(20, 'a8', 4, 'modeles/a8.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(21, 'e-tron', 4, 'modeles/e-tron.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(22, 'e-tron sportback', 4, 'modeles/e-tron-sportback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(23, 'q2', 4, 'modeles/q2.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(24, 'q3', 4, 'modeles/q3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(25, 'q3 sportback', 4, 'modeles/q3-sportback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(26, 'q5', 4, 'modeles/q5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(27, 'q5 sportback', 4, 'modeles/q5-sportback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(28, 'q7', 4, 'modeles/q7.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(29, 'q8', 4, 'modeles/q8.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(30, 'r8', 4, 'modeles/r8.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(31, 'tt', 4, 'modeles/tt.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(32, 'bentayga', 5, 'modeles/bentayga.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(33, 'flying spur', 5, 'modeles/flying-spur.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(34, 'mulsanne', 5, 'modeles/mulsanne.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(35, 'i4', 6, 'modeles/i4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(36, 'ix', 6, 'modeles/ix.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(37, 'm2', 6, 'modeles/m2.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(38, 'm5', 6, 'modeles/m5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(39, 'serie', 6, 'modeles/serie-1.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(40, 'serie', 6, 'modeles/serie-2.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(41, 'serie gran coupe', 6, 'modeles/serie-2-gran-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(42, 'serie', 6, 'modeles/serie-3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(43, 'serie cabriolet', 6, 'modeles/serie-4-cabriolet.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(44, 'serie gran coupe', 6, 'modeles/serie-4-gran-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(45, 'serie', 6, 'modeles/serie-5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(46, 'serie', 6, 'modeles/serie-7.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(47, 'serie', 6, 'modeles/serie-8.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(48, 'serie cabriolet', 6, 'modeles/serie-8-cabriolet.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(49, 'serie gran coupe', 6, 'modeles/serie-8-gran-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(50, 'x1', 6, 'modeles/x1.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(51, 'x2', 6, 'modeles/x2.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(52, 'x3', 6, 'modeles/x3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(53, 'x4', 6, 'modeles/x4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(54, 'x5', 6, 'modeles/x5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(55, 'x6', 6, 'modeles/x6.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(56, 'x7', 6, 'modeles/x7.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(57, 'z4', 6, 'modeles/z4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(58, 'tiggo pro', 7, 'modeles/tiggo-2-pro.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(59, 'tiggo pro', 7, 'modeles/tiggo-4-pro.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(60, 'tiggo pro', 7, 'modeles/tiggo-7-pro.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(61, 'tiggo pro', 7, 'modeles/tiggo-8-pro.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(62, 'ami', 8, 'modeles/ami.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(63, 'berlingo', 8, 'modeles/berlingo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(64, 'berlingo vu', 8, 'modeles/berlingo-vu.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(65, 'c-elysee', 8, 'modeles/c-elysee.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(66, 'c1', 8, 'modeles/c1.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(67, 'c3', 8, 'modeles/c3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(68, 'c3 aircross', 8, 'modeles/c3-aircross.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(69, 'c4', 8, 'modeles/c4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(70, 'c4 x', 8, 'modeles/c4-x.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(71, 'c5 aircross', 8, 'modeles/c5-aircross.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(72, 'jumper', 8, 'modeles/jumper.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(73, 'jumpy', 8, 'modeles/jumpy.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(74, 'nemo', 8, 'modeles/nemo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(75, 'spacetourer', 8, 'modeles/spacetourer.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(76, 'formentor', 9, 'modeles/formentor.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(77, 'duster', 10, 'modeles/duster.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(78, 'lodgy', 10, 'modeles/lodgy.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(79, 'logan', 10, 'modeles/logan.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(80, 'sandero stepway', 10, 'modeles/sandero-stepway.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(81, 'sandero streetway', 10, 'modeles/sandero-streetway.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(82, 'spring', 10, 'modeles/spring.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(83, 'c31', 11, 'modeles/c31.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(84, 'c35', 11, 'modeles/c35.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(85, 'glory00', 11, 'modeles/glory-500.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(86, 'glory80', 11, 'modeles/glory-580.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(87, 'glory ix5', 11, 'modeles/glory-ix5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(88, 'k01h', 11, 'modeles/k01h.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(89, 'k01l', 11, 'modeles/k01l.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(90, 'k01s', 11, 'modeles/k01s.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(91, 'k05', 11, 'modeles/k05.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(92, 'super cab', 11, 'modeles/super-cab.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(93, 'ds4', 12, 'modeles/ds4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(94, 'ds7', 12, 'modeles/ds7.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(95, '812 superfast', 13, 'modeles/812-superfast.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(96, 'gtc4lusso', 13, 'modeles/gtc4lusso.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(97, '500', 14, 'modeles/500.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(98, '500c', 14, 'modeles/500c.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(99, '500x', 14, 'modeles/500x.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(100, 'doblo', 14, 'modeles/doblo.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(101, 'fiorino', 14, 'modeles/fiorino.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(102, 'fullback', 14, 'modeles/fullback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(103, 'panda', 14, 'modeles/panda.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(104, 'talento', 14, 'modeles/talento.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(105, 'tipo', 14, 'modeles/tipo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(106, 'tipo hatchback', 14, 'modeles/tipo-hatchback.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(107, 'c max', 15, 'modeles/c-max.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(108, 'ecosport', 15, 'modeles/ecosport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(109, 'explorer', 15, 'modeles/explorer.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(110, 'focusP', 15, 'modeles/focus-4p.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(111, 'focusp', 15, 'modeles/focus-5p.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(112, 'fusion', 15, 'modeles/fusion.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(113, 'kuga', 15, 'modeles/kuga.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(114, 'mustang', 15, 'modeles/mustang.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(115, 'ranger', 15, 'modeles/ranger.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(116, 'tourneo connect', 15, 'modeles/tourneo-connect.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(117, 'transit', 15, 'modeles/transit.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(118, 'transit custom', 15, 'modeles/transit-custom.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(119, 'tm', 16, 'modeles/tm.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(120, 'next', 17, 'modeles/next.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(121, 'next van', 17, 'modeles/next-van.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(122, 'accord', 18, 'modeles/accord.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(123, 'civic', 18, 'modeles/civic.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(124, 'cr-v', 18, 'modeles/cr-v.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(125, 'hr-v', 18, 'modeles/hr-v.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(126, 'jazz', 18, 'modeles/jazz.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(127, 'accent', 19, 'modeles/accent.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(128, 'creta', 19, 'modeles/creta.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(129, 'elantra', 19, 'modeles/elantra.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(130, 'i10', 19, 'modeles/i10.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(131, 'i20', 19, 'modeles/i20.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(132, 'i30', 19, 'modeles/i30.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(133, 'ioniq', 19, 'modeles/ioniq-5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(134, 'kona', 19, 'modeles/kona.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(135, 'santa fe', 19, 'modeles/santa-fe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(136, 'sonata', 19, 'modeles/sonata.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(137, 'tucson', 19, 'modeles/tucson.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(138, 'd-max', 20, 'modeles/d-max.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(139, 'e-pace', 21, 'modeles/e-pace.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(140, 'f-pace', 21, 'modeles/f-pace.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(141, 'F-TYPE', 21, 'modeles/f-type.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(142, 'i-pace', 21, 'modeles/i-pace.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(143, 'xe', 21, 'modeles/xe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(144, 'xf', 21, 'modeles/xf.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(145, 'xj', 21, 'modeles/xj.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(146, 'cherokee', 22, 'modeles/cherokee.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(147, 'compass', 22, 'modeles/compass.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(148, 'grand cherokee', 22, 'modeles/grand-cherokee.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(149, 'renegade', 22, 'modeles/renegade.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(150, 'wrangler', 22, 'modeles/wrangler.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(151, 'carens', 23, 'modeles/carens.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(152, 'carnival', 23, 'modeles/carnival.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(153, 'ceed', 23, 'modeles/ceed.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(154, 'cerato', 23, 'modeles/cerato.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(155, 'k2500', 23, 'modeles/k2500.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(156, 'k5', 23, 'modeles/k5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(157, 'niro', 23, 'modeles/niro.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(158, 'picanto', 23, 'modeles/picanto.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(159, 'rio', 23, 'modeles/rio.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(160, 'seltos', 23, 'modeles/seltos.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(161, 'sonet', 23, 'modeles/sonet.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(162, 'sorento', 23, 'modeles/sorento.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(163, 'sorento hybrid', 23, 'modeles/sorento-hybrid.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(164, 'sportage', 23, 'modeles/sportage.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(165, 'sportage hybrid', 23, 'modeles/sportage-hybrid.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(166, 'stinger', 23, 'modeles/stinger.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(167, 'defender', 24, 'modeles/defender.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(168, 'discovery', 24, 'modeles/discovery.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(169, 'discovery sport', 24, 'modeles/discovery-sport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(170, 'range rover evoque', 24, 'modeles/range-rover-evoque.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(171, 'range rover sport', 24, 'modeles/range-rover-sport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(172, 'range rover velar', 24, 'modeles/range-rover-velar.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(173, 'range rover vogue', 24, 'modeles/range-rover-vogue.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(174, 'es', 25, 'modeles/es.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(175, 'is', 25, 'modeles/is.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(176, 'ls', 25, 'modeles/ls.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(177, 'nx', 25, 'modeles/nx.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(178, 'rx', 25, 'modeles/rx.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(179, 'rx50h', 25, 'modeles/rx-350h.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(180, 'ux', 25, 'modeles/ux.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(181, 'kuv00', 26, 'modeles/kuv-100.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(182, 'scorpio', 26, 'modeles/scorpio.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(183, 'xuv00', 26, 'modeles/xuv-500.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(184, '6', 27, 'modeles/6.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(185, 'cx-3', 27, 'modeles/cx-3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(186, 'cx-5', 27, 'modeles/cx-5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(187, 'cla', 28, 'modeles/cla.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(188, 'classe a', 28, 'modeles/classe-a.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(189, 'classe a berline', 28, 'modeles/classe-a-berline.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(190, 'classe b', 28, 'modeles/classe-b.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(191, 'classe c', 28, 'modeles/classe-c.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(192, 'Classe C Coupe', 28, 'modeles/classe-c-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(193, 'classe e', 28, 'modeles/classe-e.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(194, 'classe e coupe', 28, 'modeles/classe-e-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(195, 'classe g', 28, 'modeles/classe-g.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(196, 'classe s', 28, 'modeles/classe-s.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(197, 'cls', 28, 'modeles/cls.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(198, 'gla', 28, 'modeles/gla.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(199, 'glc', 28, 'modeles/glc.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(200, 'glc coupe', 28, 'modeles/glc-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(201, 'gle', 28, 'modeles/gle.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(202, 'gle coupe', 28, 'modeles/gle-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(203, 'gls', 28, 'modeles/gls.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(204, 'slc', 28, 'modeles/slc.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(205, 'hs Phev', 29, 'modeles/hs-phev.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(206, 'MG', 29, 'modeles/mg-3.jpg', '0001-01-01 00:00:00.000000', NULL, NULL),
(207, 'MG HS', 29, 'modeles/mg-hs.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(208, 'mg4', 29, 'modeles/mg4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(209, 'mg5', 29, 'modeles/mg5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(210, 'zs', 29, 'modeles/zs.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(211, 'zs-ev', 29, 'modeles/zs-ev.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(212, 'cabrio', 30, 'modeles/cabrio.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(213, 'clubman', 30, 'modeles/clubman.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(214, 'countryman', 30, 'modeles/countryman.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(215, 'HATCH portes', 30, 'modeles/hatch-3-portes.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(216, 'HATCH portes', 30, 'modeles/hatch-5-portes.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(217, 'l200', 31, 'modeles/l200.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(218, 'outlander', 31, 'modeles/outlander.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(219, 'pajero sport', 31, 'modeles/pajero-sport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(220, 'evalia', 32, 'modeles/evalia.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(221, 'juke', 32, 'modeles/juke.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(222, 'micra', 32, 'modeles/micra.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(223, 'navara', 32, 'modeles/navara.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(224, 'qashqai', 32, 'modeles/qashqai.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(225, 'x trail', 32, 'modeles/x-trail.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(226, 'astra', 33, 'modeles/astra.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(227, 'combo life', 33, 'modeles/combo-life.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(228, 'corsa', 33, 'modeles/corsa.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(229, 'crossland', 33, 'modeles/crossland.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(230, 'grandland', 33, 'modeles/grandland.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(231, 'insignia Grand Sport', 33, 'modeles/insignia-grand-sport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(232, 'mokka', 33, 'modeles/mokka.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(233, '108', 34, 'modeles/108.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(234, '2008', 34, 'modeles/2008.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(235, '208', 34, 'modeles/208.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(236, '3008', 34, 'modeles/3008.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(237, '301', 34, 'modeles/301.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(238, '308', 34, 'modeles/308.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(239, '5008', 34, 'modeles/5008.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(240, '508', 34, 'modeles/508.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(241, 'bipper', 34, 'modeles/bipper.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(242, 'boxer', 34, 'modeles/boxer.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(243, 'expert', 34, 'modeles/expert.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(244, 'landtrek', 34, 'modeles/landtrek.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(245, 'partner', 34, 'modeles/partner.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(246, 'rifter', 34, 'modeles/rifter.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(247, 'traveller', 34, 'modeles/traveller.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(248, '718 boxster', 35, 'modeles/718-boxster.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(249, '718 cayman', 35, 'modeles/718-cayman.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(250, '911', 35, 'modeles/911.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(251, 'cayenne', 35, 'modeles/cayenne.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(252, 'cayenne coupe', 35, 'modeles/cayenne-coupe.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(253, 'macan', 35, 'modeles/macan.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(254, 'panamera', 35, 'modeles/panamera.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(255, 'taycan', 35, 'modeles/taycan.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(256, 'taycan cross turismo', 35, 'modeles/taycan-cross-turismo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(257, 'arkana', 36, 'modeles/arkana.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(258, 'captur', 36, 'modeles/captur.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(259, 'clio', 36, 'modeles/clio.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(260, 'express', 36, 'modeles/express.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(261, 'express van', 36, 'modeles/express-van.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(262, 'kadjar', 36, 'modeles/kadjar.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(263, 'kangoo', 36, 'modeles/kangoo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(264, 'koleos', 36, 'modeles/koleos.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(265, 'master', 36, 'modeles/master.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(266, 'megane', 36, 'modeles/megane.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(267, 'megane sedan', 36, 'modeles/megane-sedan.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(268, 'talisman', 36, 'modeles/talisman.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(269, 'trafic', 36, 'modeles/trafic.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(270, 'arona', 37, 'modeles/arona.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(271, 'ateca', 37, 'modeles/ateca.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(272, 'ibiza', 37, 'modeles/ibiza.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(273, 'leon', 37, 'modeles/leon.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(274, 'mii', 37, 'modeles/mii.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(275, 'tarraco', 37, 'modeles/tarraco.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(276, '3', 38, 'modeles/3.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(277, 'sf5', 38, 'modeles/sf5.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(278, 'karoq', 39, 'modeles/karoq.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(279, 'kodiaq', 39, 'modeles/kodiaq.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(280, 'octavia', 39, 'modeles/octavia.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(281, 'superb', 39, 'modeles/superb.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(282, 'korando', 40, 'modeles/korando.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(283, 'rexton', 40, 'modeles/rexton.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(284, 'stavic', 40, 'modeles/stavic.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(285, 'tivoli', 40, 'modeles/tivoli.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(286, 'xlv', 40, 'modeles/xlv.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(287, 'baleno', 41, 'modeles/baleno.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(288, 'ignis', 41, 'modeles/ignis.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(289, 'jimny', 41, 'modeles/jimny.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(290, 's-cross', 41, 'modeles/s-cross.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(291, 'swift', 41, 'modeles/swift.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(292, 'vitara', 41, 'modeles/vitara.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(293, 'super ace', 42, 'modeles/super-ace.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(294, 'xenon', 42, 'modeles/xenon.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(295, 'auris', 43, 'modeles/auris.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(296, 'c-hr', 43, 'modeles/c-hr.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(297, 'corolla prestige', 43, 'modeles/corolla-prestige.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(298, 'corolla sport', 43, 'modeles/corolla-sport.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(299, 'fortuner', 43, 'modeles/fortuner.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(300, 'hilux', 43, 'modeles/hilux.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(301, 'land cruiser', 43, 'modeles/land-cruiser.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(302, 'new corolla x air', 43, 'modeles/new-corolla-x-air.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(303, 'new rav4', 43, 'modeles/new-rav4.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(304, 'prado', 43, 'modeles/prado.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(305, 'prius', 43, 'modeles/prius.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(306, 'yaris', 43, 'modeles/yaris.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(307, 'yaris cross', 43, 'modeles/yaris-cross.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(308, 'amarok', 44, 'modeles/amarok.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(309, 'arteon', 44, 'modeles/arteon.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(310, 'caddy', 44, 'modeles/caddy.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(311, 'caravelle', 44, 'modeles/caravelle.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(312, 'coccinelle', 44, 'modeles/coccinelle.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(313, 'crafter', 44, 'modeles/crafter.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(314, 'golf', 44, 'modeles/golf-8.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(315, 'jetta', 44, 'modeles/jetta.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(316, 'passat', 44, 'modeles/passat.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(317, 'polo', 44, 'modeles/polo.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(318, 't-roc', 44, 'modeles/t-roc.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(319, 'tiguan', 44, 'modeles/tiguan.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(320, 'touareg', 44, 'modeles/touareg.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(321, 'touran', 44, 'modeles/touran.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(322, 's60', 45, 'modeles/s60.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(323, 's90', 45, 'modeles/s90.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(324, 'xc40', 45, 'modeles/xc40.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(325, 'xc60', 45, 'modeles/xc60.png', '0001-01-01 00:00:00.000000', NULL, NULL),
(326, 'xc90', 45, 'modeles/xc90.png', '0001-01-01 00:00:00.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ReservationId` int DEFAULT NULL,
  `LLDReservationId` int DEFAULT NULL,
  `Message` longtext NOT NULL,
  `IsRead` tinyint(1) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Notifications_LLDReservationId` (`LLDReservationId`),
  KEY `IX_Notifications_ReservationId` (`ReservationId`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`Id`, `ReservationId`, `LLDReservationId`, `Message`, `IsRead`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 11, NULL, 'Nouvelle Reservation', 0, '2023-11-27 15:18:12.941692', NULL, NULL),
(2, NULL, 11, 'Nouvelle Reservation Long Terme', 0, '2023-11-28 15:03:31.013327', NULL, NULL),
(3, 12, NULL, 'Nouvelle Reservation', 0, '2023-11-29 16:37:48.118510', NULL, NULL),
(4, NULL, 12, 'Nouvelle Reservation Long Terme', 0, '2023-12-01 16:31:13.717552', NULL, NULL),
(5, NULL, 12, 'Nouvelle Reservation Long Terme', 0, '2023-12-01 16:37:20.146698', NULL, NULL),
(6, 13, NULL, 'Nouvelle Reservation', 1, '2023-12-03 00:52:44.755680', '2023-12-04 00:45:44.908301', NULL),
(7, 14, NULL, 'Nouvelle Reservation', 1, '2023-12-03 00:54:22.675101', '2023-12-03 18:07:16.745368', NULL),
(8, 15, NULL, 'Nouvelle Reservation', 1, '2023-12-03 00:59:04.881979', '2023-12-04 00:35:54.477875', NULL),
(9, 16, NULL, 'Nouvelle Reservation', 1, '2023-12-03 01:02:01.448092', '2023-12-04 00:45:57.272865', NULL),
(10, NULL, 13, 'Nouvelle Reservation Long Terme', 1, '2023-12-03 03:42:57.642998', '2023-12-03 18:07:14.022651', NULL),
(11, 17, NULL, 'Nouvelle Reservation', 1, '2023-12-03 04:13:17.732279', '2023-12-04 18:00:05.073539', NULL),
(12, 18, NULL, 'Nouvelle Reservation', 0, '2023-12-03 04:19:48.324090', NULL, NULL),
(13, 19, NULL, 'Nouvelle Reservation', 0, '2023-12-03 04:21:40.908528', NULL, NULL),
(14, 20, NULL, 'Nouvelle Reservation', 1, '2023-12-03 16:00:55.271246', '2023-12-04 00:35:41.481428', NULL),
(15, 21, NULL, 'Nouvelle Reservation', 1, '2023-12-03 17:46:49.806876', '2023-12-04 00:35:51.933135', NULL),
(16, 22, NULL, 'Nouvelle Reservation', 0, '2023-12-03 17:57:34.632913', NULL, NULL),
(17, 23, NULL, 'Nouvelle Reservation', 1, '2023-12-04 00:34:32.842038', '2023-12-04 00:35:38.157415', NULL),
(18, 24, NULL, 'Nouvelle Reservation', 1, '2023-12-04 00:47:36.829723', '2023-12-04 00:47:44.788035', NULL),
(19, 25, NULL, 'Nouvelle Reservation', 1, '2023-12-04 00:56:07.380838', '2023-12-04 00:56:37.431824', NULL),
(20, 26, NULL, 'Nouvelle Reservation', 1, '2023-12-04 01:05:53.809449', '2023-12-04 01:06:35.401066', NULL),
(21, NULL, 16, 'Nouvelle Reservation Long Terme', 1, '2023-12-04 01:11:46.404845', '2023-12-04 13:37:18.459121', NULL),
(22, NULL, 16, 'Nouvelle Reservation Long Terme', 1, '2023-12-04 01:45:22.152810', '2023-12-04 18:00:12.228453', NULL),
(23, 27, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:36:45.647864', NULL, NULL),
(24, 28, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:39:34.897938', NULL, NULL),
(25, 29, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:41:57.600042', NULL, NULL),
(26, 30, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:42:50.504168', NULL, NULL),
(27, 31, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:44:38.675875', NULL, NULL),
(28, 32, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:45:47.939641', NULL, NULL),
(29, 33, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:48:03.096290', NULL, NULL),
(30, 34, NULL, 'Nouvelle Reservation', 0, '2023-12-04 13:49:44.111182', NULL, NULL),
(31, NULL, 17, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 13:56:07.281021', NULL, NULL),
(32, NULL, 18, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 13:59:07.727374', NULL, NULL),
(33, NULL, 19, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 14:01:14.360736', NULL, NULL),
(34, NULL, 20, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 14:05:06.041735', NULL, NULL),
(35, NULL, 21, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 14:09:22.823925', NULL, NULL),
(36, NULL, 22, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 14:10:38.780167', NULL, NULL),
(37, NULL, 23, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 14:12:03.874743', NULL, NULL),
(38, 35, NULL, 'Nouvelle Reservation', 0, '2023-12-04 14:14:34.908446', NULL, NULL),
(39, NULL, 24, 'Nouvelle Reservation Long Terme', 0, '2023-12-04 15:41:26.740316', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `offredetails`
--

DROP TABLE IF EXISTS `offredetails`;
CREATE TABLE IF NOT EXISTS `offredetails` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdOffre` int NOT NULL,
  `Titre` longtext NOT NULL,
  `Description` longtext NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_OffreDetails_IdOffre` (`IdOffre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `offres`
--

DROP TABLE IF EXISTS `offres`;
CREATE TABLE IF NOT EXISTS `offres` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdVehicule` int NOT NULL,
  `DateDebut` datetime(6) NOT NULL,
  `DateFin` datetime(6) NOT NULL,
  `Prix` double NOT NULL,
  `isPublic` tinyint(1) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Offres_IdVehicule` (`IdVehicule`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offres`
--

INSERT INTO `offres` (`Id`, `IdVehicule`, `DateDebut`, `DateFin`, `Prix`, `isPublic`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 3, '2023-08-31 21:43:51.917456', '2024-02-02 14:00:37.619188', 361, 0, '2023-08-30 22:52:43.366956', NULL, NULL),
(2, 7, '2023-08-31 23:31:59.796902', '2024-06-01 11:02:42.181468', 320, 0, '2023-08-31 07:42:34.273460', NULL, NULL),
(3, 3, '2023-08-31 18:48:01.229195', '2023-10-25 19:46:04.700940', 473, 0, '2023-08-30 16:02:18.162998', NULL, NULL),
(4, 7, '2023-09-01 10:23:17.187338', '2024-04-21 21:02:58.150252', 285, 1, '2023-08-31 00:12:56.386517', NULL, NULL),
(5, 3, '2023-08-31 20:03:55.462212', '2024-04-24 13:01:33.563349', 428, 1, '2023-08-31 04:58:24.314936', NULL, NULL),
(6, 6, '2023-08-31 17:57:05.348700', '2023-12-15 20:33:02.590874', 437, 1, '2023-08-31 08:36:36.452425', NULL, NULL),
(7, 1, '2023-08-31 19:46:31.247317', '2024-07-11 14:04:54.206734', 437, 0, '2023-08-30 19:57:20.375564', NULL, NULL),
(8, 7, '2023-08-31 19:30:12.463530', '2023-09-16 11:35:06.100748', 338, 0, '2023-08-31 06:44:04.364487', NULL, NULL),
(9, 4, '2023-09-01 04:38:49.210281', '2023-10-22 02:09:52.576399', 295, 1, '2023-08-30 18:32:33.739449', NULL, NULL),
(10, 10, '2023-09-01 01:13:00.414886', '2024-07-12 15:41:56.315822', 221, 1, '2023-08-31 09:00:58.779862', NULL, NULL),
(11, 11, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 350, 1, '2023-12-01 00:42:26.611447', '2023-12-04 01:50:10.727849', NULL),
(12, 12, '2023-11-30 23:43:49.000000', '2023-12-30 23:43:51.000000', 360, 1, '2023-12-01 00:44:10.861548', NULL, NULL),
(13, 13, '2023-11-30 23:47:43.000000', '2023-12-29 23:47:45.000000', 400, 1, '2023-12-01 00:47:50.608422', NULL, NULL),
(14, 13, '2023-11-30 23:49:40.000000', '2023-12-19 23:49:42.000000', 400, 1, '2023-12-01 00:49:46.758038', NULL, NULL),
(15, 12, '2023-12-03 18:13:56.000000', '2023-12-30 18:14:00.000000', 400, 1, '2023-12-03 19:14:04.147999', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `passwordresettokens`
--

DROP TABLE IF EXISTS `passwordresettokens`;
CREATE TABLE IF NOT EXISTS `passwordresettokens` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Token` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `ExpirationDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`Id`, `Name`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Journalisation', '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 'Utilisateurs', '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 'Roles', '0001-01-01 00:00:00.000000', NULL, NULL),
(4, 'Agences', '0001-01-01 00:00:00.000000', NULL, NULL),
(5, 'Permissions', '0001-01-01 00:00:00.000000', NULL, NULL),
(6, 'Marques', '0001-01-01 00:00:00.000000', NULL, NULL),
(7, 'Modèles', '0001-01-01 00:00:00.000000', NULL, NULL),
(8, 'Véhicules', '0001-01-01 00:00:00.000000', NULL, NULL),
(9, 'Réservations', '0001-01-01 00:00:00.000000', NULL, NULL),
(10, 'LLD', '0001-01-01 00:00:00.000000', NULL, NULL),
(11, 'Clients', '0001-01-01 00:00:00.000000', NULL, NULL),
(12, 'Offres', '0001-01-01 00:00:00.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `piecejointes`
--

DROP TABLE IF EXISTS `piecejointes`;
CREATE TABLE IF NOT EXISTS `piecejointes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FileName` longtext NOT NULL,
  `IdLLDReponse` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_PieceJointes_IdLLDReponse` (`IdLLDReponse`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `piecejointes`
--

INSERT INTO `piecejointes` (`Id`, `FileName`, `IdLLDReponse`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'PienceJointes/Agence\\b14a6147-a4ab-4419-84e0-e83d1de08ea9.svg', 5, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 'PienceJointes/Agence\\69f44321-ca2d-4830-bf00-4ab94ff11eb2.svg', 6, '0001-01-01 00:00:00.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DateDepart` datetime(6) NOT NULL,
  `DateRetour` datetime(6) NOT NULL,
  `IdVehicule` int NOT NULL,
  `NumeroReservation` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `MontantTotal` double NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Reservations_IdVehicule` (`IdVehicule`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`Id`, `DateDepart`, `DateRetour`, `IdVehicule`, `NumeroReservation`, `Status`, `MontantTotal`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '2023-08-31 20:57:07.956091', '2024-06-16 18:54:12.003917', 1, 'e205e20d-e5be-492c-840f-bca60528e781', 'Annulé', 0, '2023-08-30 17:16:12.726919', NULL, NULL),
(2, '2023-09-01 00:06:55.325827', '2024-03-30 03:22:58.583474', 3, '02f68ef6-3f28-47f1-9d92-aa22a839e7b4', 'Annulé', 0, '2023-08-30 22:44:42.700906', NULL, NULL),
(3, '2023-09-01 03:19:22.825767', '2024-05-30 02:52:35.323466', 7, 'ec93b9f7-fa14-4cfb-a098-7762a3448384', 'Annulé', 0, '2023-08-31 05:06:03.848563', NULL, NULL),
(4, '2023-09-01 00:14:22.988940', '2023-10-28 12:33:57.450729', 3, 'd8a8a085-4071-40ed-86c7-862f4ce7dcf0', 'Enattente', 0, '2023-08-30 19:22:50.784622', NULL, NULL),
(5, '2023-08-31 21:00:06.304423', '2023-10-23 17:44:56.001793', 3, 'fe5e4dbb-47e1-4c60-9092-bf3ebe807def', 'Annulé', 0, '2023-08-31 03:02:56.611947', NULL, NULL),
(6, '2023-09-01 00:23:16.082328', '2024-03-28 14:27:16.275550', 9, '8710042e-34ab-4b4c-a45b-0f6b995c9857', 'Confirmé', 0, '2023-08-31 04:19:54.150023', NULL, NULL),
(7, '2023-09-01 12:05:56.934928', '2023-12-20 13:35:31.426236', 6, '38d9f3bc-b208-48b2-a47b-b3e9a4358618', 'Enattente', 0, '2023-08-30 22:01:36.101086', NULL, NULL),
(8, '2023-09-01 09:46:06.114035', '2024-08-06 23:45:09.031789', 4, 'bea6d949-e602-40ab-95c6-2fcbe85ee43d', 'Confirmé', 0, '2023-08-31 08:58:04.050307', NULL, NULL),
(9, '2023-08-31 23:25:52.388155', '2024-02-13 09:34:21.155482', 2, '4bb405d5-6a40-44da-9ef6-c7ea2d481c69', 'Annulé', 0, '2023-08-30 17:15:42.259029', NULL, NULL),
(10, '2023-08-31 14:54:20.031002', '2024-08-16 09:57:47.491238', 9, 'd4d41d10-6a60-4369-a541-56b8f16a1473', 'Expiré', 0, '2023-08-30 17:08:36.899122', NULL, NULL),
(11, '2023-09-01 09:23:17.187000', '2024-04-21 20:02:58.150000', 7, '19-f19a-cd38', 'Enattente', 66531, '2023-11-27 16:18:06.383666', NULL, NULL),
(12, '2023-08-31 19:03:55.462000', '2024-04-24 12:01:33.563000', 3, '89-38a2-d378', 'Enattente', 101310, '2023-11-29 17:37:43.179219', NULL, NULL),
(13, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '98-92f5-5500', 'Confirmé', 0, '2023-12-03 01:52:36.996676', NULL, NULL),
(14, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '89-e19b-afec', 'Enattente', 9450, '2023-12-03 01:53:58.467361', NULL, NULL),
(15, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '78-3bb6-84c8', 'Enattente', 9450, '2023-12-03 01:58:36.135105', NULL, NULL),
(16, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '78-025f-1725', 'Enattente', 9450, '2023-12-03 02:02:00.071315', NULL, NULL),
(17, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '92-06ec-7759', 'Enattente', 9450, '2023-12-03 05:12:54.757508', NULL, NULL),
(18, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '39-52b6-1af9', 'Enattente', 9450, '2023-12-03 05:19:47.116093', NULL, NULL),
(19, '2023-11-30 22:42:16.000000', '2023-12-27 22:42:18.000000', 11, '24-57e7-82be', 'Enattente', 9450, '2023-12-03 05:21:18.184582', NULL, NULL),
(20, '2023-11-30 22:47:43.000000', '2023-12-29 22:47:45.000000', 13, '90-5adc-7c3c', 'Enattente', 11600, '2023-12-03 17:00:53.561533', NULL, NULL),
(21, '2023-11-30 22:43:49.000000', '2023-12-30 22:43:51.000000', 12, '96-f014-340c', 'Enattente', 10800, '2023-12-03 18:46:47.361794', NULL, NULL),
(22, '2023-08-31 19:03:55.462000', '2024-04-24 12:01:33.563000', 3, '75-aecd-568e', 'Enattente', 101310, '2023-12-03 18:57:13.189111', NULL, NULL),
(23, '2023-11-30 22:47:43.000000', '2023-12-29 22:47:45.000000', 13, '37-dd3f-807a', 'Enattente', 11600, '2023-12-04 01:34:29.198306', NULL, '2023-12-04 01:36:04.536728'),
(24, '2023-11-30 21:47:43.000000', '2023-12-29 21:47:45.000000', 13, '17-7b3e-bb82', 'Confirmé', 0, '2023-12-04 01:47:35.710909', NULL, NULL),
(25, '2023-11-30 22:47:43.000000', '2023-12-29 22:47:45.000000', 13, '95-6863-e4fe', 'Enattente', 11600, '2023-12-04 01:56:06.020732', NULL, NULL),
(26, '2023-11-30 21:43:49.000000', '2023-12-30 21:43:51.000000', 12, '04-f3fd-07d4', 'Confirmé', 0, '2023-12-04 02:05:32.116492', NULL, NULL),
(27, '2023-11-30 20:42:16.000000', '2023-12-27 20:42:18.000000', 11, '13-12fa-bb68', 'Confirmé', 0, '2023-12-04 14:36:44.002178', NULL, NULL),
(28, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '16-3ceb-44f4', 'Enattente', 9450, '2023-12-04 14:39:33.787333', NULL, NULL),
(29, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '81-4873-9759', 'Enattente', 9450, '2023-12-04 14:41:56.450590', NULL, NULL),
(30, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '39-e9c7-78ac', 'Enattente', 9450, '2023-12-04 14:42:49.308670', NULL, NULL),
(31, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '44-b777-9fcc', 'Enattente', 9450, '2023-12-04 14:44:37.589339', NULL, NULL),
(32, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '03-7b0c-93a5', 'Enattente', 9450, '2023-12-04 14:45:45.913588', NULL, NULL),
(33, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '73-505c-8fe7', 'Enattente', 9450, '2023-12-04 14:48:01.923878', NULL, NULL),
(34, '2023-11-30 21:42:16.000000', '2023-12-27 21:42:18.000000', 11, '95-e21e-c481', 'Enattente', 9450, '2023-12-04 14:49:40.983854', NULL, NULL),
(35, '2023-11-30 22:47:43.000000', '2023-12-29 22:47:45.000000', 13, '20-9a6c-acab', 'Enattente', 11600, '2023-12-04 15:14:33.618436', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `rolepermissions`
--

DROP TABLE IF EXISTS `rolepermissions`;
CREATE TABLE IF NOT EXISTS `rolepermissions` (
  `IdRole` int NOT NULL,
  `IdPermission` int NOT NULL,
  `Id` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`IdRole`,`IdPermission`),
  KEY `IX_RolePermissions_IdPermission` (`IdPermission`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rolepermissions`
--

INSERT INTO `rolepermissions` (`IdRole`, `IdPermission`, `Id`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 1, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 2, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 3, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 4, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 5, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 6, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(1, 7, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 2, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 3, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 5, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 8, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 9, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 10, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 11, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 12, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 8, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 9, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 12, 0, '0001-01-01 00:00:00.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `IdAgence` int DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Roles_IdAgence` (`IdAgence`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`Id`, `Name`, `IdAgence`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'SuperAdmin', NULL, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 'Admin', NULL, '0001-01-01 00:00:00.000000', NULL, NULL),
(3, 'New', 100, '2023-12-03 03:12:29.488429', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` longtext NOT NULL,
  `LastName` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `IdRole` int NOT NULL,
  `IdAgence` int DEFAULT NULL,
  `IsVerified` tinyint(1) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Users_IdAgence` (`IdAgence`),
  KEY `IX_Users_IdRole` (`IdRole`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Id`, `FirstName`, `LastName`, `Email`, `Password`, `IsActive`, `IdRole`, `IdAgence`, `IsVerified`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Super', 'Admin', 'superadmin@test.com', '$2a$11$qIMU5FYcl9pq1NX7s5aQuu7lFLrKcvqPWASaEXtggCqqRyN1b0LNy', 1, 1, NULL, 0, '0001-01-01 00:00:00.000000', NULL, NULL),
(2, 'Kiarra', 'Murray', 'Savannah.Leuschke79@yahoo.com', '$2a$11$5qaZ5UmN7thfO52Yy7Z5d.zGCJbsbfjjkFy1pypxPvCXglM9zCIfW', 0, 2, 8, 0, '2023-05-25 13:32:21.652262', NULL, NULL),
(3, 'Pierce', 'Senger', 'Alanna.Cummings41@hotmail.com', '$2a$11$TqUCx3tRjKjbHiwGY9GKs.3/ESuq7hejjX2uN9HLlQqu.D0cTH62G', 1, 2, 10, 0, '2023-03-27 14:33:25.460330', NULL, NULL),
(4, 'Waldo', 'Fay', 'Lew_Murphy27@yahoo.com', '$2a$11$26tHO8ZkMsuC4AqGijDreOTq.ZumwkmxW00nM2Uxv6zjRRhvt997a', 0, 1, 6, 0, '2023-08-12 08:15:49.240797', NULL, NULL),
(5, 'Kaden', 'Yost', 'Aric_Feest@gmail.com', '$2a$11$WDtRamD6VU4lfGkQd//59.HD2YolbyBtRYgbVMW9w5kkATk6Q7e06', 1, 1, 2, 0, '2023-01-18 21:21:37.787375', NULL, NULL),
(6, 'Brionna', 'Weimann', 'Amos_Tillman83@hotmail.com', '$2a$11$gMVAFD7yxAE6JsP8vC7SEOwJ4VE3bkPtwM9g8T/45tLZMIuhM/VB.', 1, 1, 1, 0, '2022-12-09 11:37:35.230379', NULL, NULL),
(7, 'Rashawn', 'Haag', 'Joelle.Marks22@yahoo.com', '$2a$11$OPCNzW9T/dCDfVmfdeXi/uaUJs8KEn9ntN4oC5gQYPQYOpRUyXrNy', 1, 1, 5, 0, '2022-10-08 01:55:36.626598', NULL, NULL),
(8, 'Lorna', 'Koch', 'Harold.Dicki76@yahoo.com', '$2a$11$t.RSATUFRmcHzS70W3QZZOvCZJUm/WhLeQQG7dm77PUtW2bOb8QDq', 1, 1, 5, 0, '2022-10-26 12:42:40.918683', NULL, NULL),
(9, 'Walter', 'Jenkins', 'Royal.Walter11@gmail.com', '$2a$11$JoOqENFwmv.vEaS3n888wOZR.E/NO/oYn6ouYxr9.jzLakCfnhDAm', 1, 1, 3, 0, '2022-11-10 21:28:31.244057', NULL, NULL),
(10, 'Deon', 'Hessel', 'Sigrid_Halvorson@hotmail.com', '$2a$11$jPtYBOIFQ5coWGcxsbno9eKcw1vIPMCoRxOnGOEOx29TZDmtG5JkS', 0, 2, 7, 0, '2023-05-01 06:05:35.299034', NULL, NULL),
(11, 'Jackie', 'Oberbrunner', 'Mozelle44@yahoo.com', '$2a$11$yEW7urvayFeet7QM8ngiZ.Oue3MaL0R7mb9Xk1wdPCRuL2bDm2H6G', 1, 2, 7, 0, '2023-04-18 13:16:45.307233', NULL, NULL),
(12, 'Hertz Associate', 'Hertz Associate', 'Hertz@yahoo.com', '$2a$11$MFmZlkOijlzZWJHe7fBCcuy8e0RLnk3K85iY4SHhdVK0aOEttwQRa', 1, 2, 101, 0, '2023-11-30 23:51:34.433545', NULL, NULL),
(20, 'Ali', 'Ali', 'Ali@gmail.com', '$2a$11$NP0QdiL8.i0l780kGSjpguLL92h0z1CeDAGOlG5WTttvdAYjcLDeW', 1, 2, 100, 1, '0001-01-01 00:00:00.000000', NULL, NULL),
(21, 'Aya DOUMA', 'Aya DOUMA', 'aya10douma@gmail.com', '$2a$11$0WZd5lq.6Owxb8qIiijGxOb/I5ba3TrpiEdIAE9GMtpj5X38V2Hqy', 1, 2, 111, 0, '2023-12-01 16:23:31.716218', NULL, NULL),
(22, 'Master Car', 'Master Car', 'Master@gmail.com', '$2a$11$//lkLH6IHlTfeeTpbA0L2OgEFuhuZzUgmuRjGaieMOSdgcryyZ2FG', 1, 3, 100, 0, '2023-12-03 03:11:44.221005', '2023-12-03 03:12:39.422654', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

DROP TABLE IF EXISTS `vehicules`;
CREATE TABLE IF NOT EXISTS `vehicules` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Matricule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Prix` double NOT NULL,
  `NbPort` int NOT NULL,
  `NbPassager` int NOT NULL,
  `Km` int NOT NULL,
  `Climat` tinyint(1) NOT NULL,
  `Airbag` tinyint(1) NOT NULL,
  `Gearbox` longtext NOT NULL,
  `Moteur` longtext NOT NULL,
  `IdAgence` int NOT NULL,
  `IdModele` int NOT NULL,
  `Type` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `DeletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Vehicules_IdAgence` (`IdAgence`),
  KEY `IX_Vehicules_IdModele` (`IdModele`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`Id`, `Matricule`, `Prix`, `NbPort`, `NbPassager`, `Km`, `Climat`, `Airbag`, `Gearbox`, `Moteur`, `IdAgence`, `IdModele`, `Type`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '\0\0kk', 482, 9, 9, 5549, 1, 0, 'Automatique', 'Électrique', 8, 236, 'Véhicule', '2023-04-23 08:34:37.906678', NULL, NULL),
(2, '\0\0rj', 439, 8, 2, 1823, 1, 1, 'Manuelle', 'Hybride', 10, 324, 'Utilitaire', '2022-12-01 12:39:08.528484', NULL, NULL),
(3, '\0\0em', 448, 1, 7, 6563, 0, 1, 'Manuelle', 'Diesel', 4, 201, 'Véhicule', '2023-06-01 13:30:00.778760', NULL, NULL),
(4, '\0\0wn', 268, 7, 2, 7575, 1, 1, 'Manuelle', 'Essence', 9, 158, 'Utilitaire', '2022-09-06 12:15:51.475798', NULL, NULL),
(5, '\0\0nl', 417, 1, 4, 1130, 1, 1, 'Manuelle', 'Essence', 7, 51, 'Utilitaire', '2023-01-28 18:20:02.294778', NULL, NULL),
(6, '\0\0ue', 415, 3, 6, 4395, 0, 1, 'Manuelle', 'Essence', 9, 220, 'Utilitaire', '2022-10-29 14:31:37.966961', NULL, NULL),
(7, '\0\0fa', 356, 5, 8, 3480, 1, 0, 'Automatique', 'Hybride', 3, 266, 'Véhicule', '2022-12-05 17:16:38.101227', NULL, NULL),
(8, '\0\0ts', 412, 6, 6, 3839, 0, 1, 'Automatique', 'Hybride', 6, 124, 'Véhicule', '2022-10-03 22:28:02.530081', NULL, NULL),
(9, '\0\0vq', 380, 7, 4, 9830, 0, 0, 'Automatique', 'Essence', 6, 65, 'Utilitaire', '2022-11-04 01:19:30.370091', NULL, NULL),
(10, '\0\0pg', 446, 1, 8, 641, 0, 1, 'Manuelle', 'Hybride', 5, 287, 'Véhicule', '2023-04-27 23:53:25.002522', NULL, NULL),
(11, '12121-ب-12', 300, 2, 4, 12000, 1, 1, 'Automatique', 'Diesel', 100, 1, 'Véhicule', '0001-01-01 00:00:00.000000', '2023-12-05 23:28:09.045070', NULL),
(12, 'ت - 12357', 280, 4, 4, 13000, 1, 1, 'Manuelle', 'Diesel', 100, 2, 'Véhicule', '2023-12-01 00:43:40.693242', NULL, NULL),
(13, 'ت - 6000', 250, 4, 4, 13000, 1, 1, 'Automatique', 'Diesel', 100, 5, 'Véhicule', '2023-12-01 00:46:45.514293', NULL, NULL),
(14, 'A-12355', 600, 4, 5, 600, 1, 1, 'Automatique', 'Diesel', 100, 6, 'Véhicule', '2023-12-01 00:47:27.067037', NULL, NULL),
(15, 'aaa', 250, 5, 5, 334, 0, 0, 'Automatique', 'Hybride', 111, 32, 'Véhicule', '0001-01-01 00:00:00.000000', '2023-12-01 17:08:00.700327', NULL),
(16, '12222-أ-1', 350, 4, 4, 120000, 1, 1, 'Automatique', 'Diesel', 100, 13, 'Utilitaire', '0001-01-01 00:00:00.000000', '2023-12-05 23:28:21.608227', NULL),
(17, 'ZZZ-123', 328, 4, 4, 30000, 0, 0, 'Automatique', 'Électrique', 100, 10, 'Véhicule', '2023-12-03 19:09:12.753968', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
CREATE TABLE IF NOT EXISTS `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20230831130312_last', '7.0.8');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
