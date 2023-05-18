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
    exit("[X] Connection failed to MySQL: ".$conn->connect_error."!");
}

$data = json_decode(file_get_contents('php://input'), true);
$plecare = $data['plecare'];

if (isset($plecare)) {
    $sql = "SELECT `plecare` from `trenuri` WHERE `sosire`='$plecare';";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $sosire = $row['plecare'];

            echo "$sosire<br>";
        }
    }
	else {
        echo "[!] Nu exista tren cu sosire la $plecare!";
    }
}
else {
    exit("[X] Missing 'plecare' parameter!");
}

$conn->close();
?>