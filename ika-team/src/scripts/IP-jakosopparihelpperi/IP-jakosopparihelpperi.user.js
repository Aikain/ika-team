/*
    IP-jakosopparihelpperi

    v. 1.0
     -Luotu scripti.
     -Toteutettu tiedon hakeminen.

    v. 1.1
     -Poistettu kovakoodaus.
     -Jaettu scripti järkeviin osiin.
     -Korjattu typoista johtuvia bugeja.
     -Luotu painikkeet käyttäjälle.

    v. 1.2
     -Tallennetaan muistiin haetut arvot.

    v. 1.2.1
     -Lisätty hae-painikkeeseen listan pituus selventämään, missä mennään.

    v. 1.2.2
     -Korjattu bugi muistista lataamisessa. Latasi vain 100ensimmäistä.

    v. 1.3
     -Lisätty mahdollisuus hakea uusiksi tietyn ajan verran vanhoja.

    v. 1.3.1
     -Muutettu näyttämään 497/497 eikä 0/497

    v. 1.4
     -Lisätty https

*/
// ==UserScript==
// @author      aikain <aikain@gosu.fi>
// @name        IP-jakosopparihelpperi
// @namespace   ikariamadmintyokaly
// @description Työkalu helpottamaan rakkaiden ikariamin ylläpitäjien työskentelyä.
// @include     http://*.ikariam.gameforge.com/admintool/admin/multiuser.php
// @include     https://*.ikariam.gameforge.com/admintool/admin/multiuser.php
// @require     jquery.min.js
// @require     cookie.js
// @require     tools.js
// @version     1.4
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// ==/UserScript==

var n = 0;
var montaKerralla = 100;
var tunniste = "uid";
var linkitJoissaSivu = "user_overview.php";
var haeTietoSivulta = "user_note.php";
var etsiMJ = "erota";
var tamanJalkeenHaeButton = "input[value='etsi']";

var huutomerkki = "<button><font color='#ff0000'> !</font></button>";
var haeButton = $("<button id='hae' type='button'>Sopimusten haku</button>");
var deleteButton = $("<button type='button'>Reset</button>");
var time = $("<select id='time'>");
time.append("<option value=0>All");
time.append("<option value=6>6h");
time.append("<option value=12>12h");
time.append("<option value=24>1d");
time.append("<option value=48 selected='selected'>2d");
time.append("<option value=72>3d");
time.append("<option value=168>7d");
time.append("<option value=336>14d");
haeButton.click(function(){hae(false);});
deleteButton.click(reset);

var linkArray = $("a").filter(function() {
  return $(this).attr('href').indexOf(linkitJoissaSivu) > -1;
});

$(tamanJalkeenHaeButton).after(deleteButton);
$(tamanJalkeenHaeButton).after(haeButton);
$(tamanJalkeenHaeButton).after(time);

hae(true);
