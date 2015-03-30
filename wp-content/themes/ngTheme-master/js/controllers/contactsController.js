app.controller("contactsController", ["$scope", "Pages", "$sce", "$location", "Posts", "SITE_INFO", function($scope, Pages, $sce, $location, Posts, SITE_INFO) {

  Posts.get();
  
  $scope.directPartial = SITE_INFO.partials;

  $scope.$on("gotPostData", function(event, data) {
    $scope.kontakts = data;
    console.log("gotPostData contriller: ",data);
  });

Pages.search({name:"om-oss"});
var count = 0;




$scope.$on("foundPages", function(event, data) {
// console.log(" hjgjygjgjkgjh: ", data[1]);
    console.log("jojojojojojojojoooooo: ", data);
    if (count >=0) {
      count += 1;
      console.log("firstSearch1> ",data);
      if (count === 2){
        $scope.page = $sce.trustAsHtml(data[0].content);
      }
    }
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });





}]);