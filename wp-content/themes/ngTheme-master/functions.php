<?php

include_once(__DIR__ . "/required.php");

//get theme dir and make it a constant
$themeDir = explode("/", __FILE__);
if (count($themeDir) > 1) {
  array_pop($themeDir);
  $themeDir = implode("/", $themeDir);
} else {
  $themeDir = explode("\\", __FILE__);
  array_pop($themeDir);
  $themeDir = implode("\\", $themeDir);
}
define(THEME_FILE_ROOT, trailingslashit($themeDir));
define(THEME_HTTP_ROOT, trailingslashit(get_template_directory_uri()));



/**
 * Register the required stylesheets for this theme.
 *
 */

function ngThemes_stylesheets()
{
  // Register the style like this for a theme:
  // wp_register_style( 'base-style', THEME_HTTP_ROOT . 'style.css', array(), '20150225', 'all' );
  wp_register_style( 'slider-style', THEME_HTTP_ROOT . 'css/ng-slider.css', array(), '20150225', 'all' );

  wp_register_style( 'base-style', THEME_HTTP_ROOT . 'css/style.css', array(), '20150225', 'all' );
  // For either a plugin or a theme, you can then enqueue the style:
  wp_enqueue_style( 'slider-style' );
  wp_enqueue_style( 'base-style' );
}

add_action( 'wp_enqueue_scripts', 'ngThemes_stylesheets' );



/**
 * Register the required scripts for this theme.
 *
 */

function ngTheme_scripts() {
  wp_enqueue_script(
    'angularjs',
    THEME_HTTP_ROOT . 'js/libs/angular.js'
  );
  wp_enqueue_script(
    'angularjs-route',
    THEME_HTTP_ROOT . 'js/libs/angular-route.js'
  );
  wp_enqueue_script(
    'angularjs-resource',
    THEME_HTTP_ROOT . 'js/libs/angular-resource.js'
  );
  wp_enqueue_script(
    'angularjs-ui-bootstrap',
    THEME_HTTP_ROOT . 'js/libs/ui-bootstrap-tpls-0.12.1.js'
  );
  wp_enqueue_script(
    'sliders',
    THEME_HTTP_ROOT . 'js/libs/ng-slider.min.js'
  );
  wp_enqueue_script(
    'appjs',
    THEME_HTTP_ROOT . 'js/app.js'
  );

  //autoload all controllers
  $allControllers = scandir(THEME_FILE_ROOT."js/controllers");
  foreach ($allControllers as $controller) {
    if (stripos($controller, ".js") !== false) {
      $scriptName = explode(".js", $controller);
      wp_enqueue_script(
        $scriptName[0],
        THEME_HTTP_ROOT . 'js/controllers/'.$controller
      );
    }
  }

  //autoload all services
  $allServices = scandir(THEME_FILE_ROOT."js/services");
  foreach ($allServices as $service) {
    if (stripos($service, ".js") !== false) {
      $scriptName = explode(".js", $service);
      wp_enqueue_script(
        $scriptName[0],
        THEME_HTTP_ROOT . 'js/services/'.$service
      );
    }
  }

  //autoload all directives
  $allDirectives = scandir(THEME_FILE_ROOT."js/directives");
  foreach ($allDirectives as $directive) {
    if (stripos($directive, ".js") !== false) {
      $scriptName = explode(".js", $directive);
      wp_enqueue_script(
        $scriptName[0],
        THEME_HTTP_ROOT . 'js/directives/'.$directive
      );
    }
  }

  //autoload all custom scripts
  $allCustomScripts = scandir(THEME_FILE_ROOT."js/custom");
  foreach ($allCustomScripts as $script) {
    if (stripos($script, ".js") !== false) {
      $scriptName = explode(".js", $script);
      wp_enqueue_script(
        $scriptName[0],
        THEME_HTTP_ROOT . 'js/custom/'.$script
      );
    }
  }

  wp_localize_script(
    'appjs',
    'myLocalized',
    array(
      'partials' => THEME_HTTP_ROOT . 'partials/'
      ,
      'http_root' => trailingslashit( site_url() ),
      )
  );
}

add_action( 'wp_enqueue_scripts', 'ngTheme_scripts' );

//add theme support for menus
add_theme_support( 'menus' );
if ( function_exists( 'register_nav_menus' ) ) {
    register_nav_menus(
      array(
        'menu_slug' => 'Menu Name',
      )
    );
}

//create a custom taxonomy called property
function property_init() {
  // create a new taxonomy
  register_taxonomy(
    'property',
    'attachment', //default content type this taxonomy belong to
    array(
      'label' => __( 'Property' ),
      'rewrite' => array( 'slug' => 'property' ),
    )
  );
}

add_action( 'init', 'property_init' );


//make custom taxonomy available to pages as well
function ngwp_add_property_tax_to_posts() {
    register_taxonomy_for_object_type( 'property', 'post' );
}

add_action( 'init' , 'ngwp_add_property_tax_to_posts' );


// This peace of code 
// function addMetaSearch() {
//   global $wp;

//   // Add additional key to support.
//   array_push($wp->public_query_vars, 'meta_key');
//   array_push($wp->public_query_vars, 'meta_value');
// }
// add_action("init", "addMetaSearch");





add_filter( 'json_prepare_post', function ($data, $post, $context) {
  /*
    stad'
    region
    pris
    hyra
    yta
    rum
    trappor
    hiss
    balkong
    bostad
  */

    
  //add a new property to the data that is going to AngularJS, 
  //and fill it with our metadata
  $data['property_data'] = array(
    // 'stad' => get_post_meta( $post['ID'], 'stad', true ),
    'region' => get_post_meta( $post['ID'], 'region', true ),
    'pris' => get_post_meta( $post['ID'], 'pris', true ),
    'hyra' => get_post_meta( $post['ID'], 'hyra', true ),
    'yta' => get_post_meta( $post['ID'], 'yta', true ),
    'rum' => get_post_meta( $post['ID'], 'rum', true ),
    'trappor' => get_post_meta( $post['ID'], 'trappor', true ),
    'hiss' => get_post_meta( $post['ID'], 'hiss', true ),
    'balkong' => get_post_meta( $post['ID'], 'balkong', true ),
    'bostad' => get_post_meta( $post['ID'], 'bostad', true ),
  );
  return $data;
}, 10, 3 );







