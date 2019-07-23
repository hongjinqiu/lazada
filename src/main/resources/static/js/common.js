$.messager.defaults.ok = "确定";
$.messager.defaults.cancel = "取消";

/**
 * 退出系统
 */
function exitSystem() {
    $.messager.confirm({
        title: '提示',
        msg: "确定退出系统？",
        ok: '确定',
        cancel: '取消',
        fn: function (r) {
            if (r) {
                $.ajax({
                    async: true,
                    url: contextPath + "/exit.json",
                    data: {},
                    success: function (result) {
                        // do nothing
                        console.log("exit return success");
                        window.close();
                    },
                    error: function () {
                        // alert("error");
                        console.log("exit return error, maybe system is exited.");
                        $.messager.alert("提示", "程序已退出，请手动关闭浏览器！");
                        window.close();

                    }
                });
            }
        }
    });
}