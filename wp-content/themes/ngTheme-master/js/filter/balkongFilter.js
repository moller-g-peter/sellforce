app.filter("balkongFilter", [function(){
			// console.log("estates II:");
	return function(estates, balkong){
		if (!estates || typeof balkong.val != "boolean") { return estates; }
		var result = [];

		/*
			balkong = [
				{val:false, name:"Hiss"}
			];
		*/

		for (var i = 0; i < estates.length; i++) {

			var estate = estates[i];
			estate.propertyData.balkong = estate.propertyData.balkong/1;
			if (balkong.val == estate.propertyData.balkong) {
				result.push(estate);

			}
		}


		return result;
	};
}]);