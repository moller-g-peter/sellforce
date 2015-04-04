app.filter("rumSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }

    //range = "10;40";
    range = range.split(";");
    //range = ["10", "40"]

    range[0] = range[0] / 1;
    range[1] = range[1] / 1;

    var filteredResults = [];
    
    if (range.length === 0) {
      return properties;
    }

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];

      property.propertyData.rum = property.propertyData.rum / 1;

      if (
        property.propertyData.rum >= range[0] &&
        property.propertyData.rum <= range[1]) {

        filteredResults.push(property);
      
      }
    }

    return filteredResults;
  };
}]);