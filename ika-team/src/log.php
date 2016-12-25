<?php
  function  updateChannelLog($kannu, $date) {
    if(!is_dir("log/" . $kannu)) mkdir("log/" . $kannu);
    if (!file_exists("log/" . $kannu . "/" . $date . ".log")) {
      $file = file("logs/#" . $kannu . ".log", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
      $myfile = fopen("log/" . $kannu . "/" . $date . ".log", "w") or die("Nyt tapahtu jottain mystistä..");
      $i = 0;
      foreach ($file as $line_num => $line) {
        if (strrpos($line, $date) === 0) {
          $line = substr($line,11);
          if (substr($line,9,24) == "-!- You're now known as ") {
            fwrite($myfile, str_replace("You're", substr($line, 33) . " is", $line) . "\n");
          } else if (substr($line,9,11) != "-!- Irssi: "){
            fwrite($myfile, $line . "\n");
          }
          ++$i;
        }
      }
      if ($_REQUEST["date"] != "today" && $date != date("Y-m-d") && $i !== 0) fwrite($myfile, "---THE-END---");
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
            $line = substr($line,11);
            if (substr($line,9,24) == "-!- You're now known as ") {
              fwrite($myfile, str_replace("You're", substr($line, 33) . " is", $line) . "\n");
            } else if (substr($line,9,11) != "-!- Irssi: "){
              fwrite($myfile, $line . "\n");
            }
          }
        }
        if ($_REQUEST["date"] != "today" && $date != date("Y-m-d")) fwrite($myfile, "---THE-END---");
        fclose($myfile);
      }
    }
  }

  function echoChannelLog($kannu, $date, $u) {
    if (!file_exists("log/" . $kannu . "/" . $date . ".log")) {
      echo "Kertokees miks meil ei oo lokia päivältä '$date' kanavalle '$kannu'..";
    } else {
      $i = 0;
      $file = file("log/" . $kannu . "/" . $date . ".log", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
      if ($_SESSION["user"]["nickcolor"] == "1") $colors = getColors();
      foreach ($file as $line_num => $line) {
        if (substr($line,0,13) == "---THE-END---") break;
        if ($_SESSION["user"]["nickchange"] == "0" && substr($line,9,3) == "-!-" && strrpos($line, "is now known as") !== false) continue;
        if ($_SESSION["user"]["mode"] == "0" && substr($line,9,8) == "-!- mode") continue;
        if ($_SESSION["user"]["mode"] == "0" && substr($line,9,14) == "-!- ServerMode") continue;
        if ($_SESSION["user"]["jpl"] == "0" && substr($line,9,3) == "-!-" && strrpos($line, "has joined") !== false) continue;
        if ($_SESSION["user"]["jpl"] == "0" && substr($line,9,3) == "-!-" && strrpos($line, "has quit") !== false) continue;
        if ($_SESSION["user"]["jpl"] == "0" && substr($line,9,3) == "-!-" && strrpos($line, "has left") !== false) continue;
        if ($u && (substr($line,9,1) != "<" || strpos(explode(">", $line, 2)[1], $u) === false)) continue;
        if ($_SESSION["user"]["nickcolor"] == "1" && substr($line,9,1) == "<") {
          $user = explode(">", explode("<", $line)[1])[0];
          $user2 = trim(str_replace("@", "", str_replace("+", "", $user)));
          if (strlen($user) > 0 && array_key_exists($user2, $colors)) {
            $color = $colors[$user2];
            $line = str_replace("<", "&lt", str_replace(">", "&gt", $line));
            echo str_replace($user, "<span style='color:$color'>" . $user . "</span>", $line) . "\n";
            ++$i;
            continue;
          }
        }
        echo str_replace("<", "&lt", str_replace(">", "&gt", $line)) . "\n";
        ++$i;
      }
      if ($i == 0 && !$u) echo "Olipa aktiivista keskustelua tällä päivällä..";
    }
  }

  function getD() {
    $d = $_REQUEST["date"];
    if ($d == 'today') $d = date("Y-m-d");
    else if ($d == 'yesterday') $d = date("Y-m-d", mktime(0, 0, 0, date("m"), date("d")-1, date("Y")));
    else if (substr_count($d, '-') != 2 || !checkdate(explode("-", $d)[1], explode("-", $d)[2], explode("-", $d)[0])) die("Mikä päivä '$d' on olevinaan..");
    return $d;
  }

  $ajax = true;
  include("login_success.php");
  include("mysql.php");
  include("privileges.php");
  if (!isset($_REQUEST["channel"]) || !isset($_REQUEST["date"])) die("Tarvitaan kanava ja päivä!");
  $c = $_REQUEST["channel"];
  $d = getD();

  if (isset($_REQUEST["user"])) {
    foreach (glob("logs/*") as $f) {
      if (!checkPrivileges($f)) continue;
      $f = substr($f, 6, -4);
      echo "<h3>--- $f ---</h3>";
      updateChannelLog($f, $d);
      echoChannelLog($f, $d, $c);
      echo "\n";
    }
  } else {
    if (!file_exists("logs/#" . $c . ".log")) die("Kanavan ($c) lokeja ei ole.");
    if (!checkPrivileges($c)) die("Sinulla ei ole oikeuksia tähän kanavaan!");
    updateChannelLog($c, $d);
    echoChannelLog($c, $d, false);
  }
?>
