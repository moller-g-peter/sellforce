app.factory("Media", ["WPRest", function (WPRest) {


	/*
	source: "link to picture"
	propertySlug: "link to its property"
	*/
	var mediaObject =  {
		found : function(searcParam) {
		var result = [];

			searcParam = searcParam ? searcParam : {};
			var callUrl = "/media";
			var first = true;
			for (var i in searcParam) {
				callUrl += first ?
					"?filter[" + i + "]=" + searcParam[i] :
					"&filter[" + i + "]=" + searcParam[i];
			}


			WPRest.restCall(callUrl, "GET", {}, {broadcastName: "gotMedia",
				callback: function(mediaData){
					for (var i = 0; i < mediaData.length; i++) {
					
						result.push({
							"source": mediaData[i].source,
							"propertySlug": mediaData[i].terms.property[0].slug
						});
					}
					return result;

				}

			});
		}
	};

	return mediaObject;
}]);