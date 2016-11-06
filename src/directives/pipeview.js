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
	$scope.count_hits = 0;
	$scope.count_miss = 0;
	$scope.stages = CPU.debug;
	$scope.count_clocks = CPU.count_clocks();

	$scope.$on('CPU-clock', () => {
		$scope.count_clocks = CPU.count_clocks();
	});

	$scope.$on('reset', () => {
		$scope.count_hits = 0;
		$scope.count_miss = 0;
	});

	$scope.$on('BPTable-errou', () => {
		$scope.count_miss += 1;
	});

	$scope.$on('BPTable-acertou', () => {
		$scope.count_hits += 1;
	});
}]);