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
		{val:true, name:"Lägenhet"},
		{val:true, name:"Villa"},
		{val:true, name:"Radhus"},
		{val:true, name:"Kolonistuga"},
		{val:true, name:"Studentlägenhet"},
		{val:true, name:"Stuga"},
		{val:true, name:"Seniorboende"},
		{val:true, name:"Övriga"}
	];

	$scope.tillbehor = [
		{val:false, name:"Balkong"},
		{val:false, name:"Hiss"}
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
		
		pageNo++;
		Property.found($routeParams, pageNo);
		$scope.searchProperties = estates;
		// console.log("searchprops: ", $scope.searchProperties);
		// console.log("estates amigo! ", estates);		// här finns nu alla 70 bostäder ("estates") som objekt i en array 

		// $scope.searchAndFind = function() {

		// 	var count = 0;

		// 	for (var k = 0; k < $scope.checkboxCategory.length; k++) {
		// 	var foundProperties = [];
		// 		filterEveryChecbox($scope.checkboxCategory[k]);
		// 			// console.log("$scope.checkboxCategory :", $scope.checkboxCategory); // här finns 3 arrayer med "bostader, tillbehor, omroden"
		// 		}

		// 		function filterEveryChecbox(data) {
		// 		// console.log("filterEveryChecbox got dtata: ",data);
		// 			// console.log("searchProp. data: ", data);

		// 		// om en ruta är checkad så spottas den typen ut i "data"
		// 		if (data.length == 1){
		// 			$scope.searchProperties = data;
		// 			// console.log("estates amigo! ", estates); // vid det här läget är "estates" intakt och innehåller fortfarande 70 bostäder!!!!
		// 			// console.log("data: ", data);  // här innehåller nu "data" tex stugor
		// 			return;
		// 		}
		// 		for (var i = 0; i < data.length; i++) {
		// 			if (data[i].val){

		// 				for (var j = 0; j < estates.length; j++) {
		// 					// console.log("estates: ", estates);  // 70 bostäder

		// 					if (estates[j].propertyData.bostad === data[i].name || estates[j].propertyData.stadsdel === data[i].name){
		// 						// console.log("true is: ",estates[j]);
		// 						foundProperties.push(estates[j]);
		// 						validateFilter(foundProperties);
		// 					}
		// 				}
		// 			}
		// 			else{
		// 				count += 1;

		// 				if (count === 200){
		// 					// console.log("all false..");
		// 					Property.found();
		// 				}
		// 			}
		// 		}
		// 	}

		// 	var result = [];
		// 	function validateFilter(data) {
		// 		// console.log("result: ",result);
		// 		if (data < result){
		// 			// console.log(" if data < result: ",result);
		// 			result.push(data);
		// 			$scope.searchProperties = result.pop();
		// 			filterEveryChecbox(data);
		// 		}
		// 		else if(!result){
		// 			result = data;
		// 			filterEveryChecbox(data);
		// 		}
		// 	}
		// };
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


<<<<<<< HEAD


	$scope.goTo = function(url , hardReload) {
    //any relative path destined for hardReload 
    //gets http_root instead of initial "/"
    // console.log("click!! ");
   // console.log("currUrl: ", url, " reloder param: ",hardReload);
    if (hardReload) {
      url = url.indexOf("/") === 0 ?
        SITE_INFO.http_root + url.substr(1) :
        SITE_INFO.http_root + url;
    }

    if (hardReload) {
      //hard reloads use traditional JS window.location.href 
      //to change url
      window.location.href = url;
      return;

    }

    //all "soft" reloads (location change within app) use
    //angulars $location.url() to change url using push/pop-state
    $location.url(url);
  };


=======
>>>>>>> origin/master
}]);