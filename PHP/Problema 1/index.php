<!--
    http://localhost:80/Lab6PHP/

    EXEMPLE:
    Targu Mures -> Bucuresti Nord
    Iasi -> Brasov
    Bucuresti Nord -> Cluj-Napoca
    Ploiesti -> Mioveni
    Iasi -> Timisoara Nord
-->

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Laborator 6 PHP Problema 1</title>
    <link rel="stylesheet" type="text/css" href="style.css?v=1.8">
</head>
<body>
    <div class="title-container">
        <h1><u>Problema 1 PHP</u></h1>
    </div>

    <br>

    <div class="main-div">
        <fieldset>
            <legend>Optiuni cautare</legend>

            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET">
                <div class="selectare-sosire-div">
                    <label for="localitate_plecare">Localitatea de plecare: </label>
                    <input type="text" name="localitate_plecare" placeholder="Introduceti statia sursa...">
                </div>
                
                <div class="selectare-destinatie-div">
                    <label for="localitate_sosire">Localitatea de sosire: </label>
                    <input type="text" name="localitate_sosire" placeholder="Introduceti statia destinatie...">
                </div>

                <div class="alegere-tip-cursa-div">
                    <label class="checkbox">
                        <input type="checkbox" name="tip_curse" checked>
                        <span class="checkmark"></span>
                        Curse directe
                    </label>
                </div>

                <input type="submit" value="Cautare curse" name="submit">
            </form>
        </fieldset>
    </div>
</body>
</html>

<?php
    $sursa = htmlspecialchars(trim($_GET["localitate_plecare"]));
    $destinatie = htmlspecialchars(trim($_GET["localitate_sosire"]));

    echo "<fieldset><legend>Rezultate cautare</legend>";

    if (isset($sursa) && isset($destinatie)) {
        if ($sursa == "" || $destinatie == "") {
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
                $nr_tren = $row1['nr_tren'];
                $tip_tren = $row1['tip_tren'];
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

            if ($result2->num_rows > 0) {
                while ($row2 = $result2->fetch_assoc()) {
                    $localitate_intermediara = $row2['localitate_sosire'];
                    $nr_tren1 = $row2['nr_tren'];
                    $tip_tren1 = $row2['tip_tren'];
                    $ora_plecare1 = $row2["ora_plecare"];
                    $ora_sosire1 = $row2["ora_sosire"];
                    
                    $sql3 = "SELECT `nr_tren`, `tip_tren`, `ora_plecare`, `ora_sosire` from `trenuri` WHERE `localitate_plecare` = ? AND `localitate_sosire` = ?;";
                    $stmt3 = $conn->prepare($sql3);
                    $stmt3->bind_param("ss", $localitate_intermediara, $destinatie);
                    $stmt3->execute();
                    $result3 = $stmt3->get_result();
                    
                    if ($result3->num_rows > 0) {
                        echo "<span>Curse <u>cu legatura</u> de la \"$sursa\" la \"$destinatie\" prin \"$localitate_intermediara\":</span><br><br>";
                        while ($row3 = $result3->fetch_assoc()) {
                            $nr_tren2 = $row3['nr_tren'];
                            $tip_tren2 = $row3['tip_tren'];
                            $ora_plecare2 = $row3["ora_plecare"];
                            $ora_sosire2 = $row3["ora_sosire"];
                            
                            echo "<span>Trenul \"$sursa\" - \"$localitate_intermediara\":<ul><li><u>numar tren</u>: <em>$nr_tren1</em></li><li><u>tip tren</u>: <em>$tip_tren1</em></li><li><u>ora plecare</u>: <em>$ora_plecare1</em></li><li><u>ora sosire</u>: <em>$ora_sosire1</em></li></ul></span>";
                            echo "<span>Trenul \"$localitate_intermediara\" - \"$destinatie\":<ul><li><u>numar tren</u>: <em>$nr_tren2</em></li><li><u>tip tren</u>: <em>$tip_tren2</em></li><li><u>ora plecare</u>: <em>$ora_plecare2</em></li><li><u>ora sosire</u>: <em>$ora_sosire2</em></li></ul></span>";
                        }
                    }
                    else if ($localitate_intermediara != $destinatie) {
                        echo "<span>Nu exista curse <u>cu legatura</u> de la \"$sursa\" la \"$destinatie\" prin \"$localitate_intermediara\"!</span><br><br>";
                    }

                    $stmt3->close();
                }
            }
            else {
                echo "<span>Nu exista curse <u>cu legatura</u> de la \"$sursa\" la \"$destinatie\"!</span><br>";
            }

            $stmt2->close();
        }

        $conn->close();
    }

    echo "</fieldset>";
?>