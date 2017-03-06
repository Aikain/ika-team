/*
    Barbaarien resujen laskija

    v. 0.1
     -Leikitty koodaajaa.
     -Säädetty paljon.

    v. 1.0
     -Pyydetty wiliam apuun.
     -Valmis. :D


*/
// ==UserScript==
// @name         Barbaarien resujen laskija
// @namespace    ikariamtyokalu
// @version      1.0
// @description  Laskee yhteen barbaareilta ryöstettävissä olevat resurssit.
// @author       Joppe151617
// @include      http://*.ikariam.gameforge.com*
// @include      https://*.ikariam.gameforge.com*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {

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
});