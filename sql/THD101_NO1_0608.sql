/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - mydb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mydb`;

/*Table structure for table `APPOINTMENT` */

DROP TABLE IF EXISTS `APPOINTMENT`;

CREATE TABLE `APPOINTMENT` (
  `APP_ID` int NOT NULL AUTO_INCREMENT,
  `APPTIME` date DEFAULT NULL,
  `ROOMNO` int DEFAULT '0',
  `APPNO` int DEFAULT NULL,
  `MEMBER_ID` int DEFAULT NULL,
  `DOCTOR_ID` int DEFAULT NULL,
  `PET_ID` int DEFAULT NULL,
  `APP_TYPE_ID` int NOT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `PERIOD` int DEFAULT NULL,
  PRIMARY KEY (`APP_ID`),
  KEY `FK_APP_PET_ID_idx` (`PET_ID`),
  KEY `FK_APP_DRID_idx` (`DOCTOR_ID`),
  KEY `FK_APP_APPTYPE_idx` (`APP_TYPE_ID`),
  KEY `FK_APP_MEMBER_ID_idx` (`MEMBER_ID`),
  CONSTRAINT `FK_APP_APPTYPE` FOREIGN KEY (`APP_TYPE_ID`) REFERENCES `APPOINTMENT_TYPE` (`APP_TYPE_ID`),
  CONSTRAINT `FK_APP_DRID` FOREIGN KEY (`DOCTOR_ID`) REFERENCES `DOCTOR` (`DOCTOR_ID`),
  CONSTRAINT `FK_APP_MEMBER_ID` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`),
  CONSTRAINT `FK_APP_PET_ID` FOREIGN KEY (`PET_ID`) REFERENCES `PET` (`PET_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

/*Data for the table `APPOINTMENT` */

insert  into `APPOINTMENT`(`APP_ID`,`APPTIME`,`ROOMNO`,`APPNO`,`MEMBER_ID`,`DOCTOR_ID`,`PET_ID`,`APP_TYPE_ID`,`CREATE_DATE`,`PERIOD`) values 
(8,'2023-06-04',0,NULL,21,0,25,4,'2023-06-02 18:49:13',NULL),
(9,'2023-06-08',0,NULL,21,0,27,4,'2023-06-02 19:26:50',NULL),
(10,'2023-06-01',0,NULL,22,0,28,4,'2023-06-02 19:26:50',NULL),
(11,'2023-06-15',0,NULL,23,0,29,4,'2023-06-02 19:26:50',NULL),
(12,'2023-06-15',0,NULL,23,0,30,4,'2023-06-02 19:26:50',NULL),
(13,'2023-06-03',0,NULL,25,0,32,4,'2023-06-02 19:26:50',NULL),
(14,'2023-06-02',1,NULL,21,1,25,1,'2023-06-02 19:26:50',2),
(15,'2023-06-07',2,NULL,21,0,26,3,'2023-06-02 19:26:50',NULL),
(16,'2023-06-08',5,NULL,24,3,31,1,'2023-06-02 19:26:50',3),
(17,'2023-06-04',0,NULL,22,0,28,2,'2023-06-02 19:26:50',NULL),
(18,'2023-06-09',0,NULL,23,0,29,2,'2023-06-02 19:26:50',NULL);

/*Table structure for table `APPOINTMENT_TYPE` */

DROP TABLE IF EXISTS `APPOINTMENT_TYPE`;

CREATE TABLE `APPOINTMENT_TYPE` (
  `APP_TYPE_ID` int NOT NULL,
  `APPOINTMENT_TYPE_TITLE` varchar(45) DEFAULT NULL,
  `APPOINTMENT_TYPE_MARK` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`APP_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `APPOINTMENT_TYPE` */

insert  into `APPOINTMENT_TYPE`(`APP_TYPE_ID`,`APPOINTMENT_TYPE_TITLE`,`APPOINTMENT_TYPE_MARK`) values 
(1,'一般掛號','A'),
(2,'預防針','B'),
(3,'寵物溝通','C'),
(4,'住宿','D'),
(5,'寵物健檢','H'),
(6,'住宿','N');

/*Table structure for table `DELIVERY_METHOD` */

DROP TABLE IF EXISTS `DELIVERY_METHOD`;

CREATE TABLE `DELIVERY_METHOD` (
  `ID` int NOT NULL,
  `DELIVERY_METHOD` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `DELIVERY_METHOD` */

insert  into `DELIVERY_METHOD`(`ID`,`DELIVERY_METHOD`) values 
(1,'宅配'),
(2,'超商取貨');

/*Table structure for table `DELIVERY_STATE` */

DROP TABLE IF EXISTS `DELIVERY_STATE`;

CREATE TABLE `DELIVERY_STATE` (
  `DELIVERY_STATE_ID` int NOT NULL,
  `DELIVERY_STATE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`DELIVERY_STATE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `DELIVERY_STATE` */

insert  into `DELIVERY_STATE`(`DELIVERY_STATE_ID`,`DELIVERY_STATE`) values 
(1,'備貨中'),
(2,'發貨中'),
(3,'已發貨'),
(4,'已到達'),
(5,'已取貨'),
(6,'退貨中'),
(7,'已退貨');

/*Table structure for table `DOCTOR` */

DROP TABLE IF EXISTS `DOCTOR`;

CREATE TABLE `DOCTOR` (
  `DOCTOR_ID` int NOT NULL,
  `DRNAME` varchar(45) NOT NULL,
  `DRTITLE` varchar(45) DEFAULT 'DOCTOR',
  `DRSPECIALTY` varchar(45) DEFAULT NULL,
  `DRSENIORITY` varchar(45) DEFAULT NULL,
  `DREXPERIENCE` varchar(45) DEFAULT NULL,
  `ROOM_ID` int DEFAULT NULL,
  `HIREDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`DOCTOR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `DOCTOR` */

insert  into `DOCTOR`(`DOCTOR_ID`,`DRNAME`,`DRTITLE`,`DRSPECIALTY`,`DRSENIORITY`,`DREXPERIENCE`,`ROOM_ID`,`HIREDATE`) values 
(0,'','','','','',0,'0000-00-00 00:00:00'),
(1,'范植鑫','院長','貓科/犬科/心臟科/進階外科','35','北海道大學獸醫學院博士學位/東京大學獸醫學部碩士學位',2,'1998-04-02 00:00:00'),
(2,'羅婉瑜','寵物心理諮商師','寵物諮商，配合主人與寵物關係維護','15','學士美國米西西比大學心理學系碩士/日本找稻田大學動物臨床心理學系',2,'2008-12-27 00:00:00'),
(3,'汪玉婷','醫師','和動物單向溝通','1','波波大學獸醫系',1,'2022-02-22 00:00:00'),
(4,'林佳緯','醫師','動物瘟疫','8','波波大學獸醫系',3,'2015-08-03 00:00:00'),
(5,'詹宗豪','醫師','骨關節科/進階外科/貓科','30','臺灣大學獸醫學系學士/倫敦大學英國皇家獸醫外科學院學士/根特大學獸醫學院碩士博士',1,'2008-10-24 00:00:00'),
(6,'林育楣','醫師','預防科學/動物營養學','5','波波大學獸醫系',1,'2018-04-15 00:00:00'),
(7,'賴偉峰','醫師','動物傳染病','9','波波大學獸醫系',3,'2014-07-01 00:00:00');

/*Table structure for table `LATEST_NEWS` */

DROP TABLE IF EXISTS `LATEST_NEWS`;

CREATE TABLE `LATEST_NEWS` (
  `NEWS_ID` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(255) DEFAULT NULL,
  `CONTENT` longtext,
  `CREATE_DATE` datetime DEFAULT NULL,
  `IMG_SOURCE` varchar(255) DEFAULT NULL,
  `STATE` varchar(10) DEFAULT NULL,
  `INFOR_TYPE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`NEWS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

/*Data for the table `LATEST_NEWS` */

insert  into `LATEST_NEWS`(`NEWS_ID`,`TITLE`,`CONTENT`,`CREATE_DATE`,`IMG_SOURCE`,`STATE`,`INFOR_TYPE`) values 
(1,'COVID-19毛孩家長就診須知！保護你我不憂慮│全國動物醫院</h1>','<p>應新冠肺炎疫情影響，雖然近期疫情有較趨緩的趨勢，但為了持續提供毛孩友善且不間斷的醫療環境，仍請來院就診的毛孩\n        家長們共同遵守以下規範，讓我們營造一個可以安心就診且舒適的醫\n        院空間！</p>\n    <p>【特殊情境佩戴口罩】若有以下狀況，建議您佩帶口罩※有發\n        燒或呼吸道症狀者※年長者或免疫力低下者※無法適時保持適當社交距離，\n        保護您也保護院內所有獸醫師、獸醫助理與客服人員。院內空間每日皆定時消毒(酒\n        精/漂白水/紫外線)，敬請安心就診</p>','2023-06-02 21:16:42','./img/information/NEWS/NEWS_IMG_1.jpg','刊登','最新消息'),
(2,'台灣首間寵物共振診療中心！落腳波波動物醫院','<p>近年來，台灣寵物醫療愈來愈朝向精準化及整體性醫療。</p>\n    <p>2023 年四月，寵物生活研究室的范植鑫獸醫師與德國生物共振儀醫療系統 (BRT) 第一品牌 REGUME\n        的台灣獨家代理商─英捷環球有限公司DontCARE for Pets，針對台灣毛小孩常見棘手的病症，通力合作透過\n        BRT輔助醫療增加病症寵物的治癒力，並於2019年底完成了第一階段的治療研究。\n    </p>\n    <p>今年1月底在全國動物醫院台北總院設立全台灣第一個『寵物共振診療中心』。\n        院內設置專門中心，將生物共振儀醫療系統 (BRT) 這種非侵入性、無副作用的療程置入於寵物</p>','2023-06-02 21:16:42','./img/information/NEWS/NEWS_IMG_2.jpg','刊登','最新消息'),
(3,'春酒休診公告','<p>本院舉辦員工春酒餐敘,6/21休診半天</p>','2023-06-02 21:16:42','./img/information/NEWS/NEWS_IMG_3.jpg','刊登','最新消息'),
(4,'寵物健檢的重要性','<p>身為毛孩家長的你知道嗎？據家中犬貓死因統計，繼癌症之後，狗狗的心血管疾病，\n        貓咪的慢性腎病為前三名常見致死疾病。毛小孩不會說話，所以當他們不舒服時，我們無從得知，\n        唯有「定期的健康檢查」才能早點發現潛在疾病或慢性病的早期變化，讓醫療即時開始並延緩疾病的惡化。</p>\n    <p>健檢常發現的隱藏疾病：</p>\n    <ol>\n        <li>牙周病：由於大部分飼主無法輕易將毛孩的的嘴巴打開來檢查，因此口腔衛生及保健常是最容易被忽略的。若平時沒有讓毛孩養成刷牙的習慣，也沒有定期洗牙，隨著牙菌斑和牙結石的累積，牙齦會退縮、齒根暴露。通常到很嚴重時才出現臨床症狀導致延遲就醫、治療困難。\n        </li>\n        <li>傳染病：常見的傳染病有通過蚊子、壁蝨傳播的心絲蟲、艾利希體、焦蟲等體內寄生蟲，也有透過糞便、體液感染的貓瘟、皰疹、卡里西病毒等。第一次健康檢查或是家裡剛收編的新成員都建議進行血液寄生蟲或病毒的快篩檢測，確保身體狀況的同時也保護家裡其他的毛成員。\n        </li>\n        <li> 心臟病：貓的肥厚性心肌病是一種任何年齡都有可能發生的疾病，與品種和遺傳有關，所以很多品種貓都需要進行心超檢查診斷是否有此疾病。而狗狗的心血管疾病最常見的是心臟瓣膜退化，好發於小型犬，像是瑪爾濟斯犬、貴賓犬、臘腸犬及查理斯王小獵犬等等，且這種疾病的患病率會隨著年齡而顯著增加，有高達85%的13歲齡小型犬都有瓣膜病變的證據呢！從理學檢查，獸醫師可聽診判斷有無心雜音，若有需要可拍攝Ｘ光看整體心臟有無擴大，或是肺臟血管有無異常，更進一步可進行心臟超音波檢查，實際看心房心室的大小、瓣膜有無增厚、脫垂，並進行心臟病分級和後續治療計畫。心臟病早期沒有任何臨床症狀，當出現咳嗽、氣喘、呼吸困難時，可能已經進入心臟衰竭第三期了。\n        </li>\n        <li>慢性腎病：老年犬貓的腎臟會漸漸衰退，腎指數會緩緩上升成慢性腎病，在犬貓中是十分常見的。多數發展病程緩慢，沒有明顯臨床症狀，在家中飼主除了要觀察貓咪的精神食慾以外，喝水及尿量也是需要特別觀察的，建議7歲以上的貓咪每6個月進行一次體重、血壓及身體狀況評分(BCS)，看看貓咪有無因多渴多尿造成脫水，或是整體變削瘦，有些腎病貓咪也會出現高血壓的狀況，高血壓又會造成特定器官的傷害，包含腦、心、眼及腎臟。以及至少每年要進行一次血液學檢查、尿液分析及腎臟超音波追蹤。\n        </li>\n        <li>內分泌疾病：糖尿病、庫興氏症、甲狀腺低下或亢進等都是毛孩們常見的內分泌失調疾病。臨床症狀大部分會出現多渴、多尿、多吃的症狀，若發現或是懷疑自家毛孩有以上症狀建議儘早到醫院檢查！一旦確診，就需要長期服藥和定期追蹤來控制哦！\n        </li>\n        <li> 腫瘤：5歲以上的中老年犬貓罹患腫瘤的風險較高。體表的腫塊容易在觸摸時被發現，但在體內臟器的團塊無法觸摸且早期在日常生活中很難出現徵兆。因此健檢時除了一般的理學檢查、血液學檢查之外，影像學檢查也十分重要，及早發現腫瘤才能掌握治療黃金時機。\n        </li>\n    </ol>\n    <p>建議7歲以下的小型犬和貓咪應該每年進行一次健康檢查，7歲以上半年一次; 大型犬則建議6歲以下一年一次，6歲以上半年安排一次健康檢查。預防勝於治療，早期發現早期治療，避免毛小孩受疾病之苦。\n    </p>\n    <p>毛小孩不會說話，波波動物醫院陪你一起守護他/她們的健康</p>','2023-06-02 21:16:42','./img/information/HEALTH/HEALTH_IMG_1.jpg','刊登','衛教資訊'),
(5,'毛小孩的健康老年生活\",\"我家毛小孩幾歲算步入老年呢?','<p>事實上每個物種與品種間對於老年的定義皆有差異。但目前對於「老年」的共識，狗狗約6-7歲以上認為老年；\n        而貓咪則認為大於7-11歲為老年。毛小孩進入高齡後，或是已經患有其他疾病的毛小孩則更需要在日常生活當中多注意身體狀況，觀察有沒有症狀上的改變或是哪個部位有新出現的疼痛情況。當然，想要發現毛小孩身上隱藏的危機，完整的病史與身體檢查是無可替代的，健檢最主要的目的是希望藉由健檢的機會發現毛小孩身上隱藏的疾病，尤其是當疾病尚處在亞臨床期階段時常常難以發現，當發現異常時我們就有機會及早進行干預或治療。\n    <p>健康的毛小孩也可以藉由健檢的機會建立起個體健康時期的基準數值，並可與未來的檢查狀況做比較。健檢項目包含：基礎理學檢查、血液學檢查、傳染病檢查、影像學檢查。</p>\n    <h2>如果我家寶貝已經有慢性疾病，還需要健檢嗎?</h2>\n    <p>這個答案是一定的，首先，我們理解一下一般健檢對於老年毛小孩或是已經患有其他疾病的毛小孩更加重要，甚至在日常生活當中我們也須更注意毛孩的身體狀況。好比來說，在老年毛小孩發生惡性腫瘤的機會或是潛在已有慢性退化疾病的機會比起其他年齡層會高許多。可怕的是在疾病初期，往往難以被察覺，或是疾病進展的速度超出預期，因此固定六個月健檢一次是目前普遍較為建議的共識。\n    </p>\n    <p>健檢過程我們一樣會執行完整的理學檢查，並向您了解毛小孩過去詳細的疾病史\n        ，並會特別詢問有沒有症狀上的改變或是哪個部位有新出現疼痛情形。血液生化檢查部分除了基本肝臟與腎臟指數追蹤外，建議增加其他項目，如：電解質、鈣、磷以及酸鹼狀況。健檢結果出來後，我們會詳細解釋報告內容給您。會和您進行仔細地溝通，目的是知道毛小孩接下來需要注意的地方、可能遇到的問題、認識疾病及走向，透過對話理解毛孩父母對於治療的期待及照顧能力，最後統整這些資訊制定出合適的醫療計畫、追蹤計畫。\n    </p>\n\n    <p>毛小孩不會說話，波波動物醫院陪你一起守護他/她們的健康</p>','2023-06-02 21:16:42','./img/information/HEALTH/HEALTH_IMG_2.jpg','刊登','衛教資訊'),
(6,'[推薦]微電影：無家的孩子','<p>寶貝狗協會 用心發行無家的孩子</p>','2023-06-02 21:16:42','./img/information/LINK/LINK_IMG_1.jpg','刊登','相關連結'),
(7,'[講座推薦]台灣狗兒行為論壇','<p>台灣狗兒論壇(Dog Symposium)是由正向思維藝術狗兒行為諮商/訓練師Joeson(Polo拔)所策劃籌備，邀請來自世界各地的專家講師，帶給台灣及亞洲地區關於狗兒最新的資訊與研究，範圍將包括：大腦發展、狗兒認知、行為、營養、生理構造與活動、心智刺激、壓力、醫學...等。\n    </p>\n    <p>除了讓台灣及亞洲地區的資訊可以與世界同步接軌，也給予從事與狗兒相關行業的人，包括：訓練師、獸醫師、照護人員、狗兒保姆、美容師等，以及有興趣深入學習的狗兒家人，提供更豐富且全面性的學習資源。</p>','2023-06-02 21:16:42','./img/information/LINK/LINK_IMG_2.jpg','刊登','相關連結'),
(8,'嗨','<p>嗨</p>','2023-06-06 21:07:47','1933.433 - The Poet\'s Garden.jpg','刊登','最新消息'),
(9,'嗨','<p>嗨</p>','2023-06-06 21:05:40','1933.433 - The Poet\'s Garden.jpg','刊登','最新消息'),
(10,'嗨','<p>嗨</p>','2023-06-06 21:13:29','1933.433 - The Poet\'s Garden.jpg','刊登','最新消息'),
(11,'嗨','<p>嗨</p>','2023-06-06 21:15:52','1933.433 - The Poet\'s Garden.jpg','刊登','最新消息');

/*Table structure for table `MEDICAL_RECORDS` */

DROP TABLE IF EXISTS `MEDICAL_RECORDS`;

CREATE TABLE `MEDICAL_RECORDS` (
  `MR_ID` int NOT NULL AUTO_INCREMENT,
  `TYPE` int DEFAULT NULL,
  `PET_ID` int NOT NULL,
  `CREATEDATE` datetime NOT NULL,
  `MR_SYMPTOM` varchar(255) NOT NULL,
  `IMG_SOURCE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MR_ID`),
  KEY `FK_MR_PET_ID_idx` (`PET_ID`),
  CONSTRAINT `FK_MR_PET_ID` FOREIGN KEY (`PET_ID`) REFERENCES `PET` (`PET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `MEDICAL_RECORDS` */

/*Table structure for table `MEMBER` */

DROP TABLE IF EXISTS `MEMBER`;

CREATE TABLE `MEMBER` (
  `MEMBER_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `BIRTHDAY` date DEFAULT NULL,
  `PHONENO` varchar(15) NOT NULL,
  `EMAIL` varchar(45) NOT NULL,
  `ADDRESS` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `MEMBER_AVATAR` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`MEMBER_ID`),
  UNIQUE KEY `PHONE NO_UNIQUE` (`PHONENO`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

/*Data for the table `MEMBER` */

insert  into `MEMBER`(`MEMBER_ID`,`NAME`,`BIRTHDAY`,`PHONENO`,`EMAIL`,`ADDRESS`,`PASSWORD`,`CREATE_DATE`,`MEMBER_AVATAR`) values 
(21,'羅婉漁','1994-12-27','0985858585','ch4308@lalala.com','台北市中正區濟南路一段321號','000','2023-05-30 11:59:03','../img/upload/member/'),
(22,'陳書羽','1998-03-06','0919850218','znTdAg6W93Eyr@gmail.com','新北市林口區文化三路一段239號','004','2023-05-30 11:59:03','../img/upload/member/'),
(23,'李子靈','1994-12-18','0913775092','rve03850@zslsz.com','高雄市楠梓區東寧路17號','001','2023-05-30 11:59:03','../img/upload/member/'),
(24,'張芸霈','1977-03-28','0953018368','yiSbLzue@gmail.com','臺中市霧峰區峰南路32號','002','2023-05-30 11:59:03','../img/upload/member/'),
(25,'鄭惠婷','1984-10-22','0989118333','gh5jPU2l0pDr@gmail.com','屏東縣長治鄉研發三路33號','003','2023-05-30 11:59:03','../img/upload/member/');

/*Table structure for table `MEMBER_VOUCHER` */

DROP TABLE IF EXISTS `MEMBER_VOUCHER`;

CREATE TABLE `MEMBER_VOUCHER` (
  `MEMBER_ID` int NOT NULL,
  `VOUCHER_ID` int DEFAULT NULL,
  `VOUCHER_AMOUNT` int DEFAULT NULL,
  KEY `FK_MV_MEMBER_ID_idx` (`MEMBER_ID`),
  CONSTRAINT `FK_MV_MEMBER_ID` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `MEMBER_VOUCHER` */

insert  into `MEMBER_VOUCHER`(`MEMBER_ID`,`VOUCHER_ID`,`VOUCHER_AMOUNT`) values 
(21,1,0),
(21,2,1),
(22,1,2),
(22,2,0),
(23,1,1),
(23,2,1),
(24,1,3),
(24,2,1),
(25,1,2),
(25,2,0);

/*Table structure for table `ORDER` */

DROP TABLE IF EXISTS `ORDER`;

CREATE TABLE `ORDER` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `MEMBER_ID` int DEFAULT NULL,
  `PAYMENT_ID` int DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `ORDER_STATE_ID` int DEFAULT NULL,
  `PAY_STATE_ID` int DEFAULT NULL,
  `DELIVERY_STATE_ID` int DEFAULT NULL,
  `TOTAL` int DEFAULT NULL,
  `VOUCHER_ID` int unsigned DEFAULT '0',
  `DELIVERY_METHOD_ID` int DEFAULT NULL,
  `ORDER_COMMENT` varchar(255) DEFAULT NULL,
  `RECIPIENT` varchar(45) NOT NULL,
  `STORE` varchar(45) DEFAULT NULL,
  `STORE_ADDRESS` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ORDER_ID`),
  KEY `FK_ORDER_DSTATEID_idx` (`DELIVERY_STATE_ID`),
  KEY `FK_ORDER_VOUCHER_ID_idx` (`VOUCHER_ID`),
  KEY `FK_ORDER_PAYMENT_ID_idx` (`PAYMENT_ID`),
  KEY `FK_ORDER_DELIVERY_ID_idx` (`DELIVERY_METHOD_ID`),
  KEY `FK_ORDER_ORDER_STATE_ID_idx` (`ORDER_STATE_ID`),
  KEY `FK_ORDER_PAYMENT_STATE__ID_idx` (`PAY_STATE_ID`),
  KEY `FK_ORDER_MEMBER_ID_idx` (`MEMBER_ID`),
  CONSTRAINT `FK_ORDER_MEMBER_ID` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `ORDER` */

insert  into `ORDER`(`ORDER_ID`,`MEMBER_ID`,`PAYMENT_ID`,`CREATE_DATE`,`ORDER_STATE_ID`,`PAY_STATE_ID`,`DELIVERY_STATE_ID`,`TOTAL`,`VOUCHER_ID`,`DELIVERY_METHOD_ID`,`ORDER_COMMENT`,`RECIPIENT`,`STORE`,`STORE_ADDRESS`) values 
(1,23,1,'2023-06-02 20:23:55',2,1,1,3610,1,2,'請幫我小心包裝好謝謝，要送人的','羅婉漁','墩璞門市','220新北市板橋區中正路106號');

/*Table structure for table `ORDER_DETAILS` */

DROP TABLE IF EXISTS `ORDER_DETAILS`;

CREATE TABLE `ORDER_DETAILS` (
  `ORDER_DETAILS_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int DEFAULT NULL,
  `PRODUCT_ID` int DEFAULT NULL,
  `PRICE` int DEFAULT NULL,
  `ORDER_AMOUNT` int DEFAULT NULL,
  `SUBTOTAL` int DEFAULT NULL,
  PRIMARY KEY (`ORDER_DETAILS_ID`),
  KEY `fk_ORDER_DETAILS_PRODUCT1_idx` (`PRODUCT_ID`),
  KEY `fk_ORDER_DETAILS_ORDER_idx` (`ORDER_ID`),
  CONSTRAINT `fk_ORDER_DETAILS_ORDER` FOREIGN KEY (`ORDER_ID`) REFERENCES `ORDER` (`ORDER_ID`),
  CONSTRAINT `fk_ORDER_DETAILS_PRODUCT1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCT` (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `ORDER_DETAILS` */

insert  into `ORDER_DETAILS`(`ORDER_DETAILS_ID`,`ORDER_ID`,`PRODUCT_ID`,`PRICE`,`ORDER_AMOUNT`,`SUBTOTAL`) values 
(1,1,107,720,1,720),
(2,1,111,1080,1,1080),
(3,1,201,53,10,530),
(4,1,304,1280,1,1280);

/*Table structure for table `ORDER_STATE` */

DROP TABLE IF EXISTS `ORDER_STATE`;

CREATE TABLE `ORDER_STATE` (
  `ID` int NOT NULL,
  `ORDER_STATE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `ORDER_STATE` */

insert  into `ORDER_STATE`(`ID`,`ORDER_STATE`) values 
(1,'處理中'),
(2,'已確認'),
(3,'已完成'),
(4,'已取消');

/*Table structure for table `PAYMENT` */

DROP TABLE IF EXISTS `PAYMENT`;

CREATE TABLE `PAYMENT` (
  `ID` int NOT NULL,
  `METHOD` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PAYMENT` */

insert  into `PAYMENT`(`ID`,`METHOD`) values 
(1,'信用卡'),
(2,'貨到付款');

/*Table structure for table `PAYMENT_STATE` */

DROP TABLE IF EXISTS `PAYMENT_STATE`;

CREATE TABLE `PAYMENT_STATE` (
  `ID` int NOT NULL,
  `PAYMENT_STATE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PAYMENT_STATE` */

insert  into `PAYMENT_STATE`(`ID`,`PAYMENT_STATE`) values 
(1,'未付款'),
(2,'付款失敗'),
(3,'超過付款時間'),
(4,'已付款'),
(5,'退款中'),
(6,'已退款');

/*Table structure for table `PET` */

DROP TABLE IF EXISTS `PET`;

CREATE TABLE `PET` (
  `PET_ID` int NOT NULL AUTO_INCREMENT,
  `PET_NAME` varchar(45) NOT NULL,
  `PET_GENDER` tinyint NOT NULL,
  `PET_CATAGORY` varchar(45) NOT NULL,
  `PET_AGE` varchar(45) NOT NULL,
  `MERBER_ID` int NOT NULL,
  `CREATEDATE` datetime NOT NULL,
  `PET_CHIP` varchar(45) DEFAULT NULL,
  `PET_AVATAR` varchar(225) DEFAULT NULL,
  `VACCI_OR_NOT` tinyint DEFAULT NULL,
  PRIMARY KEY (`PET_ID`),
  UNIQUE KEY `PET_CHIP_UNIQUE` (`PET_CHIP`),
  KEY `FK_PET_MEMBER_ID_idx` (`MERBER_ID`),
  CONSTRAINT `FK_PET_MEMBER_ID` FOREIGN KEY (`MERBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;

/*Data for the table `PET` */

insert  into `PET`(`PET_ID`,`PET_NAME`,`PET_GENDER`,`PET_CATAGORY`,`PET_AGE`,`MERBER_ID`,`CREATEDATE`,`PET_CHIP`,`PET_AVATAR`,`VACCI_OR_NOT`) values 
(25,'辛巴',0,'貓','2個月',21,'2023-05-30 12:03:03','213343894866',NULL,NULL),
(26,'喬巴',0,'貓','2個月',21,'2023-05-30 12:03:03','215248529714',NULL,NULL),
(27,'酷哥',1,'狗','2年1個月',21,'2023-05-30 12:03:03','115282554540',NULL,NULL),
(28,'Lulu',1,'貓','16年1個月',22,'2023-05-30 12:03:03','215049068187',NULL,NULL),
(29,'millimeter',1,'狗','5年',23,'2023-05-30 12:03:03','115803010335',NULL,NULL),
(30,'阿特',1,'狗','2年1個月',23,'2023-05-30 12:03:03','113816383529',NULL,NULL),
(31,'cock醬',0,'其他','2週',24,'2023-05-30 12:03:03','313713051373',NULL,NULL),
(32,'提拉米蘇',1,'其他','1年3個月',25,'2023-05-30 12:03:03','315181129546',NULL,NULL);

/*Table structure for table `PET_WHISPERER` */

DROP TABLE IF EXISTS `PET_WHISPERER`;

CREATE TABLE `PET_WHISPERER` (
  `ID` int NOT NULL,
  `PET_ID` int NOT NULL,
  `APPOINTMENT` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PET_WHISPERER_PET_ID_idx` (`PET_ID`),
  CONSTRAINT `FK_PET_WHISPERER_PET_ID` FOREIGN KEY (`PET_ID`) REFERENCES `PET` (`PET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PET_WHISPERER` */

/*Table structure for table `PHYSICAL_CHECK_UP` */

DROP TABLE IF EXISTS `PHYSICAL_CHECK_UP`;

CREATE TABLE `PHYSICAL_CHECK_UP` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PET_ID` int NOT NULL,
  `PHYSICAL_CHECK_UP_ID` int NOT NULL,
  `CREATEDATE` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PC_PET_ID` (`PET_ID`),
  CONSTRAINT `FK_PC_PET_ID` FOREIGN KEY (`PET_ID`) REFERENCES `PET` (`PET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PHYSICAL_CHECK_UP` */

/*Table structure for table `PRODUCT` */

DROP TABLE IF EXISTS `PRODUCT`;

CREATE TABLE `PRODUCT` (
  `PRODUCT_ID` int NOT NULL,
  `PRODUCT_TITLE` varchar(225) DEFAULT NULL,
  `PRODUCT_PRICE` int DEFAULT NULL,
  `PRODUCT_CATAGORY_ID` int DEFAULT NULL,
  `INVENTORY` int DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `IMG_SOURCE` varchar(255) DEFAULT NULL,
  `PRODUCT_CONTENT` text,
  PRIMARY KEY (`PRODUCT_ID`),
  KEY `FK_PRODUCT_PRODUCT_CATAGORY_idx` (`PRODUCT_CATAGORY_ID`),
  CONSTRAINT `FK_PRODUCT_PRODUCT_CATAGORY` FOREIGN KEY (`PRODUCT_CATAGORY_ID`) REFERENCES `PRODUCT_CATEGORY` (`PRODUCT_CATAGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PRODUCT` */

insert  into `PRODUCT`(`PRODUCT_ID`,`PRODUCT_TITLE`,`PRODUCT_PRICE`,`PRODUCT_CATAGORY_ID`,`INVENTORY`,`CREATE_DATE`,`IMG_SOURCE`,`PRODUCT_CONTENT`) values 
(101,'【SC星益生趣】有穀健康狗糧(鮭魚藜麥配方) 3.5磅/1.6kg',972,1,20,'2023-05-25 14:33:10','./img/shopping_list/dryfood/01/dryfood_01_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】有穀健康狗糧(鮭魚藜麥配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．藜麥南瓜膳食纖維｜維護腸胃健康<br>\n．鮭魚富含優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 有穀健康狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚藜麥配方。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、海魚粉、燕麥、珍珠大麥、葵花油(混合生育酚保存)、南瓜、藜麥、天然蔬菜香料、鱈魚、椰子粉、鹽、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、菊苣纖維、百里香、鼠尾草、迷迭香萃取物、奇亞籽、鱈魚肝油、生育醇(保鮮劑)、乾海帶、氯化膽鹼、氯化鉀、牛磺酸、碳酸鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)26%，粗脂肪(最少)14%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，0mega 3脂肪酸(最少)0.4%，葡萄糖胺(最少)800mg/kg，軟骨素(最少)800mg/kg，代謝能3670kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(102,'【SC星益生趣】有穀健康狗糧(鮭魚藜麥配方)  22磅/10kg',3800,1,35,'2023-05-25 14:33:10','./img/shopping_list/dryfood/01/dryfood_01_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】有穀健康狗糧(鮭魚藜麥配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．藜麥南瓜膳食纖維｜維護腸胃健康<br>\n．鮭魚富含優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 有穀健康狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚藜麥配方。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、海魚粉、燕麥、珍珠大麥、葵花油(混合生育酚保存)、南瓜、藜麥、天然蔬菜香料、鱈魚、椰子粉、鹽、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、菊苣纖維、百里香、鼠尾草、迷迭香萃取物、奇亞籽、鱈魚肝油、生育醇(保鮮劑)、乾海帶、氯化膽鹼、氯化鉀、牛磺酸、碳酸鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)26%，粗脂肪(最少)14%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，0mega 3脂肪酸(最少)0.4%，葡萄糖胺(最少)800mg/kg，軟骨素(最少)800mg/kg，代謝能3670kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(103,'【SC星益生趣】無穀狗糧(野生白魚配方) 3.5磅/1.6kg',1080,1,43,'2023-05-25 14:33:10','./img/shopping_list/dryfood/03/dryfood_03_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀狗糧(野生白魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．65%肉類成分+35%有機蔬果｜完整均衡營養<br>\n．魚類富含優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 有穀健康狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：野生白魚配方。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n白魚、海魚粉、豌豆、扁豆、葵花油(混和生育醇保存)、鯖魚、天然蔬菜香料、鮭魚油、紫花苜蓿、亞麻籽、鮭魚、鱈魚、葫蘆巴籽、椰子油、南瓜、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、菊苞纖維、百里香、鼠尾草、迷迭香萃取物、生育醇(保鮮劑)、乾海帶、氯化膽鹼、磷酸三鈣、牛磺酸、磷酸氫鈣、氯化鉀、碳酸鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃酸、維生素A補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)35%，粗脂肪(最少)13.5%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)0.7%，葡萄糖胺(最少)1000mg/kg，軟骨素(最少)800mg/kg，代謝能3684kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(104,'【SC星益生趣】無穀狗糧(野生白魚配方)  22磅/10kg',3800,1,77,'2023-05-25 14:33:10','./img/shopping_list/dryfood/03/dryfood_03_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀狗糧(野生白魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．65%肉類成分+35%有機蔬果｜完整均衡營養<br>\n．魚類富含優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 有穀健康狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：野生白魚配方。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n白魚、海魚粉、豌豆、扁豆、葵花油(混和生育醇保存)、鯖魚、天然蔬菜香料、鮭魚油、紫花苜蓿、亞麻籽、鮭魚、鱈魚、葫蘆巴籽、椰子油、南瓜、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、菊苞纖維、百里香、鼠尾草、迷迭香萃取物、生育醇(保鮮劑)、乾海帶、氯化膽鹼、磷酸三鈣、牛磺酸、磷酸氫鈣、氯化鉀、碳酸鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃酸、維生素A補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)35%，粗脂肪(最少)13.5%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)0.7%，葡萄糖胺(最少)1000mg/kg，軟骨素(最少)800mg/kg，代謝能3684kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(105,'【SC星益生趣】無穀凍乾狗糧(三種魚配方) 3.5磅/1.6kg',1380,1,43,'2023-05-25 14:33:10','./img/shopping_list/dryfood/05/dryfood_05_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀凍乾狗糧(三種魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．鮭魚+鱒魚+黑線鱈，含豐富不飽和脂肪酸｜使毛色健康亮麗<br>\n．70%肉類成分+30%有機蔬果｜完整均衡營養<br>\n．添加益生菌｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀凍乾狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：三種魚配方（鮭魚、鱒魚及黑線鱈魚）。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、深海白魚粉、扁豆、豌豆、鱒魚、天然蔬菜香料、葵花油(混和生育醇保存)、黑線鱈、鱈魚、亞麻籽、葫蘆巴籽、椰子油、南瓜、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、紫花苜蓿、菊苣纖維、百里香、鼠尾草、迷迭香萃取物、牛磺酸、生育醇(保鮮劑)、乾海帶、氯化膽鹼、磷酸三鈣、磷酸氫鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)34%，粗脂肪(最少)14.5%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)0.7%，葡萄糖胺(最少)1000mg/kg，軟骨素(最少)800mg/kg，代謝能3750kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(106,'【SC星益生趣】無穀凍乾狗糧(三種魚配方)  22磅/10kg',4280,1,80,'2023-05-25 14:33:10','./img/shopping_list/dryfood/05/dryfood_05_01.jpg,./img/shopping_list/dryfood/01/dryfood_01_02.jpg,./img/shopping_list/dryfood/01/dryfood_01_03.jpg,./img/shopping_list/dryfood/01/dryfood_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀凍乾狗糧(三種魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．鮭魚+鱒魚+黑線鱈，含豐富不飽和脂肪酸｜使毛色健康亮麗<br>\n．70%肉類成分+30%有機蔬果｜完整均衡營養<br>\n．添加益生菌｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀凍乾狗糧｜美國銷售第一凍乾品牌\n<br>\n口味：三種魚配方（鮭魚、鱒魚及黑線鱈魚）。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5磅，22磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、深海白魚粉、扁豆、豌豆、鱒魚、天然蔬菜香料、葵花油(混和生育醇保存)、黑線鱈、鱈魚、亞麻籽、葫蘆巴籽、椰子油、南瓜、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、紫花苜蓿、菊苣纖維、百里香、鼠尾草、迷迭香萃取物、牛磺酸、生育醇(保鮮劑)、乾海帶、氯化膽鹼、磷酸三鈣、磷酸氫鈣、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、碘酸鈣、維生素E補充劑、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素B12補充劑、鹽酸吡哆醇、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)34%，粗脂肪(最少)14.5%，粗纖維(最多)5%，水分(最多)12%，牛磺酸(最少)0.2%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)0.7%，葡萄糖胺(最少)1000mg/kg，軟骨素(最少)800mg/kg，代謝能3750kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(107,'【SC星益生趣】冷凍乾燥狗狗生食佐餐(鮭魚鱈魚)  3.5oz(99g)',720,1,46,'2023-05-25 14:33:10','./img/shopping_list/dryfood/07/dryfood_07_01.jpg,./img/shopping_list/dryfood/07/dryfood_07_02.jpg,./img/shopping_list/dryfood/07/dryfood_07_03.jpg,./img/shopping_list/dryfood/07/dryfood_07_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】冷凍乾燥狗狗生食佐餐(鮭魚鱈魚)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．95%野生捕撈魚肉｜使毛色健康亮麗<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．0%穀物、無人工添加物｜天然無負擔，適合對食物敏感的毛孩<br>\n．益生菌、抗氧化食材｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 冷凍乾燥狗狗生食佐餐｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚鱈魚。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5oz，8oz，18oz。<br>\n<br>\n<b>成分：</b><br>\n鮭魚(含磨碎魚骨)、鱈魚(含磨碎魚骨)、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、葫蘆巴籽、氯化鉀、生育醇(保鮮劑)、磷酸鈉、氯化膽鹼、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品、鋅蛋白、鐵蛋白、牛磺酸、碳酸鈣、維生素E補充劑、硝酸硫胺明、鐵蛋白、錳蛋白、亞硒酸鈉、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑葉酸、維生素B12補充劑、鹽酸吡哆醇、葉酸\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)50%，粗脂肪(最少)22%，粗纖維(最多)5%，水分(最多)5%，代謝能3953kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n4.如泡水食用，應於2小時內食畢。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(108,'【SC星益生趣】冷凍乾燥狗狗生食佐餐(鮭魚鱈魚) 18oz(510g)',2480,1,72,'2023-05-25 14:33:10','./img/shopping_list/dryfood/07/dryfood_07_01.jpg,./img/shopping_list/dryfood/07/dryfood_07_02.jpg,./img/shopping_list/dryfood/07/dryfood_07_03.jpg,./img/shopping_list/dryfood/07/dryfood_07_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】冷凍乾燥狗狗生食佐餐(鮭魚鱈魚)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．95%野生捕撈魚肉｜使毛色健康亮麗<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．0%穀物、無人工添加物｜天然無負擔，適合對食物敏感的毛孩<br>\n．益生菌、抗氧化食材｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 冷凍乾燥狗狗生食佐餐｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚鱈魚。\n<br>\n適用對象：全齡犬適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5oz，8oz，18oz。<br>\n<br>\n<b>成分：</b><br>\n鮭魚(含磨碎魚骨)、鱈魚(含磨碎魚骨)、鱈魚肝油、南瓜籽、有機蔓越莓、有機菠菜、有機青花菜、有機甜菜根、有機胡蘿蔔、有機南瓜、有機藍莓、葫蘆巴籽、氯化鉀、生育醇(保鮮劑)、磷酸鈉、氯化膽鹼、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品、鋅蛋白、鐵蛋白、牛磺酸、碳酸鈣、維生素E補充劑、硝酸硫胺明、鐵蛋白、錳蛋白、亞硒酸鈉、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑葉酸、維生素B12補充劑、鹽酸吡哆醇、葉酸\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)50%，粗脂肪(最少)22%，粗纖維(最多)5%，水分(最多)5%，代謝能3953kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n4.如泡水食用，應於2小時內食畢。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(109,'【SC星益生趣】無穀貓糧(鮭魚配方) 2.5磅/1.1kg',980,1,41,'2023-05-25 14:33:10','./img/shopping_list/dryfood/09/dryfood_09_01.jpg,./img/shopping_list/dryfood/09/dryfood_09_02.jpg,./img/shopping_list/dryfood/09/dryfood_09_03.jpg,./img/shopping_list/dryfood/09/dryfood_09_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀貓糧(鮭魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．抗氧化成分｜增加自然抵抗力<br>\n．添加蔓越莓｜維護泌尿道保健<br>\n．優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀貓糧｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚配方。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：2.5磅，5磅，10磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、海魚粉、扁豆、鷹嘴豆、豌豆、葵花油(混和生育醇保存)、天然蔬菜風味、鮭魚粉、鱈魚、葫蘆巴籽、紫花苜蓿、蒲公英、鱈魚肝油、牛磺酸、氯化膽鹼、生育醇(保鮮劑)、絲蘭萃取物、百里香、迷迭香、鼠尾草、蔓越莓、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、維生素E補充劑、碘酸鈣、鎂蛋白、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、生物素、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)36%，粗脂肪(最少)14%，粗纖維(最多)5%，水分(最多)12%，鈣(最少)1.0%，磷(最少)0.8%，牛磺酸(最少)0.15%，Omega 6脂肪酸(最少)3.75%，0mega 3脂肪酸(最少)1.25%，代謝能3660kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(110,'【SC星益生趣】無穀貓糧(鮭魚配方) 10磅/4.5kg',2580,1,82,'2023-05-25 14:33:10','./img/shopping_list/dryfood/09/dryfood_09_01.jpg,./img/shopping_list/dryfood/09/dryfood_09_02.jpg,./img/shopping_list/dryfood/09/dryfood_09_03.jpg,./img/shopping_list/dryfood/09/dryfood_09_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀貓糧(鮭魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．抗氧化成分｜增加自然抵抗力<br>\n．添加蔓越莓｜維護泌尿道保健<br>\n．優質不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀貓糧｜美國銷售第一凍乾品牌\n<br>\n口味：鮭魚配方。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：2.5磅，5磅，10磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、海魚粉、扁豆、鷹嘴豆、豌豆、葵花油(混和生育醇保存)、天然蔬菜風味、鮭魚粉、鱈魚、葫蘆巴籽、紫花苜蓿、蒲公英、鱈魚肝油、牛磺酸、氯化膽鹼、生育醇(保鮮劑)、絲蘭萃取物、百里香、迷迭香、鼠尾草、蔓越莓、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、維生素E補充劑、碘酸鈣、鎂蛋白、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、生物素、葉酸、鹽、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)36%，粗脂肪(最少)14%，粗纖維(最多)5%，水分(最多)12%，鈣(最少)1.0%，磷(最少)0.8%，牛磺酸(最少)0.15%，Omega 6脂肪酸(最少)3.75%，0mega 3脂肪酸(最少)1.25%，代謝能3660kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(111,'【SC星益生趣】無穀凍乾貓糧(三種魚配方) 2.5磅/1.1kg',1080,1,28,'2023-05-25 14:33:10','./img/shopping_list/dryfood/11/dryfood_11_01.jpg,./img/shopping_list/dryfood/09/dryfood_09_02.jpg,./img/shopping_list/dryfood/09/dryfood_09_03.jpg,./img/shopping_list/dryfood/09/dryfood_09_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀凍乾貓糧(三種魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．鮭魚+鱈魚+鮪魚，富含不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加蔓越莓｜維護泌尿道保健<br>\n．抗氧化成分｜加強增加自然抵抗力<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀凍乾貓糧｜美國銷售第一凍乾品牌\n<br>\n口味：三種魚配方（鮭魚、鱈魚、鮪魚）。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：2.5磅，5磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、魚粉、扁豆、豌豆、天然蔬菜香料、葵花油(混和生育醇保存)、鱈魚、鮪魚、海魚、紫花苜蓿、葫蘆巴籽、氯化膽鹼、鱈魚肝油、牛磺酸、蒲公英、南瓜籽、海鹽、生育醇(保鮮劑)、碳酸鈣、絲蘭萃取物、百里香、迷迭香、鼠尾草、蔓越莓、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、維生素E補充劑、碘酸鈣、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、生物素、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)35%，粗脂肪(最少)15%，粗纖維(最多)5%，水分(最多)12%，鈣(最少)1.0%，碘(最少)0.8%，牛磺酸(最少)0.15%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)1.0%，代謝能3744kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(112,'【SC星益生趣】無穀凍乾貓糧(三種魚配方) 5磅/2.2kg',1800,1,64,'2023-05-25 14:33:10','./img/shopping_list/dryfood/11/dryfood_11_01.jpg,./img/shopping_list/dryfood/09/dryfood_09_02.jpg,./img/shopping_list/dryfood/09/dryfood_09_03.jpg,./img/shopping_list/dryfood/09/dryfood_09_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】無穀凍乾貓糧(三種魚配方)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．凍乾純肉塗層技術｜鮮肉包裹每個顆粒，輕鬆補足毛孩所需營養<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．鮭魚+鱈魚+鮪魚，富含不飽和脂肪酸｜使毛色健康亮麗<br>\n．添加蔓越莓｜維護泌尿道保健<br>\n．抗氧化成分｜加強增加自然抵抗力<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s - 無穀凍乾貓糧｜美國銷售第一凍乾品牌\n<br>\n口味：三種魚配方（鮭魚、鱈魚、鮪魚）。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：2.5磅，5磅。<br>\n<br>\n<b>成分：</b><br>\n鮭魚、魚粉、扁豆、豌豆、天然蔬菜香料、葵花油(混和生育醇保存)、鱈魚、鮪魚、海魚、紫花苜蓿、葫蘆巴籽、氯化膽鹼、鱈魚肝油、牛磺酸、蒲公英、南瓜籽、海鹽、生育醇(保鮮劑)、碳酸鈣、絲蘭萃取物、百里香、迷迭香、鼠尾草、蔓越莓、鋅蛋白、鐵蛋白、銅蛋白、錳蛋白、亞硒酸鈉、維生素E補充劑、碘酸鈣、硝酸硫胺明、菸鹼酸、泛酸鈣、核黃素、維生素A補充劑、維生素D3補充劑、維生素B12補充劑、鹽酸吡哆醇、生物素、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)35%，粗脂肪(最少)15%，粗纖維(最多)5%，水分(最多)12%，鈣(最少)1.0%，碘(最少)0.8%，牛磺酸(最少)0.15%，Omega 6脂肪酸(最少)3.5%，Omega 3脂肪酸(最少)1.0%，代謝能3744kcal/kg\n<br>\n*本配方符合AAFCO犬糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(113,'【SC星益生趣】冷凍乾燥貓用生食凍乾(兔肉)  3.5oz(99g)',820,1,38,'2023-05-25 14:33:10','./img/shopping_list/dryfood/13/dryfood_13_01.jpg,./img/shopping_list/dryfood/13/dryfood_13_02.jpg,./img/shopping_list/dryfood/13/dryfood_13_03.jpg,./img/shopping_list/dryfood/13/dryfood_13_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】冷凍乾燥貓用生食凍乾(兔肉)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．98%農場飼養兔肉｜低脂肪，低膽固醇<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．0%穀物、無人工添加物｜天然無負擔，適合對食物敏感的毛孩<br>\n．益生菌、抗氧化食材｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s  - 冷凍乾燥貓用生食凍乾｜美國銷售第一凍乾品牌\n<br>\n口味：兔肉。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5oz，8oz，18oz。<br>\n<br>\n<b>成分：</b><br>\n兔肉(含磨碎兔骨)、兔肝、橄欖油、南瓜籽、氯化鉀、磷酸鈉、氯化膽鹼、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品、牛磺酸、生育醇(保鮮劑)、蒲公英、乾海帶、鋅蛋白、鐵蛋白、維生素A補充劑、維生素E補充劑、菸鹼酸、銅蛋白、核黃素、亞硒酸鈉、泛酸鈣、生物素、錳蛋白、硝酸硫胺明、鹽酸吡哆醇、維生素D3補充劑、葉酸、維生素B12補充劑\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)44%，粗脂肪(最少)30%，粗纖維(最多)5%，水分(最多)5%，牛磺酸(最少)0.2%，代謝能4630kcal/kg\n<br>\n*本配方符合AAFCO貓糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n4.如泡水食用，應於2小時內食畢。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(114,'【SC星益生趣】冷凍乾燥貓用生食凍乾(兔肉) 18oz(510g)',3480,1,37,'2023-05-25 14:33:10','./img/shopping_list/dryfood/13/dryfood_13_01.jpg,./img/shopping_list/dryfood/13/dryfood_13_02.jpg,./img/shopping_list/dryfood/13/dryfood_13_03.jpg,./img/shopping_list/dryfood/13/dryfood_13_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>【SC星益生趣】冷凍乾燥貓用生食凍乾(兔肉)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n．100%美國製造｜原裝獨家進口<br>\n．98%農場飼養兔肉｜低脂肪，低膽固醇<br>\n．HPP高壓滅菌｜符合正常殺菌並鎖住營養、保留完整風味<br>\n．0%穀物、無人工添加物｜天然無負擔，適合對食物敏感的毛孩<br>\n．益生菌、抗氧化食材｜維護腸胃健康、提供全方位保護<br>\n．添加牛磺酸｜保護視力健康與心血管<br>\n<br>\n商品名稱：Stella＆Chewy’s  - 冷凍乾燥貓用生食凍乾｜美國銷售第一凍乾品牌\n<br>\n口味：兔肉。\n<br>\n適用對象：全齡貓適用。\n<br>\n每日建議餵食量：請見外包裝標示。\n<br>\n產地：美國。\n<br>\n容量尺寸規格：3.5oz，8oz，18oz。<br>\n<br>\n<b>成分：</b><br>\n兔肉(含磨碎兔骨)、兔肝、橄欖油、南瓜籽、氯化鉀、磷酸鈉、氯化膽鹼、乾乳酸片球菌發酵產品、乾嗜酸乳桿菌發酵產品、乾比菲德式龍根菌發酵產品、乾芽孢乳酸菌發酵產品、牛磺酸、生育醇(保鮮劑)、蒲公英、乾海帶、鋅蛋白、鐵蛋白、維生素A補充劑、維生素E補充劑、菸鹼酸、銅蛋白、核黃素、亞硒酸鈉、泛酸鈣、生物素、錳蛋白、硝酸硫胺明、鹽酸吡哆醇、維生素D3補充劑、葉酸、維生素B12補充劑\n<br><br>\n<b>成分分析：</b><br>\n粗蛋白(最少)44%，粗脂肪(最少)30%，粗纖維(最多)5%，水分(最多)5%，牛磺酸(最少)0.2%，代謝能4630kcal/kg\n<br>\n*本配方符合AAFCO貓糧營養規範<br>\n<br>\n<b>保存方式：</b><br>\n1.本產品對濕度及氣溫變化較敏感，請避開高溫、陽光直射或潮濕處。勿冷藏或冷凍。<br>\n2.開封後請確實將袋口密封，存放於陰涼乾燥處，並於兩個月內儘快食用完畢。<br>\n<br>\n<b>注意事項：</b><br>\n1.本產品以天然成份保存，無添加人工色素，每批次使用的食材，可能因季節差異，造成乾糧顏色及質地改變，此為正常現象。<br>\n2.品牌轉換時，建議以7-10天逐步替換為宜。狗以外其他寵物請勿食用。<br>\n3.請放置於兒童及寵物無法取得的地方，避免誤吞造成噎食意外。<br>\n4.如泡水食用，應於2小時內食畢。<br>\n</p>\n                <img src=\"./img/shopping_list/dryfood/01/dryfood_01_content.jpg\" alt=\"\">\n            </section>'),
(201,'耐吉斯 源野獵食客主食罐 犬用(全雞+鮭魚肉絲派佐薑黃) 85g',53,2,29,'2023-05-25 14:33:10','./img/shopping_list/can/01/can_01_01.jpg,./img/shopping_list/can/01/can_01_02.jpg,./img/shopping_list/can/01/can_01_03.jpg,./img/shopping_list/can/01/can_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>耐吉斯 源野獵食客主食罐 犬用(全雞+鮭魚肉絲派佐薑黃)</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧添加薑黃、奇亞籽幫助維持皮膚健康<br>\n‧含98% 高動物性蛋白質<br>\n‧0% 穀類、無麩質、低碳水化合物<br>\n‧符合美國AAFCO和NRC營養建議<br>\n‧採用天然寒天，不含瓜爾膠、卡拉膠等爭議膠類<br><br>\n\n<b>全雞+鮭魚肉絲派佐薑黃（成犬 / 熟齡犬）</b><br>\n使用完整全雞營養：以高品質全雞（鮮肉+內臟+軟骨 / 骨骼）打造全面完整的營養，充分模擬野外獵食情境，還原貓狗原始飲食天性。搭配鮭魚、鮪魚、羊肉、綠貽貝等優質肉類食材，打造98%高動物性蛋白含量，增加飲食豐富性。\n<br><br>\n<b>成份：</b><br>\n去骨鮮雞肉、鮮雞肉骨、鮮雞蛋、鮮鮭魚、鮮雞肝、天然纖維素、鮮雞心、奇亞籽、天然風味劑、寒天、豌豆蛋白、葵花籽油、雞脂肪、氯化膽鹼、寡醣、薑黃、綜合礦物質、綜合維生素\n<br><br>\n<b>保證成分分析：</b><br>\n粗蛋白質11.5%以上，粗脂肪3.9%以上，粗纖維3.2%以下，灰分3%以下，鈣0.26%以上，磷0.2%以上，牛磺酸5ppm以上，代謝能97Kcal/100g\n<br><br>\n<b>85g-每日建議餵食量</b><br>\n小型犬：每1.1 kg體重/罐<br>\n中型犬：每1.3 kg體重/罐<br>\n大型犬：每1.6 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>160g-每日建議餵食量</b><br>\n小型犬：每2.2 kg體重/罐<br>\n中型犬：每2.6 kg體重/罐<br>\n大型犬：每3.2 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>品牌簡介：</b><br>\n源野獵食新主張 FULL SOURCE：天然全肉骨<br>\n貓狗生為肉食性動物，他們的野生始祖是天生的獵食者，在野外獲取獵物時，會將獵物的鮮肉、內臟同時攝取，甚至會將部分的骨骼/軟骨也一起攝入，以達到最均衡、最完整好吸收的營養。耐吉斯源野獵食客正是主打「回歸貓狗原始自然習性」，將全雞精華都融入主食罐中，完整模擬野外狩獵情境，釋放貓狗天生原始食性。並採用多種不同肉種搭配超級食物，以綿密慕斯與嫩切肉絲打造豐富口感與層次。\n<br><br>\n<b>適用對象：全年齡犬皆適用</b><br>\n注意事項：開罐後請倒出餵食，剩餘部分請密封冷藏可保存1-2日<br>\n保存方式：開封前請存放於乾燥陰涼處，若有膨罐請勿食用<br>\n規格：85g或160g<br>\n產地：泰國<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/01/can_01_content.jpg\" alt=\"\">\n            </section>'),
(202,'耐吉斯 源野獵食客主食罐 犬用(全雞+嫩羊肉絲派佐南瓜) 85g',53,2,97,'2023-05-25 14:33:10','./img/shopping_list/can/02/can_02_01.jpg,./img/shopping_list/can/02/can_02_02.jpg,./img/shopping_list/can/02/can_02_03.jpg,./img/shopping_list/can/01/can_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>耐吉斯 源野獵食客主食罐 犬用(全雞+嫩羊肉絲派佐南瓜) 85g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧添加南瓜、奇亞籽鞏固消化機能<br>\n‧含98% 高動物性蛋白質<br>\n‧0% 穀類、無麩質、低碳水化合物<br>\n‧符合美國AAFCO和NRC營養建議<br>\n‧採用天然寒天，不含瓜爾膠、卡拉膠等爭議膠類<br><br>\n\n<b>全雞+嫩羊肉絲派佐南瓜（成犬 / 熟齡犬）</b><br>\n使用完整全雞營養：以高品質全雞（鮮肉+內臟+軟骨 / 骨骼）打造全面完整的營養，充分模擬野外獵食情境，還原貓狗原始飲食天性。搭配鮭魚、鮪魚、羊肉、綠貽貝等優質肉類食材，打造 98% 高動物性蛋白含量，增加飲食豐富性。\n<br><br>\n<b>成份：</b><br>\n去骨鮮雞肉、鮮雞肉骨、鮮雞蛋、鮮羊肉、南瓜、鮮雞肝、天然纖維素、鮮雞心、天然風味劑、寒天、豌豆蛋白、葵花籽油、奇亞籽、雞脂肪、氯化膽鹼、寡醣、綜合礦物質、綜合維生素\n<br><br>\n<b>保證成分分析：</b><br>\n粗蛋白質11.4%以上，粗脂肪4%以上，粗纖維3.1%以下，灰分3%以下，鈣0.24%以上，磷0.2%以上，牛磺酸5ppm以上，代謝能98Kcal/100g \n<br><br>\n<b>85g-每日建議餵食量</b><br>\n小型犬：每1.1 kg體重/罐<br>\n中型犬：每1.3 kg體重/罐<br>\n大型犬：每1.6 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>160g-每日建議餵食量</b><br>\n小型犬：每2.2 kg體重/罐<br>\n中型犬：每2.6 kg體重/罐<br>\n大型犬：每3.2 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>品牌簡介：</b><br>\n源野獵食新主張 FULL SOURCE：天然全肉骨<br>\n貓狗生為肉食性動物，他們的野生始祖是天生的獵食者，在野外獲取獵物時，會將獵物的鮮肉、內臟同時攝取，甚至會將部分的骨骼/軟骨也一起攝入，以達到最均衡、最完整好吸收的營養。耐吉斯源野獵食客正是主打「回歸貓狗原始自然習性」，將全雞精華都融入主食罐中，完整模擬野外狩獵情境，釋放貓狗天生原始食性。並採用多種不同肉種搭配超級食物，以綿密慕斯與嫩切肉絲打造豐富口感與層次。\n<br><br>\n<b>適用對象：全年齡犬皆適用</b><br>\n注意事項：開罐後請倒出餵食，剩餘部分請密封冷藏可保存1-2日<br>\n保存方式：開封前請存放於乾燥陰涼處，若有膨罐請勿食用<br>\n規格：85g或160g<br>\n產地：泰國<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/01/can_01_content.jpg\" alt=\"\">\n            </section>'),
(203,'耐吉斯 源野獵食客主食罐 犬用(全雞+嫩牛肉絲派佐綠貽貝) 85g',53,2,13,'2023-05-25 14:33:10','./img/shopping_list/can/03/can_03_01.jpg,./img/shopping_list/can/03/can_03_02.jpg,./img/shopping_list/can/03/can_03_03.jpg,./img/shopping_list/can/01/can_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>耐吉斯 源野獵食客主食罐 犬用(全雞+嫩牛肉絲派佐綠貽貝) 85g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧添加綠貽貝、奇亞籽維護關節健康<br>\n‧含98% 高動物性蛋白質<br>\n‧0% 穀類、無麩質、低碳水化合物<br>\n‧符合美國AAFCO和NRC營養建議<br>\n‧採用天然寒天，不含瓜爾膠、卡拉膠等爭議膠類<br><br>\n\n<b>全雞+嫩牛肉絲派佐綠貽貝（成犬 / 熟齡犬）</b><br>\n使用完整全雞營養：以高品質全雞（鮮肉+內臟+軟骨 / 骨骼）打造全面完整的營養，充分模擬野外獵食情境，還原貓狗原始飲食天性。搭配鮭魚、鮪魚、羊肉、綠貽貝等優質肉類食材，打造 98% 高動物性蛋白含量，增加飲食豐富性。\n<br><br>\n<b>成份：</b><br>\n去骨鮮雞肉、鮮雞肉骨、鮮雞蛋、鮮牛肉、綠貽貝、鮮雞肝、天然纖維素、鮮雞心、天然風味劑、寒天、豌豆蛋白、葵花籽油、奇亞籽、雞脂肪、氯化膽鹼、葡萄糖胺、綜合礦物質、綜合維生素\n<br><br>\n<b>保證成分分析：</b><br>\n粗蛋白質11.5%以上，粗脂肪4%以上，粗纖維3%以下，灰分3%以下，鈣0.26%以上，磷0.2%以上，牛磺酸5ppm以上，代謝能101Kcal/100g \n<br><br>\n<b>85g-每日建議餵食量</b><br>\n小型犬：每1.1 kg體重/罐<br>\n中型犬：每1.3 kg體重/罐<br>\n大型犬：每1.6 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>160g-每日建議餵食量</b><br>\n小型犬：每2.2 kg體重/罐<br>\n中型犬：每2.6 kg體重/罐<br>\n大型犬：每3.2 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>品牌簡介：</b><br>\n源野獵食新主張 FULL SOURCE：天然全肉骨<br>\n貓狗生為肉食性動物，他們的野生始祖是天生的獵食者，在野外獲取獵物時，會將獵物的鮮肉、內臟同時攝取，甚至會將部分的骨骼/軟骨也一起攝入，以達到最均衡、最完整好吸收的營養。耐吉斯源野獵食客正是主打「回歸貓狗原始自然習性」，將全雞精華都融入主食罐中，完整模擬野外狩獵情境，釋放貓狗天生原始食性。並採用多種不同肉種搭配超級食物，以綿密慕斯與嫩切肉絲打造豐富口感與層次。\n<br><br>\n<b>適用對象：全年齡犬皆適用</b><br>\n注意事項：開罐後請倒出餵食，剩餘部分請密封冷藏可保存1-2日<br>\n保存方式：開封前請存放於乾燥陰涼處，若有膨罐請勿食用<br>\n規格：85g或160g<br>\n產地：泰國<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/01/can_01_content.jpg\" alt=\"\">\n            </section>'),
(204,'耐吉斯 源野獵食客主食罐 犬用(全雞+火雞肉絲派佐綠貽貝) 85g',53,2,23,'2023-05-25 14:33:10','./img/shopping_list/can/04/can_04_01.jpg,./img/shopping_list/can/04/can_04_02.jpg,./img/shopping_list/can/04/can_04_03.jpg,./img/shopping_list/can/01/can_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>耐吉斯 源野獵食客主食罐 犬用(全雞+火雞肉絲派佐綠貽貝) 85g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧添加綠貽貝、奇亞籽維護關節健康<br>\n‧含98% 高動物性蛋白質<br>\n‧0% 穀類、無麩質、低碳水化合物<br>\n‧符合美國AAFCO和NRC營養建議<br>\n‧採用天然寒天，不含瓜爾膠、卡拉膠等爭議膠類<br><br>\n\n<b>全雞+火雞肉絲派佐綠貽貝（全齡犬適用）</b><br>\n使用完整全雞營養：以高品質全雞（鮮肉+內臟+軟骨 / 骨骼）打造全面完整的營養，充分模擬野外獵食情境，還原貓狗原始飲食天性。搭配鮭魚、鮪魚、羊肉、綠貽貝等優質肉類食材，打造 98% 高動物性蛋白含量，增加飲食豐富性。\n<br><br>\n<b>成份：</b><br>\n鮮雞肉骨、去骨鮮雞肉、鮮雞蛋、乾燥火雞肉、綠貽貝、鮮雞肝、天然纖維素、鮮雞心、天然風味劑、寒天、豌豆蛋白、葵花籽油、奇亞籽、雞脂肪、氯化膽鹼、葡萄糖胺、綜合礦物質、綜合維生素\n<br><br>\n<b>保證成分分析：</b><br>\n粗蛋白質11.3%以上，粗脂肪4%以上，粗纖維3.2%以下，灰分3%以下，鈣0.26%以上，磷0.2%以上，牛磺酸5ppm以上，代謝能102Kcal/100g\n<br><br>\n<b>85g-每日建議餵食量</b><br>\n小型犬：每1.1 kg體重/罐<br>\n中型犬：每1.3 kg體重/罐<br>\n大型犬：每1.6 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>160g-每日建議餵食量</b><br>\n小型犬：每2.2 kg體重/罐<br>\n中型犬：每2.6 kg體重/罐<br>\n大型犬：每3.2 kg體重/罐<br>\n高活動量犬：依體重增加20%量<br>\n<br>\n<b>品牌簡介：</b><br>\n源野獵食新主張 FULL SOURCE：天然全肉骨<br>\n貓狗生為肉食性動物，他們的野生始祖是天生的獵食者，在野外獲取獵物時，會將獵物的鮮肉、內臟同時攝取，甚至會將部分的骨骼/軟骨也一起攝入，以達到最均衡、最完整好吸收的營養。耐吉斯源野獵食客正是主打「回歸貓狗原始自然習性」，將全雞精華都融入主食罐中，完整模擬野外狩獵情境，釋放貓狗天生原始食性。並採用多種不同肉種搭配超級食物，以綿密慕斯與嫩切肉絲打造豐富口感與層次。\n<br><br>\n<b>適用對象：全年齡犬皆適用</b><br>\n注意事項：開罐後請倒出餵食，剩餘部分請密封冷藏可保存1-2日<br>\n保存方式：開封前請存放於乾燥陰涼處，若有膨罐請勿食用<br>\n規格：85g或160g<br>\n產地：泰國<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/01/can_01_content.jpg\" alt=\"\">\n            </section>'),
(205,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鵪鶉) 80g',58,2,36,'2023-05-25 14:33:10','./img/shopping_list/can/05/can_05_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鵪鶉)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、鶴鶉肉、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、菸鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素、維生素、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、甘露寡糖。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質13.5％以上，粗脂肪4.5％以上，粗纖維0.4％以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量97kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/05/can_05_content.jpg\" alt=\"\">\n            </section>'),
(206,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞牛肉) 80g',58,2,23,'2023-05-25 14:33:10','./img/shopping_list/can/06/can_06_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞牛肉)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、牛肉、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、菸鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素C維生素D、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、蔓越莓。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質13.5％以上，粗脂肪4.5％以上，粗纖維0.4％以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量97kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/06/can_06_content.jpg\" alt=\"\">\n            </section>'),
(207,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鴨肉) 80g',58,2,42,'2023-05-25 14:33:10','./img/shopping_list/can/07/can_07_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鴨肉)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、鴨肉、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、菸鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素C、維生素D、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、洋車前子。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質14％ 以上，粗脂肪4.0％以上，粗纖維0.4％ 以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量95kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/07/can_07_content.jpg\" alt=\"\">\n            </section>'),
(208,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鮪魚) 80g',58,2,55,'2023-05-25 14:33:10','./img/shopping_list/can/08/can_08_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鮪魚)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、鮪魚、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、菸鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素C、維生素、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、亞麻籽粉。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質14％以上，粗脂肪4.0％以上，粗纖維0.4％以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量95kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/08/can_08_content.jpg\" alt=\"\">\n            </section>'),
(209,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鮭魚) 80g',58,2,27,'2023-05-25 14:33:10','./img/shopping_list/can/09/can_09_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞鮭魚)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、鮭魚、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、菸鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素C、維生素D、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、茶胺酸。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質13.5％以上，粗脂肪4.5％以上，粗纖維0.4％以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量97kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/09/can_09_content.jpg\" alt=\"\">\n            </section>'),
(210,'MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞旗魚) 80g',58,2,28,'2023-05-25 14:33:10','./img/shopping_list/can/10/can_10_01.jpg,./img/shopping_list/can/05/can_05_02.jpg,./img/shopping_list/can/05/can_05_03.jpg,./img/shopping_list/can/05/can_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <p><b>MDARYN麥德琳 喵樂-肉食控主食罐(嫩雞旗魚)80g</b>\n                    <br><br>\n<b>商品特色：</b><br>\n‧符合 AAFCO 與 NRC 成幼貓營養建議<br>\n‧低碳罐罐大推薦<br>\n‧98％ 鮮肉含量，滿足貓咪對肉肉的渴望<br>\n‧使用天然寒天，大口吃肉更安心<br>\n‧細緻肉泥口感，讓小肉食控一口接著一口<br><br>\n<b>原料：</b><br>\n雞肉、旗魚、雞心、雞肝、寒天、乾燥酵母、綜合胺基酸、複合維生素(維生素A、維生素B1、維生素B2、茶鹼酸、泛酸、維生素B6、葉酸、維生素B12、維生素C、維生素D、維生素)、複合礦物質(鈣、磷、鎂、銅、鐵、鋅、鉻、錳、碘)、牛磺酸、左旋肉鹼。\n<br><br>\n<b>營養標示：</b><br>\n粗蛋白質14％以上，粗脂肪4.0％以上，粗纖維0.4％以下，粗灰分1.5％以下，水分80％以下，鈣0.21％以上，磷0.17％以上，熱量95kcal/100g\n<br><br>\n<b>每日建議餵食量：</b><br>\n4個月以下幼貓 每0.5公斤體重1罐<br>\n4-8個月幼貓 每1公斤體重1罐<br>\n8-12個月幼貓 每1.2公斤體重1罐<br>\n1歲以上成貓 每1.5公斤體重1罐<br>\n請依體態、活動量與環境等因素增減份量<br>\n<br>\n<b>保存方式：</b><br>\n存放於陰涼乾燥處。開罐後請冷藏保存，並於兩日內食用完畢。<br>\n<br>\n產地：台灣<br>\n                </p>\n\n                <img src=\"./img/shopping_list/can/10/can_10_content.jpg\" alt=\"\">\n            </section>'),
(301,'沛威貓狗保健-護眼亮晶晶 30入/盒',1380,3,19,'2023-05-25 14:33:10','./img/shopping_list/healthy/01/healthy_01_01.jpg,./img/shopping_list/healthy/01/healthy_01_02.jpg,./img/shopping_list/healthy/01/healthy_01_03.jpg,./img/shopping_list/healthy/01/healthy_01_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/01/healthy_01_content.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/01/healthy_01_content02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威貓狗保健-護眼亮晶晶</b>\n                    <br><br>\n<b>建議用量：</b><br>\n體重 < 10kg，每日給予1包<br>\n體重 > 10kg，每日給予2包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n24個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>'),
(302,'沛威狗保健-顧關節 30入/盒',1380,3,18,'2023-05-25 14:33:10','./img/shopping_list/healthy/02/healthy_02_01.jpg,./img/shopping_list/healthy/02/healthy_02_02.jpg,./img/shopping_list/healthy/02/healthy_02_03.jpg,./img/shopping_list/healthy/02/healthy_02_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/02/healthy_02_content.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/02/healthy_02_content02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威狗保健-顧關節</b>\n                    <br><br>\n<b>建議用量：</b><br>\n體重 < 10kg，每日給予一包<br>\n體重 ≧ 10kg，每日給予2~3包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n36個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>'),
(303,'沛威貓保健-護泌尿 30入/盒',1280,3,9,'2023-05-25 14:33:10','./img/shopping_list/healthy/03/healthy_03_01.jpg,./img/shopping_list/healthy/03/healthy_03_02.jpg,./img/shopping_list/healthy/03/healthy_03_03.jpg,./img/shopping_list/healthy/03/healthy_03_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/03/healthy_03_conent.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/03/healthy_03_conent02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威貓保健-護泌尿</b>\n                    <br><br>\n<b>建議用量：</b><br>\n每日給予一包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n36個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>'),
(304,'沛威狗保健-膚健康 30入/盒',1280,3,54,'2023-05-25 14:33:10','./img/shopping_list/healthy/04/healthy_04_01.jpg,./img/shopping_list/healthy/04/healthy_04_02.jpg,./img/shopping_list/healthy/04/healthy_04_03.jpg,./img/shopping_list/healthy/04/healthy_04_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/04/healthy_04_content.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/04/healthy_04_content02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威狗保健-膚健康</b>\n                    <br><br>\n<b>建議用量：</b><br>\n每日給予一包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n36個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>'),
(305,'沛威狗保健-好胃口益生菌 30入/盒',1380,3,15,'2023-05-25 14:33:10','./img/shopping_list/healthy/05/healthy_05_01.jpg,./img/shopping_list/healthy/05/healthy_05_02.jpg,./img/shopping_list/healthy/05/healthy_05_03.jpg,./img/shopping_list/healthy/05/healthy_05_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/05/healthy_05_content.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/05/healthy_05_content02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威狗保健-好胃口益生菌</b>\n                    <br><br>\n<b>建議用量：</b><br>\n每日給予一包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n36個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>'),
(306,'沛威貓保健-好胃口益生菌 30入/盒',1380,3,16,'2023-05-25 14:33:10','./img/shopping_list/healthy/06/healthy_06_01.jpg,./img/shopping_list/healthy/01/healthy_06_02.jpg,./img/shopping_list/healthy/01/healthy_06_03.jpg,./img/shopping_list/healthy/06/healthy_06_04.jpg','            <section class=\"SHOPPINGLIST_ARTICLE\">\n                <img src=\"./img/shopping_list/healthy/06/healthy_06_content.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <img src=\"./img/shopping_list/healthy/06/healthy_06_content02.jpg\" alt=\"\" style=\"width: 70%;margin-left: 214.125px;\">\n                <p style=\"text-align: center;margin-top: 50px;\"><b>沛威貓保健-好胃口益生菌</b>\n                    <br><br>\n<b>建議用量：</b><br>\n體重 < 10kg，每日給予一包<br>\n體重 ≧ 10kg，每日給予2~3包<br>\n<br>\n<b>產地：</b><br>\n100%台灣研發製造\n<br><br>\n<b>保存期限：</b><br>\n36個月\n<br><br>\n<b>注意事項：</b><br>\n本品有使用植物成分，若有顏色變化屬正常反應，請安心使用<br>\n<br></p>\n                \n            </section>');

/*Table structure for table `PRODUCT_CATEGORY` */

DROP TABLE IF EXISTS `PRODUCT_CATEGORY`;

CREATE TABLE `PRODUCT_CATEGORY` (
  `PRODUCT_CATAGORY_ID` int NOT NULL,
  `PRODUCT_CATAGORY` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_CATAGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `PRODUCT_CATEGORY` */

insert  into `PRODUCT_CATEGORY`(`PRODUCT_CATAGORY_ID`,`PRODUCT_CATAGORY`) values 
(1,'乾糧'),
(2,'罐頭'),
(3,'保健食品');

/*Table structure for table `SCHEDULE` */

DROP TABLE IF EXISTS `SCHEDULE`;

CREATE TABLE `SCHEDULE` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DOCTOR_ID` int NOT NULL,
  `WEEK` int NOT NULL,
  `WEEKDAY` int NOT NULL,
  `ROOMNO` int DEFAULT NULL,
  `PERIOD_A` tinyint DEFAULT NULL,
  `PERIOD_B` tinyint DEFAULT NULL,
  `PERIOD_C` tinyint DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_SCHEDULE_DR_ID_idx` (`DOCTOR_ID`),
  CONSTRAINT `FK_SCHEDULE_DR_ID` FOREIGN KEY (`DOCTOR_ID`) REFERENCES `DOCTOR` (`DOCTOR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb3;

/*Data for the table `SCHEDULE` */

insert  into `SCHEDULE`(`ID`,`DOCTOR_ID`,`WEEK`,`WEEKDAY`,`ROOMNO`,`PERIOD_A`,`PERIOD_B`,`PERIOD_C`) values 
(30,1,1,1,0,0,0,0),
(31,1,1,2,3,0,0,1),
(32,1,1,3,3,0,0,1),
(33,1,1,4,1,0,1,1),
(34,1,1,5,1,0,1,1),
(35,1,1,6,0,0,0,0),
(36,1,1,7,0,0,0,0),
(37,1,2,1,0,0,0,0),
(38,1,2,2,3,0,0,1),
(39,1,2,3,3,0,0,1),
(40,1,2,4,1,0,0,1),
(41,1,2,5,1,0,0,1),
(42,1,2,6,1,1,0,0),
(43,1,2,7,0,0,0,0),
(44,1,3,1,0,0,0,0),
(45,1,3,2,3,0,0,1),
(46,1,3,3,3,0,0,1),
(47,1,3,4,1,0,1,1),
(48,1,3,5,1,0,1,1),
(49,1,3,6,1,1,1,0),
(50,1,3,7,0,0,0,0),
(51,2,1,1,0,1,1,0),
(52,2,1,2,0,1,1,0),
(53,2,1,3,0,1,1,0),
(54,2,1,4,0,0,1,1),
(55,2,1,5,0,1,1,0),
(56,2,1,6,0,1,1,0),
(57,2,1,7,0,0,0,0),
(58,2,2,1,0,1,1,0),
(59,2,2,2,0,1,1,0),
(60,2,2,3,0,1,1,0),
(61,2,2,4,0,0,1,1),
(62,2,2,5,0,1,1,0),
(63,2,2,6,0,1,1,0),
(64,2,2,7,0,0,0,0),
(65,2,3,1,0,1,1,0),
(66,2,3,2,0,1,1,0),
(67,2,3,3,0,1,1,0),
(68,2,3,4,0,0,1,1),
(69,2,3,5,0,1,1,0),
(70,2,3,6,0,1,1,0),
(71,2,3,7,0,0,0,0),
(72,3,1,1,2,0,0,1),
(73,3,1,2,3,1,1,0),
(74,3,1,3,3,1,1,0),
(75,3,1,4,0,0,0,0),
(76,3,1,5,2,0,0,1),
(77,3,1,6,1,1,1,0),
(78,3,1,7,0,0,0,0),
(79,3,2,1,2,0,0,1),
(80,3,2,2,3,1,1,0),
(81,3,2,3,3,1,1,0),
(82,3,2,4,0,0,0,0),
(83,3,2,5,2,0,0,1),
(84,3,2,6,0,0,0,0),
(85,3,2,7,0,0,0,0),
(86,3,3,1,2,0,0,1),
(87,3,3,2,3,1,1,0),
(88,3,3,3,3,1,1,0),
(89,3,3,4,2,0,0,1),
(90,3,3,5,2,0,0,1),
(91,3,3,6,0,0,0,0),
(92,3,3,7,0,0,0,0),
(93,4,1,1,1,0,1,1),
(94,4,1,2,1,0,1,1),
(95,4,1,3,2,0,0,1),
(96,4,1,4,3,1,1,0),
(97,4,1,5,3,0,0,1),
(98,4,1,6,0,0,0,0),
(99,4,1,7,0,0,0,0),
(100,4,2,1,1,0,1,1),
(101,4,2,2,1,0,1,1),
(102,4,2,3,2,0,0,1),
(103,4,2,4,3,1,1,0),
(104,4,2,5,0,0,0,0),
(105,4,2,6,3,1,1,0),
(106,4,2,7,0,0,0,0),
(107,4,3,1,1,0,1,1),
(108,4,3,2,1,0,1,1),
(109,4,3,3,2,0,0,1),
(110,4,3,4,3,1,1,0),
(111,4,3,5,0,0,0,0),
(112,4,3,6,0,0,0,0),
(113,4,3,7,0,0,0,0),
(114,5,1,1,3,1,1,0),
(115,5,1,2,0,0,0,0),
(116,5,1,3,1,0,1,1),
(117,5,1,4,3,0,0,1),
(118,5,1,5,3,1,1,0),
(119,5,1,6,2,1,1,0),
(120,5,1,7,0,0,0,0),
(121,5,2,1,3,1,1,0),
(122,5,2,2,0,0,0,0),
(123,5,2,3,1,0,1,1),
(124,5,2,4,3,0,0,1),
(125,5,2,5,3,1,1,0),
(126,5,2,6,0,0,0,0),
(127,5,2,7,0,0,0,0),
(128,5,3,1,3,1,1,0),
(129,5,3,2,0,0,0,0),
(130,5,3,3,1,0,1,1),
(131,5,3,4,3,0,0,1),
(132,5,3,5,3,1,1,0),
(133,5,3,6,3,1,1,0),
(134,5,3,7,0,0,0,0),
(135,6,1,1,3,0,0,1),
(136,6,1,2,2,1,1,0),
(137,6,1,3,2,1,1,0),
(138,6,1,4,2,0,0,1),
(139,6,1,5,0,0,0,0),
(140,6,1,6,3,1,1,0),
(141,6,1,7,0,0,0,0),
(142,6,2,1,3,0,0,1),
(143,6,2,2,2,1,1,0),
(144,6,2,3,2,1,1,0),
(145,6,2,4,2,0,0,0),
(146,6,2,5,3,0,0,1),
(147,6,2,6,0,0,0,0),
(148,6,2,7,0,0,0,0),
(149,6,3,1,3,0,0,1),
(150,6,3,2,2,1,1,0),
(151,6,3,3,2,1,1,0),
(152,6,3,4,0,0,0,0),
(153,6,3,5,3,0,0,1),
(154,6,3,6,0,0,0,0),
(155,6,3,7,0,0,0,0),
(156,7,1,1,2,1,1,0),
(157,7,1,2,2,0,0,1),
(158,7,1,3,0,0,0,0),
(159,7,1,4,2,1,1,0),
(160,7,1,5,2,1,1,0),
(161,7,1,6,0,0,0,0),
(162,7,1,7,0,0,0,0),
(163,7,2,1,2,1,1,0),
(164,7,2,2,2,0,0,1),
(165,7,2,3,0,0,0,0),
(166,7,2,4,2,1,1,0),
(167,7,2,5,2,0,0,1),
(168,7,2,6,2,0,0,1),
(169,7,2,7,0,0,0,0),
(170,7,3,1,2,1,1,0),
(171,7,3,2,2,0,0,1),
(172,7,3,3,0,0,0,0),
(173,7,3,4,2,1,1,0),
(174,7,3,5,2,0,0,0),
(175,7,3,6,2,0,0,1),
(176,7,3,7,0,0,0,0);

/*Table structure for table `STAY` */

DROP TABLE IF EXISTS `STAY`;

CREATE TABLE `STAY` (
  `STAY_ID` int NOT NULL AUTO_INCREMENT,
  `PET_ID` int NOT NULL,
  `STAY_FROM` date NOT NULL,
  `STAY_TO` date NOT NULL,
  `APP_ID` int NOT NULL,
  PRIMARY KEY (`STAY_ID`),
  KEY `FK_STAY_PET_ID_idx` (`PET_ID`),
  CONSTRAINT `FK_STAY_PET_ID` FOREIGN KEY (`PET_ID`) REFERENCES `PET` (`PET_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

/*Data for the table `STAY` */

insert  into `STAY`(`STAY_ID`,`PET_ID`,`STAY_FROM`,`STAY_TO`,`APP_ID`) values 
(6,25,'2023-06-04','2023-06-05',8),
(7,27,'2023-06-04','2023-06-05',9),
(8,28,'2023-06-01','2023-06-03',10),
(9,29,'2023-06-18','2023-06-21',11),
(10,30,'2023-06-15','2023-07-14',12),
(11,32,'2023-06-03','2023-06-04',13);

/*Table structure for table `USER` */

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(16) NOT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  `CREATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP,
  `PHONE_NO` varchar(45) DEFAULT NULL,
  `BIRTHDAY` date DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `IMG_SOURCE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `USER` */

insert  into `USER`(`USER_ID`,`USER_NAME`,`EMAIL`,`PASSWORD`,`CREATE_DATE`,`PHONE_NO`,`BIRTHDAY`,`ADDRESS`,`IMG_SOURCE`) values 
(1,'thd101no1','thd101no1@gmail.com','no1','2023-06-05 20:29:14','0900000000','1994-12-31','100台北市中正區濟南路一段321號','');

/*Table structure for table `VACCINATION` */

DROP TABLE IF EXISTS `VACCINATION`;

CREATE TABLE `VACCINATION` (
  `VACCINATION_ID` int NOT NULL AUTO_INCREMENT,
  `Vaccinationcol_Pet_ID` int NOT NULL,
  `Vaccination_CATAGORY_ID` int NOT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `Vaccinationcol_formID` int NOT NULL,
  `APP_ID` int NOT NULL,
  PRIMARY KEY (`VACCINATION_ID`),
  KEY `FK_VACC_VACC_CATA_idx` (`Vaccination_CATAGORY_ID`),
  KEY `FK_VACC_PET_ID_idx` (`Vaccinationcol_Pet_ID`),
  CONSTRAINT `FK_VACC_PET_ID` FOREIGN KEY (`Vaccinationcol_Pet_ID`) REFERENCES `PET` (`PET_ID`),
  CONSTRAINT `FK_VACC_VACC_CATA` FOREIGN KEY (`Vaccination_CATAGORY_ID`) REFERENCES `VACCINATION_CATEGORY` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `VACCINATION` */

insert  into `VACCINATION`(`VACCINATION_ID`,`Vaccinationcol_Pet_ID`,`Vaccination_CATAGORY_ID`,`CREATE_DATE`,`Vaccinationcol_formID`,`APP_ID`) values 
(1,28,2,'2023-06-02 21:26:15',0,17),
(2,29,2,'2023-06-02 21:26:15',0,18);

/*Table structure for table `VACCINATION_CATEGORY` */

DROP TABLE IF EXISTS `VACCINATION_CATEGORY`;

CREATE TABLE `VACCINATION_CATEGORY` (
  `ID` int NOT NULL,
  `VACCINATION_CATAGORY` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `VACCINATION_CATEGORY` */

insert  into `VACCINATION_CATEGORY`(`ID`,`VACCINATION_CATAGORY`) values 
(1,'貓小病毒/貓瘟病毒'),
(2,'貓第一型皰疹病毒'),
(3,'貓卡里西病毒'),
(4,'狂犬病'),
(5,'犬出血性腸炎'),
(6,'犬瘟熱'),
(7,'犬傳染性支氣管炎');

/*Table structure for table `VOUCHER` */

DROP TABLE IF EXISTS `VOUCHER`;

CREATE TABLE `VOUCHER` (
  `VOUCHER_ID` int NOT NULL,
  `VOUCHER_TITLE` varchar(45) NOT NULL,
  `VOUCHER_CONTENT` varchar(150) NOT NULL,
  PRIMARY KEY (`VOUCHER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `VOUCHER` */

insert  into `VOUCHER`(`VOUCHER_ID`,`VOUCHER_TITLE`,`VOUCHER_CONTENT`) values 
(1,'運費優惠券','滿1000 免運'),
(2,'滿額折扣優惠券','滿3000 8折優惠');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
