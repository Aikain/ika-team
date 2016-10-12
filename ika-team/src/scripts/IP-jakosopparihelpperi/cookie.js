function getCookie(cname) {
  return GM_getValue(cname, ";0");
}

function setCookie(cname, cvalue) {
  GM_setValue(cname, cvalue + ";" + new Date().getTime());
}

function deleteCookie(cname) {
  GM_deleteValue(cname);
}

function deleteCookies(cname) {
  var keys = GM_listValues();
  for (var i=0, key=null; key=keys[i]; i++) {
    if(key.indexOf(cname) != -1) {
      GM_deleteValue(key);
    }
  }
}
