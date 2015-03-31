app.filter("prisSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }
    // console.log("properties: ", properties);
    console.log("range: ", range);

    var filteredResults = [];

  //   $scope.options1 = {
		// 	from: 0,
		// 	to: 8000000,
		// 	step: 100000,
		// 	dimension: " kr",
		// 	scale: [0,'|',2000000,'|',4000000,'|',6000000,'|',8000000]
		// };
    
    if (range.length === 0) {
      return properties;
    }
      // console.log("properties: ", properties);

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      // console.log("properties[i] ", properties[i]);
      property.propertyData.asking_price = property.propertyData.asking_price / 1;

      if (
        range[0] && range[1] &&
        property.propertyData.asking_price >= range[0] &&
        property.propertyData.asking_price <= range[1]) {

        filteredResults.push(property);



      
      } else if (
        range[0] && !range[1] &&
        property.propertyData.asking_price >= range[0]) {

        filteredResults.push(property);
      } else if (
        !range[0] && range[1] &&
        property.propertyData.asking_price <= range[1]) {

        filteredResults.push(property);
      } else if (!range[0] && !range[1]) {

        filteredResults.push(property);
      }
    }

    return filteredResults;
  };
}]);









// $scope.$on("foundProperty", function(event, values) {

// 		$scope.$watch("priceValue", function() {
			
// 			// $scope.searchProperties = values;

// 			var setPriceVal = $scope.priceValue;

// 			var valueStructure = [];
// 				// console.log("number? ",checkNaNPrise, "second: ",checkNANFrom);
// 			for (var i = 0; i < values.length; i++) {
// 				var checkNaNPrise = values[i].propertyData.pris /1;
// 				var checkNANFrom = setPriceVal/1;

// 				if (checkNaNPrise > checkNANFrom){

// 					valueStructure.push(values[i]);


// 				}
// 			}
// 			$scope.searchProperties = valueStructure;
// 			// console.log("valueStructure: ", valueStructure);
// 		});
// 	});

// 	$scope.search = data;

// 	$scope.priceValue = "0";

// // ========================================================