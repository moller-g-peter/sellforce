app.controller("footerController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce, $location) {
  // console.log("footerController is alive!");

// Pages.get();


$scope.$on("gotPageData", function(event, data) {
    // console.log("footerController on gotPageData: ", data);

    $scope.trustedHtml = $sce.trustAsHtml(data[0].content);
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
}]);