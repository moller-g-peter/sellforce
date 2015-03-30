
app.controller("footerController", ["$scope", "Pages", "$sce", "$location", function($scope, Pages, $sce, $location) {

  // console.log("footerController is alive!");
Pages.search({name:"footer"});
var firstSearch = true;

$scope.$on("foundPages", function(event, data) {
    console.log("footerController on foundPages: ", data);
    if (firstSearch) {
			$scope.footerContent = $sce.trustAsHtml(data[0].content);
			firstSearch = false;
    }
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
}]);