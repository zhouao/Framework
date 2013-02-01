<?php
$method = $_GET['method'];
switch($method){
	case "SaveData":
		SaveData();
		break;
	case "LoadData":
		LoadData();
		break;
}

function SaveData(){
	$submitJSON = $_GET["submitData"];
	$data = json_decode($submitJSON);
	
	$UserName = $data["UserName"];
    $Pwd = $data["Pwd"];
	
	$json = json_encode($data);
	print_r($json);
}

function LoadData(){
	$path = "form.txt";
	$content = file_get_contents($path);
	print_r($content);
}
?>