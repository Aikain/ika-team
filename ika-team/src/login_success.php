<?php
  session_start();
  if (!isset($_SESSION["user"])) {
    if ($ajax === true) {
      http_response_code(401);
      die("Sinun on kirjauduttava sisään!");
    } else {
      header("Location: login.php");
    }
  } else if ($_SESSION["user"]["team"] == "0") {
    if ($ajax === true) {
      http_response_code(401);
      die("Sinun on kirjauduttava sisään!");
    } else {
      header("Location: https://ikafi.gosu.fi/login.php");
    }
  }
?>
