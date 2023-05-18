<?php
$servername = "localhost";
$username   = "root";
$password   = "BacktrackingGOD314#";
$dbname     = "sql_pw_ajax";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    exit("[X]Connection failed to MySQL: ".$conn->connect_error."!");
}

$sql = "SELECT `plecare` AS `oras`
		FROM `trenuri`
		UNION
		SELECT `sosire`
		FROM `trenuri`;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $statie = $row['oras'];
        
        echo "$statie<br>";
    }
}

$conn->close();
?>