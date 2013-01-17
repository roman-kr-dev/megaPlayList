<?php
$template = $_GET['template'];

header("Content-type: text/javascript");
$x =  file_get_contents('../' . $template . '.htm');

echo "Backbone.Templates = Backbone.Templates || {};";
echo "Backbone.Templates['" . $template . "'] = " . json_encode($x);
?>