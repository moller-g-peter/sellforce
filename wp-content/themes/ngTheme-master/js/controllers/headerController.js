//"ngTheme" controller.
app.controller("headerController", ["$scope", "Pages", "$sce", "$location", function($scope, Pages, $sce, $location) {
  console.log("headerController is alive!");

Pages.get();


$scope.$on("gotPageData", function(event, data) {
    // console.log("homeController on gotPageData: ", data);

    $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });

}]);