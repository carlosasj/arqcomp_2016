angular.module("arqcompApp").controller('ConfigCtrl', ['$scope', '$rootScope', 'Instructions', function ($scope, $rootScope, Instructions) {
    $rootScope.$broadcast('reset');
    $scope.instructions_db = Instructions.predefinedCodes;

    if ($rootScope.asm_config) {
        $scope.form = $rootScope.asm_config;
    } else {
        $scope.form = {
            selected_code: Instructions.predefinedCodes[0],
            prediction_type: 0,
            number_of_bits: 1,
        };
    }

    $scope.error = '';

    var validate = (form) => {
        if (typeof form.selected_code == 'undefined') return 'selected_code_not_defined';
        if (typeof form.prediction_type == 'undefined') return 'prediction_type_not_defined';
        if (form.prediction_type == 2 && !form.number_of_bits >= 1 && !form.number_of_bits <= 8) return 'number_of_bits_not_in_range';
        if (form.prediction_type < 0 || form.prediction_type > 2) return 'prediction_type_not_in_range';

        return true;
    };

    $scope.validate_and_change_tab = (form) => {
        var valid = validate(form);
        if (valid == true) {
            $rootScope.asm_config = form;
            $rootScope.$broadcast('change-tab-to', 'exec');
        } else {
            $scope.error = valid;
        }
    };

    setTimeout(Materialize.updateTextFields, 10);
}]);