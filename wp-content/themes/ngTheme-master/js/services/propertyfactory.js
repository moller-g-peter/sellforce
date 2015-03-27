app.factory("Property", ["WPRest", "$sce", function (WPRest, $sce) {
  // console.log("property factory make noises");
  var propertyObjects = {
    


    // **Remember endUrl is equal an object! (not a string value)
    found : function(serchParam) {

      serchParam = serchParam ? serchParam : {};

      //searching with WP JSON REST API filter parameters
      //always only search for properties
      //we are always searching for posts
      //in the category "properties"
      var callUrl = "/properties";

      var first = true;
      //build a REST callUrl from search params, 
      for (var i in serchParam) {

        //serchParam object values are filter values
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

      // console.log("callUrl in prop fack: ",callUrl);

      // console.log("Property searching callUrl: " + callUrl);
      WPRest.restCall(callUrl, "GET", {}, {
        // send an disfunctional string to brodcastName
        broadcastName: "uslessName",// does this funky name run off for the async to prevent callvacfunction from run of before ig got its inparamter?
        //send an object with the restCall = "callback" to deligate the acynk
        callback: function(postData) {
          
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
 
  return propertyObjects;
}]);