// ==UserScript==
// @author      aikain <aikain@gosu.fi>
// @name        moraalikorjaus
// @namespace   ikariamtyokaly1
// @description Työkalu, joka korjaa moraalibugin.
// @include     https://*.ikariam.gameforge.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

var asd = ajaxHandlerCall;
ajaxHandlerCall = function(a) { 
  asd(a); 
  setTimeout(function() {
    $(".morale_bar").each(function(a,b) { 
      var green = 0, brown = 0;
      if ($(b).children("div[style*='#659037']").length) {
        green = $(b).children("div[style*='#659037']")[0].style.width;
      }
      if ($(b).children(":not(div[style*='color'])").length) {
        brown = $(b).children(":not(div[style*='color'])")[0].style.width
      }
      if (green != 0) {
        $(b).children("div[style*='#659037']").css("width", brown);
        $(b).children(":not(div[style*='color'])").css("width", green);
      }
    });
  }, 1000);
};
