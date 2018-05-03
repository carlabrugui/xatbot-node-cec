
var log4js = require('log4js');
var logger = log4js.getLogger();


exports.Helper = (function () {

    function extractMobileNumber(mobileNumber) {
        "use strict";
        if (mobileNumber.hasOwnProperty('completeNumber')) {
            return mobileNumber.completeNumber;
        }
        else if (mobileNumber.hasOwnProperty('value')) {
            return mobileNumber.value.completeNumber;
        }
        else {
            return mobileNumber;
        }
    }

    function convertToJsonObject(string) {
        string = string.substring(1, string.length - 1);
        var keyValuePairs = string.split(',');
        var obj = {};
        keyValuePairs.reduce(function (accumulator, currentValue) {
            var pair = currentValue.trim().split('=');
            accumulator[pair[0]] = pair[1];
            return accumulator;
        }, obj);

        return obj;
    }

    function extractAmount(amount) {
        "use strict";
        if (amount.hasOwnProperty('totalCurrency')) {
            return amount.amount;
        }
        else if (amount.hasOwnProperty('value')) {
            return amount.value.amount;
        }
        else {
            return amount;
        }
    }

    function getResourceBundle(locale) {
        return require('../../resourceBundles/resourceBundle_' + locale);
    }

    function getPrompt(locale, promptKey) {
        return getResourceBundle(locale)[promptKey];
    }

    function resolveDynamicPromptIfExists(sdk, prompt) {
        "use strict";

        if(prompt.startsWith("${"))
        {
            var startIndex = prompt.lastIndexOf(".") + 1;
            var endIndex = prompt.lastIndexOf("}") ;
            var promptKey = prompt.substring(startIndex , endIndex);
            prompt = getPrompt(sdk.variable('locale') , promptKey);
            if(isEmpty(prompt))
            {
                promptKey = promptKey.substr(2);
                prompt = sdk.variable(promptKey);
            }
        }

        var words = prompt.split(' ');
        var resolvedPrompt = "";
        words.forEach(function (word, index) {

            if (word.startsWith('${') && word.endsWith('}')) {
                var variableName = word.replace('${', '').replace('}', '');
                var variable = sdk.variable(variableName);

                if (!isEmpty(variable) || isNumber(variable)) {
                    if (!isEmpty(variable.entityName) && variable.entityName == 'CURRENCY') {
                        word = variable.totalCurrency;
                    }
                    else if (!isEmpty(variable.entityName) && variable.entityName == 'PHONE_NUMBER') {
                        word = variable.completeNumber;
                    }
                    else {
                        word = sdk.variable(variableName)
                    }
                }

            }
            else if (word.startsWith('#{') && word.endsWith('}')) {
                var variableName = word.replace('#{', '').replace('}', '');
                var variable = sdk.variable(variableName);
                word = getPrompt(sdk.variable('locale'), variable);
            }

            resolvedPrompt = resolvedPrompt.concat(word + " ");
        });

        return resolvedPrompt;
    }

    function replaceVariables(sdk, text) {
        "use strict";

        var finished = false;
        var e=-1;
        var newText = "";
        var key;
        var val;

        while( !finished ) {
          var s = text.indexOf("${", e);
          if( s!=-1 ) {
            newText += text.substring(e+1,s);
            e = text.indexOf("}", s);
            if( e!=-1 )  {
              key = text.substring(s+2,e);
              var vIdx = key.indexOf(".value.");
              if( vIdx==-1 ) {
                val = sdk.variable(key);
              } else {
                var path = key.substring(vIdx+7);
                logger.info("PATH="+path);
                key = key.substring(0,vIdx);
                logger.info("KEY="+key);
                val = sdk.variable(key);
                val = val[path];
              }
              newText += val;
            } else {
              newText+=text.substring(s+2);
              finished = true;
            }
          } else {
            newText += text.substring(e+1);
            finished = true;
          }
        }
        return newText;
    }

    function isArrayLike(value) {
        return value
            && typeof value === 'object'
            && typeof value.length === 'number'
            && value.length >= 0
            && value.length % 1 === 0;
    }

    function isArray(value) {
        return Array.isArray(value);
    }

    function isFunction(value) {
        // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
        // IE 11 (#1621), and in Safari 8 (#1929).
        return typeof value === "function" || false;
    }

    var isEmpty = function (value) {
        if (value === null) {
            return true;
        }

        // check if the value has length
        if (isArrayLike(value)
            && (isArray(value)
            || typeof value === 'string' // is string
            || isFunction(value.splice) // is array
            || isFunction(value.callee))) { // is arguments
            return !value.length;
        }

        // check if the object iis set or map
        if (!!value && typeof value == 'object') {
            var str = value.toString();
            if (str == '[object Map]' || str == '[object Set]') {
                return !value.size;
            }
        }

        // check if the object has properties
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    function isTypeOf(name, obj) {
        return toString.call(obj) === '[object ' + name + ']';
    }

    function isString(value) {
        return isTypeOf('String', value);
    }

    function isFunction(object) {
        return object && getClass.call(object) == '[object Function]';
    }

    function isNumber(value) {
        if(value == null)
        {
            return false;
        }
        else if (typeof value == 'number') {
            return true;
        }
        return value.toString() == '[object Number]';
    }

    function isObject(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    function isNaN(value) {
        return isNumber(value) && value !== +value;
    }

    function isFloat(n) {
        if (isObject(n) && isNaN(n) && isNumber(n)) return false;
        return Number(n) === n && n % 1 !== 0;
    }

    return {
        isEmpty: isEmpty,
        isFloat: isFloat,
        isNaN: isNaN,
        isObject: isObject,
        isNumber: isNumber,
        isString: isString,
        getResourceBundle: getResourceBundle,
        getPrompt: getPrompt,
        extractMobileNumber: extractMobileNumber,
        extractAmount: extractAmount,
        resolveDynamicPromptIfExists: resolveDynamicPromptIfExists,
        replaceVariables: replaceVariables,
        isFunction: isFunction,
        convertToJsonObject: convertToJsonObject
    }
})();
