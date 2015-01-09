<?php
$queryString = $_SERVER['QUERY_STRING'];
parse_str($queryString, $queryArray);
$data= $queryArray['d'];
$fileName= $queryArray['f'];

$myfile = fopen("community_maps/".$fileName.".jomap", "w") or die("Unable to open file!");

fwrite($myfile, $data);

fclose($myfile);
?>