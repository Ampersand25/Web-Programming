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

$data = json_decode(file_get_contents('php://input'), true);
$n = $data['n'];
$number_of_records = $data['current_records'] - $n;

if (isset($n) && isset($number_of_records)) {
	$sql = "SELECT * FROM `clienti` LIMIT $n OFFSET $number_of_records;";
	$result = $conn->query($sql);
	
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			$nume = $row['nume'];
			$prenume = $row['prenume'];
			$telefon = $row['telefon'];
			$email = $row['email'];
			
			echo "$nume|$prenume|$telefon|$email<br>";
		}
    }
	else {
		echo "[!]There are no records (clients)!";
	}
}
else {
    exit("[X] Missing 'n' or/and 'number_of_records' parameter(s)!");
}

$conn->close();
?>