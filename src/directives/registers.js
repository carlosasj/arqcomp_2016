angular.module('arqcompApp').directive('registersDirective', [function() {
	return {
		restrict: 'AE',
		templateUrl: 'arqcomp_2016/templates/registersDirective.html',
		replace: true,
		controller: 'RegistersDirectiveController',
	};
}]);

angular.module('arqcompApp').controller('RegistersDirectiveController', ['$scope', 'Registers', function ($scope, Registers) {
	$scope.registers = Registers.registers;
	$scope.keys = Object.keys(Registers.registers);
}]);