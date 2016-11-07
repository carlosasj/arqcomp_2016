angular.module('arqcompApp').directive('instructionsDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'arqcomp_2016/templates/instructionsDirective.html',
		replace: true,
		controller: 'InstructionsDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('InstructionsDirectiveController', ['$scope', '$rootScope', 'Instructions', 'Registers', function ($scope, $rootScope, Instructions, Registers) {
	$scope.registers = Registers.registers;
	$scope.selected_code = $rootScope.asm_config.selected_code;
	$scope.max_prediction_counter = (() => {return (1 << $rootScope.asm_config.number_of_bits)-1})();
}]);