<?php
  try {
    $yhteys = new PDO("mysql:host=mysql;dbname=ika_team", "root", "yaruKaidouPhoohi9aef9Joo6Gimoh0a");
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

  function getColors() {
    global $yhteys;
    $kysely = $yhteys->prepare("SELECT username, color FROM members");
    $kysely->execute();
    $colors = Array();
    while ($rivi = $kysely->fetch()) {
      $colors[$rivi["username"]] = $rivi["color"];
    }
    return $colors;
  }
?>
