app.filter("hyraSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }

    range = range.split(";");
    //range = ["10", "40"]

    range[0] = range[0] / 1;
    range[1] = range[1] / 1;

    var filteredResults = [];

    //   $scope.options1 = {
    //  from: 0,
    //  to: 8000000,
    //  step: 100000,
    //  dimension: " kr",
    //  scale: [0,'|',2000000,'|',4000000,'|',6000000,'|',8000000]
    // };
    
    if (range.length === 0) {
      return properties;
    }

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      property.propertyData.hyra = property.propertyData.hyra / 1;

      if (
        property.propertyData.hyra >= range[0] &&
        property.propertyData.hyra <= range[1]) {

        filteredResults.push(property);      
      }
    }

    return filteredResults;
  };
}]);