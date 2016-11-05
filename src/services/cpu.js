angular.module('arqcompApp').factory('CPU', [function () {

    var jmp = instruction => {
        var regex = all_functions[arguments.callee.name.toUpperCase()].regex;
    };

    var jeq = instruction => {
        var regex = all_functions[arguments.callee.name.toUpperCase()].regex;
    };

    var jne = instruction => {
        var regex = all_functions[arguments.callee.name.toUpperCase()].regex;
    };

    var jgt = instruction => {
        var regex = all_functions[arguments.callee.name.toUpperCase()].regex;
    };

    var jlt = instruction => {
        var regex = all_functions[arguments.callee.name.toUpperCase()].regex;
    };

    var all_functions = {
        'ADDI': {func: addi, regex: /ADDI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)/, },
        'ADD' : {func: add,  regex: /ADD (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])/, },
        'SUBI': {func: subi, regex: /SUBI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)/, },
        'SUB' : {func: sub,  regex: /SUB (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])/, },
        'MULI': {func: muli, regex: /MULI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)/, },
        'MUL' : {func: mul,  regex: /MUL (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])/, },
        'CMP' : {func: cmp,  regex: /CMP (\$0|\$r[0-7]) (\$0|\$r[0-7])/, },
        'JMP' : {func: jmp,  regex: /JMP (\d+)/, },
        'JEQ' : {func: jeq,  regex: /JEQ (\d+)/, },
        'JNE' : {func: jne,  regex: /JNE (\d+)/, },
        'JGT' : {func: jgt,  regex: /JGT (\d+)/, },
        'JLT' : {func: jlt,  regex: /JLT (\d+)/, },
    };
    var stages = {};

    // program counter - próxima instrução a ser lida
    var pc = 0;

    var fetch = () => {
        stages['F'].instruction_number = pc;
        // stages['F'].instruction_verbose = Instructions.get(pc);
        stages['F'].is_bubble = false;
        stages['F'].func = null;

        pc = pc + 4;
    };

    var decode = () => {
        stages['D'].instruction_number = stages['F'].instruction_number;
        stages['D'].instruction_verbose = stages['F'].instruction_verbose;
        stages['D'].is_bubble = stages['F'].is_bubble;
        stages['D'].func = parse(stages['D'].instruction_verbose).details.func;
    };

    var execute = () => {
        stages['E'].instruction_number = stages['D'].instruction_number;
        stages['E'].instruction_verbose = stages['D'].instruction_verbose;
        stages['E'].is_bubble = stages['D'].is_bubble;
        stages['E'].func = stages['D'].func;

        stages['E'].func()
    };

    var parse = instruction => {
        for (var func_name in all_functions) {
            var f = all_functions[func_name];
            if (instruction.match(f.regex)) {
                return {
                    func_name: func_name,
                    details: f,
                }
            }
        }
    };

    var none = () => {/* Faz absolutamente nada */};

    (function init() {
        // F - Fectch; Pega a próxima instrução
        // D - Decode; Decodifica a instrução
        // E - Execute; Executa a instrução
        // W - Write; Escreve o resultado no registrador de destino
        var stg = ["F", "D", "E", "W"];
        for (var item in stg) {
            stages[item] = {
                instruction_number: null,
                instruction_verbose: null,

                is_bubble: false,

                execute_up: none,
                execute_down: none,

                func: null,
            }
        }

        stages['F'].execute_up = fetch;
        stages['D'].execute_up = decode;
        stages['E'].execute_up = execute;
    })();

    var clock = () => {
        stages['W'].execute_up();
        stages['E'].execute_up();
        stages['D'].execute_up();
        stages['F'].execute_up();

        stages['W'].execute_down();
        stages['E'].execute_down();
        stages['D'].execute_down();
        stages['F'].execute_down();
    };

    return {
        clock: clock,
    }
}]);