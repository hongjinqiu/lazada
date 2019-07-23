// /**
//  * 依赖于 AutoTree
//  * @type {App|*|{}}
//  */
//
// var App = App || {}, AutoTreeUtil = {
//
//     ///**
//     // * 参考配置
//     // [{name:1,code:1},
//     // {name:2,code:2},
//     // {name:3,code:4},
//     // {name:1_1,code:1_1,parentId:1},
//     // {name:1_1_1,code:1_1_,parentId:1_1}]
//     // */
//     //getMaterialType: {
//     //    async: {
//     //        dataSourceType: "onceRemote",
//     //        url: App["contextPath"] + "/vop/jc/materialType/getMaterialTypeByCoryIdForAutoTree.json"
//     //    },
//     //    view: {
//     //        inputFilterFieldNames: ["code", "name"],
//     //        positionRefer: function () {
//     //            return $(this).parent("div");
//     //        }
//     //    },
//     //    treeConfig: {
//     //        data: {
//     //            simpleData: {
//     //                enable: true,
//     //                idKey: "id",
//     //                pIdKey: "parentId"
//     //            }
//     //        }
//     //    }
//     //},
//
//
//     /**
//      *区域树结构
//      */
//     areaConfig: function(isClosed){
//         return {
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getAreaTree.json",
//                 data: {
//                     isClosed: isClosed
//                 },
//                 dataSourceType: "remote"
//             },
//             view: {
//                 viewUniqueFieldName: "code",
//                 inputFilterFieldNames: ["code","name"],
//                 positionRefer: function () {
//                     //联想树控件输入框 和 "三个点"，被父<label>包着。
//                     //下拉层的定位参照 是父<label>
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     //联想树控件输入框
//                     //下拉层的定位参照 是父<label>
//                     return $(this).parent("label").outerWidth() - 2;
//                 }
//             },
//             input: {
//                 inputQueryParamName: "query"
//             },
//             treeConfig: {
//                 data: {
//                     simpleData: {
//                         enable: true,
//                         idKey: "id",
//                         pIdKey: "parentId"
//                     }
//                 },
//                 key: {
//                     name: function (node) {
//                         return node["code"] + " " + node["name"];
//                     }
//                 }
//             }
//         }
//     },
//
//     /**
//      *物料组树结构
//      */
//     invClassConfig: function(isClosed){
//         return {
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getInvClassTree.json",
//                 data: {
//                     isClosed: isClosed
//                 },
//                 dataSourceType: "remote"
//             },
//             view: {
//                 viewUniqueFieldName: "name",
//                 inputFilterFieldNames: ["name"],
//                 positionRefer: function () {
//                     //联想树控件输入框 和 "三个点"，被父<label>包着。
//                     //下拉层的定位参照 是父<label>
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     //联想树控件输入框
//                     //下拉层的定位参照 是父<label>
//                     return $(this).parent("label").outerWidth() - 2;
//                 }
//             },
//             input: {
//                 inputQueryParamName: "query"
//             },
//             treeConfig: {
//                 data: {
//                     simpleData: {
//                         enable: true,
//                         idKey: "id",
//                         pIdKey: "parentId"
//                     }
//                 }
//             }
//         }
//     },
//
//
//     /**
//      * 渲染所有联想控件
//      */
//     render: function () {
//         //
//         $("input[componentType='auto-tree']").each(function (index, inputEl) {
//             var $inputEl = $(inputEl),
//                 componentConfigName = $inputEl.attr("componentConfig"),
//                 componentConfigExt = $inputEl.attr("componentConfigExt"),
//                 bindFill = $inputEl.attr('bindFill') ? JSON.parse($inputEl.attr('bindFill')) : {},
//                 componentConfig = {};
//             if (!componentConfig) {
//                 return;
//             }
//             if ($.isFunction(AutoTreeUtil[componentConfigName])) {
//                 componentConfig = AutoTreeUtil[componentConfigName].call(AutoTreeUtil);
//             } else if ($.isPlainObject(AutoTreeUtil[componentConfigName])) {
//                 componentConfig = AutoTreeUtil[componentConfigName];
//             }
//             if ($.isFunction(eval(componentConfigExt))) {
//                 componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt)());
//             } else {
//                 componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt));
//             }
//             //渲染控件
//             $inputEl.AutoTree(componentConfig);
//         });
//         $("[componentType='auto-tree-trigger']").each(function (index, elm) {
//             var $elm = $(elm),
//                 triggerElementId = $elm.attr("triggerElementId");
//             if (triggerElementId) {
//                 $elm.bind("click", function (event) {
//                     $("#" + triggerElementId).AutoTree("triggerAction", event);
//                 });
//             } else {
//                 alert("没有配置triggerElementId");
//             }
//         });
//     }
// };