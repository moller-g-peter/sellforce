//our .factory() service for "Pages" rest calls
app.factory("Pages", ["WPRest" ,"$sce", function (WPRest, $sce) {
  //in a .factory() service object literal syntax is required
  var pageServant = {
    get : function(pageId) {
      var callUrl = pageId ? "/pages/"+pageId : "/pages";

      WPRest.restCall(callUrl, "GET", {}, {
        //always use a callback function before broadcasting data
        //so we can make all HTML trusted before it gets to a 
        //controller/view
        broadcastName : "gotPageData",
        callback : function(data) {
          /*
            angular protects us from "dangerous" HTML by converting it to a string

            if we want to show HTML from a string in DOM 
            we first need to tell angular that it can be trusted.
            
            this is done using the $sce service on the HTML string in JS
            and the ng-bind-html directive in the view
          */
          if (data.constructor.name == "Array") {
            data.forEach(function(item) {
              item.excerpt = $sce.trustAsHtml(item.excerpt);
              item.content = $sce.trustAsHtml(item.content);
            });
          } else {
            data.excerpt = $sce.trustAsHtml(data.excerpt);
            data.content = $sce.trustAsHtml(data.content);
          }

          return data;
        }
      });
    },
    post : function(data) {
      var callUrl = "/pages";
      WPRest.restCall(callUrl, "POST", data, "savedNewPage");
    },
    put : function(pageId, data) {
      var callUrl = "/pages/"+pageId;
      WPRest.restCall(callUrl, "PUT", data, "updatedPage");
    },
    delete : function(pageId) {
      var callUrl = "/pages/"+pageId;
      WPRest.restCall(callUrl, "DELETE", {}, "deletedPage");
    }
  };

  //.factory() services MUST return an object
  return pageServant;
}]);