<html>
<head>
<script src="/tomiz/jquery.min.js"></script>
</head>
<body>
<div><input type="button" value="etsi"></div>
<table><tbody>
<?php
for ($i = 0; $i < 1000; ++$i) {
  echo "<tr><td><a href='user_overview.php?uid=$i'>Linkki $i</a></td></tr>";
}
?>
</tbody>
</table>
</body>
</html>
