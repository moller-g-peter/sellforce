app.filter("omradesFilter", [function(){
	return function(estates, omraden){
		if (!estates) { return estates; }
		var result = [];

		
			// $scope.omraden = [
			// 	{val:false, name:"Annelund"},
			// 	{val:false, name:"Annetorp"},
			// 	{val:false, name:"Arlöv"},
			// 	{val:false, name:"Bellevue"},
			// 	{val:false, name:"Bunkeflostrand"},
			// 	{val:false, name:"Dammfri"},
			// 	{val:false, name:"Husie"},
			// 	{val:false, name:"Hyllie"},
			// 	{val:false, name:"Limhamn"},
			// 	{val:false, name:"Oxie"},
			// 	{val:false, name:"Ribersborg"},
			// 	{val:false, name:"Sibbarp"},
			// 	{val:false, name:"Solbacken"},
			// 	{val:false, name:"Toftanäs"},
			// 	{val:false, name:"Västra Hamnen"}
			// ];
		

		for (var i = 0; i < estates.length; i++) {

			var estate = estates[i];
			for (var j = 0; j < omraden.length; j++) {
				if (omraden[j].val && omraden[j].name == estate.propertyData.stadsdel) {
					result.push(estate);

				}
			}
		}










		return result;
	};
}]);