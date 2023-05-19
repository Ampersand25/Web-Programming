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
    die("[X] Connection failed to MySQL: ".$conn->connect_error."!");
}

$sql = "SELECT COUNT(*) AS `numar_total_clienti` FROM `clienti`";
$result = $conn->query($sql);

if ($result === false) {
    die("[X] Error executing the query: ".$conn->error);
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $numarTotalClienti = $row['numar_total_clienti'];

    echo $numarTotalClienti;
}

$conn->close();
?>