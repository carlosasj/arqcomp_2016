angular.module("arqcompApp").controller('MainCtrl', ['$scope', 'Instruction', function ($scope, Instruction) {
    $scope.tab = 'config';

    $scope.$on('change-tab-to', (event, arg) => {
        $scope.tab = arg;
    });

}]);