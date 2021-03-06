angular.module('arqcompApp').directive('playerDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'arqcomp_2016/templates/playerDirective.html',
		replace: true,
		controller: 'PlayerDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('PlayerDirectiveController', ['$scope', '$interval', '$timeout', 'CPU', function ($scope, $interval, $timeout, CPU) {
	$scope.state = 'paused';
	$scope.delay = 500;
	$scope.$on('reset', () =>{
		$scope.state = 'paused';
	});
	$scope.$on('halt', () =>{
		$scope.state = 'paused';
	});

	var loop = () => {
		if ($scope.state == 'playing') {
			CPU.clock();
			$timeout(loop, $scope.delay);
		}
	};

	var ff = () => {
		if ($scope.state == 'playing') {
			CPU.clock();
			$timeout(ff, 25);
		}
	};

	$scope.click_play = () => {
		$scope.state = 'playing';
		loop();
	};

	$scope.click_pause = () => {
		$scope.state = 'paused';
	};

	$scope.click_step = () => {
		$scope.state = 'paused';
		CPU.clock();
	};

	$scope.click_ff = () => {
		$scope.state = 'playing';
		ff();
	};

	$timeout(()=>{$('[data-tooltip]').tooltip()}, 50);
}]);