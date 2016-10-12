<?php
  header("Location: index.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>ikariam.fi-Team - Sisäänkirjautuminen</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="login.css" />
    </head>
    <body id="body">
        <center>
        <div id="logInCenterizingDiv">
            <h2 id="hObject">Rekisteröidy</h2>
            <form id="credentialsForm" method="POST" action="checkregister.php">
                <div id="nameDiv">
                    <input id="nameInput" type="text" name="name" placeholder="Käyttäjän nimi" />
                </div>
                <div id="passwdDiv">
                    <input id="passwdInput" type="password" name="pass" placeholder="Salasana" />
                </div>
                <div id="passwdDiv">
                    <input id="passwdInput" type="password" name="pass2" placeholder="Salasana uudestaan" />
                </div>
                <br />
                <div id="passwdDiv">
                    <input id="passwdInput" type="password" name="pass3" placeholder="Tarkistus salasana" />
                </div>
                <div id="logInButtonDiv">
                    <input id="logInButton" type="submit" value="Rekisteröidy" />
                </div>
            </form>
        </div>
    </body>
</html>

