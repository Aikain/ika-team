<?php
  session_start();
  include("mysql.php");

  $name = $_POST['username'];
  $pass = md5($_POST['password']);

  $sql = "SELECT id, username, jpl, mode, nickchange, nickcolor, color, team, email, role FROM members WHERE username = ? and password = ?";
  $kysely = $yhteys->prepare($sql);
  $kysely->execute(array($name, $pass));

  $rivi = $kysely->fetch();

  if ( $rivi ) {
    $_SESSION["user"] = $rivi;
    header("Location: index.php");
    die("Kirjautuminen onnistui.");
  } else {
    echo "Väärä käyttäjänimi tai salasana";
  }
?>
