/**
 * 依赖于 Tips
 * @type {App|*|{}}
 */

var App = App || {}, TipsUtil = {

    /**
     * 提示 对话框
     */
    info: function (message, config) {
        var _config = config || {};
        tips($.extend({type: Tips.TYPE.SUCCESS, content: message, top: ($(window).height() * 0.01)}, _config));
    },

    /**
     * 错误提示 对话框
     */
    error: function (message, config) {
        var _config = config || {};
        tips($.extend({type: Tips.TYPE.ERROR, content: message, top: ($(window).height() * 0.01)}, _config));
    },

    /**
     * 警告提示 对话框
     */
    warn: function (message, config) {
        var _config = config || {};
        tips($.extend({type: Tips.TYPE.WARN, content: message, top: ($(window).height() * 0.01)}, _config));
    }

};