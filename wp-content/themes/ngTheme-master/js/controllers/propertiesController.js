<<<<<<< HEAD
app.controller("propertiesController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {
=======
app.controller("propertiesController", ["$scope", "Posts", "$sce", function($scope, Posts, $sce) {
>>>>>>> origin/master
  // console.log("propertiesController alive!");
  //get all pages
  console.log("postcontrolle alive!!");
  Posts.get();

  // EXAMPLE LISTENER TO A $broadcast COMING FROM WPRest SERVICE!!!
  //listening for the "gotPageData" broadcast on $http success
<<<<<<< HEAD
  $scope.$on("gotPageData", function(event, data) {
    // console.log("propertiesController on gotPageData: ", data);
=======
  $scope.$on("gotPostData", function(event, data) {
    console.log("propertiesController on gotPostData: ", data);
>>>>>>> origin/master

    /* 
      angular protects us from "dangerous" HTML by converting it to a string

      if we want to show HTML from a string in DOM 
      we first need to tell angular that it can be trusted.
      
      this is done using the $sce service on the HTML string in JS
      and the ng-bind-html directive in the view
    */


    $scope.allPosts = data;
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
  
}]);