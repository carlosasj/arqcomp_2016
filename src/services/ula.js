angular.module('arqcompApp').factory('ULA', [function () {
    var val1 = 0;
    var val2 = 0;
    var function_name = 'noop';

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
        },
        noop : (val1) => {
            return 0;
        },
    };

    var set_func = func => {function_name = func; console.log({'function_name': func});};
    var set_val1 = val => {val1 = val; console.log({'val1': val});};
    var set_val2 = val => {val2 = val; console.log({'val2': val});};

    var execute = () => {
        output = functions[function_name](val1, val2)
    };

    return {
        output: ()=>{return output},
        execute: execute,
        set_func: set_func,
        set_val1: set_val1,
        set_val2: set_val2,
        debug: ()=>{ return {
            val1: val1,
            val2: val2,
            function_name: function_name,
            output: output,
        }},
    }
}]);