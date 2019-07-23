function initForm() {
    $("#status").combobox({
        valueField: 'id',
        textField: 'text',
        // multiple: true,
        cls: "statusCls",
        limitToList: true,
        data: [{
            id: '',
            text: 'All'
        }, {
            id: 'unpaid',
            text: 'Unpaid'
        }, {
            id: 'pending',
            text: 'Pending'
        }, {
            id: 'canceled',
            text: 'Canceled'
        }, {
            id: 'ready_to_ship',
            text: 'Ready to Ship'
        }, {
            id: 'delivered',
            text: 'Delivered'
        }, {
            id: 'returned',
            text: 'Returned'
        }, {
            id: 'shipped',
            text: 'shipped'
        }, {
            id: 'failed',
            text: 'Failed'
        }],
        onChange: function (newValue, oldValue) {
            $('#dg').datagrid('reload');
        }
    });

    $("#created_before").datebox({
        cls: "created_beforeCls"
    });
    $("#created_after").datebox({
        cls: "created_afterCls"
    });

    // 输入框回车触发搜索
    /*$('#name').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            $("#nameIcon").click();
        }
    });*/
    $("#status").siblings("span.statusCls").find("input[type='text']").attr("placeholder", $("#status").attr("placeholder"));
    $("#created_before").siblings("span.created_beforeCls").find("input[type='text']").attr("placeholder", $("#created_before").attr("placeholder"));
    $("#created_after").siblings("span.created_afterCls").find("input[type='text']").attr("placeholder", $("#created_after").attr("placeholder"));
}

/**
 * 刷新报税进度
 */
function refreshTaxDeclareProgress() {
    $('#taxDeclareProgress').datagrid("reload");
}

/**
 * 点击获取企业列表
 */
function getCorpList() {
    $('#dg').datagrid('reload');
}

function initGrid() {
    initCorpGrid();
}

/**
 * 初始化企业列表表格
 */
function initCorpGrid() {
    $('#dg').datagrid({
        height: 430,
        // emptyMsg: "暂无数据",
        emptyMsg: "No Records",
        url: contextPath + '/ordersGet.json',
        pagination: true,
        rownumbers: true,
        striped: true,// 隔行变色
        checkOnSelect: true,
        columns: [[
            {field: 'id', title: '序号', width: 100, checkbox: true}
            ,{field: 'operate', title: 'Operate', align: 'left', width: 120
                ,formatter: function(value,row,index){
                    var li = [];
                    li.push(' <a href="javascript:openPrintDialog(\'{id}\')">Print</a> '.replace(/{id}/g, row.id));
                    li.push(' <a href="javascript:openPrintDialog(\'{id}\', true)">Download</a> '.replace(/{id}/g, row.id));
                    return li.join("");
                }
            }
            ,{field: 'order_id', title: 'Order Id', align: 'left', width: 230, hidden: true}
            ,{field: 'order_number', title: 'Order No', width: 146}
            ,{field: 'created_at_show', title: 'Order Date', width: 146}
            ,{field: 'updated_at_show', title: 'Update Date', width: 146}
            ,{field: 'payment_method', title: 'Payment Method', width: 146}
            ,{field: 'price', title: 'Retail Price', width: 146}
            ,{field: 'statuses', title: 'Status', width: 146}
        ]],
        onBeforeLoad: function (param) {
            param.status = $.trim($("#status").val());
            param.created_before = $.trim($("#created_before").val());
            param.created_after = $.trim($("#created_after").val());

            return true;
        },
        // 如果后端的返回与 datagrid 要求的值不同,可以在这个方法里面进行修改,例如 datagrid 要求 total 和 rows,
        loadFilter: function (data) {
            // console.log("loadFilter");
            // console.log(data);
            /*
            var rowsLi = [];
            data.rows = rowsLi;
            */

            return data;
        },
        onLoadSuccess: function (data) {
            // console.log("onLoadSuccess,");
        }
    });
    /*var pager = $('#dg').datagrid('getPager');
    pager.pagination({
        beforePageText: '第',//页数文本框前显示的汉字
        afterPageText: '页    共 {pages} 页',
        displayMsg: '<span style="color:red">目前支持税种：增值税、附加税、印花税、工会经费、企业所得税</span><span style="margin-left: 160px;">共{total}条数据</span>'
    });*/
}


var g_printDialog = null;
/**
 * 打开打印弹出框
 * @param id
 */
function openPrintDialog(id, isDownload) {
    var setting = {
        type: "POST",
        async: false,
        data: {
            // billType: pageObj.getModel().headVo.billType
        },
        url: contextPath + "/getPrintTemplate.json",
        success: function (response) {
            if (response && response.success) {
                var corpCustomPrintTemplate = "corpCustomPrintTemplate",
                    corpCustomPrintTemplate_Html = UnderscoreUtil.getHtmlById(corpCustomPrintTemplate, response);

                var text = "OK";
                if (isDownload) {
                    text = "Download";
                }
                var download = "";
                if (isDownload) {
                    download = "true";
                }
                var setting = {
                    title: "Select a Template",
                    width: 576,
                    height: 430,
                    modal: true,
                    content: corpCustomPrintTemplate_Html,
                    buttons:[{
                        text: text
                        ,handler: function () {
                            var container = g_printDialog.get(0);
                            var templateId = $(".print-list .template-con li.active", container).attr("id");
                            var url = contextPath + "/printConfig/metaPrint.htm?id={templateId}&orderId={orderId}&download=" + download;
                            url = url.replace(/{templateId}/g, templateId);
                            url = url.replace(/{orderId}/g, id);

                            window.open(url);
                            return true;
                        }
                    }, {
                        text: "Cancel"
                        ,handler: function() {
                            closeDialog();
                            console.log("click closeDialog");
                        }
                    }]
                    // okValue: "OK",
                };
                g_printDialog = showDialog(setting);
                var container = g_printDialog.get(0);
                $(".print-list .template-con li", container).on("click", function(event) {
                    var _self = $(this);
                    // _self.addClass("active").siblings().removeClass("active");
                    $(".print-list .template-con li", container).removeClass("active");
                    _self.addClass("active");
                });
                /*
                    ,onshow: function() {
                        var _self = this,
                            container = _self.node;

                        // itemSelectorEle = $(".itemSelector-con", container);
                        $(".artDialog-title", container).addClass("tc");
                        $(".artDialog-body", container).addClass("nopaddingTB");
                        $(".print-list .template-con li", container).on("click", function(event) {
                            var _self = $(this);
                            // _self.addClass("active").siblings().removeClass("active");
                            $(".print-list .template-con li", container).removeClass("active");
                            _self.addClass("active");
                        });
                    }
                 */
                // 768 高度的特殊处理,
                /*
                if ($(window).height() < 600) {
                    setting.top = 7;
                }
                g_printDialog = showDialog(setting);
                g_printDialog.showModal();
                */
            }
        },
        error: function (xhr) {
            if (xhr["responseJSON"] && xhr["responseJSON"].message) {
                console.log(xhr["responseJSON"].message);
            }
        }
    };
    $.ajax(setting);
    /*showDialog({
        title: "Print"
        ,width: 400
        ,height: 400
        ,modal: true
        ,content: "test"
    });*/
}

function moreTemplate() {
    location.href = contextPath + "/setting/setting.htm";
}

function exitSystem() {
    location.href = contextPath + "/exit.htm";
}

$(document).ready(function () {
    initForm();
    initGrid();
});
