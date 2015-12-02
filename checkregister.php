<?php
  die("You're fired!");
  session_start();
  include("mysql.php");

  $name = $_POST['name'];
  $pass = md5($_POST['pass']);
  $pass2 = md5($_POST['pass2']);
  $pass3 = md5($_POST['pass3']);

  if ($pass3 != "1ad08c6771898c3380f07ef34647457c") die("Tarkistus salasana väärin! Kysäseppä uudestaan wililtä. <a href='register.php'>Takaisin<a>");

  if ($pass != $pass2) die("Salasanat eivät täsmää! <a href='register.php'>Takaisin<a>");

  $sql = "SELECT * FROM members WHERE username='$name'";
  $kysely = $yhteys->prepare($sql);
  $kysely->execute(array($name, $pass));

  $rivi = $kysely->fetch();

  if ( $rivi ) die("Käyttäjä on jo olemassa <a href='register.php'>Takaisin<a>");

  $sql = "INSERT INTO members (username, password) VALUES ('$name', '$pass')";
  $kysely = $yhteys->prepare($sql);
  $kysely->execute(array($name, $pass));

  header("Location: login.php");
  die("Rekisteröityminen onnistui.");
?>
