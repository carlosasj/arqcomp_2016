angular.module('arqcompApp').factory('Instruction', [function () {
    var predefinedCodes = [
        [
            'ADDI $r2 $0 1',//f[i-1]
            'ADDI $r3 $0 1',//f[i]
            'ADDI $r4 $0 2',//i
            'CMP $r4 $r1',
            'JE 40',
            'ADD $r5 $r2 $r3',//f[i+1] = f[i] + f[i-1]
            'MOV $r2 $r3',
            'MOV $r3 $r5',
            'ADDI $r4 $r4 1',
            'JMP 12',
            'HALT'
        ]
    ];
    var code = predefinedCodes[0];
    return {
        getCode: codeNumer => {
            code = predefinedCodes[codeNumber];
        },
        get: pc => {
            pc /= 4;
            return code[pc];
        }
    }
}]);