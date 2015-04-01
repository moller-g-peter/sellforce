app.factory("HomeProperties", ["WPRest", "$sce", function (WPRest, $sce) {


  var pageMediaObjects = {
    
    buildPageStructure : function(serchParam) {


      serchParam = serchParam ? serchParam : {};

      var callUrl = "/properties";

      var first = true;

      for (var i in serchParam) {

        if (serchParam[i].constructor.name != "Object") {
          callUrl += first ? "?filter["+i+"]="+serchParam[i] : "&filter["+i+"]="+serchParam[i];
        } else {
          for (var j in serchParam[i]) {
            callUrl += first ? "?filter["+i+"]["+j+"]="+serchParam[i][j] : "&filter["+i+"]["+j+"]="+serchParam[i][j];
            first = false;
          }
        }
        first = false;
      }

      WPRest.restCall(callUrl, "GET", {}, {
        broadcastName: "bananName",// does this funky name run off for the async to prevent callvacfunction from run of before ig got its inparamter?
        callback: function(postData) {
          
          if (!postData) { return; // if no postData, end this function cause its no use running.. 
          }

          for (var i = 0; i < postData.length; i++) {
            asyncHandler(i, postData);
          }

          var results = [];

          function asyncHandler(i , postData) { // it calls everytime we loop..

            var myI = i; // needs to be stored in a varable to prevent losing "its data"
            var last = myI === postData.length-1; // why was it minus one?
            var post = postData[myI];
            var propertySlug = post.terms.property ? post.terms.property[0].slug : false;

            if (!propertySlug) { i++; return; }

            post.excerpt = $sce.trustAsHtml(post.excerpt);
            post.content = $sce.trustAsHtml(post.content);

            var callUrl = "/media?filter[property]=" + propertySlug;

            WPRest.restCall(callUrl, "GET", {}, {
              broadcastName: last ? "foundProperty" : "notDone",
              callback: function(mediaData) {

                results.push({
                  "post" : post,
                  "propertyData" : post.property_da3ta,
                  "media" : mediaData
                });

                if (last) {
                  return results;
                }

              }
            });
          }
        }
      });
    }
  };
  return propertyObjects;
}]);