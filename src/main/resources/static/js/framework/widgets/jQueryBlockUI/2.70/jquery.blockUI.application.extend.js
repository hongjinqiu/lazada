;
(function () {
    "use strict";

    $.extend($.blockUI.defaults, {
        message: '<div class="blockUI-loadingbar-img"></div>',//TODO:原值<h1>Please wait...</h1>
        css: {
            top: '50%',  //top:		'40%',
            width: '32px',//TODO:原值width:		'30%',和 css样式.blockUI-loadingbar-img 宽度一致
            left: '50%',//TODO:原值left:		'35%'
            border: '0px solid #aaa',//TODO:原值border:		'3px solid #aaa'
            backgroundColor: 'none'// TODO: 原值backgroundColor:'#fff',
        },
        // styles for the overlay
        overlayCSS: {
            opacity: 0//TODO:原值opacity:			0.6
        },

        // z-index for the blocking overlay
        baseZ: 9989//TODO:原值baseZ: 1000
    });

})();

/**
 * denpendence: [jQueryBlockUI]
 */

var blockUIUtil = blockUIUtil || {};

/**
 * 显示遮罩层
 */
blockUIUtil.show = function () {
    $.blockUI({});
};

/**
 * 隐藏遮罩层
 */
blockUIUtil.hide = function () {
    $.unblockUI({});
};

/**
 * 在指定Id区域显示遮罩层
 * @param targetId （可空）指定元素Id，局部遮罩
 * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
 *
 */
blockUIUtil.showById = function (targetId, config) {
    blockUIUtil.showBySelector('#' + targetId, config);
};

/**
 * 在指定Id区域隐藏遮罩层
 * @param targetId （可空）指定元素Id，局部遮罩
 * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
 */
blockUIUtil.hideById = function (targetId, config) {
    blockUIUtil.hideBySelector('#' + targetId, config);
};


/**
 * 在指定区域显示遮罩层
 * @param selector （可空）指定元素selector
 * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
 *
 */
blockUIUtil.showBySelector = function (selector, config) {
    var config = config || {};
    $(selector).block(config);
};

/**
 * 在指定区域隐藏遮罩层
 * @param selector （可空）指定元素selector
 * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
 */
blockUIUtil.hideBySelector = function (selector, config) {
    var config = config || {};
    $(selector).unblock(config);
};