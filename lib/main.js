/**
 * Author:chendongmei
 * Module dependencies.
 * 简繁体转换
 */
var chinese = require('../lang/zh.js');

/**
 * 简体字
 */
var Simplified = chinese.Simplified;

/**
 * 繁体字
 */
var Traditional = chinese.Traditional;

/**
 * 转换文本
 * @param {String} str - 待转换的文本
 * @param {Boolean} language - 转换对象 zh-TW：简体转换成繁体  zh-CN：繁体转换成简体
 * @returns {String} - 转换结果
 */

function transitionStr (str, language) {
    var i;
    var letter;
    var code;
    var isChinese;
    var index;
    var src;
    var des;
    var result = '';
    if (language === 'zh-TW') {
        src = Simplified;
        des = Traditional;
    } else {
        src = Traditional;
        des = Simplified;
    }
    if (typeof str !== 'string') {
        return str;
    }
    for (i = 0; i < str.length; i++) {
        letter = str.charAt(i);
        code = str.charCodeAt(i);
        // 根据字符的Unicode判断是否为汉字，以提高性能
        isChinese = (code > 0x3400 && code < 0x9FC3) || (code > 0xF900 && code < 0xFA6A);
        if (!isChinese) {
            result += letter;
            continue;
        }
        index = src.indexOf(letter);

        if (index !== -1) {
            result += des.charAt(index);
        } else {
            result += letter;
        }
    }

    return result;
}

function chineseLanguageLoader (loaderContext, options)
{
    var modulesOptions = {
        language: 'zh-TW'
    };
    if (options && options.language && options.language === 'zh-CN') { 
        modulesOptions.language = 'zh-CN';
    }
    return transitionStr(loaderContext, modulesOptions.language);
}
module.exports = chineseLanguageLoader