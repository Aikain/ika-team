<?php
  $ajax = true;
  include("login_success.php");
  include("mysql.php");

  $jpl = isset($_REQUEST["join-part-leave"]) ? "1" : "0";
  $mode = isset($_REQUEST["mode"]) ? "1" : "0";
  $nickchange = isset($_REQUEST["nickchange"]) ? "1" : "0";
  $nickcolor = isset($_REQUEST["nickcolor"]) ? "1" : "0";
  $color = isset($_REQUEST["color"]) ? $_REQUEST["color"] : $_SESSION["user"]["color"];
  $id = $_SESSION["user"]["id"];

  $sql = "UPDATE members SET jpl = ?, mode = ?, nickchange = ?, nickcolor = ?, color = ? WHERE id = ?";
  $kysely = $yhteys->prepare($sql);
  $kysely->execute(array($jpl, $mode, $nickchange, $nickcolor, $color, $id));
  $kysely = $yhteys->prepare("SELECT id, username, jpl, mode, nickchange, nickcolor, color FROM members WHERE id = ?");
  $kysely->execute(array($id));

  $_SESSION["user"] = $kysely->fetch();
?>
