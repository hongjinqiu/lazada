var itemSelectorUtil = itemSelectorUtil || {};

/**
 * depends: [artDialog, bSelecct]
 * @param dialogConfig
 * @param itemSelectorConfig
 */
(function ($) {

    var template = '' +
        ' <div class="itemSelector-con">' +
        '    <div>' +
        '       <input class="input-text" type="text" data-type="query" placeholder="">' +
        '       <input class="btn btn-info" data-type="query-btn" type="submit" value="'+i18n["acct.grid.operate.search"]+'">' +
        '    </div>' +
        '    <div class="content">' +
        '       <div class="left">' +
        '          <h3><span class="itemSelector-available-title"></span></h3>' +
        '          <table class="itemSelector-available-tab"></table>' +
        '          <div class="itemSelector-available-pager" id="selectorPager"></div>' +
        '       </div>' +
        '       <div class="mid">' +
        '           <a class="btn-add icon-chevron-right-g" href="#">'+i18n["acct.common.button.AddNew"]+'</a>' +
        '           <a class="btn-del icon-chevron-left-g" href="#">'+i18n["acct.common.button.Delete"]+'</a>' +
        '       </div>' +
        '       <div class="right">' +
        '          <h3><span class="itemSelector-selected-title"></span></h3>' +
        '          <table class="itemSelector-selected-tab"></table>' +
        '       </div>' +
        '   </div>' +
        '</div>';

    var defaultConfig = {
        dlgConfig: {
            id:"itemSelectorDialogId",
            content: template,
            okValue: i18n["acct.common.dialog.btn.ok"],
            ok: function () {
            },
            cancelValue: i18n["acct.common.dialog.btn.cancel"],
            cancel: function () {
            }
        },
        itemSelectorConfig: {
            available: {
                gridOption: {
                    height: 260,
                    width: 383,
                    autowidth: false,
                    rowList: [],
                    colModel:[],
                    viewrecords: false,
                    recordpos: "center",
                    rowNum: "auto",
                    pgbuttons: true,
                    ajaxGridOptions: {
                        contentType: "application/json"
                    },
                    // pginput: false,
                    hideRowList: true, //隐藏分页LIST
                    afterGridComplete: function () {
                    }
                }
            },
            selected: {
                gridOption: {
                    height: 300,
                    width: 353,
                    autowidth: false,
                    viewrecords: false,
                    afterGridComplete: function () {
                    }
                }
            },
            event: {
                afterInit: function () {
                    var _self = $(this)[0];

                    $("[data-type=query]", _self).off("keydown.query").on("keydown.query", function (event) {
                        // 如果是回车键
                        if (event.which === 13) {
                            // var condition = {query: $(this).val()};
                            //
                            // $(_self).itemSelector("query", condition);
                            var rowDatas =  $(_self).itemSelector("_getAvailableSelect");

                            $(_self).itemSelector("add", rowDatas);
                        }

                        // 可让value改变的 Keycode
                        // keyCode为229时, 为中文状态下(如微软拼音中文状态下输入的字符)
                        if (event && event.keyCode) {
                            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)
                                || event.keyCode == 8 || event.keyCode == 32 || event.keyCode == 46
                                || (event.keyCode >= 96 && event.keyCode <= 111)
                                || (event.keyCode >= 186 && event.keyCode <= 192)
                                || (event.keyCode >= 219 && event.keyCode <= 222)
                                || event.keyCode == 229) {
                                // 输入查询
                                //根据输入框值，重载数据
                                window.setTimeout(function () {
                                    var condition = {query: $("[data-type=query]", _self).val()};

                                    $(_self).itemSelector("query", condition);
                                }, 200);
                            }
                            // 键盘KeyCode范围（向上 向下）
                            if (event.keyCode == 40 || event.keyCode == 38) {
                                //查询表格数据
                                var rowDatas = $(_self.p.DOM.availableGrid).jqGrid("getGridRowDatas"),
                                    selectedRowDats = $(_self.p.DOM.availableGrid).jqGrid("getGridRowDatasBySelected");
                                if(rowDatas && rowDatas.length > 0){

                                    var currRowId ="";
                                    if(null == selectedRowDats || selectedRowDats.length ==0){
                                        $(_self.p.DOM.availableGrid).jqGrid("setSelectionRow",rowDatas[0].id,true);
                                        currRowId = rowDatas[0].id;
                                        return;
                                    }

                                    //按向下箭头
                                    if (event.keyCode == 40) {
                                        var nextRowIds = $(_self.p.DOM.availableGrid).jqGrid("nextGridRowId");
                                        if(nextRowIds && nextRowIds.length > 0){
                                            currRowId = nextRowIds[0];
                                        }
                                    }else if(event.keyCode == 38){
                                        var prevs = $(_self.p.DOM.availableGrid).jqGrid("previousGridRowId");
                                        if(prevs && prevs.length > 0){
                                            currRowId = prevs[0];
                                        }
                                    }
                                    $(_self.p.DOM.availableGrid).jqGrid("setSelectionRow",currRowId,true);
                                }
                            }
                        }
                    });

                    $("[data-type=query-btn]", _self).off("click.query").on("click.query", function (event) {
                        var condition = {query: $("[data-type=query]", _self).val()};

                        $(_self.p.DOM.availableGrid).jqGrid("getGridParam", "pageInfo");

                        $(_self).itemSelector("query", condition);
                    });
                }
            }
        }
    };

    /**
     * 代理点击确定按钮的事件，以上为代理的事情
     * 1.在点击ok时传回已选择的数据
     * @param dlgConfig
     */
    function delegateOK(dlgConfig) {
        if (dlgConfig && dlgConfig.ok) {
            var orgOK = dlgConfig.ok;

            dlgConfig.ok = function () {
                var _self = this,
                    container = this.node,
                    itemSelectorEle = $(".itemSelector-con", container);

                return (orgOK && orgOK.apply(_self, [$(itemSelectorEle).itemSelector("getValues")])) || true;
            }
        }
    }

    /**
     * 代理在展开弹出框时的事件
     * 1.初始化itemSelector控件
     * @param dlgConfig
     * @param itemSelectorConfig
     */
    function delegateOnshow(dlgConfig, itemSelectorConfig) {
        if (!dlgConfig) {
            return;
        }

        var orgOnshow = dlgConfig.onshow;

        dlgConfig.onshow = function () {
            var _self = this,
                container = _self.node,
                itemSelectorEle = $(".itemSelector-con", container);

            $(itemSelectorEle).itemSelector(itemSelectorConfig);
            orgOnshow && orgOnshow.apply(this, arguments);
        };
        // editor:lwmiao, 起因：权限管理中搜索之后不需要重置位置
        window.setTimeout(function () {
            dialog.getCurrent().reset();
        }, 50);
    }

    function delegateAfterGridComplete(dialogConfig, itemSelectorConfig) {
        var availableGridOption = itemSelectorConfig.available.gridOption,
            selectedGridOption = itemSelectorConfig.selected.gridOption,
            orginAvailableGridComplete = availableGridOption.afterGridComplete,
            orginSelectedGridComplete = selectedGridOption.afterGridComplete;

        availableGridOption.afterGridComplete = function () {
            orginAvailableGridComplete && orginAvailableGridComplete.apply(this, arguments);
            // editor:lwmiao, 起因：权限管理中搜索之后不需要重置位置
            // window.setTimeout(function () {
            //     dialog.getCurrent().reset();
            // }, 50);
        };

        selectedGridOption.afterGridComplete = function () {
            orginSelectedGridComplete && orginSelectedGridComplete.apply(this, arguments);
            // editor:lwmiao, 起因：权限管理中搜索之后不需要重置位置
            // window.setTimeout(function () {
            //     dialog.getCurrent().reset();
            // }, 50);
        };
    }

    itemSelectorUtil.showDialog = function (dialogConfig, itemSelectorConfig) {
        var dlgConfig = $.extend(true, defaultConfig.dlgConfig, dialogConfig),
            sltConfig = $.extend(true, defaultConfig.itemSelectorConfig, itemSelectorConfig);

        sltConfig.selected.values = itemSelectorConfig.selected.values;

        if (sltConfig && sltConfig.available.gridOption.url && sltConfig.available.gridOption.datatype != "local") {
            sltConfig.available.gridOption = $.extend({}, {
                datatype: "json",
                ajaxGridOptions: {//【重点】
                    contentType: "application/json"
                },
                jsonReader: {//【重点】
                    root: "records",        //与后台Page.java的 records 映射
                    rows: "pageSize",       //与后台Page.java的 pageSize 映射
                    total: "totalPage",     //与后台Page.java的 totalPage 映射
                    page: "currentPage",    //与后台Page.java的 currentPage 映射
                    records: "totalRecord"  //与后台Page.java的 totalRecord 映射
                }
            }, sltConfig.available.gridOption);
        }


        delegateOK(dlgConfig);
        delegateOnshow(dlgConfig, sltConfig);
        delegateAfterGridComplete(dlgConfig, sltConfig);
        //防dialog重复show
        if(dialog.get(dlgConfig.id)){
            return ;
        }
        dialog(dlgConfig).show();
    };

    /**
     * 展示用户的对话框
     * @param dialogConfig
     * @param itemSelectorConfig
     */
    itemSelectorUtil.showAccountDialog = function (dialogConfig, itemSelectorConfig) {
        var dlgConfig = $.extend(true, {
                title: "Account"
            }, dialogConfig),
            sltConfig = $.extend(true, {
                available: {
                    title: "To be selected",
                    gridOption: {
                        colModel: [
                            {name: "id", label: "id", hidden: true},
                            {name: "subjectCode", label: "Account Code", width: 120, hidden: false},
                            {name: "subjectName", label: "Account Name", width: 220, hidden: false}
                        ]
                    },

                    requestExtraCondition: function () {
                        return {query: $("[data-type=query]", this).val()};
                    }
                },
                selected: {
                    title: "Selected",
                    gridOption: {
                        colModel: [
                            {name: "id", label: "id", hidden: true},
                            {name: "subjectCode", label: "Account Code", width: 120, hidden: false},
                            {name: "subjectName", label: "Account Name", width: 220, hidden: false}
                        ]
                    }
                }
            }, itemSelectorConfig);

        itemSelectorUtil.showDialog(dlgConfig, sltConfig);
    };

})(jQuery);

