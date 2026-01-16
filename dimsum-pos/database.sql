-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: dimsum_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(65,30) NOT NULL,
  `costPrice` decimal(65,30) NOT NULL,
  `stock` int NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Siomay Udang',NULL,5000.000000000000000000000000000000,3000.000000000000000000000000000000,93,'Kukus','https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/chicken-&-other-poultry-dishes/prawn---chicken-shumai-dimsum/Dimsum1260-700.jpg','2026-01-14 03:04:53.266','2026-01-14 04:05:53.616'),(2,'Lumpia Udang',NULL,5000.000000000000000000000000000000,3000.000000000000000000000000000000,91,'Kukus','https://assets.unileversolutions.com/recipes-v2/257921.jpg','2026-01-14 03:05:58.529','2026-01-14 03:36:26.084'),(3,'Wonton',NULL,70000.000000000000000000000000000000,5000.000000000000000000000000000000,284,'Rebus','https://image.idntimes.com/post/20230607/screenshot-20230607-201345-instagram-1a708b8c088a3abfb644ffa2549478aa.jpg','2026-01-14 03:07:03.116','2026-01-14 04:05:53.616'),(4,'Udang Keju',NULL,5000.000000000000000000000000000000,2000.000000000000000000000000000000,580,'Goreng','https://buckets.sasa.co.id/v1/AUTH_Assets/Assets/p/website/medias/page_medias/resep_udang_keju_gacoan.jpg','2026-01-14 03:14:20.704','2026-01-14 04:05:53.616');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalAmount` decimal(65,30) NOT NULL,
  `profit` decimal(65,30) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'COMPLETED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `customerName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'POS',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,85000.000000000000000000000000000000,72000.000000000000000000000000000000,'COMPLETED','2026-01-14 03:14:53.518',NULL,NULL,'POS'),(2,80000.000000000000000000000000000000,71000.000000000000000000000000000000,'COMPLETED','2026-01-14 03:33:24.785','a','2','DELIVERY'),(3,1055000.000000000000000000000000000000,919000.000000000000000000000000000000,'COMPLETED','2026-01-14 03:36:26.084','a','3','DELIVERY'),(4,80000.000000000000000000000000000000,70000.000000000000000000000000000000,'COMPLETED','2026-01-14 04:05:53.616','Alfian','0123123','DELIVERY');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionitem`
--

DROP TABLE IF EXISTS `transactionitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactionitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `priceAtTime` decimal(65,30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransactionItem_transactionId_fkey` (`transactionId`),
  KEY `TransactionItem_productId_fkey` (`productId`),
  CONSTRAINT `TransactionItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `TransactionItem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionitem`
--

LOCK TABLES `transactionitem` WRITE;
/*!40000 ALTER TABLE `transactionitem` DISABLE KEYS */;
INSERT INTO `transactionitem` VALUES (1,1,2,1,5000.000000000000000000000000000000),(2,1,3,1,70000.000000000000000000000000000000),(3,1,4,1,5000.000000000000000000000000000000),(4,1,1,1,5000.000000000000000000000000000000),(5,2,4,2,5000.000000000000000000000000000000),(6,2,3,1,70000.000000000000000000000000000000),(7,3,2,8,5000.000000000000000000000000000000),(8,3,4,16,5000.000000000000000000000000000000),(9,3,3,13,70000.000000000000000000000000000000),(10,3,1,5,5000.000000000000000000000000000000),(11,4,4,1,5000.000000000000000000000000000000),(12,4,3,1,70000.000000000000000000000000000000),(13,4,1,1,5000.000000000000000000000000000000);
/*!40000 ALTER TABLE `transactionitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-14 11:12:58
