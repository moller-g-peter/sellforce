app.controller("searchController", ["$scope", "Pages", "$sce", function($scope, Pages, $sce) {


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


	















}]);