// /**
//  * denpendence: [TabPanel,_tips-util]
//  *
//  * @type {tabPanelUtil|*|{}}
//  */
// var tabPanelUtil = tabPanelUtil || {
//
//         /**
//          * 打开目标页面 并调用页面函数
//          * @param index 菜单索引
//          * @param tabTitle  菜单标题
//          * @param pageUrl 菜单URL
//          * @param pageObjName 页面对象名
//          * @param methodName 方法名
//          * @param arguments 方法参数(数组)
//          * 例如：tabPanelUtil.openPageInvokeFunction("DS20","底稿模板设计",App["context"]+"ds/designTemplate.htm?token="+userInfoUtil.getToken(),"pageObj","loadDesignTemplateById",["123"]);
//          */
//         openPageInvokeMethod: function (index, tabTitle, pageUrl, pageObjName, methodName, args) {
//             if (!$.isArray(args)) {
//                 alert("参数必须是数组！");
//                 return;
//             }
//             var targetWindow = top.getTab(index), //要打开的目标窗口对象
//                 pageObj = null,
//                 openPageTimeObj = -1,
//                 waitOpenPageTimeoutTimeObj = -1,
//                 pageLoadingTimeObj = -1,
//                 waitPageTimeoutTimeObj = -1,
//                 waitPageTimeout = 10 * 1000,
//                 _function = function () {
//                     //激活页面，聚焦tab
//                     top.Frame.activeTab(index, tabTitle, pageUrl);
//                     //页面window对象
//                     targetWindow = top.getTab(index);
//
//                     //要确保窗口打开
//                     openPageTimeObj = window.setInterval(function () {
//                         if (targetWindow) {
//                             //清除开启的时间对象
//                             window.clearInterval(openPageTimeObj);
//                             window.clearTimeout(waitOpenPageTimeoutTimeObj);
//                             //页面加载完成
//                             $(targetWindow).ready(function () {
//                                 //窗口正在被打开，但页面js对象，未初始化完成，轮询等待。
//                                 pageLoadingTimeObj = window.setInterval(function () {
//                                     pageObj = targetWindow[pageObjName];//取到页面对象
//                                     //判断页面js对象
//                                     if (pageObj && pageObj.hasOwnProperty(methodName)) {
//                                         //打开等待条
//                                         if (targetWindow["blockUIUtil"]) {
//                                             targetWindow["blockUIUtil"].show();
//                                         }
//                                         //执行页面的方法
//                                         pageObj[methodName].apply(null, args);
//                                         //关闭等待条
//                                         if (targetWindow["blockUIUtil"]) {
//                                             targetWindow["blockUIUtil"].hide();
//                                         }
//                                         //清除开启的时间对象
//                                         window.clearInterval(pageLoadingTimeObj);
//                                         window.clearTimeout(waitPageTimeoutTimeObj);
//                                     }
//                                 }, 500);
//                                 //超过后，不等待，退出。
//                                 waitPageTimeoutTimeObj = window.setTimeout(function () {
//                                     TipsUtil.warn("执行页面方法超时，请重试！");
//                                     alert("执行页面方法超时，请重试！");
//                                     window.clearInterval(pageLoadingTimeObj);
//                                     window.clearTimeout(waitPageTimeoutTimeObj);
//                                 }, waitPageTimeout);
//                             });
//                         } else {
//                             //激活页面，聚焦tab
//                             top.Frame.activeTab(index, tabTitle, pageUrl);
//                             //页面window对象
//                             targetWindow = top.getTab(index);
//                         }
//                     }, 500);
//                     //页面没打开，超过后，不等待，退出。
//                     waitOpenPageTimeoutTimeObj = window.setTimeout(function () {
//                         TipsUtil.warn("页面打开超时，请重试！");
//                         alert("页面打开超时，请重试！");
//                         window.clearInterval(openPageTimeObj);
//                         window.clearTimeout(waitOpenPageTimeoutTimeObj);
//                     }, waitPageTimeout);
//                 };
//             //判断窗口是否打开 并且 对象不为空
//             if (targetWindow && targetWindow[pageObjName]) {
//                 _function();
//             } else {
//                 //添加tab，打开页面
//                 top.Frame.addTab(index, tabTitle, pageUrl, true);
//                 _function();
//             }
//         },
//         /**
//          * 打开目标页面
//          * @param index 菜单索引
//          * @param tabTitle  菜单标题
//          * @param pageUrl 菜单URL
//          * @param pageObjName 页面对象名
//          * 例如：tabPanelUtil.openPage("DS20","底稿模板设计",App["context"]+"ds/designTemplate.htm?token="+userInfoUtil.getToken(),pageObj);
//          */
//         openPage: function (index, tabTitle, pageUrl, pageObjName) {
//             var targetWindow = top.getTab(index), //要打开的目标窗口对象
//                 openPageTimeObj = -1,
//                 waitOpenPageTimeoutTimeObj = -1,
//                 waitPageTimeout = 10 * 1000,
//                 _function = function () {
//                     //激活页面，聚焦tab
//                     top.Frame.activeTab(index, tabTitle, pageUrl);
//                     //页面window对象
//                     targetWindow = top.getTab(index);
//
//                     //要确保窗口打开
//                     openPageTimeObj = window.setInterval(function () {
//                         if (targetWindow) {
//                             //清除开启的时间对象
//                             window.clearInterval(openPageTimeObj);
//                             window.clearTimeout(waitOpenPageTimeoutTimeObj);
//                         } else {
//                             //激活页面，聚焦tab
//                             top.Frame.activeTab(index, tabTitle, pageUrl);
//                             //页面window对象
//                             targetWindow = top.getTab(index);
//                         }
//                     }, 500);
//                     //页面没打开，超过后，不等待，退出。
//                     waitOpenPageTimeoutTimeObj = window.setTimeout(function () {
//                         TipsUtil.warn("页面打开超时，请重试！");
//                         alert("页面打开超时，请重试！");
//                         window.clearInterval(openPageTimeObj);
//                         window.clearTimeout(waitOpenPageTimeoutTimeObj);
//                     }, waitPageTimeout);
//                 };
//             //判断窗口是否打开 并且 对象不为空
//             if (targetWindow && targetWindow[pageObjName]) {
//                 _function();
//             } else {
//                 //添加tab，打开页面
//                 top.Frame.addTab(index, tabTitle, pageUrl, true);
//                 _function();
//             }
//
//         },
//
//         /**
//          * 获取当前激活的 TabPanle
//          *
//          * 返回对象结构如下：
//          * {
//          *  closable: "true"
//          *  id: "toolbarPluginJC10"
//          *  title: "成本参数"
//          *  loader:{
//          *      url:"xxx.htm"
//          *  }
//          * }
//          *
//          *
//          * @returns {*}
//          */
//         getActiveTab: function () {
//             return top.Frame.tabpanel.getActiveTab();
//         },
//
//         /**
//          * 根据刷新 TabPanle
//          *
//          * @returns {*}
//          */
//         refreshTabById: function (id) {
//             var tabObj = top.Frame.tabpanel.getTabById(id);
//             return top.Frame.tabpanel.refresh(tabObj);
//         },
//
//         /**
//          * 根据 tabId 关闭Tab
//          * @param index 菜单索引(Id)
//          */
//         closeTab: function (index) {
//             top.Frame.closeTab(index);
//         },
//
//         /**
//          * Set the active tab's title
//          * @param text
//          */
//         setActiveTabTitle: function (text) {
//
//             var tab = tabPanelUtil.getActiveTab();
//             tab.title = text;
//             $("#" + tab.id + ">div.title", parent.document).html(text);
//         },
//         /**
//          * 根据 tabId 聚焦
//          * @param index 菜单索引(Id)
//          * @param tabTitle  菜单标题
//          * @param pageUrl 菜单URL
//          * @param isCloseFlag 是否显示关闭
//          */
//         activeTab: function (index, tabTitle, pageUrl, isCloseFlag) {
//             //激活页面，聚焦tab
//             top.Frame.activeTab(index, tabTitle, pageUrl, isCloseFlag);
//         }
//     };