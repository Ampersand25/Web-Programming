<?php
function checkDecisiveMove($cell11, $cell12, $cell13, $cell21, $cell22, $cell23, $cell31, $cell32, $cell33, $symbol) {
	// FIRST LINE/ROW
	if ($cell11 === $cell12 && $cell11 === $symbol && $cell13 === "-") {
		return "13";
	}
	
	if ($cell11 === $cell13 && $cell11 === $symbol && $cell12 === "-") {
		return "12";
	}
	
	if ($cell12 === $cell13 && $cell12 === $symbol && $cell11 === "-") {
		return "11";
	}
	
	// SECOND LINE/ROW
	if ($cell21 === $cell22 && $cell21 === $symbol && $cell23 === "-") {
		return "23";
	}
	
	if ($cell21 === $cell23 && $cell21 === $symbol && $cell22 === "-") {
		return "22";
	}
	
	if ($cell22 === $cell23 && $cell22 === $symbol && $cell21 === "-") {
		return "21";
	}
	
	// THIRD LINE/ROW
	if ($cell31 === $cell32 && $cell31 === $symbol && $cell33 === "-") {
		return "33";
	}
	
	if ($cell31 === $cell33 && $cell31 === $symbol && $cell32 === "-") {
		return "32";
	}
	
	if ($cell32 === $cell33 && $cell32 === $symbol && $cell31 === "-") {
		return "31";
	}
	
	// FIRST COLUMN
	if ($cell11 === $cell21 && $cell11 === $symbol && $cell31 === "-") {
		return "31";
	}
	
	if ($cell11 === $cell31 && $cell11 === $symbol && $cell21 === "-") {
		return "21";
	}
	
	if ($cell21 === $cell31 && $cell21 === $symbol && $cell11 === "-") {
		return "11";
	}
	
	// SECOND COLUMN
	if ($cell12 === $cell22 && $cell32 === $symbol && $cell32 === "-") {
		return "32";
	}
	
	if ($cell12 === $cell32 && $cell12 === $symbol && $cell22 === "-") {
		return "22";
	}
	
	if ($cell22 === $cell32 && $cell22 === $symbol && $cell12 === "-") {
		return "12";
	}
	
	// THIRD COLUMN
	if ($cell13 === $cell23 && $cell13 === $symbol && $cell33 === "-") {
		return "33";
	}
	
	if ($cell13 === $cell33 && $cell13 === $symbol && $cell23 === "-") {
		return "23";
	}
	
	if ($cell23 === $cell33 && $cell23 === $symbol && $cell13 === "-") {
		return "13";
	}
	
	// FIRST DIAGONAL
	if ($cell11 === $cell22 && $cell11 === $symbol && $cell33 === "-") {
		return "33";
	}
	
	if ($cell11 === $cell33 && $cell11 === $symbol && $cell22 === "-") {
		return "22";
	}
	
	if ($cell22 === $cell33 && $cell22 === $symbol && $cell11 === "-") {
		return "11";
	}
	
	// SECOND DIAGONAL
	if ($cell13 === $cell22 && $cell13 === $symbol && $cell31 === "-") {
		return "31";
	}
	
	if ($cell13 === $cell31 && $cell13 === $symbol && $cell22 === "-") {
		return "22";
	}
	
	if ($cell22 === $cell31 && $cell22 === $symbol && $cell13 === "-") {
		return "13";
	}
	
	return "false";
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($data === null) {
	echo "[X]Error decoding JSON data: ".json_last_error_msg();
}
else {
	if (count($data) === 11) {
		$cell11 = $data[0];
		$cell12 = $data[1];
		$cell13 = $data[2];
	
		$cell21 = $data[3];
		$cell22 = $data[4];
		$cell23 = $data[5];
	
		$cell31 = $data[6];
		$cell32 = $data[7];
		$cell33 = $data[8];
		
		$computer = $data[9];
		$player = $data[10];
		
		$rez = checkDecisiveMove($cell11, $cell12, $cell13, $cell21, $cell22, $cell23, $cell31, $cell32, $cell33, $computer);
		if ($rez !== "false") {
			echo $rez;
			exit;
		}
		
		$rez = checkDecisiveMove($cell11, $cell12, $cell13, $cell21, $cell22, $cell23, $cell31, $cell32, $cell33, $player);
		if ($rez !== "false") {
			echo $rez;
			exit;
		}
		
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