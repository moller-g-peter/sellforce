app.factory("Media", ["WPRest", function (WPRest) {


	/*
	source: "link to picture"
	propertySlug: "link to its property"
	*/
	var result = [];
	var mediaObject =  {
		found : function(searcParam) {
			// console.log("hello i'm alive!  got routparam: ", searcParam);
			searcParam = searcParam ? searcParam : {};
			var callUrl = "/media";
			var first = true;
			for (var i in searcParam) {
				callUrl += first ?
					"?filter[" + i + "]=" + searcParam[i] :
					"&filter[" + i + "]=" + searcParam[i];
			}
			// console.log("searcParam[i]: ",searcParam[i])
			// console.log("callurl: ",callUrl);



			WPRest.restCall(callUrl, "GET", {}, {broadcastName: "gotMedia", 
				callback: function(placementData){
					for (var i = 0; i < placementData.length; i++) {
					
						result.push({
							"source": placementData[i].source,
							"propertySlug": placementData[i].terms.property[0].slug
						});
					}
					return result;

				}

			});
		}
	}

	return mediaObject;
}]);