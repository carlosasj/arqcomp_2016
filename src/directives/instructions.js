angular.module('arqcompApp').directive('instructionsDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'templates/instructionsDirective.html',
		replace: true,
		controller: 'InstructionsDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('InstructionsDirectiveController', ['$scope', '$rootScope', 'Instructions', 'Registers', function ($scope, $rootScope, Instructions, Registers) {
	$scope.registers = Registers.registers;
	$scope.selected_code = $rootScope.asm_config.selected_code;
}]);