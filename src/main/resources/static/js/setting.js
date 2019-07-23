function initForm() {
}

/**
 * 点击获取企业列表
 */
function getTemplateList() {
    $('#dg').datagrid('reload');
}

function initGrid() {
    $('#dg').datagrid({
        height: 430,
        //emptyMsg: "暂无数据",
        emptyMsg: "No Records",
        url: contextPath + '/setting/templatesGet.json',
        pagination: true,
        rownumbers: true,
        striped: true,// 隔行变色
        checkOnSelect: true,
        columns: [[
            {field: 'id', title: '序号', width: 100, checkbox: true}
            ,{field: 'operate', title: 'Operate', align: 'left', width: 120
                ,formatter: function(value,row,index){
                    var li = [];
                    li.push(' <a href="javascript:gotoPrintTemplateEdit(\'{id}\')">Edit</a> '.replace(/{id}/g, row.id));
                    li.push(' <a href="javascript:templateDelete(\'{id}\')">Delete</a> '.replace(/{id}/g, row.id));
                    return li.join("");
                }
            }
            ,{field: 'templateName', title: 'Template Name', align: 'left', width: 230}
            ,{field: 'createUser', title: 'Create User', width: 146}
            ,{field: 'createTime', title: 'Create Time', width: 146}
            ,{field: 'updateTime', title: 'Update Time', width: 146}
        ]],
        onBeforeLoad: function (param) {
            /*
            param.status = $.trim($("#status").val());
            param.created_before = $.trim($("#created_before").val());
            param.created_after = $.trim($("#created_after").val());
            */

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

function gotoPrintTemplateEdit(id) {
    location.href = contextPath + "/printConfig/gotoPrintConfigPage.htm?id=" + id;
}

function gotoPrintTemplateAdd() {
    location.href = contextPath + "/printConfig/gotoPrintConfigPage.htm";
}

function templateDelete(id) {
    $.messager.confirm({
        title: 'Tip',
        msg: "Sure to Delete?",
        ok: 'OK',
        cancel: 'Cancel',
        fn: function (r) {
            if (r) {
                $.ajax({
                    async: true,
                    url: contextPath + "/setting/templateDelete.json",
                    data: {
                        id: id
                    },
                    success: function (result) {
                        $.messager.alert("Tip", "Delete Success!");
                        getTemplateList();
                    },
                    error: function () {
                        $.messager.alert("Tip", "Delete Fail!");
                    }
                });
            }
        }
    });
}

$(document).ready(function () {
    initForm();
    initGrid();
});
