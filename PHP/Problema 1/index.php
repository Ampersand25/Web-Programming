<!--
    http://localhost:80/Lab6PHP/Lab6PHP1

    EXEMPLE:
    Targu Mures -> Bucuresti Nord
    Iasi -> Brasov
    Ploiesti -> Mioveni
    Iasi -> Timisoara Nord
-->

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Laborator 6 PHP Problema 1</title>
    <link rel="stylesheet" type="text/css" href="style.css?v=1.9">
</head>
<body>
    <div class="title-container">
        <h1><u>Problema 1 PHP</u></h1>
    </div>

    <br>

    <div class="main-div">
        <fieldset>
            <legend><b>Optiuni cautare</b></legend>

            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET">
                <div class="selectare-sosire-div">
                    <label for="localitate_plecare">Localitatea de plecare: </label>
                    <input type="text" name="localitate_plecare" placeholder="Introduceti statia sursa...">
                </div>
                
                <br>

                <div class="selectare-destinatie-div">
                    <label for="localitate_sosire">Localitatea de sosire: </label>
                    <input type="text" name="localitate_sosire" placeholder="Introduceti statia destinatie...">
                </div>

                <br>

                <div class="alegere-tip-cursa-div">
                    <label class="checkbox">
                        <input type="checkbox" name="tip_curse" checked>
                        <span class="checkmark"></span>
                        Curse directe
                    </label>
                </div>

                <br>

                <input type="submit" value="Cautare curse" name="submit">
            </form>
        </fieldset>
    </div>
</body>
</html>

<?php
    $sursa = htmlspecialchars(trim($_GET["localitate_plecare"]));
    $destinatie = htmlspecialchars(trim($_GET["localitate_sosire"]));

    echo "<fieldset><legend><b>Rezultate cautare</b></legend>";

    if (isset($sursa) && isset($destinatie)) {
        if ($sursa == "" || $destinatie == "") {
            if ($sursa == "" && $destinatie == "") {
                echo "<span>Nu au fost introduse cele doua orase (sursa si destinatie)!</span><br>";
            }
            else if ($sursa == "") {
                echo "<span>Nu a fost introdus orasul de plecare (sursa)!</span><br>";
            }
            else {
                echo "<span>Nu a fost introdus orasul de sosire (destinatie)!</span><br>";
            }

            return;
        }

        define("SERVERNAME", "localhost");
        define("USERNAME", "root");
        define("PASSWORD", "BacktrackingGOD314#");
        define("DBNAME", "sql_pw_php");

        $conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
        if ($conn->connect_error) {
            exit("[X]Connection failed to MySQL: " . $conn->connect_error . "!");
        }

        $sql1 = "SELECT `nr_tren`, `tip_tren`, `ora_plecare`, `ora_sosire` from `trenuri` WHERE `localitate_plecare` = ? AND `localitate_sosire` = ?;";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param("ss", $sursa, $destinatie);
        $stmt1->execute();
        $result1 = $stmt1->get_result();

        if ($result1->num_rows > 0) {
            echo "<span>Curse <u>directe</u> de la \"$sursa\" la \"$destinatie\":</span><br><br>";
            $i = 1;
            while ($row1 = $result1->fetch_assoc()) {
                $nr_tren = $row1["nr_tren"];
                $tip_tren = $row1["tip_tren"];
                $ora_plecare = $row1["ora_plecare"];
                $ora_sosire = $row1["ora_sosire"];
                
                echo "<span>Trenul $i:<ul><li><u>numar tren</u>: <em>$nr_tren</em></li><li><u>tip tren</u>: <em>$tip_tren</em></li><li><u>ora plecare</u>: <em>$ora_plecare</em></li><li><u>ora sosire</u>: <em>$ora_sosire</em></li></ul></span>";

                $i++;
            }
        }
        else {
            echo "<span>Nu exista curse <u>directe</u> de la \"$sursa\" la \"$destinatie\"!</span><br>";
        }

        $stmt1->close();

        if (!isset($_GET["tip_curse"])) {
            // CURSE CU LEGATURA
            
            echo "<br>";

            $sql2 = "SELECT `localitate_sosire`, `nr_tren`, `tip_tren`, `ora_plecare`, `ora_sosire` from `trenuri` WHERE `localitate_plecare` = ? ORDER BY `localitate_sosire`;";
            $stmt2 = $conn->prepare($sql2);
            $stmt2->bind_param("s", $sursa);
            $stmt2->execute();
            $result2 = $stmt2->get_result();

            $curse_cu_legatura = false;
            $oras_inexistent = false;

            if ($result2->num_rows > 0) {
                while ($row2 = $result2->fetch_assoc()) {
                    $localitate_intermediara = $row2["localitate_sosire"];
                    $nr_tren_sursa_intermediar = $row2["nr_tren"];
                    $tip_tren_sursa_intermediar = $row2["tip_tren"];
                    $ora_plecare_sursa_intermediar = $row2["ora_plecare"];
                    $ora_sosire_sursa_intermediar = $row2["ora_sosire"];
                    
                    $sql3 = "SELECT `nr_tren`, `tip_tren`, `ora_plecare`, `ora_sosire` from `trenuri` WHERE `localitate_plecare` = ? AND `localitate_sosire` = ?;";
                    $stmt3 = $conn->prepare($sql3);
                    $stmt3->bind_param("ss", $localitate_intermediara, $destinatie);
                    $stmt3->execute();
                    $result3 = $stmt3->get_result();
                    
                    if ($result3->num_rows > 0) {
                        echo "<span>Curse <u>cu legatura</u> de la \"$sursa\" la \"$destinatie\" prin \"$localitate_intermediara\":</span><br><br>";
                        while ($row3 = $result3->fetch_assoc()) {
                            $curse_cu_legatura = true;

                            $nr_tren_intermediar_destinatie = $row3["nr_tren"];
                            $tip_tren_intermediar_destinatie = $row3["tip_tren"];
                            $ora_plecare_intermediar_destinatie = $row3["ora_plecare"];
                            $ora_sosire_intermediar_destinatie = $row3["ora_sosire"];
                            
                            echo "<span>Trenul \"$sursa\" - \"$localitate_intermediara\":<ul><li><u>numar tren</u>: <em>$nr_tren_sursa_intermediar</em></li><li><u>tip tren</u>: <em>$tip_tren_sursa_intermediar</em></li><li><u>ora plecare</u>: <em>$ora_plecare_sursa_intermediar</em></li><li><u>ora sosire</u>: <em>$ora_sosire_sursa_intermediar</em></li></ul></span>";
                            echo "<span>Trenul \"$localitate_intermediara\" - \"$destinatie\":<ul><li><u>numar tren</u>: <em>$nr_tren_intermediar_destinatie</em></li><li><u>tip tren</u>: <em>$tip_tren_intermediar_destinatie</em></li><li><u>ora plecare</u>: <em>$ora_plecare_intermediar_destinatie</em></li><li><u>ora sosire</u>: <em>$ora_sosire_intermediar_destinatie</em></li></ul></span>";
                        }
                    }

                    $stmt3->close();
                }
            }
            else {
                echo "<span>Nu exista curse cu plecare de la \"$sursa\" (orasul \"$sursa\" nu exista in baza de date)!</span><br>";
                $oras_inexistent = true;
            }

            if (!$curse_cu_legatura && !$oras_inexistent) {
                echo "<span>Nu exista curse <u>cu legatura</u> de la \"$sursa\" la \"$destinatie\"!</span><br><br>";
            }

            $stmt2->close();
        }

        $conn->close();
    }

    echo "</fieldset>";
?>