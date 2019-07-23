/*
 * author: Leven
 * 依赖于 JQuery 1.8+
 * Create 15/12/2016
 * Version 1.0.0
 * demo:
 *      使用: $('#tableId').quickGrid({
 *                  。。。
 *              });
 * 外部调用函数方法:
 *      使用方法: $('#tableId').quickGrid({。。。}).quickGrid('方法名', [参数1], [参数2]...)；
 * 获取已选中的行数据:            getGridInfoBySelected
 * 通过id组获取行数据:            getGridInfoByIds(接收ID组)
 * 获取统计值列:                 getTotalColNum
 * 获取表格内全部数据:            getGridRowDatas
 * 新增, 不建议在循环中使用:       addNewRow(数据, 要被插入ID值)
 * 批量新增:                    addRowDatas(数据数组, 位置,参考行id)
 * 重载grid:                    reloadGrid()
 * 设置表尾统计值:               setFootRowValue({列的键值对})
 * 设置选中行:                  setSelectionRow(行id, 是否选中)
 * 清空Grid:                   cleanGridRow()
 * 根据ID删除指定行数据:         deleteGridRowDataByIds(id值)
 * 设置单元格具体值:             setGridCell(行id, 列名, 值)
 * 
 */
(function ($, window, document, undefined) {
	'use strict';

	// 私有属性
	var _param = {
		_pluginName: 'quickGrid',
		_tableHead: 'qgbox-quickgrid-hdiv',
		_tableBody: 'qgbox-quickgrid-bdiv',
		_tableFoot: 'qgbox-quickgrid-fdiv',
		_tableLoad: 'qgbox-quickgrid-load',
		_firstAction: true,
		guid : 1,
		uidPref: 'jqg'
	};

	// 表格模板
	function quickGridTemplate(boxId, width) {
		var templateHtml = ''
			+ '<div id="qgbox_'+ boxId +'" class="qgbox-layout" style="width: '+ width +'px;">'
			+   '<div class="'+ _param._tableHead +'" style="width: '+ (Number(width) + 2) +'px;">'
			+       '<div class="qgbox-outside-box">'
			+           '<table class="qgbox-htable" cellSpacing="0"><thead><tr></tr></thead></table>'
			+       '</div>'
			+   '</div>'
			+   '<div class="'+ _param._tableBody +'" style="width: '+ (Number(width) + 2) +'px;">'
			+   	'<div class="'+ _param._tableLoad +'" style="display:none">'
			+		   	'<div class="ui-quickgrid-loading-img"></div>'
			+   	'</div>'
			+       '<div>'
			+           '<table id="'+ boxId +'" class="qgbox-btable" cellSpacing="0"></table>'
			+       '</div>'
			+    '</div>'
			+   '<div class="'+ _param._tableFoot +'" style="position: relative;width: '+ (width - 15) +'px;">'
			+       '<div class="qgbox-outside-box">'
			+           '<table class="qgbox-ftable" cellSpacing="0"><tr class="footrow"></tr></table>'
			+       '</div>'
			+   '</div>'
			+ '</div>';

		return templateHtml;
	}

	$.fn.quickGrid = function (options) {
		var args = arguments
			, result = void 0;

		if (this.length == 0)
			return this;

		this.each(function () {
			var thisEle = this
				, instance = $(thisEle).data(_param._pluginName);

			if (typeof options == 'string') {
				Array.prototype.shift.call(args);
				if (instance && instance[options])
					result = instance[options].apply(instance, args);
			}else if (typeof options == 'object' || !Boolean(options)){
				// 如果没有保存实例
				if (!instance) {
					instance = new $.quickGrid(thisEle, options);
					$(thisEle).data(_param._pluginName, instance);
				}
			}
		});
		return void 0 === result ? this : result;
	};

	// 构造主函数
	$.quickGrid = function (selsector, configs) {
		this.Elm = $(selsector);
		this.ElmParent = this.Elm.parent();
		this.ElmId = this.Elm[0].id;
		this.ElmBox = '#qgbox_' + this.Elm[0].id;
		this.options = $.extend(true, {}, $.quickGrid.defaults, configs);
		this.ElmWidth = this.Elm.parent().outerWidth();
		this.defTemp = $(quickGridTemplate(this.ElmId, this.ElmWidth));
		this._tableHeadSelector = this.ElmBox + ' .qgbox-quickgrid-hdiv';
		this._tableBodySelector = this.ElmBox + ' .qgbox-quickgrid-bdiv';
		this._tableFootSelector = this.ElmBox + ' .qgbox-quickgrid-fdiv';
		this._tableLoadSelector = this.ElmBox + ' .qgbox-quickgrid-load';
		this.selectedByIds = [];
		this.totalMap = {};
		this._privateFunc = $.quickGrid._privateFunc;
		this._init.apply(this, arguments);
	};

	$.quickGrid.prototype = {
		constructor: $.quickGrid,

		_init: function(){
			this._firstAction = true;
			this._setFormatColumnMap();
			this._buildBox();
			this._layout();
			// this._footRender();
			this._privateFunc._deleteById();
		},

		// 构建表格模型（表头、表尾）
		_buildBox: function(){
			var _this = this
				, _hdiv = ''
				, _fdiv = ''
				, width
				, height
				, colModel = _this.options.colModel
				, align, hidden
				, hstyle = [], thName = [], bstyle = [];

			// 建立表身
			if(_this.options.dataType != 'local' && Boolean(_this.options.url)){
				$.ajax($.extend({
					url: _this.options.url,
					type: 'post',
					dataType: 'json' ,
					data: {},
					success:function(data) {
						$(_this).triggerHandler("jqGridLoadComplete", data);
						_this.gridDataInfo = data;
					}
				},_this.options.ajaxOptions));
			}else if(_this.options.dataType == 'local'){
				try{
					_this.gridDataInfo = _this.options.localData;
				}catch(err){
					console.log(err);
				}
			}

			// 特殊列
			colModel.unshift(
				{
					name: "rn",
					width: 25
				},
				{
					name: "cb",
					label: '<input role="checkbox" id="'+ this.ElmId +'_cb" class="cbox" type="checkbox">',
					width: 20,
					hidden: _this.options.multiboxShow == false ? true : false//是否显示多选框
				}
			);

			// 建立表头、表尾
			if(colModel.length > 2){
				var autoWidthGrid = _this.options.autoWidth;
				for(var x = 0; x < colModel.length; x++){
					thName[x] = this.ElmId + '_' + colModel[x].name;
					align = Boolean(colModel[x].align) ? 'text-align: '+ colModel[x].align +';' : '';
					hidden = Boolean(colModel[x].hidden) ? 'display: none;' : '';
					if(autoWidthGrid && this.ElmWidth && this.ElmWidth != "0"){

						//自动宽度，那么就用百分比来适应宽度，以免出现滚动条
						if($.trim(colModel[x].width) !=""){
							var percentWidth = ((Number(colModel[x].width) / Number(this.ElmWidth)).toFixed(2) )* 100;

							width = Boolean(colModel[x].width) ? 'width: '+ percentWidth + '%;': 'width: '+ colModel[x].width +'px;';
						}

					}else{
						width = Boolean(colModel[x].width) ? 'width: '+ colModel[x].width +'px;' : '';
					}

					height = _this.options.tdHeight>0?'height: '+ _this.options.tdHeight +'px;' : '';
					hstyle[x] = width + hidden;
					bstyle[x] = width + height + hidden + align;
					if($.isFunction(colModel[x].label)){

						var customLabel = colModel[x].label;

						_hdiv += '<th'+ (hstyle[x] != '' ? ' style="'+ hstyle[x] +'"' : '') +'>'
							+     '<div style="position: relative;" class="qgh_'+ thName[x] +'">'
							+         (colModel[x].label || '')
							+         	customLabel
							+     '</div>'
							+  '</th>';

					}else{
						_hdiv += '<th'+ (hstyle[x] != '' ? ' style="'+ hstyle[x] +'"' : '') +'>'
							+     '<div style="position: relative;" class="qgh_'+ thName[x] +'">'
							+         (colModel[x].label || '')
							+         '<span class="desc" '+ (colModel[x].sortable == true ? '' : ' style="display: none;"') +' data-column="'+ colModel[x].name +'">'
							+           '<i class="s-ico qgbox-layout-ico-sort qgbox-ico-sort-asc"></i>'
							+           '<i class="s-ico qgbox-layout-ico-sort qgbox-ico-sort-desc"></i>'
							+         '</span>'
							+     '</div>'
							+  '</th>';
					}


					_fdiv += '<td data-column="'+ colModel[x].name +'"'+ (bstyle[x] != '' ? ' style="'+ bstyle[x] +'"' : '') +'></td>';
				}
				_this.defTemp.find('.qgbox-htable tr').append(_hdiv).end().find('.qgbox-ftable tr').append(_fdiv);
				if(!_this.options.footerRow){
					_this.defTemp.find('.' + _param._tableFoot).hide();
				}
				_this.colModel = colModel;
				_this.thName = thName;
				_this.bstyle = bstyle;
				_this.allCheckBtn = _this.ElmId + '_cb';
				_this._bulidGridBody(_this.defTemp, colModel, thName, bstyle);
			}
		},

		// 构建表身
		_bulidGridBody: function($selector, colModel, thName, bstyle, newGridDataInfo){
			var _this = this
				, gridDataInfo = newGridDataInfo || _this.gridDataInfo
				, _bdiv = ''
				, isFirstRun = _this._firstAction
				, firstRunNum = _this.options.firstRunNum
				, forNum = gridDataInfo.length
				, $bTable = $selector.find('.qgbox-btable');

			_this._verifyParam(gridDataInfo);

			if(firstRunNum != 0)
				forNum = firstRunNum;
			for(var y = 0; y < forNum; y++){
				var _bdiv_td = '' ,
					itemId = gridDataInfo[y].id;

				for(var x = 0; x < colModel.length; x++){
					var tdName,
						tdText,
						addClass='';

					if(gridDataInfo[y][colModel[x].name] == undefined){
						if(_this.options.multiboxShow != false && colModel[x].name == 'cb'){
							tdName = '<input role="checkbox" id="qgh_'+ this.ElmId +'_'+ itemId +'" class="cbox" type="checkbox" data-id="'+ itemId +'">';
						}else if(colModel[x].name == 'rn'){
							tdText = y + 1;
							tdName = y + 1;
						}else if(colModel[x].name == '_operator'){
							tdName = _this.customAction($($bTable),colModel[x] ,gridDataInfo[y] ,gridDataInfo[y]["id"]);
						}else if(colModel[x].classes == 'qgCheckbox' && $.isFunction(colModel[x].formatter)){
							//表格中复选框格式化
							tdName = colModel[x].formatter(gridDataInfo[y][colModel[x].name],gridDataInfo[y]);
						}else{
							// 用户自定义 || 当前这个属性为空
							tdName = '';
							tdText = '';
						}
					}else{
						tdText = gridDataInfo[y][colModel[x].name];
						// 格式化数据
						tdName = _this._formatColumnVal(colModel[x].name, tdText,gridDataInfo[y]);
					}
					//金额如果为负数，增加红色样式
					if(!isNaN(Number(tdText))){
						if(Number(tdText)<0){
							addClass = 'negative-cell';
						}
					}
					_bdiv_td += '<td class="'+addClass+'" data-unformatvalue="'+ ($.trim(tdText) == "" ? '':tdText) +'" data-name="'+ colModel[x].name +'"'+ (bstyle[x] != '' ? ' style="'+ bstyle[x] +'"' : '') +'>'+ tdName +'</td>';

				}
				if(gridDataInfo[y].rowState == 2){
					_bdiv += '<tr style="display: none" id="'+ itemId +'">'+ _bdiv_td +'</tr>';
				}else{
					var addClass = '';

					// 插入行数据 后事件【rowId,rowData】,目前就接受返回的CLassName,
					if(typeof _this.options.afterInsertGridRow != 'undefined'){
						addClass  = _this.options.afterInsertGridRow(itemId,gridDataInfo[y]);
					}

					_bdiv += '<tr class="'+addClass+'" id="'+ itemId +'">'+ _bdiv_td +'</tr>';
				}

			}
			$bTable.html(_bdiv);
			if(!$bTable.data(_param._pluginName))
				$bTable.data(_param._pluginName, _this);
			if(!isFirstRun)
				_this._bindEvent();
		},

		// 基础样式渲染
		_layout: function(){
			var _this = this;

			if(_this.options.autoWidth)
				_this.defTemp.find('table:not(#'+ _this.ElmId +')').css('width', _this.ElmWidth - 15).end()
					.find('#'+ _this.ElmId).css('width', _this.ElmWidth - 15);
			_this.defTemp.find('.' + _param._tableBody).height(_this.options.gridHeight || 300);
			_this.Elm.replaceWith(_this.defTemp[0]);
			if(_this._firstAction){
				_this._bindEvent();
				_this._firstAction = false;
			}

			try {
				// 表格加载完成后事件 后事件【rowDatas】
				if(typeof _this.options.afterLoadGridComplete != 'undefined'){
					var rowDatas = _this.getAllRowDatas($("#"+_this.ElmId));
					// _this.options.afterLoadGridComplete(rowDatas);
					_this.options.afterLoadGridComplete.call(_this,rowDatas);
				}

			} catch (_) {}
		},
		/**
		 * 表尾渲染
		 * @private
		 */
		_footRender: function(){
			var _this = this;
			if(!_this.options.footerRow){
				return;
			}
			if(_this.options.footerRow && !_this.options.multiboxShow){
				//开启foot且关闭checkBox时，默认展示foot
				_this._totalColNum(false);
			}

		},

		// 事件绑定
		_bindEvent: function(){
			var _this = this ,
				$allChecked = $('#' + _this.allCheckBtn),
				options = _this.options ,
				colNames = _this.colModel;

			// 行勾选事件
			$(_this._tableBodySelector).off('click.quickGrid').on('click.quickGrid', function(e){
				var target = e.target || e.srcElement
					, $target = $(target)
					, $input = ($target[0].tagName == 'INPUT' ? $target : $target.closest('tr').find('input[type="checkbox"]'))
					, $tr = $target.closest('tr')
					, rowId = $target.closest('tr').attr("id")
					, isChecked = $input.is(':checked')
					, targetColName = $target.attr("data-name")// 当前操作列可编辑的格式
					, colNameOption //截取colName的设置
					, isEditCell = true;//beforeGridEditCell增加一些校验，是否继续可编辑

				//初始化后可能还会动态的设置属性，所以要重新获取一遍
				options = _this.options ;

				//自身就是可编辑的文本或者操作列就什么都不做
				if(options.cellEdit && ($target.is('input[type="text"]') || $target.is(".sj-operate-s") || $target.hasClass("disabled"))){
					return;
				}

				//单元格恢复到不可编辑状态
				if(options.cellEdit){
					_this.restoreGridCell();

					//变成可编辑前做一些校验，返回true就继续往下，false就不渲染成可编辑状态
					if(typeof _this.options.beforeGridEditCell != 'undefined'){
						var editCell = _this.options.beforeGridEditCell(rowId, targetColName);
						isEditCell = editCell;
					}

					for(var o = 0 ; o < colNames.length ; o ++){
						if($.trim(targetColName) != "" && true != colNames[o]["hidden"] && colNames[o]["name"] == targetColName){
							colNameOption = colNames[o] ;
						}
					}
				}

				//如果点击在变身空白地方，什么都不做
				if($target.is("div .qgbox-quickgrid-bdiv")){
					return;
				}

				$tr.addClass("selected-row").siblings().removeClass("selected-row");
				if(options.cellEdit && (colNameOption &&  colNameOption.editable ) && isEditCell){
					//先移除所有的已经渲染成文本的input，把value set给td
					var tdVal ;

					tdVal = $target.is("td") ? $target.html() : "";

					//然后重新根据当前target的格式重新渲染格式
					//获取td里的值，如果有值就赋值给当前文本框
					//格式化单元格
					var opt = $.extend({}, (colNameOption && colNameOption.editoptions )|| {} ,{id:rowId+"_"+targetColName,name:targetColName,inputLength:colNameOption.inputLength});
					var elc = _this.createEl("text",opt,tdVal,true);
					$($target).html("").append(elc).attr("tabindex","0");

					if($.isFunction(opt.dataInit)) {
						opt.dataInit.call(_this,elc,opt);
					}

					window.setTimeout(function () { $(elc).focus();},0);

					// 单元格可编辑后事件【rowId,colName,cellValue】
					if(typeof _this.options.afterGridEditCell != 'undefined'){
						_this.options.afterGridEditCell.call(_this,rowId,targetColName,$(elc).val());
					}
				}else{
					$allChecked.attr('checked', false);
					$target[0].tagName == 'INPUT' ? null : $input.prop('checked', !isChecked);
					// _this._getGridInfoBySelected.call($input, _this.selectedByIds);

					// 计算金额
					if(_this.options.footerRow && _this.options.multiboxShow){
						//开启foot且关闭checkBox时，默认展示foot
						_this._totalColNum(true);
					}


					// 选中后事件callback
					if(typeof _this.options.onSelectGridRow != 'undefined'){
						_this.options.onSelectGridRow($input.data('id'), $input.is(':checked'));
					}
				}
			});
			// 滚动条同步
			$(_this._tableBodySelector).off('scroll.quickGrid').on('scroll.quickGrid',function() {
				$('.' + _param._tableHead + ', .' + _param._tableFoot,_this.ElmBox).scrollLeft($(this).scrollLeft());
			});
			// 全选事件
			_this._allCheckedEvent();
			// 排序事件
			$(_this._tableHeadSelector).off('click.quickGrid').on('click.quickGrid', function(e){
				var target = e.target || e.srcElement
					, $target = $(target);

				if($target[0].tagName == 'I'){
					var $span = $target.parent('span')
						, column = $span.attr('data-column');

					if($span.hasClass('sort')){
						_this._sortGrid('desc', column);
						$span.find('.qgbox-ico-sort-desc').addClass('active');
						$span.find('.qgbox-ico-sort-asc').removeClass('active');
					}else{
						_this._sortGrid('asc', column);
						$span.find('.qgbox-ico-sort-asc').addClass('active');
						$span.find('.qgbox-ico-sort-desc').removeClass('active');
					}
					$span.toggleClass('sort');
				}
			});
			// 窗口变化自适应表格
			_this.resizeWidth();

		},

		createEl: function(eltype,options,vl,autowidth){
			var role = "textbox",
				elem = "", $t = this;

			elem = document.createElement("input");
			elem.type = eltype;
			elem.value = vl;
			if($.trim(options.inputLength) != ""){
				options.maxlength = options.inputLength;
				options.inputLength = null;
			}
			$t.setAttributes(elem, options);
			if(eltype !== "button"){
				if(autowidth) {
					if(!options.size) { $(elem).css({width:"98%"}); }
				} else if (!options.size) { options.size = 20; }
			}
			$(elem).attr("role",role);
			//失去焦点时触发
			$(elem).on("blur",function (e) {
				if(!$(e.target).hasClass("hasDatepicker")){
					$t.restoreGridCell();
				}
			});
			return elem;
		},

		setAttributes :function(elm, atr, exl ) {
			var exclude = ['dataInit','dataEvents','dataUrl', 'buildSelect','sopt', 'searchhidden', 'defaultValue', 'attr', 'custom_element', 'custom_value'];
			if(exl !== undefined && $.isArray(exl)) {
				$.merge(exclude, exl);
			}
			$.each(atr, function(key, value){
				if($.inArray(key, exclude) === -1) {
					$(elm).attr(key,value);
				}
			});
			if(!atr.hasOwnProperty('id')) {
				$(elm).attr('id', $.jgrid.randId());
			}
		},

		// 滚动加载方法实现（大数据, 默认开启, 待完善）
		scrollLoadAddRowInfo: function(){
			var range = 5
				, totalheight = 0;

			$(this.ElmBox).off('scroll').on('scroll', function(){
				var _this = $(this)
					, srollPos = _this.scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)

				totalheight = parseFloat(_this.height()) + parseFloat(srollPos);
				if(srollPos > 0 && (_this.height() - range) <= totalheight  && i < runTime) {
					// appendData();
				}
			});
		},

		// 获取已选中的行数据
		// getGridInfoBySelected: function(){
		//     var _this = this;
		//
		//     return _this.getGridInfoByIds(_this.selectedByIds);
		// },

		// 通过id组获取行数据
		getGridInfoByIds: function(IdsArray){
			var _this = this
				, dataInfos = _this.gridDataInfo
				, dataInfoBySelected = [];

			_this._verifyParam(IdsArray);
			if(typeof IdsArray === 'string')
				IdsArray = Array.prototype.slice.call(arguments);
			for(var x in IdsArray){
				if(IdsArray.hasOwnProperty(x)){
					for(var y = 0; y < dataInfos.length; y++){
						if(IdsArray[x] == dataInfos[y].id){
							dataInfoBySelected.push(dataInfos[y]);
							break;
						}
					}
				}
			}
			return dataInfoBySelected;
		},

		// 获取统计值列
		getTotalColNum: function(){
			return this.totalMap;
		},

		// 获取 选中/取消 后行ID组
		_getGridInfoBySelected: function(selectedByIds){
			var $this = this
				, id = $this.data('id');
			if($this.is(':checked'))
				selectedByIds.push(id);
			else
				selectedByIds.remove(id);
		},

		// 参数验证
		_verifyParam: function(param){
			if(typeof param == undefined || typeof param == 'undefined'){
				return false;
			}
			if(param instanceof Array && param.length == 0){
				return false;
			}
		},

		// 表格排序
		_sortGrid: function(column, sortType){
			var _this = this
				, $tableBody = $(_this._tableBodySelector)
				, $bodyTrDOM = $tableBody.find('tr');

			_this._verifyParam(_this.gridDataInfo);
			$bodyTrDOM.sort(_this._privateFunc._sortList(column, sortType || 'asc'));
			_this._resizeIndex($bodyTrDOM);
			$tableBody.find('table').html($bodyTrDOM);
		},

		// 重置列索引
		_resizeIndex: function(bodyTrDOM){
			var $bodyTrDOM = bodyTrDOM || $(this._tableBodySelector).find('tr');

			return $bodyTrDOM.each(function(k, v){
				$(v).find('td[data-name=rn]').text(k + 1);
			});
		},

		// 根据ID获取索引（暂支持单个ID）
		_getGridRowIndexById: function(IdsArray){
			var indexs = '';

			$.each(this.gridDataInfo, function(index, el) {
				if(el.id == IdsArray){
					indexs = index;
					return false;
				}
			});
			return indexs;
		},

		// 获取已选中的行数据
		getGridRowDataBySelected: function(){
			var _this = this,
				selectedRowIds = [];

			var $trs = $("tr",_this.ElmBox);

			if($trs && $trs.length > 0){
				for(var i = 0 ;i < $trs.length ; i ++){
					var $tr = $($trs[i]),
						rowId = $tr.attr("id"),
						inputChecked = $('input[data-id='+ rowId +']').prop('checked');

					if($tr.css("display") =='none' ){
						continue;
					}

					if(inputChecked){
						$.trim(rowId) != "" ? selectedRowIds.push(rowId) : "";
					}
				}
			}

			return _this.getGridRowDatasByIds(selectedRowIds);
		},

		getGridRowDatasByIds: function(IdsArray){
			var _this = this ,
				dataInfoBySelected = [];

			_this._verifyParam(IdsArray);
			if(typeof IdsArray === 'string')
				IdsArray = Array.prototype.slice.call(arguments);
			for(var x in IdsArray){
				if(IdsArray.hasOwnProperty(x)){
					var $tr = $("tr[id='"+IdsArray[x]+"']"),
						rowData = {},
						$tds = $("td",$tr);

					if($tds && $tds.length > 0){
						for(var j = 0; j < $tds.length; j ++){
							var $td = $($tds[j]),
								name = $td.attr("data-name"),
								value = $td.attr("data-unformatvalue");

							if( "cb" != name && "_operator" != name ){
								rowData[name] = value ;
							}
						}
						dataInfoBySelected.push(rowData);
					}
				}
			}
			return dataInfoBySelected;
		},

		/**
		 * 复选框勾选没显示时，获取选中行数据
		 */
		getRowBySelectedRow: function(){
			var _this = this,
				$trSelected = $("tr.selected-row"),
				trId = $trSelected.attr("id");

			return _this.getGridRowDatasByIds(trId);
		},

		/**
		 * 取指定行的单元格数据
		 * @param rowId
		 * @param colName
		 * @returns {*}
		 */
		getGridCellData:function (rowId,colName) {
			var _this = this,
				rowData = _this.getGridRowDatasByIds(rowId)[0];
			return rowData[colName];
		},

		// 新增, 丢失事件操作，且刷新表体，不建议在循环中使用（后期可考虑克隆解决）
		addNewRow: function(rowData, posId){
			var _this = this
				, indexOfId;

			indexOfId = _this._getGridRowIndexById(posId);
			_this.gridDataInfo.splice(indexOfId, 0, rowData);
			_this.reloadGrid();
		},

		randId : function( prefix )	{
			return (prefix || _param.uidPref) + (_param.guid++);
		},

		/**
		 * 如果有可编辑单元格先复原，变为不可编辑
		 */
		restoreGridCell: function () {

			//先移除所有的已经渲染成文本的input，把value set给td
			var _this = this,
				$inputs = $("td",$("#"+this.ElmId)).find("input[type='text']"),
				colNames = _this.colModel;

			if($inputs && $inputs.length > 0 ){



				for(var i = 0; i < $inputs.length ; i ++){
					var $closestTd = $($inputs[i]).parent("td"),
						inputVal = $($inputs[i]).val(),
						colName = $inputs.attr("name"),
						rowId =  $($($inputs[i]).closest("tr")).length > 0 ? $($inputs[i]).closest("tr").attr("id") : "",
						colNameOption ;

					for(var o = 0 ; o < colNames.length ; o ++){
						if(colNames[o]["name"] == colName){
							colNameOption = colNames[o] ;
						}
					}

					if(colNameOption && colNameOption.formatter == "currencyExt"){
						var formatoptions = colNameOption.formatoptions,
							decimalPlaces = $.trim(formatoptions) != "" ? formatoptions.decimalPlaces : 2,
							value = $.NumberUtils.unThousandsFormat(inputVal),
							text = $.NumberUtils.thousandsFormat(value,decimalPlaces);
						$closestTd.attr("data-unformatvalue",value);
						if($.trim(inputVal) == ''){
							//如果输入的是空值，根据参数判断是否以空值输出
							if(_this.options.nullTrimEmpty){
								text = ""
							}
						}
						$closestTd.html(text);

						inputVal = value ;
						//
					}else {
						$closestTd.attr("data-unformatvalue",inputVal);

						$closestTd.html(inputVal);
					}

					if(typeof _this.options.afterGridSaveCell != 'undefined' && rowId){
						_this.options.afterGridSaveCell.call(_this,rowId,colName,inputVal);
					}
				}
			}
		},

		/**
		 * 新增表格数据
		 * @param rowId 行数据ID（不可空）
		 * @param rowData 行数据（不可空）
		 * @param position 表格的位置（可空，默认last。其它'last','first','after','before'）
		 * @param refRowId 参照行数据ID（可空，位置等于 'after','before' 必须给定）
		 * @returns {boolean}
		 */
		addGridRowData: function (rowId, rowData, position, refRowId) {
			var _this = this, isSuccess;
			if (rowData['rowState'] == undefined
				&& Number(rowData['rowState']) !== $.jgrid.RowState.UNCHANGED
				&& Number(rowData['rowState']) !== $.jgrid.RowState.MODIFIED
				&& Number(rowData['rowState']) !== $.jgrid.RowState.DELETED) {
				//设置新增状态
				rowData['rowState'] = $.jgrid.RowState.ADDED;
			}
			_this.restoreGridCell();
			//
			isSuccess = _this.addRowData( rowId, rowData, position, refRowId);
			return isSuccess;
		},

		/**
		 * 插入第一行
		 * @param rowData
		 */
		addFirstRow: function (rowData) {
			var _this = this,
				rowId = rowData.id,
				colModel = _this.colModel,
				$bTable = _this.defTemp.find('.qgbox-btable'),
				_bdiv_td='',
				_newTrElm;
			for(var x = 0; x < colModel.length; x++){
				var tdName,
					tdText ;

				if(rowData[colModel[x].name] == undefined){
					if(_this.options.multiboxShow != false && colModel[x].name == 'cb'){
						tdName = '<input role="checkbox" id="qgh_'+ _this.ElmId +'_'+ rowId +'" class="cbox" type="checkbox" data-id="'+ rowId +'">';
					}else if(colModel[x].name == 'rn'){
						tdName = 1; //新插入的数据，要根据当前插入行，重新计算所有的列序号
					}else if(colModel[x].name == '_operator'){
						tdName = _this.customAction($($bTable),colModel[x] ,rowData ,rowId);
					}else if(colModel[x].classes == 'qgCheckbox' && $.isFunction(colModel[x].formatter)){
						//表格中复选框格式化
						tdName = colModel[x].formatter(rowData[colModel[x].name],rowData);
					}else{
						// 用户自定义
						tdName = '';
						tdText = '';
					}
				}else{
					tdText = rowData[colModel[x].name];
					// 格式化数据
					tdName = _this._formatColumnVal(colModel[x].name, tdText);
				}
				var width,
					align = Boolean(colModel[x].align) ? 'text-align: '+ colModel[x].align +';' : '';
				var hidden = Boolean(colModel[x].hidden) ? 'display: none;' : '';
				if(_this.options.autoWidth && _this.ElmWidth && _this.ElmWidth != "0"){

					//自动宽度，那么就用百分比来适应宽度，以免出现滚动条
					if($.trim(colModel[x].width) !=""){
						var percentWidth = ((Number(colModel[x].width) / Number(_this.ElmWidth)).toFixed(2) )* 100;

						width = Boolean(colModel[x].width) ? 'width: '+ percentWidth + '%;': 'width: '+ colModel[x].width +'px;';
					}

				}else{
					width = Boolean(colModel[x].width) ? 'width: '+ colModel[x].width +'px;' : '';
				}

				var bstyle = width + hidden + align;

				_bdiv_td += '<td data-unformatvalue="'+ (tdText || '') +'" data-name="'+ colModel[x].name +'" style="'+ bstyle +'" >'+ tdName +'</td>';
			}
			_newTrElm = '<tr id="'+ rowId +'">'+ _bdiv_td +'</tr>';
			$bTable.html(_newTrElm);
		},

		addRowData: function(rowId, rowData, position , refRowId){
			if(!position) {position = "last";}

			//必须有参照插入行的Id
			if(!refRowId) {return;}

			//获取被参照行的tr元素
			var _this = this,
				$refTr = $("tr[id='"+refRowId+"'"),
				colModel = _this.colModel,
				$bTable = $refTr.closest('.qgbox-btable');

			if($refTr && $refTr.length > 0){
				var _newTrElm,
					_bdiv_td = '',
					itemId = rowData.id;

				for(var x = 0; x < colModel.length; x++){
					var tdName,
						tdText ,
						addClass='' ;

					if(rowData[colModel[x].name] == undefined){
						if(_this.options.multiboxShow != false && colModel[x].name == 'cb'){
							tdName = '<input role="checkbox" id="qgh_'+ _this.ElmId +'_'+ itemId +'" class="cbox" type="checkbox" data-id="'+ itemId +'">';
						}else if(colModel[x].name == 'rn'){
							tdName = 0; //新插入的数据，要根据当前插入行，重新计算所有的列序号
						}else if(colModel[x].name == '_operator'){
							tdName = _this.customAction($($bTable),colModel[x] ,rowData ,rowId);
						}else if(colModel[x].classes == 'qgCheckbox' && $.isFunction(colModel[x].formatter)){
							//表格中复选框格式化
							tdName = colModel[x].formatter(rowData[colModel[x].name],rowData);
						}else{
							// 用户自定义
							tdName = '';
							tdText = '';
						}
					}else{
						tdText = rowData[colModel[x].name];
						// 格式化数据
						tdName = _this._formatColumnVal(colModel[x].name, tdText);
					}

					var width,
						align = Boolean(colModel[x].align) ? 'text-align: '+ colModel[x].align +';' : '';
					var hidden = Boolean(colModel[x].hidden) ? 'display: none;' : '';
					if(_this.options.autoWidth && _this.ElmWidth && _this.ElmWidth != "0"){

						//自动宽度，那么就用百分比来适应宽度，以免出现滚动条
						if($.trim(colModel[x].width) !=""){
							var percentWidth = ((Number(colModel[x].width) / Number(_this.ElmWidth)).toFixed(2) )* 100;

							width = Boolean(colModel[x].width) ? 'width: '+ percentWidth + '%;': 'width: '+ colModel[x].width +'px;';
						}

					}else{
						width = Boolean(colModel[x].width) ? 'width: '+ colModel[x].width +'px;' : '';
					}

					var bstyle = width  + hidden + align;

					//金额如果为负数，增加红色样式
					if(!isNaN(Number(tdText))){
						if(Number(tdText)<0){
							addClass = 'negative-cell';
						}
					}
					_bdiv_td += '<td class="'+addClass+'" data-unformatvalue="'+ (tdText || '') +'" data-name="'+ colModel[x].name +'" style="'+ bstyle +'" >'+ tdName +'</td>';

				}
				_newTrElm = '<tr id="'+ itemId +'">'+ _bdiv_td +'</tr>';
				$refTr.after(_newTrElm);

				//更新所有行的序号（可见行进行更新，隐藏的不更新）
				var $Rn = $("td[data-name='rn']:visible",$bTable);
				if ($Rn && $Rn.length > 0) {
					for (var j = 0; j < $Rn.length; j++) {
						$($Rn[j]).html(j + 1);
					}
				}

				try {
					// 插入行数据 后事件【rowId,rowData,cellValue】
					if(typeof _this.options.afterInsertGridRow != 'undefined'){
						_this.options.afterInsertGridRow(rowId,rowData);
					}

				} catch (_) {}
			}
		},

		/**
		 * 批量插入（滚动加载，非新增）
		 * @param rowDatas 要插入的数据数组
		 * @author luocj at 2018.06.25
		 */
		addRowDatas: function (rowDatas, position) {
			//获取被参照行的tr元素
			var _this = this,
				$refTr,
				colModel = _this.colModel,
				$bTable = _this.defTemp.find('.qgbox-btable'),
				_newTrElm='';

			// if($refTr && $refTr.length > 0){

			$.each(rowDatas, function (index, rowData) {
				var rowId = rowData.id,
					_bdiv_td = '';
				for (var x = 0; x < colModel.length; x++) {
					var tdName,
						tdText,
						addClass='';

					if (rowData[colModel[x].name] == undefined) {
						if (_this.options.multiboxShow != false && colModel[x].name == 'cb') {
							tdName = '<input role="checkbox" id="qgh_' + _this.ElmId + '_' + rowId + '" class="cbox" type="checkbox" data-id="' + rowId + '">';
						} else if (colModel[x].name == 'rn') {
							tdName = 0;
						} else if (colModel[x].name == '_operator') {
							tdName = _this.customAction($($bTable), colModel[x], rowData, rowId);
						} else if(colModel[x].classes == 'qgCheckbox' && $.isFunction(colModel[x].formatter)){
							//表格中复选框格式化
							tdName = colModel[x].formatter(rowData[colModel[x].name],rowData);
						} else {
							// 用户自定义
							tdName = '';
							tdText = '';
						}
					} else {
						tdText = rowData[colModel[x].name];
						// 格式化数据
						tdName = _this._formatColumnVal(colModel[x].name, tdText);
					}
					var width,
						align = Boolean(colModel[x].align) ? 'text-align: '+ colModel[x].align +';' : '';
					var hidden = Boolean(colModel[x].hidden) ? 'display: none;' : '';
					if(_this.options.autoWidth && _this.ElmWidth && _this.ElmWidth != "0"){

						//自动宽度，那么就用百分比来适应宽度，以免出现滚动条
						if($.trim(colModel[x].width) !=""){
							var percentWidth = ((Number(colModel[x].width) / Number(_this.ElmWidth)).toFixed(2) )* 100;

							width = Boolean(colModel[x].width) ? 'width: '+ percentWidth + '%;': 'width: '+ colModel[x].width +'px;';
						}

					}else{
						width = Boolean(colModel[x].width) ? 'width: '+ colModel[x].width +'px;' : '';
					}

					var bstyle = width  + hidden + align;

					//金额如果为负数，增加红色样式
					if(!isNaN(Number(tdText))){
						if(Number(tdText)<0){
							addClass = 'negative-cell';
						}
					}
					_bdiv_td += '<td class="'+addClass+'" data-unformatvalue="' + (tdText || '') + '" data-name="' + colModel[x].name + '" style="' + bstyle + '" >' + tdName + '</td>';

				}

				try {
					// 插入行数据 后事件【rowId,rowData】
					if (typeof _this.options.afterInsertGridRow != 'undefined') {
						_this.options.afterInsertGridRow(rowId, rowData);
					}

				} catch (_) {
				}
				_newTrElm += '<tr id="' + rowId + '">' + _bdiv_td + '</tr>';
			});
			if (position == 'last') {
				$refTr = $bTable.find("tr:last");
				$refTr.after(_newTrElm);
			} else if (position == 'first') {
				$bTable.html(_newTrElm);
			}


			//更新所有行的序号
			var $Rn = $("td[data-name='rn']:visible", $bTable);
			if ($Rn && $Rn.length > 0) {
				for (var j = 0; j < $Rn.length; j++) {
					$($Rn[j]).html(j + 1);
				}
			}
		},

		/**
		 *
		 * @param rowId 新增行的Id
		 * @param updateColName 要修改的列
		 * @param updateValue 要修改的值
		 * @param refRowId 点击某一行的操作列的标识参照ID,
		 * @param operate 1-->当前行往后依次加1 ；-1-->当前行往后依次减1；0-->当前行往后都赋值updateValue
		 */
		batchUpdateColValue: function(rowId,updateColName,updateValue, refRowId,operate,refColName,refValue){
			var _this = this,
				$refTr = $("tr[id='"+refRowId+"'"),
				$bTable = $refTr.closest('.qgbox-btable');

			// if($refTr && $refTr.length > 0){

			//更新所有行的序号
			// var $TR = $("td[data-name='" + updateColName + "']", $bTable);
			// if ($TR && $TR.length > 0) {
			// 	if($.trim(operate) == "0"){
			// 		$($TR[j]).html(updateValue);
			// 	}else{
			// 		for (var j = 0; j < $TR.length; j++) {
			// 			var rnValue = $($TR[j]).html(),
			// 				currRowId = $($TR[j]).siblings("td[data-name='id']").attr("data-unformatvalue");
			//
			// 			if (Number(rnValue) > updateValue || (currRowId != rowId && Number(rnValue) == updateValue)) {
			// 				$($TR[j]).html($.trim(operate) == "1" ? Number(rnValue) + 1 : Number(rnValue) - 1);
			// 				$($TR[j]).attr("data-unformatvalue",$.trim(operate) == "1" ? Number(rnValue) + 1 : Number(rnValue) - 1);
			// 			}
			// 		}
			// 	}
			//
			// }
			// }

			var $trs = $("tr",$bTable);
			for(var a = 0 ; a < $trs.length ;a ++){
				var $tr = $($($trs)[a]),
					currPageNo = $("td[data-name='"+refColName+"']",$tr).attr("data-unformatvalue");
				if(currPageNo == refValue){
					var
						currUpdateValue = $("td[data-name='" + updateColName + "']", $tr).attr("data-unformatvalue"),
						newValue = $.trim(operate) == "1" ? Number(currUpdateValue) + 1 : Number(currUpdateValue) - 1,
						currRowId = $("td[data-name='id']", $tr).attr("data-unformatvalue");

					if (Number(currUpdateValue) > updateValue || (currRowId != rowId && Number(currUpdateValue) == updateValue)) {
						$("td[data-name='" + updateColName + "']", $tr).html(newValue);
						$("td[data-name='" + updateColName + "']", $tr).attr("data-unformatvalue", newValue);
					}
				}
			}
		},

		deleteGridRowDataById: function(rowId){
			var _this = this ,
				$tr = $("tr[id='"+rowId+"'");

			if(!rowId){return;}

			$tr.hide();

			try {
				// 插入行数据 后事件【rowId,colName,cellValue】
				if(typeof _this.options.afterDeleteGridRow != 'undefined'){
					_this.options.afterDeleteGridRow(rowId);
				}

			} catch (_) {}
			//重新排序
			//更新所有行的序号
			var $bTable = _this.defTemp.find('.qgbox-btable'),
				$Rn = $("td[data-name='rn']:visible", $bTable);
			if ($Rn && $Rn.length > 0) {
				for (var j = 0; j < $Rn.length; j++) {
					$($Rn[j]).html(j + 1);
				}
			}

		},

		// 获取表格内全部数据
		getGridRowDatas: function($grid){
			//每一个tr就是一个对象，
			var $trs = $("tr",$grid),
				rowDatas = [];

			for(var i = 0 ; i < $trs.length ; i ++){
				var rowData = {},
					$tds = $("td",$trs[i]);

				if($($trs[i]).css("display") =='none' || ($($trs[i]).attr("id").indexOf("newId") != -1 && $("td[data-name='rowState']",$($trs[i])).attr("data-unformatvalue") == 2)){
					continue;
				}
				if($tds && $tds.length > 0){
					for(var j = 0; j < $tds.length; j ++){
						var $td = $($tds[j]),
							name = $td.attr("data-name"),
							value = $td.attr("data-unformatvalue");

						if( "cb" != name && "_operator" != name && $.trim(name) != ""){
							if($.trim(value) == ""){
								rowData[name] = "" ;
							}else{
								rowData[name] = value ;
							}
						}
					}
					!$.isEmptyObject(rowData) ? rowDatas.push(rowData) : null;
				}

			}
			return rowDatas;
		},

		/**
		 * 是遍历所有表格，获取页面上编辑修改后最新的数据
		 */
		getAllRowDatas: function($grid){

			//每一个tr就是一个对象，
			var $trs = $("tr",$grid),
				rowDatas = [];

			for(var i = 0 ; i < $trs.length ; i ++){
				var rowData = {},
					$tds = $("td",$trs[i]);

				if($($trs[i]).attr("id").indexOf("newId") != -1 && $("td[data-name='rowState']",$($trs[i])).attr("data-unformatvalue") == 2){
					$($trs[i]).remove();
					continue;
				}
				if($tds && $tds.length > 0){
					for(var j = 0; j < $tds.length; j ++){
						var $td = $($tds[j]),
							name = $td.attr("data-name"),
							value = $td.attr("data-unformatvalue");

						if( "cb" != name && "_operator" != name && $.trim(name) != ""){
							if($.trim(value) == ""){
								rowData[name] = "" ;
							}else{
								rowData[name] = value ;
							}
						}
					}
					!$.isEmptyObject(rowData) ? rowDatas.push(rowData) : null;
				}

			}
			return rowDatas;

		},

		/**
		 * 编辑下一个单元格（可能跨行）
		 * @param iRow
		 * @param iCol
		 */
		editNextCell: function (iRow, iCol) {
			var _this = this,
				colLen = _this.options.colModel.length,
				rowLen = $(_this._tableBodySelector).find("tr").length;
			for(;;){
				var	$cell,
					iRow = iCol + 1 === colLen ? iRow + 1 : iRow,
					iCol = iCol + 1 === colLen ? 0 : iCol + 1;

				if (_this.options.cellEdit !== true || !_this.options.colModel[iCol].editable || _this.options.colModel[iCol].hidden) {
					continue;
				}

				if (iRow > rowLen) {
					//没有下一行了，还原为不可编辑状态
					_this.restoreGridCell();
					break;
				}
				//找到对应的单元格，触发点击事件
				$cell = $(_this._tableBodySelector).find("tr:eq('"+iRow+"')").find("td:eq('"+iCol+"')");
				if($cell.length>0){
					$cell.trigger("click");
					break;
				}
			}
		},
		/**
		 * 编辑上一个单元格（可能跨行）
		 * @param iRow
		 * @param iCol
		 */
		editPrevCell: function (iRow, iCol) {
			var _this = this,
				colLen = _this.options.colModel.length;
			for(;;){
				var	$cell,
					iRow = iCol  === 0 ? iRow - 1 : iRow,
					iCol = iCol  === 0 ? colLen-1 : iCol - 1;

				if (_this.options.cellEdit !== true || !_this.options.colModel[iCol].editable || _this.options.colModel[iCol].hidden) {
					continue;
				}

				if (iRow < 0) {
					//没有上一行了，还原为不可编辑状态
					_this.restoreGridCell();
					break;
				}
				//找到对应的单元格，触发点击事件
				$cell = $(_this._tableBodySelector).find("tr:eq('"+iRow+"')").find("td:eq('"+iCol+"')");
				if($cell.length>0){
					$cell.trigger("click");
					break;
				}
			}
		},

		previousGridRowId: function(currRowId){
			var _this = this ,
				$_tableBodySelector = $(_this._tableBodySelector),
				prevElm ;
			prevElm = $("tr[id='"+currRowId+"']",$_tableBodySelector).prev("tr");

			if(prevElm && prevElm.length > 0 ){
				return $(prevElm).attr("id");
			}
			return "";
		},

		nextGridRowId: function(currRowId){
			var _this = this ,
				$_tableBodySelector = $(_this._tableBodySelector),
				nextElm ;

			nextElm = $("tr[id='"+currRowId+"']",$_tableBodySelector).next("tr");
			if(nextElm && nextElm.length > 0){
				return $(nextElm).attr("id");
			}
			return "";
		},

		// 重载grid, 必要方法, 会刷新且丢弃原有事件（但不建议插件内部使用）
		reloadGrid: function(gridDataInfoByOutside){
			var _this = this;
			if(_this.options.loading){
				$(_this._tableLoadSelector).show();
			}
			_this._verifyParam(_this.gridDataInfo);
			if(gridDataInfoByOutside)
				_this.gridDataInfo = gridDataInfoByOutside;
			_this._bulidGridBody($(_this.ElmBox), _this.colModel, _this.thName, _this.bstyle);
			$('#' + _this.allCheckBtn).prop('checked', false);
			_this.setFootRowValue('none');
			// _this.selectedByIds = [];
			if(_this.options.loading){
				$(_this._tableLoadSelector).hide();
			}
		},

		refreshGrid: function(fillDatas){

			var _this = this;

			$(_this._tableBodySelector).find('input[type="checkbox"]').prop('checked', false);
			$('#' + _this.allCheckBtn).prop('checked', false);

			if((null == fillDatas || fillDatas.length == 0) && _this.options.multiboxShow){
				$("tr",$("#"+_this.ElmId)).show();
				$("td[data-name='rowState'][data-unformatvalue='2']").parent("tr").hide();

				//合计列赋空
				_this.setFootRowValue('none');

				return;
			}
			$("tr",$("#"+_this.ElmId)).hide();

			var idsArray = [] ;
			for(var i = 0 ; i < fillDatas.length ; i ++){
				idsArray.push("[id='"+fillDatas[i].id+"']" ) ;
			}
			var idsStr = idsArray.join(",");
			$("tr"+idsStr+"",$("#"+_this.ElmId)).show();
			$("tr"+idsStr+"",$("#"+_this.ElmId)).find('input[type="checkbox"]').prop('checked', true);
			_this._totalColNum(true);
		},

		updateTotalColNum: function (rowDatas) {
			var _this = this;
			_this._totalColNum(false, rowDatas);
		},

		/**
		 * 显示列
		 * @param columnName
		 */
		showColumn:function (columnName) {
			var _this= this,
				$div = $('.qgh_'+ _this.ElmId +'_'+columnName),
				$th = $div.parent(),
				$td = $("td[data-name='"+columnName+"']"),
				$footTd = $("td[data-column='"+columnName+"']");

			_this._updateBodyStyle(_this.colModel,columnName,false);

			$div.show();
			$th.show();
			$td.show();
			$footTd.show();
		},
		/**
		 * 隐藏列
		 * @param columnName
		 */
		hideColumn:function (columnName) {
			var _this= this,
				$div = $('.qgh_'+ _this.ElmId +'_'+columnName),
				$th = $div.parent(),
				$td = $("td[data-name='"+columnName+"']"),
				$footTd = $("td[data-column='"+columnName+"']");

			_this._updateBodyStyle(_this.colModel,columnName,true);

			$div.hide();
			$th.hide();
			$td.hide();
			$footTd.hide();
		},

		/**
		 * 更新列样式
		 * @param colModel
		 * @param columnName
		 * @param isHidden
		 * @private
		 */
		_updateBodyStyle: function (colModel, columnName, isHidden) {
			var _this = this;
			for (var i = 0; i < colModel.length; i++) {
				if (colModel[i].name == columnName) {
					colModel[i].hidden = isHidden;

					var align = Boolean(colModel[i].align) ? 'text-align: ' + colModel[i].align + ';' : '',
						hidden = isHidden ? 'display: none;' : '',
						width ,
						height = _this.options.tdHeight > 0 ? 'height: ' + _this.options.tdHeight + 'px;' : '';

					if(_this.options.autoWidth && _this.ElmWidth && _this.ElmWidth != "0"){

						//自动宽度，那么就用百分比来适应宽度，以免出现滚动条
						if($.trim(colModel[i].width) !=""){
							var percentWidth = ((Number(colModel[i].width) / Number(_this.ElmWidth)).toFixed(2) )* 100;

							width = Boolean(colModel[i].width) ? 'width: '+ percentWidth + '%;': 'width: '+ colModel[i].width +'px;';
						}

					}else{
						width = Boolean(colModel[i].width) ? 'width: '+ colModel[i].width +'px;' : '';
					}

					_this.bstyle[i] = width + height + hidden + align;
					break;
				}
			}
		},

		getGridParam:function () {
			var _this = this;
			return _this.options;
		},

		// 统计数值
		_totalColNum: function(isTotalChecked,rowDatas){
			var _this = this
				, totalMap = {}
				, selectedInfo
				, columnNames;
			if(_this.options.footerShowColName){
				columnNames = _this.options.footerShowColName
			}else{
				columnNames = _this.options.colModel.map(function(elem) {
					if(!elem.formatOption){
						return elem.name;
					}else if(typeof elem.formatOption == 'function'){
						return elem.name;
					}
				});
			}

			if(isTotalChecked){
				selectedInfo = _this.getGridRowDataBySelected();
			}else if(rowDatas !== undefined){
				selectedInfo = rowDatas;
			}else {
				selectedInfo = _this.getGridRowDatas($("#"+_this.ElmId));
			}
			if(selectedInfo.length != 0){
				for(var x = 0; x < columnNames.length; x++){
					var totalCache = 0;

					if(columnNames[x] != undefined){
						var isNumber = false;

						$.each(selectedInfo, function(idx, ele) {
							if(ele["rowState"] != 2 && ele[columnNames[x]] != undefined && typeof Number($.trim(ele[columnNames[x]])) == 'number'){
								totalCache += Number($.trim(ele[columnNames[x]]));
								isNumber = true;
							}
						});
						totalMap[columnNames[x]] = isNumber ? totalCache : null;
					}
				}
			}else if(_this.options.multiboxShow){
				_this.setFootRowValue('none');
			}
			_this.setFootRowValue(totalMap);
			_this.totalMap = totalMap;
		},

		// 设置表尾统计值
		setFootRowValue: function(totalMap){
			var _this = this
				, $tds = $(_this._tableFootSelector).find('td');

			_this._verifyParam(totalMap);
			if(totalMap === 'none')
				$tds.text('');
			else{
				$tds.each(function(index, el) {
					var $this = $(this)
						, columnName = $this.attr('data-column')
						, totalToCol = totalMap[columnName]
						, totalToFix;

					if(typeof totalToCol == 'number' || typeof totalToCol =='object'){
						totalToFix = _this._formatColumnVal(columnName, totalToCol);
						$this.text(totalToFix == '' ? "0.00" : totalToFix);
					}else if($.inArray(columnName,_this.options.footerShowColName) !== -1){
						$this.text("0.00");
					}
				});
			}
		},

		// 设置选中行
		setSelectionRow: function(Ids, isChecked){
			var _this = this
				, $_tableBodySelector = $(_this._tableBodySelector);

			if($.trim(Ids) == ""){return;}
			if(typeof Ids === 'string')
				Ids = Ids.split(' ');
			var idsArray = [] ;
			for(var x = 0; x < Ids.length; x++){
				idsArray.push("[data-id='"+Ids[x]+"']");
				// $_tableBodySelector.find('input[data-id='+ Ids[x] +']').prop('checked', isChecked);
				// isChecked ? _this.selectedByIds.push(Ids[x]) : _this.selectedByIds.remove(Ids[x]);
			}
			var idsStr = idsArray.join(",");
			$_tableBodySelector.find("input"+idsStr+"").prop('checked', isChecked);
			_this._totalColNum(true);
		},

		// 全选按钮事件
		_allCheckedEvent: function(){
			var _this = this;

			$('#' + _this.allCheckBtn).on('click.quickGrid', function(){
				var isChecked = $(this).is(':checked'),
					inputList = $(_this._tableBodySelector).find('td input[type=checkbox]');

				inputList.prop('checked', isChecked);

				if(isChecked){
					// if(!getTotlColNum){
					_this._totalColNum();
					//     getTotlColNum = _this.getTotalColNum();
					// }else{
					//     _this.setFootRowValue(getTotlColNum);
					// }
				}else{
					_this.setFootRowValue('none');
				}
			})
		},

		// 清空Grid
		cleanGridRow: function(){
			var _this = this;

			$(_this._tableBodySelector).find('#' + this.ElmId).html('');
			_this.gridDataInfo = [];
			// _this.selectedByIds = [];
			if(_this.options.multiboxShow){
				$('#' + _this.allCheckBtn).attr('checked', false);
			}
		},

		// 根据ID删除指定行数据，会刷新并修改全局缓存数据（后期可用删除节点优化性能）
		deleteGridRowDataByIds: function(Ids){
			var _this = this
				, dataInfos = _this.gridDataInfo;

			if(typeof Ids === 'string')
				Ids = Array.prototype.slice.call(arguments);
			for(var x in Ids){
				if(Ids.hasOwnProperty(x)){
					for(var y = 0; y < dataInfos.length; y++){
						if(Ids[x] == dataInfos[y].id){
							dataInfos.splice(x, 1);
							break;
						}
					}
				}
			}
			_this.gridDataInfo = dataInfos;
			_this.reloadGrid();
		},

		/**
		 * 行数据赋值
		 * @param rowId
		 * @param rowData
		 */
		setGridRowData:function (rowId,rowData) {
			var _this = this,
				colModels = _this.options.colModel;

			for (var x = 0; x < colModels.length; x++) {
				var columnName = colModels[x].name;
				if (rowData && rowData[columnName] !== undefined) {
					_this.setGridCell(rowId, columnName, rowData[columnName]);
				}
			}
		},

		// 设置单元格具体值
		setGridCell: function(rowId, columnName, val){
			var _this = this
				, text = _this._formatColumnVal(columnName, val),
				$td = $(_this._tableBodySelector).find('tr[id='+ rowId +']').find('td[data-name='+ columnName +']');

			$td.text(text);
			$td.attr("data-unformatvalue", val);
			if(!isNaN(Number(val))){
				if(Number(val)<0){
					$td.addClass("negative-cell");
				}else{
					$td.removeClass("negative-cell");
				}
			}
			$.each(_this.gridDataInfo, function(k, v){
				if(v.id == rowId){
					v[columnName] = val;
					return false;
				}
			});
		},

		/**
		 * 根据行Id 和 列名 获取单元格元素
		 * @param rowId 行Id
		 * @param colName 列名
		 * @returns {*|HTMLElement}
		 */
		getGridCellElement: function (rowId, colName) {
			var _this = this,
				$cellElm = $('td[data-name="' + colName + '"]', $('#' + rowId, $(_this._tableBodySelector)));
			if ($cellElm && $cellElm.length > 0) {
				return $cellElm[0];
			} else {
				return null;
			}
		},

		// 设置格式化映射
		_setFormatColumnMap: function(){
			var _this = this
				, colModels = _this.options.colModel
				, formatColumnConfigMap = {};

			// 存储格式化配置映射
			for(var x = 0; x < colModels.length; x++){
				formatColumnConfigMap[colModels[x].name] = (colModels[x].formatOption || null);
			}
			_this.formatColumnConfigMap = formatColumnConfigMap;
		},

		// 格式化列数据
		_formatColumnVal: function(column, val, rowData){
			var _this = this
				, formatVal
				, format = _this.formatColumnConfigMap[column];

			if(format && typeof format == 'object' && format.typeEnum){
				formatVal = format.typeEnum[val] || val;
			}else if(format && typeof format == 'function'){
				formatVal = format.call(_this, val,rowData);
			}else{
				formatVal = val;
			}
			return formatVal;
		},

		// 自适应宽度控制
		resizeWidth: function(){
			var _this = this;

			$(window).resize(function() {
				var diffWidth = $(_this.ElmParent).outerWidth();

				$(_this.ElmBox).css('width', diffWidth);
				$( _this._tableFootSelector).css('width', diffWidth);
				$(_this._tableHeadSelector + ', ' + _this._tableBodySelector ).css('width', Number(diffWidth) + 2);
				$(_this.ElmBox + ' .qgbox-htable' + ', ' + _this.ElmBox + ' .qgbox-ftable').css('width', diffWidth - 15);
				$(_this.ElmBox + ' .qgbox-btable').css('width', diffWidth - 15);
			});
		},
		/**
		 * 重置宽度方法
		 *  modify by luocj 20171027
		 */
		resetWidth: function(){
			var _this = this;
			var diffWidth = $(_this.ElmParent).outerWidth(),
				height;

			$(_this.ElmBox).css('width', diffWidth);
			$( _this._tableFootSelector).css('width', diffWidth);
			$(_this._tableHeadSelector + ', ' + _this._tableBodySelector ).css('width', Number(diffWidth) + 2 );
			$(_this.ElmBox + ' .qgbox-htable' + ', ' + _this.ElmBox + ' .qgbox-ftable').css('width', diffWidth - 15);
			$(_this.ElmBox + ' .qgbox-btable').css('width', diffWidth - 15);
			height = $(_this.ElmBox + ' .qgbox-btable').height();
			if (height < 200) {
				$(_this._tableBodySelector).css('height', height);
			}

		},

		setOption: function(customOption){
			var newOptions = $.extend(true, {}, this.options , customOption);
			this.options = newOptions;
		},

		customAction : function ($grid , colModel, rowData,rowId) {
			if (!$.isEmptyObject(colModel.customAction) && rowId) {
				var _this = this,
					actionKey,
					action,
					actionTitle,
					actionHtml = "",
					clickStr,
					hidden,
					visibleStyle;

				//新增列,编辑列,删除列
				for (actionKey in colModel.customAction) {
					action = colModel.customAction[actionKey];
					clickStr = "";
					actionTitle = "";

					if (action) {
						hidden = $.isFunction(action.hidden) ? action.hidden.call($grid, rowId, rowData) : action.hidden;
						visibleStyle = hidden ? "display: none;" : "";

						//自定义渲染
						if ($.isFunction(action.onRendering)) {
							actionHtml += "<span ";
							if (hidden) {
								actionHtml += " style=\"" + visibleStyle + "\" "
							}
							actionHtml += "id=\"" + actionKey + rowId + "\">" + action.onRendering.call($grid, rowId, rowData) + "</span>";
						} else {
							actionTitle = action.title || "";

							if (actionKey == "add" && !actionTitle) {
								actionTitle = "ADD";
							}
							if (actionKey == "edit" && !actionTitle) {
								actionTitle = "Edit";
							}
							if (actionKey == "delete" && !actionTitle) {
								actionTitle = "Delete";
							}

							if (action["functionName"]) {
								clickStr += action["functionName"] + "(\'" + rowId + "\')";
							}


							//2.取样式
							actionHtml += _this._format("<span class='sj-operate-s sj-icon-{0}' title='{1}' style='{2}' onclick=" + clickStr + "></span>", actionKey, actionTitle, visibleStyle);
						}
					}
				}
				return actionHtml
			}
		},

		_format : function(format){ //jqgformat
			var args = $.makeArray(arguments).slice(1);
			if(format==null) { format = ""; }
			return format.replace(/\{(\d+)\}/g, function(m, i){
				return args[i];
			});
		}
	};

	// 私有底层处理方法
	$.quickGrid._privateFunc = {
		// 数组删除
		_deleteById: function(){
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
		},

		// 排序
		_sortList: function(desc, name, minor){
			var sortType = desc.toLowerCase();

			return function(o, p){
				var a, b;

				if (o && p && typeof o === 'object' && typeof p === 'object') {
					a = $(o).find('td[data-name='+name+']').data('unformatvalue') || o[name] || o;
					b = $(p).find('td[data-name='+name+']').data('unformatvalue') || p[name] || p;

					if (a === b) {
						return typeof minor === 'function' ? minor(o, p): 0;
					}

					if (typeof a === typeof b) {
						if (sortType == "asc") {
							return a < b ? -1 : 1;
						} else if(sortType == "desc") {
							return a > b ? -1 : 1;
						}
					}

					if (sortType == "desc") {
						return typeof a < typeof b ? -1 : 1;
					} else if(sortType == "asc") {
						return typeof a > typeof b ? -1 : 1;
					}
				}else{
					throw ("error");
				}
			}
		}
	};

	// 默认配置参数
	$.quickGrid.defaults = {
		url: null,                  // 请求数据地址，
		ajaxOptions: {},            // ajax请求额外配置，可空
		dataType: "local",          // 数据获取方式，本地数据时候需要填写
		localData: null,            // 本地数据
		colModel: [],               // 列设置，支持：name、label、sortable、width、align、hidden属性, 以及formatOption，此属性支持键值对(typeEnum为必要关键字)和return方法函数
		autoWidth: true,            // 用于不出现滚动条自动设置列宽
		footerRow: true,            // 是否显示表尾，主要用于统计选中金额
		footerShowColName: null,    // 要显示金额的具体列设置，空值为显示全部
		firstRunNum: 0,             // 第一次加载Grid显示数据数目，默认显示全部
		onceRunNum: 0,              // 每次滚动加载显示行数目（待开发）
		gridHeight: 200,            // 表格滚动主体高度
		onSelectGridRow: $.noop(),   // 选中后触发callback事件
		tdHeight:0,                  //表身的td高度，0为自适应
		multiboxShow:true,            //是否开启checkbox
		loading:false,             //是否开启等待条
		nullTrimEmpty:false         //数字空值是否显示为空（只针对currencyExt有效）
	};
})(jQuery, window, document);