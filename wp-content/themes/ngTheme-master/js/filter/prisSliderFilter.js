app.filter("prisSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }

    range = range.split(";");
    range[0] = range[0] / 1;
    range[1] = range[1] / 1;

    var filteredResults = [];
    
    if (range.length === 0) {
      return properties;
    }

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
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
