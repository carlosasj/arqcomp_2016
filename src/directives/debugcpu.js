angular.module('arqcompApp').directive('debugcpuDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'templates/debugcpuDirective.html',
		replace: true,
		controller: 'DebugcpuDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('DebugcpuDirectiveController', ['$scope', 'CPU', function ($scope, CPU) {
	$scope.debugcpu = CPU.debug;
}]);