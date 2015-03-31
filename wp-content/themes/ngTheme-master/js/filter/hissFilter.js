app.filter("hissFilter", [function(){
			console.log("estates II:");
	return function(estates, hiss){
		if (!estates || typeof hiss.val != "boolean") { return estates; }
		var result = [];

		/*
			hiss = [
				{val:false, name:"Hiss"}
			];
		*/

		for (var i = 0; i < estates.length; i++) {

			var estate = estates[i];
			estate.propertyData.hiss = estate.propertyData.hiss/1;
			if (hiss.val == estate.propertyData.hiss) {
				result.push(estate);

			}
		}


		return result;
	};
}]);