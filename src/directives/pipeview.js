angular.module('arqcompApp').directive('pipeviewDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'arqcomp_2016/templates/pipeviewDirective.html',
		replace: true,
		controller: 'PipeviewDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('PipeviewDirectiveController', ['$scope', 'CPU', function ($scope, CPU) {
	$scope.mock = {
		'Fetch': 'F',
		'Decode': 'D',
		'Execute': 'E',
		'Write': 'W',
	};
	$scope.stages = CPU.debug;
}]);