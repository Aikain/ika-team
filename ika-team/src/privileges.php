<?php
  $privs = array(
     "ikariam.fi" => 0,
     "ikariam.fi-helper" => 1,
     "wilitestaa" => 1,
     "ikariam.fi-team" => 2,
     "team.fi" => 2,
     "ikariam.fi-super" => 3
  );

  function checkPrivileges($channel) {
    global $privs;
    return $_SESSION["user"]["role"] >= $privs[$channel];
  }
