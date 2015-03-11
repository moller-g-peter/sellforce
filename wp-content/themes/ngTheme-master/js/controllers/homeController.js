//"ngTheme" home controller.
//dependent on $scope && WPService being injected to run
app.controller("homeController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {
  console.log("homeController alive!");
  //get all pages
  Pages.get();


  // EXAMPLE LISTENER TO A $broadcast COMING FROM WPRest SERVICE!!!
  //listening for the "gotPageData" broadcast on $http success
  $scope.$on("gotPageData", function(event, data) {
    console.log("homeController on gotPageData: ", data);

    /* 
      angular protects us from "dangerous" HTML by converting it to a string

      if we want to show HTML from a string in DOM 
      we first need to tell angular that it can be trusted.
      
      this is done using the $sce service on the HTML string in JS
      and the ng-bind-html directive in the view
    */
    
    /**
     * THERE IS A NEW EXAMPLE OF $sce IN pagefactory.js
     *
     * PLEASE USE THE EXAMPLE IN pagefactory.js!
     *
     */

    //loop through all data and create a trusted HTML property
    //that can be displayed in view using ng-bind-html=""
    // for (var i = 0; i < data.length; i++) {
    //   data[i].trusted = $sce.trustAsHtml(data[i].content);
    // }
    $scope.allPages = data;
  });
}]);