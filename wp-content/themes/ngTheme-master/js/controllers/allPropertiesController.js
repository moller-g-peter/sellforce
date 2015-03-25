app.controller("allPropertiesController", ["$scope", "Property", "SITE_INFO", "$routeParams",  function($scope, Property, SITE_INFO, $routeParams ) {


  console.log("routeParams 1: ", $routeParams);
  
  Property.found($routeParams);

  $scope.partials = SITE_INFO.partials;
  




  $scope.$on("foundProperty", function(event, data) {
    console.log("-- -- allPropertiesCTRL: ", data);

    $scope.allProperties = data;

  });
  
}]);