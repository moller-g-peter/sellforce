app.factory("Media", ["WPRest", function (WPRest) {
	
	var mediaServant =  {
		found : function(serchParams) {
			var callUrl = "/media?filter[placement]=home";

			WPRest.restCall(callUrl, "GET", {}, "gotMedia");
		}
	}

	return mediaServant;
}]);