function hae(onlyCookie) {
  linkArray.slice(onlyCookie ? 0 : n, onlyCookie ? linkArray.length : n+montaKerralla).each(function (index, value) {
    id = value.href.split(tunniste + "=")[1];
    cookies = getCookie(tunniste + id).split(";");
    time = cookies[1];
    cookies = cookies[0];
    time2 = $("#time").val() * 60 * 60 * 1000;
    if ((cookies.length == 0 || (new Date().getTime() - time > time2)) && !onlyCookie) {
      $.get(haeTietoSivulta + "?" + tunniste +  "=" + id, function(data) {
        id = $(value).attr('href').split(tunniste + "=")[1];
        if (data.indexOf(etsiMJ) == -1) {
          huutomerkkiClone = $(huutomerkki);
          huutomerkkiClone.attr("id", tunniste + id);
          huutomerkkiClone.click(haeTunnisteella);
          $(value).after(huutomerkkiClone);
        }
        setCookie(tunniste + id, (data.indexOf(etsiMJ) == -1));
      });
    } else if (cookies == "true") {
      huutomerkkiClone = $("#" + tunniste + id).length ? $("#" + tunniste + id) : $(huutomerkki);
      huutomerkkiClone.attr("id", tunniste + id);
      huutomerkkiClone.click(haeTunnisteella);
      $(value).after(huutomerkkiClone);
    }
  });
  if (!onlyCookie) n += montaKerralla;
  if (onkoKaikkiKaytyLapi()) n = 0;
  $("#hae").text("Sopimusten haku (" + (n != 0 ? n : linkArray.length) + "/" + linkArray.length + ")");
}

function haeTunnisteella() {
  id = $(this).attr("id").replace(tunniste, "");
  console.log($(this));
  console.log(id);
  $.get(haeTietoSivulta + "?" + tunniste + "=" + id, function (data) {
    if (data.indexOf(etsiMJ) != -1) {
      $("button").remove("#" + tunniste + id);
    }
    setCookie(tunniste + id, (data.indexOf(etsiMJ) == -1));
  });
}

function onkoKaikkiKaytyLapi() {
  return n > linkArray.length;
}

function reset() {
  deleteCookies(tunniste);
  $('button[id^="' + tunniste + '"]').remove();
  n = 0;
}
