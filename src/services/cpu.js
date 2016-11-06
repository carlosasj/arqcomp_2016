angular.module('arqcompApp').factory('CPU', ['ULA', 'Registers', 'Instructions', function (ULA, Registers, Instructions) {

    var all_functions = {
        'ADDI': {regex: /^ADDI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)([ \t]*%.*)?$/, },
        'ADD' : {regex: /^ADD (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])([ \t]*%.*)?$/, },
        'SUBI': {regex: /^SUBI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)([ \t]*%.*)?$/, },
        'SUB' : {regex: /^SUB (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])([ \t]*%.*)?$/, },
        'MULI': {regex: /^MULI (\$r[0-7]) (\$0|\$r[0-7]) (\d+)([ \t]*%.*)?$/, },
        'MUL' : {regex: /^MUL (\$r[0-7]) (\$0|\$r[0-7]) (\$0|\$r[0-7])([ \t]*%.*)?$/, },
        'CMP' : {regex: /^CMP (\$0|\$r[0-7]) (\$0|\$r[0-7])([ \t]*%.*)?$/, },
        'MOV' : {regex: /^MOV (\$r[0-7]) (\$0|\$r[0-7])([ \t]*%.*)?$/, },
        'JMP' : {regex: /^JMP (\d+)([ \t]*%.*)?$/, },
        'JE'  : {regex: /^JE (\d+)([ \t]*%.*)?$/, },
        'JNE' : {regex: /^JNE (\d+)([ \t]*%.*)?$/, },
        'JGT' : {regex: /^JGT (\d+)([ \t]*%.*)?$/, },
        'JLT' : {regex: /^JLT (\d+)([ \t]*%.*)?$/, },
        'NOP' : {regex: /^NOP([ \t]*%.*)?$/, },
        'HLT' : {regex: /^HLT([ \t]*%.*)?$/, },
    };
    var stages = {};


    var fetch = () => {
        // program counter - próxima instrução a ser lida
        var pc = Registers.get('$pc'); 
        stages['F'].instruction = {
            number: pc,
            verbose: Instructions.get(pc),
            write_register:'',
            operation:'NOP',
            details: null,
        };
        var parsed = parse(stages['F'].instruction.verbose);
        stages['F'].instruction.details = parsed.details;
        stages['F'].instruction.operation = parsed.func_name;
        switch(parsed.func_name){
            case 'JMP':
                Registers.set('$pc', parsed.details[1]);
                break;
            case 'JE':
            case 'JNE':
            case 'JGT':
            case 'JLT':
                //TODO branch prediction
                Registers.set('$pc', pc + 4); // nunca desvia
                // Se a previsão falhar, trocar instrução seguinte por bolha.
                break;
            case 'HLT':
                break;
            default:
                Registers.set('$pc', pc + 4);
                break;

        }
    };

    var decode = () => {
        var details = stages['D'].instruction.details;
        switch(stages['D'].instruction.operation){
            case 'ADDI':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(details[3]);
                ULA.set_func('add');
                break;
            case 'ADD':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(Registers.get(details[3]));
                ULA.set_func('add');
                break;
            case 'SUBI':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(details[3]);
                ULA.set_func('sub');
                break;
            case 'SUB':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(Registers.get(details[3]));
                ULA.set_func('sub');
                break;
            case 'MULI':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(details[3]);
                ULA.set_func('mul');
                break;
            case 'MUL':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_val2(Registers.get(details[3]));
                ULA.set_func('mul');
                break;
            case 'CMP':
                stages['D'].instruction.write_register = '$cmp';
                ULA.set_val1(Registers.get(details[1]));
                ULA.set_val2(Registers.get(details[2]));
                ULA.set_func('cmp');
                break;
            case 'MOV':
                stages['D'].instruction.write_register = details[1];
                ULA.set_val1(Registers.get(details[2]));
                ULA.set_func('mov');
                break;
            case 'JMP':
                break;
            case 'JE':
                if(ULA.output() == 0){
                    Registers.set('$pc', details[1]);
                }
                break;
            case 'JNE':
                if(ULA.output() != 0){
                    Registers.set('$pc', details[1]);
                }
                break;
            case 'JGT':
                if(ULA.output() > 0){
                    Registers.set('$pc', details[1]);
                }
                break;
            case 'JLT':
                if(ULA.output() < 0){
                    Registers.set('$pc', details[1]);
                }
                break;
            case 'NOP':
                break;
        }
    };

    var execute = () => {
        ULA.execute();
    };
    var writeback = () => {
        Registers.set(stages['W'].instruction.write_register, ULA.output());
    };

    var parse = instruction => {
        for (var func_name in all_functions) {
            var f = all_functions[func_name];
            var m = instruction.match(f.regex);
            if (m) {
                return {
                    func_name: func_name,
                    details: m,
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
                instruction: {
                    instruction_number: null,
                    instruction_verbose: null,
                    write_register:'',
                    operation:'NOP',
                },

                execute: none,
            }
        }

        stages['F'].execute = fetch;
        stages['D'].execute = decode;
        stages['E'].execute = execute;
        stages['W'].execute = writeback;
    })();

    var clock = () => {
        stages['W'].instruction = stages['E'].instruction;
        stages['E'].instruction = stages['D'].instruction;
        stages['D'].instruction = stages['F'].instruction;
        stages['W'].execute();
        stages['E'].execute();
        stages['D'].execute();
        stages['F'].execute();
    };

    return {
        clock: clock,
    }
}]);