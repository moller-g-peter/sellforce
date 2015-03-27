//this factory has two dependencies: "WPRest" and "$sce", 
//which is a service we have created to handle all
//REST communication to/from WordPress.
app.factory("Property", ["WPRest", "$sce", function(WPRest, $sce) {
  var propertyServant = {
    found : function(serchParam) {
 
 
      serchParam = serchParam ? serchParam : {};
 
 
      //we are always searching for posts
      //in the category "properties"
      //we are always searching for posts
      var callUrl = "/properties";

      var first = true;
      //build a REST callUrl from search params, 
      for (var i in serchParam) {
        //searchParams object keys are filter keys, 
        //searchParams object values are filter values
        if (serchParam[i].constructor.name != "Object") {
          callUrl += first ?
            "?filter["+i+"]="+serchParam[i] :
            "&filter["+i+"]="+serchParam[i];
        } else {
          for (var j in serchParam[i]) {
            callUrl += first ?
            "?filter["+i+"]["+j+"]="+serchParam[i][j] :
            "&filter["+i+"]["+j+"]="+serchParam[i][j];

            first = false;
          }
        }

        first = false;
      }
   
      console.log("Property find method will now call REST url: ", callUrl);
 
      //and make the REST call using WPRest to get all property posts
      WPRest.restCall(callUrl, "GET", {}, {
        broadcastName: "notImportant", //this broadcast is not important
        callback: function(postData) {
          //callback is triggered when we get data but 
          //BEFORE we broadcast data throughout the app

          // console.log("Property found property posts: ", postData);

          //clean up bad postdata before we start
          for (var i = 0; i < postData.length; i++) {
            if (!postData[i].terms.property) {
              postData.splice(i, 1);
            }
          }

          var resultsToBroadcast = [];
          var i = 0;
          postData.forEach(function(post) {
  
            var last = i === postData.length-1;
            post.excerpt = $sce.trustAsHtml(post.excerpt);
            post.content = $sce.trustAsHtml(post.content);

            var propertyTag = post.terms.property[0].slug;

            var mediaCallUrl = "/media?filter[property]="+propertyTag;

            WPRest.restCall(mediaCallUrl, "GET", {}, {
              broadcastName: last ? "foundProperty" : "notDone", //this broadcast is VERY important
              callback: function(mediaData) {

                resultsToBroadcast.push({
                  "media": mediaData,
                  "post": post,
                  "propertyData": post.property_data
                });
                if (last) {
                  return resultsToBroadcast;
                }
              }
            });
            i++;
          });
        }
      });
    }
  };
 
  return propertyServant;
}]);