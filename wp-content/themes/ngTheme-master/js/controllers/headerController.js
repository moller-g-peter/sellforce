//"ngTheme" controller.
app.controller("headerController", ["$scope", "$location", "Menus", "SITE_INFO","$rootScope", function($scope, $location, Menus, SITE_INFO, $rootScope) {
  $scope.partialsDir = SITE_INFO.partials;

  //get the menuLinks for menuId 7 using WPRest
  Menus.get(4);

  $scope.currUrl = $location.url().substring(1);

  $scope.getClass = function(path) {

    var lastlocation = path.substring(0, path.length - 1);

    var activeLocation = $location.$$url.substring($location.$$url.lastIndexOf("/")+1);

    if (activeLocation === lastlocation) {
      return "activated";
    } else {
      return "";

    }
  };
  //listen to the broadcast "gotMenuLinks"
  $scope.$on("gotMenuLinks", function(event, data) {
    $scope.menuLinks = data.items;
  });


  //a simple $scope method for changing urls using ng-click in views
  $rootScope.goTo = function(url, hardReload) {

    //any relative path destined for hardReload 
    //gets http_root instead of initial "/"

    if (hardReload) {
      url = url.indexOf("/") === 0 ?
        SITE_INFO.http_root + url.substr(1) :
        SITE_INFO.http_root + url;
    }

    if (hardReload) {
      //hard reloads use traditional JS window.location.href 
      //to change url
      window.location.href = url;
      return;

    }

    //all "soft" reloads (location change within app) use
    //angulars $location.url() to change url using push/pop-state
    $location.url(url);
  };

}]);