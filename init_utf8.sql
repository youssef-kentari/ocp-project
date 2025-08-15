-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: ocp_database
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `engins`
--

DROP TABLE IF EXISTS `engins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `engins` (
  `engin_id` varchar(20) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `type_engin` varchar(50) DEFAULT NULL,
  `modele` varchar(50) DEFAULT NULL,
  `date_mise_en_service` date DEFAULT NULL,
  PRIMARY KEY (`engin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engins`
--

LOCK TABLES `engins` WRITE;
/*!40000 ALTER TABLE `engins` DISABLE KEYS */;
INSERT INTO `engins` VALUES ('14M_CAT','Niveleuse 14M CAT','Niveleuse','14M CAT',NULL),('730E','CAMION HAUL PACK 730E','Camion','730E','2025-08-14'),('992K','Chargeuse 992K','Chargeuse','992K',NULL),('994F','Chargeuse 994F','Chargeuse','994F',NULL),('ARROSEUR_CAT','01 Arroseur CAT','Arroseur','CAT',NULL),('D11T','Bull D11T','Bull','D11T',NULL),('D9R','Bull D9R','Bull','D9R',NULL),('KOMATSU','Niveleuse KOMATSU','Niveleuse','KOMATSU',NULL),('MT3300AC','CAMION UNIT RIG MT3300AC','Camion','MT3300AC',NULL),('MT3300DC','CAMION UNIT RIG MT3300DC','Camion','MT3300DC',NULL),('RAV_CAT','01 Camion Ravitaillement Gasoil CAT','Camion','CAT',NULL),('SONDEUSE_C27','01 Sondeuse CAT C27','Sondeuse','C27',NULL),('SONDEUSE_DKS','01 Sondeuse DKS','Sondeuse','DKS',NULL),('SONDEUSE_PV','01 Sondeuse PV','Sondeuse','PV',NULL),('SONDEUSE_QSK19','01 Sondeuse CUM QSK 19','Sondeuse','QSK 19',NULL),('VOLVO','01 Camion station Mobile VOLVO','Camion','VOLVO',NULL),('WD600','Paydozer KOMATSU WD600','Paydozer','WD600',NULL);
/*!40000 ALTER TABLE `engins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intervention` (
  `intervention_id` int NOT NULL AUTO_INCREMENT,
  `operation_id` int NOT NULL,
  `date_planifiee` date DEFAULT NULL,
  `date_livraison` date DEFAULT NULL,
  `statut` varchar(50) NOT NULL,
  `responsable` varchar(100) DEFAULT NULL,
  `type_intervention` varchar(50) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`intervention_id`),
  KEY `operation_id` (`operation_id`),
  KEY `responsable` (`responsable`),
  CONSTRAINT `intervention_ibfk_1` FOREIGN KEY (`operation_id`) REFERENCES `operation` (`operation_id`),
  CONSTRAINT `intervention_ibfk_2` FOREIGN KEY (`responsable`) REFERENCES `responsables` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intervention`
--

LOCK TABLES `intervention` WRITE;
/*!40000 ALTER TABLE `intervention` DISABLE KEYS */;
INSERT INTO `intervention` VALUES (1,39,'2024-01-20','2024-02-25','En cours','Youssef Ben','Corrective','Revision complete du moteur C32 WZH effectuee'),(2,40,'2024-03-15','2024-03-25','Termine','Karim Moussa','Preventive','Revision periodique moteur D9R'),(3,41,'2024-05-10','2024-05-20','Termine','Ali Hassan','Preventive','Revision moteur 994F selon planning'),(4,42,'2024-07-05',NULL,'Planifie','Samir Khalid','Preventive','Revision moteur 730E a programmer'),(5,43,'2024-09-01',NULL,'Planifie','Leila Ahmed','Preventive','Revision moteur 14M CAT prevue'),(6,44,'2024-11-15',NULL,'Planifie','Nadia Farid','Preventive','Revision moteur KOMATSU en attente'),(7,45,'2024-02-10','2024-02-15','Termine','Omar Rachid','Corrective','Pompe a eau D11T remplacee'),(8,46,'2024-04-20','2024-04-25','Termine','Hassan Ibrahim','Corrective','Remplacement pompe D9R suite a fuite'),(9,47,'2024-06-05',NULL,'En cours','Khalid Mahmoud','Corrective','Remplacement pompe 994F en cours'),(10,48,'2024-08-12',NULL,'Planifie','Yassin Mourad','Preventive','Remplacement preventif pompe 14M CAT'),(11,49,'2024-01-05','2024-01-10','Termine','Adil Karim','Corrective','Turbo D11T revise avec succes'),(12,50,'2024-10-20',NULL,'Planifie','Nabil Chafik','Controle','Controle technique moteur de roue'),(17,41,'2025-07-20',NULL,'En cours','Yassin Mourad','Corrective','test'),(32,39,'2025-08-09',NULL,'Planifie','Youssef Ben','Preventive','revision');
/*!40000 ALTER TABLE `intervention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operation`
--

DROP TABLE IF EXISTS `operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation` (
  `operation_id` int NOT NULL AUTO_INCREMENT,
  `sous_ensemble_id` int NOT NULL,
  `type_operation` varchar(50) NOT NULL,
  `description` text,
  `atelier` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`operation_id`),
  KEY `operation_ibfk_1` (`sous_ensemble_id`),
  CONSTRAINT `operation_ibfk_1` FOREIGN KEY (`sous_ensemble_id`) REFERENCES `sous_ensemble` (`sous_ensemble_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation`
--

LOCK TABLES `operation` WRITE;
/*!40000 ALTER TABLE `operation` DISABLE KEYS */;
INSERT INTO `operation` VALUES (39,1,'Revision complete','Revision complete du moteur thermique C32 WZH','Atelier moteurs'),(40,4,'Revision complete','Revision complete du moteur thermique D9R','Atelier moteurs'),(41,6,'Revision complete','Revision complete du moteur thermique 994F','Atelier moteurs'),(42,8,'Revision complete','Revision complete du moteur thermique 730E','Atelier moteurs'),(43,10,'Revision complete','Revision complete du moteur thermique 14M CAT','Atelier moteurs'),(44,12,'Revision complete','Revision complete du moteur thermique KOMATSU','Atelier moteurs'),(45,2,'Remplacement','Remplacement de la pompe a eau principale D11T','Atelier hydraulique'),(46,5,'Remplacement','Remplacement de la pompe a eau D9R','Atelier hydraulique'),(47,7,'Remplacement','Remplacement de la pompe a eau 994F','Atelier hydraulique'),(48,11,'Remplacement','Remplacement de la pompe a eau 14M CAT','Atelier hydraulique'),(49,3,'Revision','Revision du turbocompresseur D11T','Atelier moteurs'),(50,9,'Controle','Controle et maintenance du moteur de roues','Atelier electrique');
/*!40000 ALTER TABLE `operation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsables`
--

DROP TABLE IF EXISTS `responsables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsables` (
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`nom`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsables`
--

LOCK TABLES `responsables` WRITE;
/*!40000 ALTER TABLE `responsables` DISABLE KEYS */;
INSERT INTO `responsables` VALUES ('Adil Karim','adil.karim@example.com'),('Ali Hassan','ali.hassan@example.com'),('Hassan Ibrahim','hassan.ibrahim@example.com'),('Karim Moussa','karim.moussa@example.com'),('KENTARI','kentari.youssef@student.emi.ac.ma'),('kentari youssef','kentari@gmail.com'),('Khalid Mahmoud','khalid.mahmoud@example.com'),('Leila Ahmed','leila.ahmed@example.com'),('Nabil Chafik','nabil.chafik@example.com'),('Nadia Farid','nadia.farid@example.com'),('Omar Rachid','omar.rachid@example.com'),('Samir Khalid','samir.khalid@example.com'),('Yassin Mourad','yassin.mourad@example.com'),('Youssef Ben','youssefkentari56@gmail.com');
/*!40000 ALTER TABLE `responsables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_ensemble`
--

DROP TABLE IF EXISTS `sous_ensemble`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_ensemble` (
  `sous_ensemble_id` int NOT NULL AUTO_INCREMENT,
  `engin_id` varchar(20) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `type_sous_ensemble` varchar(50) DEFAULT NULL,
  `quantite_installee` int DEFAULT NULL,
  `sous_ensemble_relais_disponible` int DEFAULT NULL,
  `sous_ensemble_en_attente_revision` int DEFAULT NULL,
  `sous_ensemble_encours_revision` int DEFAULT NULL,
  `corps_sous_ensembles_disponibles` int DEFAULT NULL,
  `prix_sous_ensemble_neuf_DH` decimal(12,2) DEFAULT NULL,
  `duree_revision_jours` int DEFAULT NULL,
  `cout_revision_MAD` decimal(12,2) DEFAULT NULL,
  `heures_marche_cible` int DEFAULT NULL,
  `nombre_revisions_avant_reforme` int DEFAULT NULL,
  `fournisseur` varchar(100) DEFAULT NULL,
  `delai_livraison_apres_commande_jours` varchar(50) DEFAULT NULL,
  `mode_gestion_actuel` varchar(100) DEFAULT NULL,
  `besoin_global_annuel` int DEFAULT NULL,
  `heures_marche_actuel` int DEFAULT '0',
  `heures_marche_annee` int DEFAULT '500',
  PRIMARY KEY (`sous_ensemble_id`),
  KEY `engin_id` (`engin_id`),
  CONSTRAINT `sous_ensemble_ibfk_1` FOREIGN KEY (`engin_id`) REFERENCES `engins` (`engin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_ensemble`
--

LOCK TABLES `sous_ensemble` WRITE;
/*!40000 ALTER TABLE `sous_ensemble` DISABLE KEYS */;
INSERT INTO `sous_ensemble` VALUES (1,'D11T','Moteur thermique C32 WZH (AMA)','Moteur',4,1,0,0,1,3500000.00,45,1100000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',2,0,500),(2,'D11T','Pompe a Eau principale','Pompe',5,0,0,0,0,25000.00,2,15000.00,5000,2,'multiples','90 a 180','convention avec stock OCP',2,3332,500),(3,'D11T','Turbocompresseur','Turbo',10,0,0,0,0,50000.00,2,25000.00,5000,2,'multiples','90 a 180','convention avec stock OCP',2,1680,500),(4,'D9R','Moteur thermique','Moteur',6,0,0,2,1,1013867.80,30,280000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',3,3403,500),(5,'D9R','Pompe a Eau','Pompe',6,0,0,0,0,19000.00,2,5000.00,5000,2,'multiples','90 a 180','convention avec stock OCP',3,1974,500),(6,'994F','Moteur thermique','Moteur',2,0,1,0,0,8000000.00,60,2500000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',1,4662,500),(7,'994F','Pompe a Eau','Pompe',2,0,0,0,0,60000.00,3,8500.00,5000,2,'multiples','90 a 180','convention avec stock OCP',1,2386,500),(8,'730E','Moteur thermique','Moteur',3,1,0,0,0,6500000.00,60,2500000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',1,4660,500),(9,'730E','Moteur de roue','Moteur',5,0,1,0,0,40000.00,15,3500000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',1,2000,500),(10,'14M_CAT','Moteur Thermique','Moteur',2,0,0,0,0,480070.91,25,250000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',1,4029,500),(11,'14M_CAT','Pompe a Eau','Pompe',2,0,0,0,0,40000.00,2,40000.00,5000,2,'multiples','90 a 180','convention avec stock OCP',1,4678,500),(12,'WD600','Moteur Thermique','Moteur',2,0,0,0,0,1500000.00,25,350000.00,5000,3,'multiples','90 a 180','convention avec stock OCP',1,32,500),(13,'WD600','Pompe a Eau','Pompe',2,0,0,0,0,25000.00,3,8500.00,5000,2,'multiples','90 a 180','convention avec stock OCP',1,2890,500),(14,'992K','Moteur de roue','Pompe',2,0,0,0,0,0.00,0,0.00,5000,0,'','2','2',0,0,500);
/*!40000 ALTER TABLE `sous_ensemble` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-12 13:27:13
