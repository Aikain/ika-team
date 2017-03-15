/*
    Raportoitujen viestien selkeyttaja

    v. 1.0
     -Leikitty koodaajaa.

*/
// ==UserScript==
// @name         Raportoitujen viestien selkeyttaja
// @namespace    ikariamadmintyokalu
// @version      1.0
// @description  Muuntaa raportoidut viestit luettavampaan muotoon.
// @author       Joppe151617
// @include      http://*.ikariam.gameforge.com/admintool/admin/reported_msg*
// @include      https://*.ikariam.gameforge.com/admintool/admin/reported_msg*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    if (location.href.indexOf("archiv")!=-1) {
        $( "tbody tr:nth-child(2) td:nth-child(1)" ).each(function() { $(this).html($(this).text()); });
    } else {
        $( "tbody tr:nth-child(3) td:nth-child(1)" ).each(function() { $(this).html($(this).text()); });
    }
});