/*
    Barbaarien resujen laskija

    v. 0.1
     -Leikitty koodaajaa.
     -Säädetty paljon.

    v. 1.0
     -Pyydetty wiliam apuun.
     -Valmis. :D

    v. 1.1
     -Bugikorjaus: Sulkemisen jälkeen jos avattiin heti uudestaan resurssien määrä ei ilmestynyt.

    v. 1.2
     -Bugikorjaus: Resurssi summa ilmestyi liian monta kertaa.

    v. 1.3
     - Korjattu encoding (ISO-8859-1 -> UTF-8)
	 
	v. 1.4
     - Lis�tty "turha" parametri ajaxHandlerCall functioon.

*/
// ==UserScript==
// @name         Barbaarien resujen laskija
// @namespace    ikariamtyokalu
// @version      1.4
// @description  Laskee yhteen barbaareilta ryöstettävissä olevat resurssit.
// @author       Joppe151617
// @include      http://*.ikariam.gameforge.com*
// @include      https://*.ikariam.gameforge.com*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

var alota = ajaxHandlerCall;
ajaxHandlerCall = function(a,b) {
  alota(a,b);
if (a.startsWith("?view=barbarianVillage")) {
function asd() {
  setTimeout(function() {
    if ($(".barbarianCityResources .resources").length) {
       var sum = 0; $(".barbarianCityResources .resources li").each(function(i,obj) { if ( i > 0) { sum += Number($(obj).text().replace(",", "")); } });
        $(".barbarianCityResources .resources").append("<li style='color: red'> &#8721 " +sum+"</li>");
    } else {
      asd();
    }
  }, 1000);
}
asd();
}
};
