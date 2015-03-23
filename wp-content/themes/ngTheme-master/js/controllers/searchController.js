app.controller("searchController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {

// console.log("searchController working...");
Pages.get();
$scope.$on("gotPageData", function(event, data) {
    // console.log("searchController on: ", data);

    // $scope.trustedHtml = $sce.trustAsHtml(data[0].content);
    $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });

}]);