<?php
/*
Template Name: wpvr-json
*/
$args = array();
$args['post_type'] = 'post';

if (isset($_GET['wpvr_page_type'])) {

	//

}

if (isset($_GET['wpvr_post_id'])) {
	$args['p'] = $_GET['wpvr_post_id'];
}

if (isset($_GET['wpvr_category_id'])) {
	$args['cat'] = $_GET['wpvr_category_id'];
}

if (isset($_GET['wpvr_page'])) {
	$args['page'] = $_GET['wpvr_page'];
}

if ((isset($_GET['wpvr_page_type'])) && ($_GET['wpvr_page_type'] == 'single') && ($_GET['wpvr_post_id'])) {
	$the_query = new WP_Query($args);
	if ($the_query->have_posts()) {
		while ($the_query->have_posts()) {
			$the_query->the_post();
			$json['header']['page_type'] = 'single';
			$json['header']['title'] = strip_tags(get_the_title()) . ' | ' . get_bloginfo('name');
			$json['header']['href'] = get_permalink();
			$article = array();
			$article['title'] = strip_tags(get_the_title());
			if (wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0]) {
				$article['eyecatch'] = wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0];
			}
			else {
				$article['eyecatch'] = get_template_directory_uri() . '/assets/images/blank.jpg';
			}

			$article['excerpt'] = strip_tags(get_the_excerpt());
			$article['contents'] = str_split(strip_tags(get_the_content()) , 500);
			$article['images'] = get_post_meta(get_the_ID() , 'image');
			$article['category']['name'] = get_the_category() [0]->cat_name;
			$article['category']['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=category&wpvr_category_id=' . get_the_category() [0]->cat_ID;
			$article['date'] = get_the_time('m.d.Y');
			$article['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=single&wpvr_post_id=' . get_the_ID();
			$json['body']['articles'][] = $article;
		}

		echo json_encode($json);
	}
}
elseif ((isset($_GET['wpvr_page_type'])) && ($_GET['wpvr_page_type'] == 'category') && ($_GET['wpvr_category_id'])) {
	$the_query = new WP_Query($args);
	if ($the_query->have_posts()) {
		$json['header']['page_type'] = 'category';
		$json['header']['title'] = get_category($_GET['wpvr_category_id'])->cat_name . ' | ' . get_bloginfo('name');
		$json['header']['href'] = get_category_link(get_category($_GET['wpvr_category_id'])->cat_ID);
		while ($the_query->have_posts()) {
			$the_query->the_post();
			$article = array();
			$article['title'] = strip_tags(get_the_title());
			if (wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0]) {
				$article['eyecatch'] = wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0];
			}
			else {
				$article['eyecatch'] = get_template_directory_uri() . '/assets/images/blank.jpg';
			}

			$article['excerpt'] = strip_tags(get_the_excerpt());
			$article['contents'] = str_split(strip_tags(get_the_content()) , 100);
			$article['images'] = get_post_meta(get_the_ID() , 'image');
			$article['category']['name'] = get_the_category() [0]->cat_name;
			$article['category']['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=category&wpvr_category_id=' . get_the_category() [0]->cat_ID;
			$article['date'] = get_the_time('m.d.Y');
			$article['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=single&wpvr_post_id=' . get_the_ID();
			$json['body']['articles'][] = $article;
		}

		echo json_encode($json);
	}
}
elseif ((isset($_GET['wpvr_page_type'])) && ($_GET['wpvr_page_type'] == 'categories')) {
	$json['header']['page_type'] = 'categories';
	$json['header']['title'] = 'categories' . ' | ' . get_bloginfo('name');
	$json['header']['href'] = '';
	$categories = get_categories();
	foreach($categories as $category) {
		$article = array();
		$article['title'] = $category->name;
		$article['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=category&wpvr_category_id=' . $category->cat_ID;
		$args['cat'] = $category->cat_ID;
		$args['posts_per_page'] = 1;
		$the_query = new WP_Query($args);
		while ($the_query->have_posts()) {
			$the_query->the_post();
			if (wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0]) {
				$article['eyecatch'] = wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0];
			}
			else {
				$article['eyecatch'] = get_template_directory_uri() . '/assets/images/blank.jpg';
			}
		}

		wp_reset_postdata();
		$json['body']['articles'][] = $article;
	}

	echo json_encode($json);
}
else {
	$the_query = new WP_Query($args);
	if ($the_query->have_posts()) {
		$json['header']['page_type'] = 'home';
		$json['header']['title'] = get_bloginfo('name');
		$json['header']['href'] = home_url();
		while ($the_query->have_posts()) {
			$the_query->the_post();
			$article = array();
			$article['title'] = strip_tags(get_the_title());
			if (wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0]) {
				$article['eyecatch'] = wp_get_attachment_image_src(get_post_thumbnail_id() , true) [0];
			}
			else {
				$article['eyecatch'] = get_template_directory_uri() . '/assets/images/blank.jpg';
			}

			$article['excerpt'] = strip_tags(get_the_excerpt());
			$article['contents'] = str_split(strip_tags(get_the_content()) , 100);
			$article['images'] = get_post_meta(get_the_ID() , 'image');
			$article['category']['name'] = get_the_category() [0]->cat_name;
			$article['category']['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=category&wpvr_category_id=' . get_the_category() [0]->cat_ID;
			$article['date'] = get_the_time('m.d.Y');
			$article['wpvr_href'] = home_url() . '/wpvr-json/?wpvr_page_type=single&wpvr_post_id=' . get_the_ID();
			$json['body']['articles'][] = $article;
		}

		echo json_encode($json);
	}
}

wp_reset_postdata();