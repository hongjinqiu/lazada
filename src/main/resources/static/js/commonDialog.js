function onDialogMove(x,y) {
    //alert("(left,top)==>("+x+","+y+")");
    if (y<0) {
        $("#div_for_easyui_window").dialog('move',{left:x, top:0});
    }
}

function closeDialog(){
    if ($("#div_for_easyui_window")){
        $("#div_for_easyui_window").dialog('destroy');
    };
}

function showDialog(options){
    if ($("#div_for_easyui_window")){
        $("#div_for_easyui_window").dialog('destroy');
    };
    //隐藏最小化、收起、最大化按钮
    //options = $.extend(options, {collapsible: false, minimizable : false, maximizable: false, resizable: true});
    options = $.extend({collapsible: false, minimizable : false, maximizable: false, resizable: true}, options);
    //标题处理
    if(options.title == null || options.title == '') {
        options.title = '.';
    }
    //移动事件
    if(options.onMove == null || options.onMove == '') {
        options.onMove = onDialogMove;
    }
    //自适应大小
    var clientWidth = $(this).width();
    var clientHeight = $(this).height();
    if(options.width && options.width > clientWidth-15) {
        options.width = clientWidth-15;
    } else if (!options.width) {
        options.width = clientWidth-15;
    }
    if(options.height && options.height > clientHeight-20) {
        options.height = clientHeight-20;
    } else if (!options.height) {
        options.height = clientHeight-20;
    }
    var href = options.href;
    options.href = '';
    if(href == null || href == '') {
        href = options.url;
    }
    if(href) {
        var date = new Date();
        if(href.indexOf('?') != -1) {
            href = href + '&ms_=' + date.getTime();
        } else {
            href = href + '?ms_=' + date.getTime();
        }
        var iframeHtml = "<div id='div_for_easyui_window'><iframe class='iframe_for_easyui_window' style='{style}' frameborder='0' src='"+href+"'></iframe></div>";
        var style="width: {width}px; height: {height}px;";
        style = style.replace(/{width}/g, options.width - 30);
        style = style.replace(/{height}/g, options.height - 10);
        iframeHtml = iframeHtml.replace(/{style}/g, style);
        return $(iframeHtml).dialog(options);
    } else if (options.content) {
        var html = "<div id='div_for_easyui_window'>{content}</div>";
        html = html.replace(/{content}/g, options.content);
        return $(html).dialog(options);
    }
}
