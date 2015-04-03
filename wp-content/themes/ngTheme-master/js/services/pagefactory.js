//our .factory() service for "Pages" rest calls
app.factory("Pages", ["WPRest" ,"$sce", function (WPRest, $sce) {
  WPRest.restCall("/", "GET", {}, "something");
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
    },
    search: function(searchParams) {
      /*
        searchParams = {
          filterKey1: filterValue1,
          filterKey2: filterValue2
        }
      */
      var callUrl = "/pages";
      var first = true;
      for (var i in searchParams) {
        callUrl += first ?
          "?filter["+i+"]=" + searchParams[i] : //if true
          "&filter["+i+"]=" + searchParams[i]; //if false
        first = false;
      }

      WPRest.restCall(callUrl, "GET", {}, "foundPages");
    }
  };

  //.factory() services MUST return an object
  return pageServant;
}]);