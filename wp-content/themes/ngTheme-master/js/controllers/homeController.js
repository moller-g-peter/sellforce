//"ngTheme" home controller.
//dependent on $scope && WPService being injected to run
app.controller("homeController", ["$scope", "Pages", "$sce", "Property" ,"$routeParams", "SITE_INFO", "Media",
function($scope, Pages, $sce, Property, $routeParams, SITE_INFO, Media) {
 
  Media.found({placement:"hem"});



  $scope.$on("gotMedia", function(event, data) {
    $scope.hemMedia = data;


  });
  
  $scope.partialsDir = SITE_INFO.partials;

  //the interval for all carousels
  $scope.carouselInterval = 4000;

  $scope.$on("foundProperty", function(event, data) {
    if (!data) { return; }
    $scope.property = data[0];
  });
  
  //get all pages
  Pages.get(10);

  // EXAMPLE LISTENER TO A $broadcast COMING FROM WPRest SERVICE!!!
  //listening for the "gotPageData" broadcast on $http success
  $scope.$on("gotPageData", function(event, data) {


    $scope.homePage = data;

  });


  
}]);


