angular.module('arqcompApp').directive('playerDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'templates/playerDirective.html',
		replace: true,
		controller: 'PlayerDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('PlayerDirectiveController', ['$scope', 'CPU', function ($scope, CPU) {
	$scope.state = 'paused';

	$scope.click_play = () => {
		$scope.state = 'playing';
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
	};

	setTimeout(()=>{$('[data-tooltip]').tooltip()}, 50);
}]);