angular.module('arqcompApp').factory('Registers', ['$rootScope', function ($rootScope) {
    var registers = null;
    var _set = (reg, value) => {
        if (reg == '$0') return 0;
        else if (reg in registers) {
            registers[reg] = value;
            return registers[reg];
        } else {
            return null;
        }
    };
    var _toset = {};
    var set = (reg, value) => {
        _toset[reg] = value;
    };
    var endclock = () => {
        for(reg in _toset){
            _set(reg, _toset[reg]);
        }
        _toset = {};
    };

    var get = reg => {
        return (reg in registers)? registers[reg] : null;
    };
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
        "$cmp": 0,
        "$pc": 0,
    };
    var reset = () => {
        for(key in registers){
            registers[key] = 0;
        }
    };

    reset();
    $rootScope.$on('reset', reset);

    return {
        registers: registers,
        set: set,
        get: get,
        reset: reset,
        endclock:endclock,
    }
}]);