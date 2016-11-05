angular.module("arqcompApp").controller('ExecCtrl', ['$scope', '$rootScope', 'Instruction', function ($scope, $rootScope, Instruction) {
    $scope.back_to_config = () => {
        $rootScope.$broadcast('change-tab-to', 'config');
    };
}]);