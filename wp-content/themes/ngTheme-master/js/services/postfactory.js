//our .factory() service for "Pages" rest calls
app.factory("Posts", ["WPRest" ,"$sce", function (WPRest, $sce) {
  //in a .factory() service object literal syntax is required
  var postServant = {
    get : function(postId) {
      var callUrl = postId ? "/posts/"+postId : "/posts";

      WPRest.restCall(callUrl, "GET", {}, {
        //always use a callback function before broadcasting data
        //so we can make all HTML trusted before it gets to a 
        //controller/view
        broadcastName : "gotPostData",
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
          console.log("get post data", data);
          return data;
        }
      });
    }
  };

  //.factory() services MUST return an object
  return postServant;
}]);