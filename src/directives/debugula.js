angular.module('arqcompApp').directive('debugulaDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'templates/debugulaDirective.html',
		replace: true,
		controller: 'DebugulaDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('DebugulaDirectiveController', ['$scope', 'ULA', function ($scope, ULA) {
	// $scope.debugula = ULA.debug();

	$scope.$watch(ULA.debug, val => {
		$scope.debugula = val;
	});
}]);