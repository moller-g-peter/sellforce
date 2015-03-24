
app.controller("propertiesController", ["$scope", "Posts", "$sce", function($scope, Posts, $sce) {

  $scope.$on("gotPostData", function(event, data) {
    console.log("properties multiply on gotPostData: ", data);

      // angular protects us from "dangerous" HTML by converting it to a string

      // if we want to show HTML from a string in DOM 
      // we first need to tell angular that it can be trusted.
      
    //   this is done using the $sce service on the HTML string in JS
    //   and the ng-bind-html directive in the view
    // */


    $scope.allPosts = data;
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
  
}]);