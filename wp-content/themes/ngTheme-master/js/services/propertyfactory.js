app.factory("Property", ["WPRest", "$sce", function (WPRest, $sce) {

  var resultsToBroadcast = [];

  var propertyObjects = {
    

    // allProperties : [],
    // **Remember endUrl is equal an object! (not a string value)
    found : function(serchParam, pageNo, startOver) {
      pageNo = pageNo ? pageNo : 1;

      serchParam = serchParam ? serchParam : {};

      if (startOver || pageNo === 1) {
        // propertyObjects.allProperties.length = 0;
        resultsToBroadcast.length = 0;
      }

      //searching with WP JSON REST API filter parameters
      //always only search for properties
      //we are always searching for posts
      //in the category "properties"
      var callUrl = "/properties?page="+pageNo;

      //build a REST callUrl from search params, 
      for (var i in serchParam) {

        //serchParam object values are filter values
        if (serchParam[i].constructor.name != "Object") {
          callUrl += "&filter["+i+"]="+serchParam[i];
        } 
        else {
          for (var j in serchParam[i]) {
            callUrl += "&filter["+i+"]["+j+"]="+serchParam[i][j];
          }
        }
      }

      WPRest.restCall(callUrl, "GET", {}, {
        // send an disfunctional string to brodcastName
        broadcastName: "uslessName",// does this funky name run off for the async to prevent callvacfunction from run of before ig got its inparamter?
        //send an object with the restCall = "callback" to deligate the acynk
        callback: function(postData) {
          // console.log("postData: ",postData);
          for (var i = postData.length - 1; i >= 0; i--) {
            if (!postData[i].terms.property) {
              postData.splice(i, 1);
            }
          }

          // var resultsToBroadcast = [];
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