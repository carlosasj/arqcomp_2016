angular.module('arqcompApp').filter('syntax', ['$sce', $sce => {

    var wrapper = (txt, regex, prefix, sufix) => {
        return txt.replace(regex, prefix+'$1'+sufix);
    };

    var parse_comment = txt => {
        var regex = /([ \t]*#.*)?$/;
        var prefix = '<span class="syntax-comment">';
        var sufix = '</span>';
        return wrapper(txt, regex, prefix, sufix);
    };

    var parse_function = txt => {
        var regex = /^(ADDI|ADD|SUBI|SUB|MULI|MUL|CMP|MOV|JMP|JE|JNE|JGT|JLT|NOP|HLT)/;
        var prefix = '<span class="syntax-function">';
        var sufix = '</span>';
        return wrapper(txt, regex, prefix, sufix);
    };

    var parse_register = txt => {
        var regex = /(\$r[0-7]|\$0|\$cmp|\$pc)/g;
        var prefix = '<span class="syntax-register">';
        var sufix = '</span>';
        return wrapper(txt, regex, prefix, sufix);
    };

    var parse_number = txt => {
        var regex = /(&nbsp;\d+)/g;
        var prefix = '<span class="syntax-number">';
        var sufix = '</span>';
        return wrapper(txt, regex, prefix, sufix);
    };

    var parse_spaces = txt => {
        return txt.replace(/ /g, '&nbsp;');
    };

    return function(line) {
        return $sce.trustAsHtml(
            parse_register(
                parse_function(
                    parse_comment(
                        parse_number(
                            parse_spaces(
                                line
                            )
                        )
                    )
                )
            )
        );
    };
}]);

