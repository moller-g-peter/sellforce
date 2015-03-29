app.controller("searchController", ["$scope", "$routeParams", "Property", "$sce", "SITE_INFO", function($scope, $routeParams, Property, $sce, SITE_INFO) {


// run the "found" function from "propertyfactory.js" in the "services" folder(find all estates in the view)
	Property.found();
	// console.log("values:", data);


	$scope.searchDir = SITE_INFO.partials;

	// $scope.$on("foundProperty", function(event, values) {

	// 	$scope.$watch("priceValue", function() {
			
	// 		// $scope.searchProperties = values;

	// 		var setPriceVal = $scope.priceValue;

	// 		var valueStructure = [];
	// 			// console.log("number? ",checkNaNPrise, "second: ",checkNANFrom);
	// 		for (var i = 0; i < values.length; i++) {
	// 			var checkNaNPrise = values[i].propertyData.pris /1;
	// 			var checkNANFrom = setPriceVal/1;

	// 			if (checkNaNPrise > checkNANFrom){

	// 				valueStructure.push(values[i]);


	// 			}
	// 		}
	// 		$scope.searchProperties = valueStructure;
	// 		// console.log("valueStructure: ", valueStructure);
	// 	});
	// });

	// $scope.search = data;

	$scope.priceValue = "0";
	$scope.options1 = {
		from: 0,
		to: 8000000,
		step: 100000,
		dimension: " kr",
		scale: [0,'|',2000000,'|',4000000,'|',6000000,'|',8000000]
	};
	// console.log("options1:", $scope.options1);
	// console.log("dimension:", $scope.options1);
	// console.log("scope", $scope);

	$scope.rentValue = "0;20000";
	$scope.options2 = {
		from: 0,
		to: 20000,
		step: 1000,
		dimension: " kr",
		scale: [0,'|',2000,'|',4000,'|',6000,'|',8000,'|',10000,'|',12000,'|',14000,'|',16000,'|',18000,'|',20000]
	};


	$scope.spaceValue = "0;300";
	$scope.options3 = {
		from: 0,
		to: 300,
		step: 5,
		dimension: " kvm",
		scale: [20,'|',40,'|',60,'|',80,'|',100,'|',120,'|',140,'|',160,'|',180,'|',200]
	};


	$scope.roomValue = "1;8";
	$scope.options4 = {
		from: 1,
		to: 8,
		step: 1,
		dimension: "",
		scale: [1, 2, 3, 4, 5, 6, 7, 8]
	};

	$scope.$on("foundProperty", function(event, estates) {
		console.log(".val", estates);
		
		$scope.bostader = [
			{val:false, name:"Lägenhet"},
			{val:false, name:"Villa"},
			{val:false, name:"Radhus"},
			{val:false, name:"Kolonistuga"},
			{val:false, name:"Studentlägenhet"},
			{val:false, name:"Stuga"},
			{val:false, name:"Seniorboende"},
			{val:false, name:"Övriga"}
		];

		$scope.tillbehor = [
			{val:false, name:"Balkong"},
			{val:false, name:"Hiss"}
		];
	// "Property.found();" starts this function and get estates (= all properties)
		// when function starts, print all properties (in the view)
		$scope.searchProperties = estates;
		// function that starts when clicking "ng-click="searchAndFind()"" in view
		$scope.searchAndFind = function() {
			// declare an empty array EACH time the "ng-click="searchAndFind()" button is clicked
			var foundProperties = [];
			// everytime this function runs, "count" equals zero
			var count = 0;
			// looping through the array (consisting of objects) "bostader"
			for (var i = 0; i < $scope.bostader.length; i++) {
				// if any object in "bostader"s .val (false/true) is true...
				if ($scope.bostader[i].val){
					// ...loop through all estates that is true (checked in the view)
					for (var j = 0; j < estates.length; j++) {
						// if the estate name (from WP_DB) is equal to the specific type of name in the array "bostader" declared above...
						if (estates[j].propertyData.bostad == $scope.bostader[i].name){
							// ...then put (=push) each estate in the array "foundProperties" declared above...
							foundProperties.push(estates[j]);
							// ...and rewrite "searchProperties" declared above with the requested amount of estates
							// $scope.searchProperties = foundProperties;
							filterFunction(foundProperties);
						}
					}
				}
				else{
					// let "count" add an int (+1) for each false .val it finds from the array "bostader" above...
					count += 1;
					// ...and if "count" adds up to 9 false(s)...
					if (count === 9){
						// ...then run the "found" function from "propertyfactory.js" in the "services" folder
						Property.found();
					}
				}
			}
		};
		var count = 0;
		var sortedEstates = [];
		filterFunction = function(data) {
			count += 1;
			if(count ){

			}
		};
	});

	// function that resets the view when clicking "ng-click="resetSearch()"" in view
	$scope.resetSearch = function() {
		// loop through the array (consisting of objects) "bostader"...
		for (var i = 0; i < $scope.bostader.length; i++) {
			// ...and make every bostader.val declared above to false 
			$scope.bostader[i].val = false;
		}
		// ...then run the "found" function from "propertyfactory.js" in the "services" folder(find all estates again in the view)
		Property.found();
	};







}]);