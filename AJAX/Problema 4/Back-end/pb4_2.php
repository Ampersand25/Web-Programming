<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($data === null) {
	echo "[X]Error decoding JSON data: ".json_last_error_msg();
}
else {
	if (count($data) === 9) {
		$cell11 = $data[0];
		$cell12 = $data[1];
		$cell13 = $data[2];
	
		$cell21 = $data[3];
		$cell22 = $data[4];
		$cell23 = $data[5];
	
		$cell31 = $data[6];
		$cell32 = $data[7];
		$cell33 = $data[8];
		
		$matrix = [[$cell11, $cell12, $cell13], [$cell21, $cell22, $cell23], [$cell31, $cell32, $cell33]];
		
		$randomRow = random_int(1, 3);
		$randomCol = random_int(1, 3);
		
		while ($matrix[$randomRow - 1][$randomCol - 1] !== "-") {
			$randomRow = random_int(1, 3);
			$randomCol = random_int(1, 3);
		}
		
		echo "$randomRow"."$randomCol";
	}
	else {
		echo "[!]Invalid data length!";
	}
}
?>