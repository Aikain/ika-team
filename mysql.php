<?php
  try {
    $yhteys = new PDO("mysql:host=localhost;dbname=ika_team", "ika-team", "yaruKaidouPhoohi9aef9Joo6Gimoh0a");
  } catch (PDOException $e) {
    die("VIRHE: " . $e->getMessage());
  }
  $yhteys->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $yhteys->exec("SET NAMES utf8");

  function getUser($id) {
    global $yhteys;
    $kysely = $yhteys->prepare("SELECT * FROM members WHERE id = ?");
    $kysely->execute(array($id));
    return $kysely->fetch();
  }
?>
