//"ngTheme" home controller.
//dependent on $scope && WPService being injected to run
app.controller("homeController", ["$scope", "Pages", "$sce", "Property" ,"$routeParams", "SITE_INFO", "Media",
  function($scope, Pages, $sce, Property, $routeParams, SITE_INFO, Media) {
  // console.log("homeController alive!");

  Media.found({name : "home"});

  $scope.$on("gotMedia", function(event, data) {
    console.log("homeController gotMedia: ", data);
  });

  Property.found({name:"hem"});
  $scope.partialsDir = SITE_INFO.partials;


  //the interval for all carousels
  $scope.carouselInterval = 2000;

  $scope.$on("foundProperty", function(event, data) {
    if (!data) { return; }
    $scope.property = data[0];
  });
  
  //get all pages
  Pages.get(10);

  // EXAMPLE LISTENER TO A $broadcast COMING FROM WPRest SERVICE!!!
  //listening for the "gotPageData" broadcast on $http success
  $scope.$on("gotPageData", function(event, data) {
    // console.log("homeController on gotPageData: ", data);

    /* 
      angular protects us from "dangerous" HTML by converting it to a string
      
      if we want to show HTML from a string in DOM 
      we first need to tell angular that it can be trusted.
      
      this is done using the $sce service on the HTML string in JS
      and the ng-bind-html directive in the view
    */

    $scope.homePage = data;

  });

  //Property.find() accepts an object with key->value pairs that
  //map to the search filters we need in our GET request


  
}]);


