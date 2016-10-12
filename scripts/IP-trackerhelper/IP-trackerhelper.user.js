// ==UserScript==
// @author      aikain <aikain@gosu.fi>
// @name        IP-trackerhelper
// @namespace   ikariamadmintyokaly1
// @description Työkalu, joka luo linkit ip osoitteisiin.
// @include     http://*.ikariam.gameforge.com/admintool/*
// @include     https://*.ikariam.gameforge.com/admintool/*
// @version     1.1
// @grant       none
// ==/UserScript==

$('td').filter(function () {
  ipArray = $(this).text().split('.');
  for (x in ipArray) {
    if (isNaN(ipArray[x]) || ipArray[x] < 0 || ipArray[x] > 255) return false;
  }
  return ipArray.length == 4;
}).html(function (a, b) {
  return '<a target=\'_blank\' href=\'http://www.ip-adress.com/ip_tracer/' + b + '\'>' + b + '</a>';
});

