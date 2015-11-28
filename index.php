<?php
  include("login_success.php");
  include("mysql.php");
?>
<html lang="fi">
  <head>
    <title>Random - mitäpä muutakaan.</title>
    <meta charset="UTF-8">
    <script src="lib/jquery.min.js"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css">
    <link rel="alternate" href="http://gosu.fi/" hreflang="x-default" />
    <link rel="alternate" hreflang="fi" href="http://gosu.fi/" />
  </head>
  <body>
    <div class="top">
      <h1>ikariam.fi-Team</h1>
      <div class="topics">
        <div class="topic"><a href="#main/">Etusivu</a> | </div>
        <div class="topic"><a href="#logs/">Logit</a> | </div>
        <div class="topic"><a href="#scripts/">Scriptit</a> | </div>
        <div class="topic"><a href="#personal/">Omasivu</a> | </div>
        <div class="topic"><a href="#profile/">Profiili</a> | </div>
        <div class="topic"><a href="logout.php">Kirjaudu ulos</a></div>
      </div>
    </div>
    <div class="content">
      <div id="main" class="main"><center><h2>Etusivu</h2></center></div>
      <div id="logs" class="logs"">
        <center>
          <h2>Logit</h2>
          <div class="channels"><?php foreach (glob("logs/*") as $f) { $f = explode("/", $f)[1]; $f = substr($f, 0, strrpos( $f, '.')); ?>
            <div class="channel"><a href="#logs/<?=$f ?>/today"><?=$f ?></a></div>
          <?php  } ?></div>
          <div class="dates">
            <div class="date" id="today"><a href=''>Tänään</a></div>
            <div class="date" id="yesterday"><a href=''>Eilen</a></div>
            <?php for ($i = 2; $i < 7; $i++) { $d = date('Y-m-d', mktime(0, 0, 0, date('m'), date('d')-$i, date('Y'))); ?>
              <div class="date" id="date<?=$d ?>"><a href=''><?=$d ?></a></div>
            <?php } ?>
          </div>
          <button onclick="moveToRight()">Test oikea</button>
          <button onclick="moveToLeft()">Test vasen</button>
        </center>
        <div class="datelogs">
        </div>
      </div>
      <div id="scripts" class="scripts">
        <center>
          <h2>Scriptit</h2>
          <table><tbody>
            <?php foreach (glob("scripts/*", GLOB_ONLYDIR) as $f) { $f = explode("/", $f)[1]; ?>
              <tr><td><?=$f ?></td><td><button onclick="location.href='scripts/<?=$f ?>/<?=$f ?>.user.js'">Asenna</button></td></tr>
            <?php  } ?>
          </tbody></table>
        </center>
      </div>
      <div id="personal" class="personal"><center><h2>Omasivu</h2><?=$_SESSION["name"] ?>, tämä on sinun oma sivusi!</center></div>
      <div id="profile" class="profile">
        <?php $user = array_unique(getUser($_SESSION["id"])); unset($user["password"]); ?>
        <center>
          <h2><?=$user["username"] ?>'s Profiili</h2>
        </center>
        <div class="settings"><div class="settingsCenter">
          <form method='POST' action="profile.php">
            <div class="settingGroup">
              <div class="setting">
                <div class="settingName">Käyttäjänimi</div>
                <div class="settingValue">
                  <input type="text" name="username" value="<?=$user['username'] ?>" readonly>
                </div>
              </div>
            </div>
            <div class="settingGroup">
              <div class="setting">
                <div class="settingName">Vanha salasana</div>
                <div class="settingValue">
                  <input type="password" name="oldPass">
                </div>
              </div>
              <div class="setting">
                <div class="settingName">Uusi salasana</div>
                <div class="settingValue">
                  <input type="password" name="newPass">
                </div>
              </div>
              <div class="setting">
                <div class="settingName">Uudelleen uusi salasana</div>
                <div class="settingValue">
                  <input type="password" name="newPass2">
                </div>
              </div>
            </div>
            <div class="settingGroup">
              <div class="setting">
                <div class="settingName">Join/Part/Leave-messaget näkyvissä</div>
                <div class="settingValue">
                  <div class="onoffswitch"><input type="checkbox" name="join-part-leave" class="onoffswitch-checkbox" id="join-part-leave" checked>
                    <label class="onoffswitch-label" for="join-part-leave"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
                  </div>
                </div>
              </div>
              <div class="setting">
                <div class="settingName">Kanavan oikeuksien muutokset näkyvissä</div>
                <div class="settingValue">
                  <div class="onoffswitch"><input type="checkbox" name="mode" class="onoffswitch-checkbox" id="mode" checked>
                    <label class="onoffswitch-label" for="mode"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
                  </div>
                </div>
              </div>
              <div class="setting">
                <div class="settingName">Nimenvaihdot näkyvissä</div>
                <div class="settingValue">
                  <div class="onoffswitch"><input type="checkbox" name="namechange" class="onoffswitch-checkbox" id="namechange" checked>
                    <label class="onoffswitch-label" for="namechange"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="update">
              <input type="submit" value="Päivitä">
            </div>
          </form>
        </div></div>
      </div>
    </div>
  </body>
</html>
