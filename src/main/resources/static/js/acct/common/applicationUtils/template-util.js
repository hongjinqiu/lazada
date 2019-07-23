

var templateUtil = {
	/**
	 * 通过模板id与模板数据获得模板内容
	 * @param templateId 模板id
	 * @param templateData 模板要用到的数据
	 * @returns {*}
	 */
	getHTML: function (templateId, templateData) {
		var ele = document.getElementById(templateId);
		var content = ele ? (ele.textContent || ele.text).replace(/\r/g, "").replace(/\n/g, "") : "";
		var templateSetting = {
				evaluate: /\[%([\s\S]+?)%\]/g,
				interpolate: /\[%=([\s\S]+?)%\]/g,
				escape: /\[%-([\s\S]+?)%\]/g
			},
			rel;

		try {
			rel = _.template(String(content).replace(/^\s+|\s+$/g, ""), templateData, templateSetting);
		} catch (e) {
			console && console.log(e);
			console.log(e.source);
		}
		return rel;
	}
};