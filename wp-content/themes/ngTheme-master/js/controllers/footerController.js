
app.controller("footerController", ["$scope", "Pages", "$sce", "$location", function($scope, Pages, $sce, $location) {

  // console.log("footerController is alive!");
Pages.search({name:"footer"});


$scope.$on("foundPages", function(event, data) {
    if (data[0].slug === "footer") {
			$scope.footerContent = $sce.trustAsHtml(data[0].content);

    }
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
}]);