<?php

function super_sanitize($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if (is_ajax()) {
	$myfile = fopen($_POST['filename'].".jomap", "w") or die("Unable to open file!");
    $map_data = super_sanitize($_POST['map_data']);
	fwrite($myfile, $map_data);
	
	fclose($myfile);
	
	echo json_encode($_POST);
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
?>