angular.module('arqcompApp').factory('Instructions', [function () {
    var predefinedCodes = [
        {
            idx:0,
            title: 'Fibonacci',
            code: [
                'ADDI $r1 $0 10    # i = 10;',
                'ADDI $r2 $0 1     # a = 1;',
                'ADDI $r3 $0 1     # b = 1;',
                'ADDI $r4 $0 2     # c = 2;',
                'ADDI $r5 $0 2     # n = 2;',
                'NOP',
                'CMP  $r4 $r1      # while(c != i){',
                'JE   56',
                'ADD  $r5 $r2 $r3  #   n = a + b;',
                'MOV  $r2 $r3      #   a = b;',
                'NOP',
                'MOV  $r3 $r5      #   b = n;',
                'ADDI $r4 $r4 1    #   c++;',
                'JMP  20           # }',
                'HLT'
            ]
        },
        {
            idx:1,
            title: 'Loop simples',
            code: [
                'ADDI $r1 $0 10   # a = 10;',
                'ADDI $r2 $0  1   # b = 1;',
                'ADDI $r2 $r2 1   # do{ b++;',
                'NOP',
                'CMP  $r1 $r2     # }',
                'JNE  8           # while (b != a);',
                'HLT'
            ]
        },
        {
            idx:2,
            title: 'Loop aninhado',
            code: [
                'ADDI $r6 $0  5   # a = 5;',
                'ADDI $r7 $0  5   # b = 5;',
                'ADDI $r1 $r1 1   # for(i=0; i!=a; i++){',
                'ADDI $r2 $r2 1   #   for(j=0; j!=b; j++){',
                'ADDI $r3 $r3 1   #     k++;',
                'CMP  $r2 $r7     #',
                'JNE  12          # }',
                'SUBI $r3 $r3 1',
                'MOV  $r2 $0      #',
                'CMP  $r1 $r6',
                'JNE  8           #}',
                'HLT'
            ]
        },
    ];
    var code = predefinedCodes[0].code;
    return {
        setCode: codeNumber => {
            code = predefinedCodes[codeNumber].code;
        },
        get: pc => {
            pc /= 4;
            return code[pc];
        },
        predefinedCodes: predefinedCodes,
    }
}]);