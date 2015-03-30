app.controller("allPropertiesController", ["$scope", "Property", "SITE_INFO", "$routeParams",  function($scope, Property, SITE_INFO, $routeParams ) {

  var pageNo = 1;

  Property.found($routeParams, pageNo, true);

  $scope.partials = SITE_INFO.partials;
  




  $scope.$on("foundProperty", function(event, data) {
    console.log("allPropertiesCTRL: ", data);
    
    $scope.allProperties = data;

  	pageNo++;
  	Property.found($routeParams, pageNo);

  });
  
}]);