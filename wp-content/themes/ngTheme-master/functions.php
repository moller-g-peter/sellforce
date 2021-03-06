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


//remove canonical redirects
remove_action("template_redirect", "redirect_canonical");


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
  $allFilters = scandir(THEME_FILE_ROOT."js/filter");
  foreach ($allFilters as $filter) {
    if (stripos($filter, ".js") !== false) {
      $scriptName = explode(".js", $filter);
      wp_enqueue_script(
        $scriptName[0],
        THEME_HTTP_ROOT . 'js/filter/'.$filter
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

//create a custom taxonomy called placement
function placement_init() {
  // create a new taxonomy
  register_taxonomy(
    'placement',
    'attachment', //default content type this taxonomy belongs to
    array(
      'label' => __( 'Placement' ),
      'rewrite' => array( 'slug' => 'placement' ),
    )
  );
}

add_action( 'init', 'placement_init' );
