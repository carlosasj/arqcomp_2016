angular.module('arqcompApp').factory('ULA', ['Registers', function (Registers) {
    var output = 0;

    var functions = {
        add : (val1, val2) => {
            return val1 + val2;
        },
        sub : (val1, val2) => {
            return val1 - val2;
        },
        mul : (val1, val2) => {
            return val1 * val2;
        },
        cmp : (val1, val2) => {
            return val1 - val2;
        },
        mov : (val1) => {
            return val1;
        }
    };

    var execute = (func_name, val1, val2) => {
        output = functions[func_name](val1, val2)
    };

    return {
        output: output,
        execute: execute,
    }
}]);