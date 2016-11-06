angular.module('arqcompApp').directive('playerDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'templates/playerDirective.html',
		replace: true,
		controller: 'PlayerDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('PlayerDirectiveController', ['$scope', '$interval', '$timeout', 'CPU', function ($scope, $interval, $timeout, CPU) {
	var interval_func = null;
	$scope.state = 'paused';
	$scope.delay = 500;

	$scope.click_play = () => {
		$scope.state = 'playing';

		interval_func = $interval(CPU.clock, $scope.delay);
	};

	$scope.click_pause = () => {
		$scope.state = 'paused';
		$interval.cancel(interval_func);
	};

	$scope.click_step = () => {
		$scope.state = 'paused';
		CPU.clock();
	};

	$scope.click_ff = () => {
		$scope.state = 'playing';
	};

	$timeout(()=>{$('[data-tooltip]').tooltip()}, 50);
}]);