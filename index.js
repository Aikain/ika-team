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
  $(window).resize(function() {
    $(".datelog:visible").children().css("height", window.innerHeight - 350 + "px");
  });
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

    oldChannel = channel;
    channel = location.href.split("#")[2];
    if (!channel) {
      $(".datebar").hide();
      return;
    }
    channel = channel.split("/")[0];
    if (oldChannel != "" && oldChannel != channel) {
      $(".date a").each(function() { $(this).attr("href", $(this).attr("href").replace(oldChannel, channel));  })
    }

    $(".channel a").filter(function() {
      return $(this).text() == "#" + channel;
    }).css("font-size", "25px").css("font-weight", "bold");

    $(".datebar").show();

    date = location.href.split("#")[2].split("/")[1];
    if (!date) {
      $(".datelogs").hide();
      return;
    } else if (!$(".dates").children().length) {
      while ( width < 600) {
        createDate();
      }
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
  d.children().css("height", window.innerHeight - 350 + "px");
  d.css("display", "inline-block");
  $.get("log.php?channel=" + channel + "&date=" + date, {dataType: 'html'}, function(data) {
    a = this.url.split("?")[1].split("&");
    updateLog($("[id*='log-" + a[0].split("=")[1] + "-" + a[1].split("=")[1] + "']"), data)
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
  log.children().html(text);
  log.css("background", "none");
}

var loc = 0;
var width = 0;

function createDate() {
  text = "";
  if ($(".date").last().length) {
    d = new Date(new Date($(".date").last().attr("id").replace("date", "")).setHours(0,0,0,0) - 1000 * 60 * 60 * 24);
    if (d.getTime() == new Date(new Date().setHours(0,0,0,0) - 1000 * 60 * 60 * 24).getTime()) {
      text = "yesterday";
    }
  } else if (date == "today") {
    text = "today";
    d = new Date(new Date().setHours(0,0,0,0));
  } else if (date == "yesterday") {
    text = "yesterday";
    d = new Date(new Date().setHours(0,0,0,0) - 1000 * 60 * 60 * 24);
  } else {
    d = new Date(new Date(date).setHours(0,0,0,0));
  }
  d = d.getFullYear() + "-" + pad(d.getMonth()+1+"") + "-" + pad(d.getDate()+""); 
  text = text.length == 0 ? d : text;
  div = $("<div class='date' id='date" + d + "'><a href='#logs/#" + channel + "/" + text + "' >" + text + "</a></div>");
  $(".dates").append(div);
  width += div.outerWidth(true);
}

function reverseCreateDate() {
  text = "";
  if ($(".date").first().text() != "today") {
    d = new Date(new Date($(".date").first().attr("id").replace("date", "")).setHours(0,0,0,0) + 1000 * 60 * 60 * 24);
    if (d.getTime() == new Date(new Date().setHours(0,0,0,0) - 1000 * 60 * 60 * 24).getTime()) {
      text = "yesterday";
    } else if (d.getTime() == new Date(new Date().setHours(0,0,0,0)).getTime()) {
      text = "today";
    } else {
      text = d.getFullYear() + "-" + pad(d.getMonth()+1+"") + "-" + pad(d.getDate()+"");
    }
    d = d.getFullYear() + "-" + pad(d.getMonth()+1+"") + "-" + pad(d.getDate()+"");
    div = $("<div class='date' id='date" + d + "'><a href='#logs/#" + channel + "/" + text + "' >" + text + "</a></div>");
    $(".dates").prepend(div);
    $(".dates").scrollLeft($(".dates").scrollLeft() + div.outerWidth(true));
    width += div.outerWidth(true);
    loc += div.outerWidth(true);
  } else {
    loc = 0;
  }
}

function pad(n){
 return n.length == 1 ? "0" + n : n;
}
function moveToRight() {
  loc += 550;
  while ( width - 550 < loc ) {
    createDate();
  }
  $(".dates").animate({scrollLeft: loc}, 400);
}
function moveToLeft() {
  loc -= 550;
  while (loc < 0) {
    reverseCreateDate();
  }
  $(".dates").animate({scrollLeft: loc}, 400);
}
function updateProfile() {
  $(".settingsCenter").css("background", "url(load.gif) no-repeat center 100px");
  $.ajax({
      url:"profile.php",
      type:"POST",
      data:$(".settings form").serializeArray()
  }).done(function (data) {
    $(".settingsCenter").css("background", "none");
    showInfo("Profiili päivitetty" + data);
  }).fail(function(data) {
    $(".settingsCenter").css("background", "none");
    showInfo("Error: " + data.status + " (" + data.statusText + ")");
  });
}
function showInfo(info) {
  $(".infobubble p").text(info);
  $(".infobubble").show();
}
