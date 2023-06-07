<!--
    SERVER: http://localhost:80/Lab6PHP/Lab6PHP2
-->

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Laborator 6 PHP Problema 2</title>
    <link rel="stylesheet" type="text/css" href="style.css?v=1.4">
</head>
<body>
    <div class="title-container">
        <h1><u>Problema 2 PHP</u></h1>
    </div>

    <br>

    <div class="main-div">
        <fieldset>
            <legend><b>Optiuni vizualizare produse</b></legend>

            <div class="form-container">
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET">
                    <div class="combo-box-container">
                        <label for="numar-produse-pagina">Numar de produse per pagina: </label>
                        <select name="numar-produse-pagina">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>

                    <br><br>

                    <div class="submit-button-container">
                        <input type="submit" value="Vizualizare produse">
                    </div>
                </form>
            </div>

            <br>

            <div class="navigation-controls-container">
                <a id="first-link" class="links" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=1">Prev</a>
                <a id="second-link" class="links" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=2">Next</a>
            </div>
        </fieldset>
    </div>
</body>
</html>

<?php
    if ($_SERVER["REQUEST_METHOD"] != "GET")
        return;

    session_start();

    $servername = "localhost";
    $username = "root";
    $password = "BacktrackingGOD314#";
    $dbname = "sql_pw_php";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("[X]Connection failed to MySQL: " . $conn->connect_error . "!");
    }

    $sql = "SELECT COUNT(*) AS `total` FROM `produse`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        if ($row = $result->fetch_assoc()) {
            $total = $row["total"];
            $_SESSION["total_number_of_records"] = $total;
        }
    }

    echo "<fieldset><legend><b>Vizualizare produse (sub forma de tabel)</b></legend>";
    echo "<div class=\"products-table-container\">";
    echo "<table><thead><tr><th>Nume</th><th>Tip</th><th>Material</th><th>Culoare</th><th>Pret</th></tr></thead><tbody>";

    if (isset($_GET['action'])) {
        $action = htmlspecialchars(trim($_GET["action"]));

        $n = $_SESSION["number_of_items_per_page"];
        $page = $_SESSION["current_page"];
        
        if ($action == 1) {
            if ($page) {
                // GET PREVIOUS ITEMS/PRODUCTS
                $page -= $n;
            }
        } else if ($action == 2) {
            $total = $_SESSION["total_number_of_records"];
            if ($page + $n < $total) {
                // GET NEXT ITEMS/PRODUCTS
                $page += $n;
            }
        }

        $sql = "SELECT `nume`, `tip`, `material`, `culoare`, `pret` FROM `produse` LIMIT ? OFFSET ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ii", $n, $page);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $nume = $row["nume"];
                    $tip = $row["tip"];
                    $material = $row["material"];
                    $culoare = $row["culoare"];
                    $pret = $row["pret"];

                    echo "<tr><td>$nume</td><td>$tip</td><td>$material</td><td>$culoare</td><td>$pret</td></tr>";
                }
            }

            $stmt->close();
        }
        else {
            die("[X]Failed to prepare the statement: " . $conn->error . "!");
        }

        $_SESSION["current_page"] = $page;
    }
    else {
        if (isset($_GET["numar-produse-pagina"])) {
            $n =  htmlspecialchars(trim($_GET["numar-produse-pagina"]));

            $_SESSION["number_of_items_per_page"] = $n;
            $_SESSION["current_page"] = 0;

            $sql = "SELECT `nume`, `tip`, `material`, `culoare`, `pret` FROM `produse` LIMIT ?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("i", $n);
                $stmt->execute();

                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $nume = $row["nume"];
                        $tip = $row["tip"];
                        $material = $row["material"];
                        $culoare = $row["culoare"];
                        $pret = $row["pret"];

                        echo "<tr><td>$nume</td><td>$tip</td><td>$material</td><td>$culoare</td><td>$pret</td></tr>";
                    }
                }

                $stmt->close();
            }
            else {
                die("[X]Failed to prepare the statement: " . $conn->error . "!");
            }
        }
    }

    $conn->close();

    echo "</tbody></table>";
    echo "</div>";
    echo "</fieldset>";
?>