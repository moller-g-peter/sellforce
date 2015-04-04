app.controller("contactsController", ["$scope", "Pages", "$sce", "$location", "Posts", "SITE_INFO", function($scope, Pages, $sce, $location, Posts, SITE_INFO) {

  Posts.get();
  
  $scope.directPartial = SITE_INFO.partials;

  $scope.$on("gotPostData", function(event, data) {
    $scope.kontakts = data.reverse();
  });

  Pages.search({name:"om-oss"});
  var count = 0;




  $scope.$on("foundPages", function(event, data) {

    var primitiveClone = data[0].content;
    if (data[0].slug == "om-oss"){
      $scope.page = $sce.trustAsHtml(primitiveClone);
    } else if (data[0].slug == "footer") {
      $scope.footer = $sce.trustAsHtml(primitiveClone);
    }
    // $scope.trustedHtml = $sce.trustAsHtml(data[0].title);
  });





}]);