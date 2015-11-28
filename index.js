var page, channel, date;
$(window).on('load', function() {
  if (location.href.indexOf("index.php") != -1) {
    location.href = location.href.replace("index.php", "");
  }
  if (location.href.indexOf("#") == -1 || location.href.split("#")[1].split("/")[0].length == 0) {
    location.href += "#main/";
  } else {
    update();
  }
});
$(window).on('hashchange', function(a) {
  update();
});
function update() {
  page = location.href.split("#")[1].split("/")[0];
  $(".content > div").hide();
  $(".topic a").css("font-size", "20.8px").css("font-weight", "normal");
  $(".topic a[href*='" + page + "']").css("font-size", "25px").css("font-weight", "bold");
  $("#" + page).show();
  if (page == "logs") {
    $(".channel a").css("font-size", "20.8px").css("font-weight", "normal");;
    $(".date a").css("font-size", "1em").css("font-weight", "normal");;
    $(".datelog").hide();

    channel = location.href.split("#")[2];
    if (!channel) {
      $(".dates").hide();
      return;
    }
    channel = channel.split("/")[0];

    $(".channel a").filter(function() {
      return $(this).text() == "#" + channel;
    }).css("font-size", "25px").css("font-weight", "bold");

    $(".dates").show();
    $(".date").children().each(function(index, value){ 
      value.href = '#logs/#' + channel + "/" + value.parentElement.id.replace("date", "");
    });

    date = location.href.split("#")[2].split("/")[1];
    if (!date) {
      $(".datelogs").hide();
      return;
    }

    $(".date a").filter(function() {
      return $(this).attr('href') == "#logs/#" + channel + "/" + date;
    }).css("font-size", "1.2em").css("font-weight", "bold");

    if ($("[id*='log-" + channel + "-" + date + "']").length) {
      if (date != "today") {
        $("[id*='log-" + channel + "-" + date + "']").css("display", "inline-block");
      } else {
        $("[id*='log-" + channel + "-" + date + "']").remove();
        getLog();
      }
    } else {
      getLog();
    }
  }
}

function getLog() {
  d = $("<div class='datelog'><pre class='datelog-pre'>");
  d.attr("id", "log-" + channel + "-" + date);
  $(".datelogs").append(d);
  d.css("display", "inline-block");
  $.get("log.php?channel=" + channel + "&date=" + date, function(data) {
    a = this.url.split("?")[1].split("&");
    $("[id*='log-" + a[0].split("=")[1] + "-" + a[1].split("=")[1] + "']").children().text(data);
    $("[id*='log-" + a[0].split("=")[1] + "-" + a[1].split("=")[1] + "']").css("background", "none");
  }).fail(function(data) {
    a = this.url.split("?")[1].split("&");
    logElement = $("[id*='log-" + a[0].split("=")[1] + "-" + a[1].split("=")[1] + "']");
    if (data.status == 401) {
      updateLog(logElement, data.respondeText)
      location.href = "login.php";
    } else {
      updateLog(logElement, "Error: " + data.status + " (" + data.statusText + ")");
    }
  });
}

function updateLog(log, text) {
  log.children().text(text);
  log.css("background", "none");
}

var loc = 10;
function moveToRight() {
  for (i = 0; i < 7; i++) {
    d = "2015-11-20";
    $(".dates").append("<div class='date' id='date" + d + "'><a href='#logs/" + channel + "/" + d + "'>" + d + "</a></div>");
  }
  loc += 710;
  $(".dates").animate({scrollLeft: loc}, 1000);
}
function moveToLeft() {
  loc -= 710;
  if (loc < 0) loc = 10;
  $(".dates").animate({scrollLeft: loc}, 1000);
}
