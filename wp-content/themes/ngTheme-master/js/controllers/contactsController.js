app.controller("contactsController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {

// console.log("contactsController workingnbnhvnbvnh!");
Pages.get();
$scope.$on("gotPageData", function(event, data) {
    // console.log("contactsController on: ", data);

    $scope.trustedHtml = $sce.trustAsHtml(data[0].content);
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });

}]);