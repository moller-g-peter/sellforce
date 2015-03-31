app.filter("bostaderFilter", [function(){
	return function(estates, bostadsTyper){
			console.log("estates II: ", estates, " bostader: ", bostadsTyper);
		if (!estates) { return estates; }
		var result = [];

		/*
			bostadsTyper = [
				{val:false, name:"Lägenhet"},
				{val:false, name:"Villa"},
				{val:false, name:"Radhus"},
				{val:false, name:"Kolonistuga"},
				{val:false, name:"Studentlägenhet"},
				{val:false, name:"Stuga"},
				{val:false, name:"Seniorboende"},
				{val:false, name:"Övriga"}
			],
		*/

		for (var i = 0; i < estates.length; i++) {

			var estate = estates[i];
			for (var j = 0; j < bostadsTyper.length; j++) {
				// console.log("estates II: ", estate.propertyData.bostad);
				if (bostadsTyper[j].val && bostadsTyper[j].name == estate.propertyData.bostad) {
					result.push(estate);

				}
			}
		}










		return result;
	};
}]);