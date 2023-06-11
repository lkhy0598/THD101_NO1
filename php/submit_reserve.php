<?php

// include ('conn.php');
include ('connServer.php');

$reserveType=$_POST['RESERVE_TYPE'];
$doctorChoices=$_POST['DOCTOR_CHOICES'];
$reserveDate=$_POST['RESERVE_DATE'];
$reserveTime=$_POST['RESERVE_TIME'];
$ownerName=$_POST['OWNER_NAME'];
$phoneno=$_POST['PHONENO'];
$petName=$_POST['PET_NAME'];
$petSpecies=$_POST['PET_SPECIES'];
$petAge=$_POST['PET_AGE'];
$vaccinationOrNot=$_POST['VACCINATION_OR_NOT'];
$selectedIllnessSign=$_POST['SELECTED_ILLNESS_SIGN'];
$otherIllnessSign=$_POST['OTHER_ILLNESS_SIGN'];

//建立SQL語法

$sql = "INSERT INTO `RESERVE`
(`RESERVE_TYPE`,`DOCTOR_CHOICES`,`RESERVE_DATE`,`RESERVE_TIME`,`OWNER_NAME`,`PHONENO`,`PET_NAME`,`PET_SPECIES`,`PET_AGE`,`VACCINATION_OR_NOT`,`SELECTED_ILLNESS_SIGN`,`OTHER_ILLNESS_SIGN`)
VALUES
('$reserveType',
'$doctorChoices',
'$reserveDate',
'$reserveTime',
'$ownerName',
'$phoneno',
'$petName',
'$petSpecies',
'$petAge',
'$vaccinationOrNot',
'$selectedIllnessSign',
'$otherIllnessSign')";

$statement = $pdo->query($sql);
$data = $statement->fetchAll();
print_r($data);

ini_set("display_errors", "On");
echo 30;
?>