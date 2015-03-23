app.factory("Property", ["WPRest", "$sce", function (WPRest, $sce) {
  console.log("property factory make noises");
  var propertyObjects = {
    // endURL = last peace of the url.. 

    found : function(endURL) {
      console.log("endURL in prop fack: ",endURL);
      //if no endURL, make empty obj so we dont crash!
      endURL = endURL ? endURL : {};

      //searching with WP JSON REST API filter parameters
      //always only search for properties
      var callUrl = "/posts?filter[category_name]=properties";
      //and add any additional parameters
      for (var j in endURL) {
        callUrl += "&filter[" + j + "]=" + endURL[j];
      }
      console.log("Property searching callUrl: " + callUrl);
      WPRest.restCall(callUrl, "GET", {}, {
        // send an disfunctional string to brodcastName
        broadcastName: "bananName",// does this funky name run off for the async to prevent callvacfunction from run of before ig got its inparamter? 
        //send an object with the restCall = "callback" to deligate the acynk
        callback: function(postData) {
          console.log("postData: ", postData);

          //if no results
          if (!postData) { return; // if no postData, end this function cause its no use running.. 
          }
           // postData is the one post endURL gets on requests trew succes in callbacfunction in
           // file: apicervice.js

          for (var i = 0; i < postData.length; i++) {
            asyncHandler(i, postData);
          }
          var results = [];
          function asyncHandler(i , postData) { // it calls everytime we loop..
            var myI = i; // needs to be stored in a varable to prevent losing "its data"
            var last = myI === postData.length-1; // why was it minus one?
            var post = postData[myI];
            console.log("posts: ",postData);
            var propertySlug = post.terms.property ? post.terms.property[0].slug : false;

            if (!propertySlug) { return; }

            post.excerpt = $sce.trustAsHtml(post.excerpt);
            post.content = $sce.trustAsHtml(post.content);

            var callUrl = "/media?filter[property]=" + propertySlug;

            WPRest.restCall(callUrl, "GET", {}, {
              broadcastName: last ? "foundProperty" : "notDone",
              callback: function(mediaData) {

                results.push({
                  "post" : post,
                  "propertyData" : post.property_data,
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