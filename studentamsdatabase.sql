-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 19, 2025 at 10:01 PM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";




--
-- Database: `studentams`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(100) NOT NULL,
  `password` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



INSERT INTO `admin` (`id`, `password`) VALUES
('admin', '25d55ad283aa400af464c76d713c07ad');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `fullname` varchar(30) NOT NULL,
  `email` varchar(80) NOT NULL,
  `mobileno` varchar(20) NOT NULL,
  `matric` varchar(12) NOT NULL,
  `password` char(32) NOT NULL,
  `isActive` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`matric`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`fullname`, `email`, `mobileno`, `matric`, `password`, `isActive`) VALUES
('Raji Victor Oluwapelumi', 'vicolraj@gmail.com', '09124269869', 'PMT/22/1543', '25d55ad283aa400af464c76d713c07ad', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `vicolraj_gmail_com_activities`
--

CREATE TABLE IF NOT EXISTS `vicolraj_gmail_com_activities` (
  `activity` varchar(6) NOT NULL,
  `actiontime` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vicolraj_gmail_com_activities`
--

INSERT INTO `vicolraj_gmail_com_activities` (`activity`, `actiontime`) VALUES
('login', '2025-08-19 22:57:51'),
('logout', '2025-08-19 22:58:00'),
('login', '2025-08-19 22:58:18'),
('logout', '2025-08-19 22:59:22');
