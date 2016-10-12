// ==UserScript==
// @author      aikain <aikain@gosu.fi>
// @name        saapumisaikakorjaus
// @namespace   ikariamtyokaly2
// @description Työkalu, joka korjaa saapumisajan serverin ajan mukaiseksi.
// @include     http://*.ikariam.gameforge.com/*
// @include     https://*.ikariam.gameforge.com/*
// @version     1.2
// @grant       none
// ==/UserScript==

function omena() {
  etaController.unsubscribe("ETAchanged");
  etaController.subscribe("ETAchanged", function (eta) {
    $('#arrival').html(getFormattedDate((eta-3600) * 1000, 'G:i:s'));
  })
  etaControllerTriton.unsubscribe("ETAchanged");
  etaControllerTriton.subscribe("ETAchanged", function (eta) {
    $('#arrival').html(getFormattedDate((eta-3600) * 1000, 'G:i:s'));
  })
}
a = setInterval(function () {
  if (typeof(etaController) != "undefined") {
    omena();
    clearInterval(a);
    var asd = ajaxHandlerCall;
    ajaxHandlerCall = function(a) {
      asd(a);
      setTimeout(function() {
        omena();
      }, 1000);
    }
  }
}, 1000);
