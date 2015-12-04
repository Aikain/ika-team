<?php
  $ajax = true;
  include("login_success.php");
  include("mysql.php");
  if (isset($_REQUEST["id"])) {
    $kysely = $yhteys->prepare("SELECT text FROM paste WHERE id = ? ");
    $kysely->execute(array($_REQUEST["id"]));
    $rivi = $kysely->fetch();
    if ($rivi) echo $rivi["text"];
    else http_response_code(404);
  } else if (isset($_REQUEST["text"])) {
    $kysely = $yhteys->prepare("INSERT INTO paste (text) VALUES (?)");
    $kysely->execute(array($_REQUEST["text"]));
    $kysely = $yhteys->prepare("SELECT id FROM paste WHERE text = ?");
    $kysely->execute(array($_REQUEST["text"]));
    echo $kysely->fetch()["id"];
  } else {
    die("Viallinen kysely");
  }
  $sql = "INSERT INTO paste (text) VALUES (?)";

?>
