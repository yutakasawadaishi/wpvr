<?php
/**
 * wpvr
 *
 * @package wpvr
 * @subpackage wpvr
 * @since wpvr 1.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js" xmlns:og="http://ogp.me/ns#">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
		<script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/wpvr.js"></script>
		<title><?php bloginfo('name'); ?><?php wp_title('|'); ?></title>
		<?php wp_head(); ?>
	</head>
	<body wpvr_root_href="<?php echo home_url() . '/wpvr-json/'; ?>" wpvr_categories_href="<?php echo home_url() . '/wpvr-json/?wpvr_page_type=categories'; ?>" wpvr_link_href="<?php echo home_url() . '/wpvr-json/?' . 'wpvr_page_type=single' . '&wpvr_post_id=' . get_queried_object_id(); ?>">
	<?php get_template_part('template/template', 'wpvr'); ?>
	</body>
</html>