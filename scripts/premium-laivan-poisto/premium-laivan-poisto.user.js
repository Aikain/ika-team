/*
    Premium-laivan-poisto

    v. 1.0
     -Toteutettu laivan poistaminen

    v. 1.1
     -Lisätty jquery.min.js, jotta poisto toimisi

    v. 1.2
     -Lisätty https

*/
// ==UserScript==
// @author      aikain <aikain@gosu.fi>
// @name        premium-laivan-poisto
// @namespace   ikariamtyokaly3
// @description Työkalu, joka poistaa premium-laovan.
// @include     http://*.ikariam.gameforge.com/*
// @include     https://*.ikariam.gameforge.com/*
// @require     jquery.min.js
// @version     1.2
// @grant       none
// ==/UserScript==

$(document).ready(function() {
  $("#cityFlyingShopContainer").remove()
});
