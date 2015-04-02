app.filter("prisSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }
    // console.log("properties: ", properties);

    range = range.split(";");
    range[0] = range[0] / 1;
    range[1] = range[1] / 1;

    var filteredResults = [];
    
    if (range.length === 0) {
      return properties;
    }
      // console.log("properties: ", properties);

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      // console.log("properties[i] ", properties[i]);
      property.propertyData.pris = property.propertyData.pris / 1;

      if (
        range[0] && range[1] &&
        property.propertyData.pris >= range[0] &&
        property.propertyData.pris <= range[1]) {

        filteredResults.push(property);

      } else if (
        range[0] && !range[1] &&
        property.propertyData.pris >= range[0]) {

        filteredResults.push(property);
      } else if (
        !range[0] && range[1] &&
        property.propertyData.pris <= range[1]) {

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