angular.module('arqcompApp').factory('BPTable', ['$rootScope', function ($rootScope) {
    var max_count;
    var table = {};
    var reset = () => {
        table = {};
    };
    $rootScope.$on('reset', reset);
    $rootScope.$on('change-tab-to', (event, arg) => {
        if(arg == 'exec'){
            max_count = (1 << $rootScope.asm_config.number_of_bits)-1;

        }
    });
    max_count = (1 << $rootScope.asm_config.number_of_bits)-1;
    return {
        desviou: line => {
            table[line] = Math.min(table[line] + 1, max_count);
            $rootScope.$broadcast('BPTable-changed');
        },
        ndesviou: line => {
            table[line] = Math.max(table[line] - 1, 0);
            $rootScope.$broadcast('BPTable-changed');
        },
        branch: line => {
            if(typeof table[line] == 'undefined'){
                table[line] = 0;
            }
            $rootScope.$broadcast('BPTable-changed');
            return (table[line] << 1) >= max_count;
        },
        get_table: () => { return table },
    }
}]);