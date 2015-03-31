app.controller("searchController", ["$scope", "$routeParams", "Property", "$sce", "SITE_INFO", "$location", function($scope, $routeParams, Property, $sce, SITE_INFO,$location) {


// run the "found" function from "propertyfactory.js" in the "services" folder(find all estates in the view)
 	var pageNo = 1;
	Property.found($routeParams, pageNo, true);
	// console.log("values:", data);


	$scope.searchDir = SITE_INFO.partials;

	$scope.priceValue = "0";
	$scope.options1 = {
		from: 0,
		to: 8000000,
		step: 100000,
		dimension: " kr",
		scale: [0,'|',2000000,'|',4000000,'|',6000000,'|',8000000]
	};

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

	// "Property.found();" starts this function and get estates (= all properties)
	






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
	$scope.omroden = [
		{val:false, name:"Annelund"},
		{val:false, name:"Annetorp"},
		{val:false, name:"Arlöv"},
		{val:false, name:"Bellevue"},
		{val:false, name:"Bunkeflostrand"},
		{val:false, name:"Dammfri"},
		{val:false, name:"Husie"},
		{val:false, name:"Hyllie"},
		{val:false, name:"Limhamn"},
		{val:false, name:"Oxie"},
		{val:false, name:"Ribersborg"},
		{val:false, name:"Sibbarp"},
		{val:false, name:"Solbacken"},
		{val:false, name:"Toftanäs"},
		{val:false, name:"Västra Hamnen"}
	];

	$scope.checkboxCategory = [
		$scope.bostader,
		$scope.tillbehor,
		$scope.omroden
	];



	$scope.$on("foundProperty", function(event, estates) {
		
		// when function starts, print all properties (in the view)
		// console.log("estate: ", estates);
		 pageNo++;
  	Property.found($routeParams, pageNo);
		$scope.searchProperties = estates;
		// function that starts when clicking "ng-click="searchAndFind()"" in view
		$scope.searchAndFind = function() {
			// declare an empty array EACH time the "ng-click="searchAndFind()" button is clicked
			// everytime this function runs, "count" equals zero
			var count = 0;
			// looping through the array (consisting of objects) "bostader"

			for (var k = 0; k < $scope.checkboxCategory.length; k++) {
			var foundProperties = [];
				filterEveryChecbox($scope.checkboxCategory[k])
			}

			function filterEveryChecbox(data) {
				console.log("filterEveryChecbox got dtata: ",data);
				if (data.length == 1){
					$scope.searchProperties = data;
					return;
				}
				for (var i = 0; i < data.length; i++) {
					//if any object in "bostader"s .val (false/true) is true...
					if (data[i].val){

						for (var j = 0; j < estates.length; j++) {
							// console.log("data[i].name: ",estates[j]);
							// if the estate name (from WP_DB) is equal to the specific type of name in the array "bostader" declared above...
							if (estates[j].propertyData.bostad === data[i].name ||  estates[j].propertyData.stadsdel === data[i].name){
								console.log("true is: ",estates[j]);
								// ...then put (=push) each estate in the array "foundProperties" declared above...
								foundProperties.push(estates[j]);
								validateFilter(foundProperties);
							}
						}
					}
					else{
						// let "count" add an int (+1) for each false .val it finds from the array "bostader" above...
						count += 1;
						// console.log("count: ",count);
						// ...and if "count" adds up to 9 false(s)...
						if (count === 200){
							console.log("all false..");
							// ...then run the "found" function from "propertyfactory.js" in the "services" folder
							Property.found();
						}
					}
				}
			}

			var result = [];
			function validateFilter(data) {
				console.log("result: ",result);
				if (data < result){
					console.log(" if data < result: ",result);
					result.push(data);
					$scope.searchProperties = result.pop();
					filterEveryChecbox(data);
				}
				else if(!result){
					result = data;
					filterEveryChecbox(data);
				}
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