app.controller("propertyController", ["$scope", "Property" ,"$routeParams", "SITE_INFO", function($scope, Property, $routeParams, SITE_INFO) {

  //Property.find() accepts an object with key->value pairs that
  //map to the search filters we need in our GET request

    Property.found($routeParams);
    
    $scope.partialsDir = SITE_INFO.partials;


    //the interval for all carousels
    $scope.carouselInterval = 4000;
    $scope.$on("foundProperty", function(event, data) {
      for (var i = 0; i < data.length; i++) {
        if(data[i].post.slug === $routeParams.name) {

          $scope.property = data[i];
        }
        
      }
      
    });
}]);