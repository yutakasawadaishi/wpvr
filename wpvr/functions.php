<?php

/* */
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

/* */
add_theme_support('post-thumbnails');
function custom_excerpt_length($length) {
	return 150;
}
add_filter('excerpt_length', 'custom_excerpt_length');

function new_excerpt_more($more) {
	return ' ...';
}
add_filter('excerpt_more', 'new_excerpt_more');