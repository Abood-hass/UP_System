<?php
// connect to mongodb
$m = new MongoClient();
// select a database
$db = $m->examplesdb;

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>view clients</title>

</head>

<body>
    <!-- show data -->
    <table class="table">
        <thead>
        <tr>
              <th>Name</th>
              <th>Academic ID</th>
              <th data-priority="1">Email</th>
              <th data-priority="2">Phone Number</th>
              <th data-priority="3">Employment type</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $result = $conn->query("SELECT * FROM `clients_site1` WHERE 1");
            while ($row = $result->fetch_assoc()) {
                echo '<tr> <td>' . $row['id'] . '</td><td>' . $row['ip'] . '</td><td>' . $row['time'] . '</td><td>' . $row['url'] . '</td></tr>';
            }
            ?>
        </tbody>
    </table>
</body>

</html>