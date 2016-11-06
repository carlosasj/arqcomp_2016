angular.module("arqcompApp").controller('ExecCtrl', ['$scope', '$rootScope', 'Instructions', function ($scope, $rootScope, Instructions) {
    $scope.back_to_config = () => {
        $rootScope.$broadcast('change-tab-to', 'config');
    };
}]);