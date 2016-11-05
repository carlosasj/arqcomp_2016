angular.module('arqcompApp').factory('Registers', [function () {
    var registers = null;

    var set = (reg, value) => {
        if (reg == '$0' || reg == '$cmp') return 0;
        else if (reg in registers) {
            registers[reg] = value;
            return registers[reg];
        } else {
            return null;
        }
    };

    var set_cmp = value => {
        registers['$cmp'] = value;
        return value;
    };

    var get = reg => {
        return (reg in registers)? registers[reg] : null;
    };

    var reset = () => {
        registers = {
            "$0": 0,
            "$r0": 0,
            "$r1": 0,
            "$r2": 0,
            "$r3": 0,
            "$r4": 0,
            "$r5": 0,
            "$r6": 0,
            "$r7": 0,
            "$cmp": 0
        }
    };

    reset();

    return {
        registers: registers,
        set: set,
        set_cmp: set_cmp,
        get: get,
        reset: reset
    }
}]);