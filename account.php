<?php
$appId = '458784427519788';
$hasInstalled = 'false';
$uid = $_COOKIE['uid'];
$secret = $_COOKIE['secret'];

if (!isset($uid) && !isset($secret)) {
	 header( 'Location:/login.php' );
	 die();
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Groov.ee</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<link href="css/style.css" rel="stylesheet" />
		<link href="css/fonts/stylesheet.css" rel="stylesheet" />

		<script src="javascript/lib/jquery-1.9.0.min.js" type="text/javascript"></script>
		<script src="javascript/lib/jquery-ui-1.10.0.min.js" type="text/javascript"></script>
		<script src="javascript/lib/jquery.cookie.js" type="text/javascript"></script>
		<script src="javascript/lib/underscore.min.js" type="text/javascript"></script>
		<script src="javascript/lib/handlebars-1.0.rc.1.js" type="text/javascript"></script>
		<script src="javascript/lib/backbone.min.js" type="text/javascript"></script>
		<script src="javascript/lib/backbone.controller.js" type="text/javascript"></script>

		<script type="text/javascript" src="javascript/ui/custom.js"></script>
		<script type="text/javascript" src="javascript/ui/jquery.tablednd.js"></script>

		<script src="javascript/groovee.controller.js"></script>
		<script src="javascript/groovee.view.js"></script>

		<script src="javascript/account/account.router.js"></script>

		<script src="/temp/template_loader.php?template=templates/user_menu"></script>
		<script src="/temp/template_loader.php?template=templates/account"></script>

		<script type="text/javascript">
		$(function () {
			var groovee = new GrooveeController({
				appId:'<?php echo $appId ?>'
			});
		});

		$(function () {
			var account = new AccountRouter({
				hasInstalledExtension:<?php echo $hasInstalled ?>
			});
			Backbone.history.start();
		});		
		</script>
	</head>

	<body>
		<div id="fb-root"></div>

		<div id="wrapper">
			<div id="popup-wrapper">
				<div class="popup-dim"><!----></div>
			</div>

			<div id="header">
				<div class="left">
					<img src="images/logo.png" alt="" class="logo" />
					<ul>
						<li><span class="icon home"><!----></span></li>
						<li class="last"><span class="icon settings"><!----></span></li>
					</ul>
				</div>
				<div id="search">
					<div class="search-button"><!----></div>
					<div class="input">
						<input name="" type="text" value="Search for Music" class="focusedInput" />
					</div>
					<div class="select-target" data-selected="youtube">
						<div class="icons">
							<div class="icon youtube"><!----></div>
							<div class="icon library"><!----></div>
						</div>
						<span class="arrow"><!----></span>
					</div>
				</div>
				<div id="user-menu">
				</div>
			</div>
			<div id="middle">
				<div id="side-panel">
					<div class="shadow"><!----></div>
					<ul>
						<li class="first">
							<div class="h-button">Your Library</div>
							<ul>
								<li>
									<div class="sub-button">
										<div class="icon songs"><!----></div>
										<div class="overflow">
											<div class="title">Songs</div>
											<div class="text">0 songs</div>
										</div>
									</div>
								</li>
								<li>
									<div class="sub-button">
										<div class="icon artists"><!----></div>
										<div class="overflow">
											<div class="title">Artists</div>
											<div class="text">0 artists</div>
										</div>
									</div>
								</li>
								<li class="last">
									<div class="sub-button">
										<div class="icon queue"><!----></div>
										<div class="overflow">
											<div class="title">Queue</div>
											<div class="text">0 songs</div>
										</div>
									</div>
								</li>
							</ul>
						</li>
						<li class="last">
							<div id="add-playlist"><!----></div>
							<div class="h-button">Playlists</div>
							<ul>
								<li class="new">
									<div id="new-playlist">
										<div class="input">
											<input name="" type="text" value="New playlist name" />
										</div>
										<div class="add-button">Add</div>
									</div>
								</li>
								<li>
									<div class="sub-button">
										<div class="icon playlist"><!----></div>
										<div class="overflow">
											<div class="title">Default Playlist</div>
											<div class="text">0 songs</div>
										</div>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				
				<div id="content">
				</div>
			</div>

			<div id="player">
				<div class="section first">
					<div id="player-funcs">
						<div id="prev-song"><span><!----></span></div>
						<div id="play-pause"><span><!----></span></div>
						<div id="next-song"><span><!----></span></div>
					</div>
				</div>
				<div class="section last">
					<div id="volume">
						<span class="icon volume-low"><!----></span>
						<span class="icon volume-high"><!----></span>
						<div class="seek-bar">
							<div class="track">
								<div class="progress"><span class="circle"><span><!----></span></span></div>
							</div>
						</div>
					</div>
				</div>
				<div class="section">
					<div id="now-playing">
						<div class="song-pic">
							<img src="images/temp01.jpg" alt="" />
						</div>
						<div class="overflow">
							<div class="song-title">Avril Lavigne - Smile</div>
							<div class="playing-source"><span class="icon playlist"><!----></span>Avril Lavigne</div>
						</div>
					</div>
					<div id="order-funcs">
						<div class="icon shuffle"><!----></div>
						<div class="icon repeat"><!----></div>
					</div>
					<div id="time"><span>01:46</span> / 04:16</div>
					<div class="seek-bar">
						<div class="track">
							<div class="progress"><span class="circle"><span><!----></span></span></div>
							<div class="buffer"><!----></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>