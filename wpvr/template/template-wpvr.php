<?php
/**
 * wpvr
 *
 * @package wpvr
 * @subpackage wpvr
 * @since wpvr 1.0
 */
?>
<a-scene>
	<a-assets>
		<img id="img-logo-logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo_logo.png">
		<img id="img-ui-home" src="<?php echo get_template_directory_uri(); ?>/assets/images/ui_home.png">
		<img id="img-ui-prev" src="<?php echo get_template_directory_uri(); ?>/assets/images/ui_prev.png">
		<img id="img-ui-next" src="<?php echo get_template_directory_uri(); ?>/assets/images/ui_next.png">
		<img id="img-ui-zoom" src="<?php echo get_template_directory_uri(); ?>/assets/images/ui_zoom.png">
		<img id="img-ui-categories" src="<?php echo get_template_directory_uri(); ?>/assets/images/ui_categories.png">
	</a-assets>
	<a-entity id="container" position="0 1.7 -2.5">
		<a-entity id="slides"></a-entity>
		<a-entity id="logo" position="0 1.25 .5" scale=".2 .2 .2">
			<a-image id="logo-logo" src="#img-logo-logo" width="5" height="2.5"></a-image>
		</a-entity>
		<a-entity id="ui" position="0 -1 .5" scale=".2 .2 .2">
			<a-image id="ui-prev" src="#img-ui-prev" position="-4 0 0"></a-image>
			<a-image id="ui-home" src="#img-ui-home" position="-2 0 0"></a-image>
			<a-image id="ui-next" src="#img-ui-next" position="0 0 0"></a-image>
			<a-image id="ui-zoom" src="#img-ui-zoom" position="2 0 0"></a-image>
			<a-image id="ui-categories" src="#img-ui-categories" position="4 0 0"></a-image>
		</a-entity>
	</a-entity>
	<a-sky color="#000"></a-sky>
	<a-camera id="camera">
		<a-cursor color="#fff" fuse="false"></a-cursor>
	</a-camera>
</a-scene>