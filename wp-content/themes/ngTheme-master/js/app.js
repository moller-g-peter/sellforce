//app declaration and dependency injection
var app = angular.module("ngTheme", ["ngRoute", "ui.bootstrap"]);
//app config
app.config(["$routeProvider", "$locationProvider", "SITE_INFO", function($routeProvider, $locationProvider, SITE_INFO) {
  //route config
  console.log("when: ",$locationProvider);
  $routeProvider
    .when("/", {
      templateUrl: SITE_INFO.partials+"views/home.html",
      controller: "homeController"
    })
    .when("/kontakter", {
      templateUrl: SITE_INFO.partials+"views/contacts.html",
      controller: "contactsController"
    })
    .when("/:name", {
      templateUrl: SITE_INFO.partials+"views/property.html",
      controller: "propertyController"
    })
    .when("/bostader", {
      templateUrl: SITE_INFO.partials+"views/properties.html",
      controller: "propertiesController"
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}])
.constant('SITE_INFO', myLocalized)
.constant('API_ROUTE', "wp-json");
