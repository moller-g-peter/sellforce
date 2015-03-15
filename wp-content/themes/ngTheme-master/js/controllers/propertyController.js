app.controller("propertyController", ["$scope", "Property" ,"$routeParams", "SITE_INFO", function($scope, Property, $routeParams, SITE_INFO) {


  //Property.find() accepts an object with key->value pairs that
  //map to the search filters we need in our GET request
  Property.find($routeParams);
  $scope.partialsDir = SITE_INFO.partials;

  //the interval for all carousels
  $scope.carouselInterval = 2000;

  $scope.$on("foundProperty", function(event, data) {
    console.log("propertyController on foundProperty: ", data);
    if (!data) { return; }
    $scope.property = data[0];
  });
}]);