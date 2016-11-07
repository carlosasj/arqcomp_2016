angular.module('arqcompApp').factory('Instructions', [function () {
    var predefinedCodes = [
        {
            title: 'Fibonacci',
            code: [
                'ADDI $r1 $0 4 # Enquanto i < 4',
                'ADDI $r2 $0 1',//f[i-1]
                'ADDI $r3 $0 1',//f[i]
                'ADDI $r4 $0 2',//i
                'NOP',//RAW
                'CMP  $r4 $r1',
                'JE   48',
                'ADD  $r5 $r2 $r3',//f[i+1] = f[i] + f[i-1]
                'MOV  $r2 $r3',
                'MOV  $r3 $r5',
                'ADDI $r4 $r4 1',
                'JMP  16',
                'HLT'
            ]
        },
    ];
    var code = predefinedCodes[0].code;
    return {
        getCode: codeNumer => {
            code = predefinedCodes[codeNumber].code;
        },
        get: pc => {
            pc /= 4;
            return code[pc];
        },
        predefinedCodes: predefinedCodes,
    }
}]);