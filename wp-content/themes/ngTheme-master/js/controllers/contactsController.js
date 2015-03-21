app.controller("contactsController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {

// console.log("contactsController workingnbnhvnbvnh!");
Pages.get();

$scope.$on("gotPageData", function(event, data) {
    console.log("- - - contactsController on: ", data);

    $scope.trustedHtml = $sce.trustAsHtml(data[0].content);
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });
	
  // console.log("footerController is alive!");
// Pages.search({name:"footer"});
// var firstSearch = true;

// $scope.$on("foundPages", function(event, data) {
//     console.log("fffffffooterController on foundPages: ", data);
//     if (firstSearch) {
//     	// $scope.footerContent = $sce.trustAsHtml(data[0].content);
//     	firstSearch = false;
//     }
//     $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
//   });

}]);