//"ngTheme" controller.
app.controller("headerController", ["$scope", "Pages", "$sce", "$location", function($scope, Pages, $sce, $location) {
  // console.log("headerController is alive!");

Pages.get();


$scope.$on("gotPageData", function(event, data) {
    console.log("headerController I on gotPageData: ", data);

    for (var i = 0; i < data.length; i++) {
    console.log("data title [i]", data[i].title);
    $scope.trustedHtml = $sce.trustAsHtml(data[i].title);
    }

  });

}]);