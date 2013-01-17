<?php
$appId = '458784427519788';
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Groov.ee</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<script src="javascript/lib/jquery-1.9.0.min.js" type="text/javascript"></script>
		<script src="javascript/lib/underscore.min.js" type="text/javascript"></script>
		<script src="javascript/lib/handlebars-1.0.rc.1.js" type="text/javascript"></script>
		<script src="javascript/lib/backbone.min.js" type="text/javascript"></script>
		<script src="javascript/lib/backbone.controller.js" type="text/javascript"></script>

		<script src="javascript/groovee.controller.js"></script>
		<script src="javascript/groovee.view.js"></script>

		<script src="/temp/template_loader.php?template=templates/user_menu"></script>

		<script type="text/javascript">
		$(function () {
			var groovee = new GrooveeController({
				appId:'<?php echo $appId ?>'
			});
		});
		</script>
	</head>

	<body>
		<div id="header">
			<h1>Header</h1>

			<div id="user-menu"></div>
		</div>

		<div id="fb-root"></div>

		<h1>Welcome to groov.ee</h1>
		<button>Download App</button>
	</body>
</html>