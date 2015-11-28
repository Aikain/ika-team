<!DOCTYPE html>
<html>
    <head>
        <title>ikariam.fi-Team - Sisäänkirjautuminen</title>
        <link rel="stylesheet" type="text/css" href="login.css" />
    </head>
    <body id="body">
        <center>
        <div id="logInCenterizingDiv">
            <h2 id="hObject">Kirjaudu sisään</h2>
            <form id="credentialsForm" method="POST" action="checklogin.php">
                <div id="nameDiv">
                    <input id="nameInput" type="text" name="username" placeholder="Käyttäjän nimi" />
                </div>
                <div id="passwdDiv">
                    <input id="passwdInput" type="password" name="password" placeholder="Salasana" />
                </div>
                <div id="logInButtonDiv">
                    <input id="logInButton" type="submit" value="Kirjaudu" />
                </div>
            </form>
        </div>
    </body>
</html>

