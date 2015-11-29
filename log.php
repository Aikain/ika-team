<?php
  $ajax = true;
  include("login_success.php");
  if (!isset($_REQUEST["channel"]) || !isset($_REQUEST["date"])) die("Tarvitaan kanava ja päivä!");
  $kannu = $_REQUEST["channel"];
  $date = $_REQUEST["date"];
  if (!file_exists("logs/#" . $kannu . ".log")) die("Kanavan ($kannu) lokeja ei ole.");
  if(!is_dir("log/" . $kannu)) mkdir("log/" . $kannu);
  if ($date == 'today') $date = date("Y-m-d");
  else if ($date == 'yesterday') $date = date("Y-m-d", mktime(0, 0, 0, date("m"), date("d")-1, date("Y")));
  else if (substr_count($date, '-') != 2 || !checkdate(explode("-", $date)[1], explode("-", $date)[2], explode("-", $date)[0])) die("Mikä päivä '$date' on olevinaan..");

  if (!file_exists("log/" . $kannu . "/" . $date . ".log")) {
    $file = file("logs/#" . $kannu . ".log", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $myfile = fopen("log/" . $kannu . "/" . $date . ".log", "w") or die("Nyt tapahtu jottain mystistä..");
    $i = 0;
    foreach ($file as $line_num => $line) {
      if (strrpos($line, $date) === 0) {
        fwrite($myfile, substr($line,11) . "\n");
        ++$i;
      }
    }
    if ($_REQUEST["date"] != "today" && $i !== 0) fwrite($myfile, "---THE-END---");
    fclose($myfile);
    if ($i == 0) unlink("log/" . $kannu . "/" . $date . ".log");
  } else {
    $kannu2 = escapeshellarg("log/" . $kannu . "/" . $date . ".log");
    $lastline = `tail -n 1 $kannu2`;
    if (substr($lastline,0,13) != "---THE-END---") {
      $file = file("logs/#" . $kannu . ".log", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
      $myfile = fopen("log/" . $kannu . "/" . $date . ".log", "w") or die("Nyt tapahtu jottain mystistä..");
      foreach ($file as $line_num => $line) {
        if (strrpos($line, $date) === 0) {
          fwrite($myfile, substr($line,11) . "\n");
          $lastline = $date;
        }
      }
      if ($_REQUEST["date"] != "today") fwrite($myfile, "---THE-END---");
      fclose($myfile);
    }
  }
  if (!file_exists("log/" . $kannu . "/" . $date . ".log")) {
    echo "Kertokees miks meil ei oo lokia päivältä '$date'..";
  } else {
    $file = file("log/" . $kannu . "/" . $date . ".log", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($file as $line_num => $line) {
      if (substr($line,0,13) != "---THE-END---") {
        echo $line . "\n";
      }
    }
  }
?>
