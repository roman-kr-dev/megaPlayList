<?php						
	$uid = $_POST['uid'];
	$accessToken = $_POST['accessToken'];
	$name = isset($_POST['name']) ?  $_POST['name'] : 'Roman Krom';
	$image = isset($_POST['image']) ? $_POST['image'] : 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-snc6/208969_10150948846765139_2137780753_n.jpg';

	setcookie("uid", '1223', time() + (3600 * 1000), '/');
	setcookie("secret", $accessToken, time() + (3600 * 1000), '/');
	setcookie("fbuid", $uid, time() + (3600 * 1000), '/');
	setcookie("name", $name, time() + (3600 * 1000), '/');
	setcookie("image", $image, time() + (3600 * 1000), '/');
?>
{
	"success":true
}