app.filter("rumSliderFilter", [function () {
  return function (properties, range) {
    if (!properties) { return; }
    // console.log("properties: ", properties);
    // console.log("range: ", range);

    //range = "10;40";
    range = range.split(";");
    //range = ["10", "40"]

    range[0] = range[0] / 1;
    range[1] = range[1] / 1;

    // console.log("range:", range[0]);
    var filteredResults = [];

  //   $scope.options1 = {
    //  from: 0,
    //  to: 8000000,
    //  step: 100000,
    //  dimension: " kr",
    //  scale: [0,'|',2000000,'|',4000000,'|',6000000,'|',8000000]
    // };
        // console.log("from and to works!");
        // console.log("filteredResults :", filteredResults);
    
    if (range.length === 0) {
      return properties;
    }
      console.log("properties: ", properties);

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      // console.log("property: ", property);
      // console.log("property.propertyData.asking_price:", property.propertyData.asking_price);
      property.propertyData.rum = property.propertyData.rum / 1;

      if (
        property.propertyData.rum >= range[0] &&
        property.propertyData.rum <= range[1]) {

        filteredResults.push(property);
          // console.log("filteredResults: ", filteredResults);
      
      }
    }

    return filteredResults;
  };
}]);