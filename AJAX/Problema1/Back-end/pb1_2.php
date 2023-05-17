<?php
$servername = "localhost";
$username = "root";
$password = "BacktrackingGOD314#";
$dbname = "sql_pw_ajax";

header("Access-Control-Allow-Origin: *");

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	exit("[X]Connection failed to MySQL: ".$conn->connect_error);
}

$plecare = $_GET['plecare'];
if (isset($plecare)) {
	$sql = "SELECT `sosire` from `trenuri` WHERE `plecare`='$plecare';";
	$result = $conn->query($sql);
	
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			$sosire = $row['sosire'];
			
			echo "$sosire<br>";
		}
    }
	else {
		echo "[!]Nu exista tren cu plecare de la $plecare!";
	}
}
else {
	exit("[X]Missing 'plecare' parameter.");
}

$conn->close();
?>