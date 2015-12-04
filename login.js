$(window).on("load", function() {
  $("form").attr("action", "checklogin.php#" + (location.href.split(/\#(.+)?/).length >= 2 ? location.href.split(/\#(.+)?/)[1] : "main/"));
});
