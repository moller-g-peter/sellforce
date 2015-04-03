app.controller("searchController", ["$scope", "$routeParams", "Property", "$sce", "SITE_INFO", "$location", function($scope, $routeParams, Property, $sce, SITE_INFO,$location) {


// run the "found" function from "propertyfactory.js" in the "services" folder(find all estates in the view)
	var pageNo = 1;
	Property.found($routeParams, pageNo, true);
	// console.log("values:", data);


	$scope.searchDir = SITE_INFO.partials;

	$scope.priceValue = "0;8000000";
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


	$scope.spaceValue = "0;200";
	$scope.options3 = {
		from: 0,
		to: 200,
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
	
	$scope.accessoryOptions = [
		{name: "Both", val: ""},
		{name: "Yes", val: true},
		{name: "No", val: false}
	];


	$scope.balkong = $scope.accessoryOptions[0];
	$scope.hiss = $scope.accessoryOptions[0];


	$scope.bostader = [
		{val:true, name:"Lägenhet"},
		{val:true, name:"Villa"},
		{val:true, name:"Radhus"},
		{val:true, name:"Kolonistuga"},
		{val:true, name:"Studentlägenhet"},
		{val:true, name:"Stuga"},
		{val:true, name:"Seniorboende"},
		{val:true, name:"Övriga"}
	];


	$scope.omroden = [
		{val:true, name:"Annelund"},
		{val:true, name:"Annetorp"},
		{val:true, name:"Arlöv"},
		{val:true, name:"Bellevue"},
		{val:true, name:"Bunkeflostrand"},
		{val:true, name:"Dammfri"},
		{val:true, name:"Husie"},
		{val:true, name:"Hyllie"},
		{val:true, name:"Limhamn"},
		{val:true, name:"Oxie"},
		{val:true, name:"Ribersborg"},
		{val:true, name:"Sibbarp"},
		{val:true, name:"Solbacken"},
		{val:true, name:"Toftanäs"},
		{val:true, name:"Västra Hamnen"}
	];

	$scope.checkboxCategory = [
		$scope.bostader,
		$scope.tillbehor,
		$scope.omroden
	];



	$scope.$on("foundProperty", function(event, estates) {
		// console.log("estates: ", estates);
		pageNo++;
		Property.found($routeParams, pageNo);
		$scope.searchProperties = estates;
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