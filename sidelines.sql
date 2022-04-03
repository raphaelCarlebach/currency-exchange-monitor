-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2022 at 05:02 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sidelines`
--

-- --------------------------------------------------------

--
-- Table structure for table `alerttbl`
--

CREATE TABLE `alerttbl` (
  `id` int(11) NOT NULL,
  `TimestampFld` datetime NOT NULL DEFAULT current_timestamp(),
  `CurrencySymbolFld` varchar(100) NOT NULL,
  `ValueToDateFld` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alerttbl`
--

INSERT INTO `alerttbl` (`id`, `TimestampFld`, `CurrencySymbolFld`, `ValueToDateFld`) VALUES
(99, '2022-04-03 00:00:00', 'ils', 3.20304),
(100, '2022-04-03 00:00:00', 'eur', 0.905104);

-- --------------------------------------------------------

--
-- Table structure for table `watchedcurrencytbl`
--

CREATE TABLE `watchedcurrencytbl` (
  `id` int(11) NOT NULL,
  `CurrencySymbolFld` varchar(100) NOT NULL,
  `ThresholdFld` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `watchedcurrencytbl`
--

INSERT INTO `watchedcurrencytbl` (`id`, `CurrencySymbolFld`, `ThresholdFld`) VALUES
(1, 'ils', 3.2),
(2, 'eur', 0.9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alerttbl`
--
ALTER TABLE `alerttbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `watchedcurrencytbl`
--
ALTER TABLE `watchedcurrencytbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CurrencySymbolFld_2` (`CurrencySymbolFld`),
  ADD KEY `CurrencySymbolFld` (`CurrencySymbolFld`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alerttbl`
--
ALTER TABLE `alerttbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `watchedcurrencytbl`
--
ALTER TABLE `watchedcurrencytbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
