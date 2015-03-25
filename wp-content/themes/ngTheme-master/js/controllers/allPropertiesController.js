app.controller("allPropertiesController", ["$scope", "Property", "SITE_INFO", "$routeParams", "$location", function($scope, Property, SITE_INFO, $routeParams, $location) {

  //get all pages
  console.log("routeParams 1: ", $routeParams);
  Property.found();
  $scope.partials = SITE_INFO.partials;
  // listening for the "gotPageData" broadcast on $http success
  $scope.$on("foundProperty", function(event, data) {
    console.log("allProperties data: ", data);

    $scope.allProperties = data;

  });
  
}]);