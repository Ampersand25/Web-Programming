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
		
		$player = $data[9];
		$computer = $data[10];
		
		if ($cell11 === $cell12 && $cell12 === $cell13) {
			if ($cell11 === $player) {
				echo "player";
				exit;
			}
			else if ($cell11 === $computer) {
				echo "computer";
				exit;
			}
		}
		if ($cell21 === $cell22 && $cell22 === $cell23) {
			if ($cell21 === $player) {
				echo "player";
				exit;
			}
			else if ($cell21 === $computer) {
				echo "computer";
				exit;
			}
		}
		if ($cell31 === $cell32 && $cell32 === $cell33) {
			if ($cell31 === $player) {
				echo "player";
				exit;
			}
			else if ($cell31 === $computer) {
				echo "computer";
				exit;
			}
		}
		
		if ($cell11 === $cell22 && $cell22 === $cell33) {
			if ($cell11 === $player) {
				echo "player";
				exit;
			}
			else if ($cell11 === $computer) {
				echo "computer";
				exit;
			}
		}
		if ($cell13 === $cell22 && $cell22 === $cell31) {
			if ($cell13 === $player) {
				echo "player";
				exit;
			}
			else if ($cell13 === $computer) {
				echo "computer";
				exit;
			}
		}
		
		if ($cell11 === $cell21 && $cell21 === $cell31) {
			if ($cell11 === $player) {
				echo "player";
				exit;
			}
			else if ($cell11 === $computer) {
				echo "computer";
				exit;
			}
		}
		if ($cell12 === $cell22 && $cell22 === $cell32) {
			if ($cell12 === $player) {
				echo "player";
				exit;
			}
			else if ($cell12 === $computer) {
				echo "computer";
				exit;
			}
		}
		if ($cell13 === $cell23 && $cell23 === $cell33) {
			if ($cell13 === $player) {
				echo "player";
				exit;
			}
			else if ($cell13 === $computer) {
				echo "computer";
				exit;
			}
		}
		
		if ($cell11 !== "-" && $cell12 !== "-" && $cell13 !== "-" &&
			$cell21 !== "-" && $cell22 !== "-" && $cell23 !== "-" &&
			$cell31 !== "-" && $cell32 !== "-" && $cell33 !== "-") {
			echo "draw";
		}
		else {
			echo "false";
		}
	}
	else {
		echo "[!]Invalid data length!";
	}
}
?>