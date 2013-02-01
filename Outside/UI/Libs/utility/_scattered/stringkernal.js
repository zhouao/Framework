/* File Created: 一月 9, 2012 */

/**
 * @Param {positive Number} startIndex
 * @Param {positive Number} length
 * @Param {String} replacement
 * @Return {String}
 */
String.prototype.replaceWith = function (startIndex, length, replacement) {
    var result = this;
    //if (this.length < startIndex) {
    //    return result;
    //} else {
        var intStartIndex = parseInt(startIndex);
        var prefix;
        if (intStartIndex > 0) {
            prefix = result.substr(0, startIndex);
        } else {
            prefix = result.substr(0, result.length + parseInt(startIndex));
        }
        var suffix;
        if (intStartIndex > 0) {
            suffix = result.substr(startIndex + length);
        } else {
            suffix = result.substr(result.length + parseInt(startIndex) + length);
        }
        var content = replacement;
        return prefix + content + suffix;
    //}
}

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
}        