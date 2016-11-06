angular.module("arqcompApp").controller('MainCtrl', ['$scope', 'Instructions', function ($scope, Instructions) {
    $scope.tab = 'config';

    $scope.$on('change-tab-to', (event, arg) => {
        $scope.tab = arg;
    });

}]);