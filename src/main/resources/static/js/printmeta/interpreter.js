var printmetaInterpreter_context = new Jsonix.Context([printmeta]);
var printmetaInterpreter_unmarshaller = printmetaInterpreter_context.createUnmarshaller();
var printmetaInterpreter_cacheDynamicMeta = null;
var printmetaInterpreter_expressionCache = {};

/**
 * 解析模型时所用的执行环境,
 * 就两个接口,put,get
 * ======================
 * 现在没用到
 * ======================
 * @constructor
 */
function PrintmetaEnv() {
    var self = this;
    self.values = {};
}

PrintmetaEnv.prototype.put = function(key, value){
    var self = this;
    self.values[key] = value;
}

PrintmetaEnv.prototype.get = function(key){
    var self = this;
    return self.values[key];
}

/**
 * 解析模型中 forEach 标签块时,所用的执行环境,
 * 由于 <forEach var="" varStatus="" items=""> 标签块会产生局变变量,例如 var, varStatus,
 * 因此需要一个嵌套的执行环境,来存放 var,varStatus 等局部值,
 * 嵌套环境有一个 outer 私有变量,指向外部环境,
 * ======================
 * 现在没用到
 * ======================
 * @constructor
 */
function PrintmetaNestedEnv(env) {
    var self = this;
    self.values = {};
    self.outer = env;
}

PrintmetaNestedEnv.prototype.setOuter = function(env) {
    var self = this;
    self.outer = env;
}

/**
 * 先从自身的 values 中取值,取不到时,再从 outer 中取值,
 * @param key
 * @returns {string|*|null}
 */
PrintmetaNestedEnv.prototype.get = function(key) {
    var self = this;
    var value = self.values[key];
    if (!value && self.outer) {
        return self.outer.get(key);
    }
    return value;
}

/**
 * 往自身的 values 中赋值
 * @param key
 * @param value
 */
PrintmetaNestedEnv.prototype.putNew = function(key, value) {
    var self = this;
    self.values[key] = value;
}

/**
 * 先找出包含 key 的环境,这一级没找到时,就往上查找,
 * 给包含这个 key 的那个环境设值
 * 找不到环境时,用当前的环境来赋值,
 * @param key
 * @param value
 */
PrintmetaNestedEnv.prototype.put = function(key, value) {
    var self = this;
    var env = self.where(key);
    if (!env) {
        env = self;
    }
    if (env.putNew) {
        env.putNew(key, value);
    } else {
        // 没有 putNew,为顶级的 env
        env.put(key, value);
    }
}

/**
 * 找出包含 key 的环境,
 * @param key
 * @returns {*}
 */
PrintmetaNestedEnv.prototype.where = function(key) {
    var self = this;
    if (self.values[key]) {
        return self;
    } else if (!self.outer) {
        return null;
    } else {
        if (self.outer.where) {
            return self.outer.where(key);
        } else {
            // 没有 where 的 env, 为顶级 env,
            if (self.outer.get(key)) {
                return self.outer;
            }
            return null;
        }
    }
}

/**
 * spring el 表达式解析类
 * =====================
 * 弃用,由于 spring el 在后台 java 端,对 map 的访问只能用中括号,而不能用通用的点语法,因此,改成用 js 充当表达式解析
 * =====================
 */
/*
function PrintmetaExpressionEvaluator(){
    var self = this;
    self.StandardContext = spel2js.StandardContext;
    self.SpelExpressionEvaluator = spel2js.SpelExpressionEvaluator;
    var authentication = {};
    var principal = {};
    self.spelContext = self.StandardContext.create(authentication, principal);
}
*/

/**
 * 表达式解析
 * =====================
 * 弃用,由于 spring el 在后台 java 端,对 map 的访问只能用中括号,而不能用通用的点语法,因此,改成用 js 充当表达式解析
 * =====================
 * @param expression
 * @param env
 * @returns {*}
 */
/*
PrintmetaExpressionEvaluator.prototype.eval = function(expression, env) {
    var self = this;
	// printmetaInterpreter_expressionCache
	if (!printmetaInterpreter_expressionCache[expression]) {
		printmetaInterpreter_expressionCache[expression] = self.SpelExpressionEvaluator.compile(expression);
	}
    // var compiledExpression = self.SpelExpressionEvaluator.compile(expression);
	var compiledExpression = printmetaInterpreter_expressionCache[expression];

	var result = compiledExpression.eval(self.spelContext, env);
    return result;
}
*/

/**
 * 表达式解析,采用js方式,
 * @constructor
 */
function PrintmetaExpressionEvaluator(){

}

/**
 * 表达式解析,采用js方式,
 * 在 for 循环中,给变量赋值,使其在 expression 中可以访问得到,
 * @param expression
 * @param env
 */
PrintmetaExpressionEvaluator.prototype.eval = function(expression, env) {
	if (expression === "") {
		return "";
	}
	for (var printmetaInterpreter_item in env) {
		if (printmetaInterpreter_item && printmetaInterpreter_item == "printmeta_outer") {// // 外部环境变量不需要拼到环境中,
			continue;
		}
		eval("var " + printmetaInterpreter_item + " = env[printmetaInterpreter_item];");
	}
	try {
		return eval(expression);
	} catch (ex) {
		console.error("error expression:" + expression);
		throw ex;
	}
}

/**
 * 解释器,将 xml 映射后的 object
 1.解释所有的 if,forEach,set 等动态标签,解释所有的spring el 表达式,取得 xml,
 2.解释所有的 xml 元素,取得 html
 */
function PrintmetaInterpreter(){}

/**
 * 1.解释所有的 if,forEach,set 等动态标签,解释所有的spring el 表达式,取得 xml,
 */
PrintmetaInterpreter.prototype.runDynamicElement = function(metaObj, env){
    var evalFactory = new EvalFactory();
    var expressionEvaluator = new PrintmetaExpressionEvaluator();
    var evalImplment = evalFactory.routeEval(metaObj);
    if (!env) {
        env = {};
    }
    var result = evalImplment.evalDynamicElement(metaObj, env, expressionEvaluator);
    return result;
}

/**
 * 1.解释所有的 if,forEach,set 等动态标签,解释所有的spring el 表达式,取得 xml,
 */
PrintmetaInterpreter.prototype.unmarshallerAndRunDynamicElement = function(metaString, env){
    var self = this;
    if (!printmetaInterpreter_cacheDynamicMeta) {
		var metaObj = printmetaInterpreter_unmarshaller.unmarshalString(metaString);
		printmetaInterpreter_cacheDynamicMeta = metaObj;
	} else {
    	console.log("use cache");
	}
	return self.runDynamicElement(printmetaInterpreter_cacheDynamicMeta, env);
    // return self.runDynamicElement(metaObj, env);
}

/**
 * 2.将 xml 元素解析并输出 html,
 */
PrintmetaInterpreter.prototype.runToHtml = function(metaObj, env){
    var evalFactory = new EvalFactory();
    var evalImplment = evalFactory.routeEval(metaObj);
    if (!env) {
        env = {};
    }
    var result = evalImplment.evalToHtml(metaObj, env);
    return result;
}

/**
 * 2. 动态标签解析,并且 spring el 属性赋值后,输出 html 内容,
 * @param metaString
 * @param env
 */
PrintmetaInterpreter.prototype.unmarshallerAndRunToHtml = function(metaString, env){
    var self = this;
    var metaObj = printmetaInterpreter_unmarshaller.unmarshalString(metaString);
    return self.runToHtml(metaObj, env);
}

/**
 * 传入 xml 格式字符串,解析生成 html
 * @param metaString
 * @param env
 */
PrintmetaInterpreter.prototype.interpreterString = function(metaString, env) {
    var self = this;
    var xmlString = self.unmarshallerAndRunDynamicElement(metaString, env);
    self.unmarshallerAndRunToHtml(xmlString, env);
}


