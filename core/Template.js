/**
 *author: spq
 */
// 组件
Ext.define('core.Template', {
	requires : ['core.DomHelper'],
	re : /\{([\w-]+)\}/g,
	statics : {
		from : function(el, config) {
			el = Ext.getDom(el);
			return new core.Template(el.value || el.innerHTML, config || '');
		}
	},
	constructor : function(html) {
		var me = this, a = arguments;

		if (Ext.isArray(html)) {
			//html = html.join("");
			html = getHtml(html);
		} else if (a.length > 1) {
			html = getHtml(a);
		}

		function getHtml(a) {
			var buf = [];
			for (var i = 0, len = a.length; i < len; i++) {
				var v = a[i];
				if ( typeof v == 'object') {
					Ext.apply(me, v);
				} else {
					buf.push(v);
				}
			};
			return buf.join('');
		}


		me.html = html;
		if (me.compiled) {
			me.compile();
		}
	},

	applyTemplate : function(values) {
		var me = this;

		return me.compiled ? me.compiled(values) : me.html.replace(me.re, function(m, name) {
			return values[name] !== undefined ? values[name] : "";
		});
	},

	set : function(html, compile) {
		var me = this;
		me.html = html;
		me.compiled = null;
		return compile ? me.compile() : me;
	},

	compile : function() {
		var me = this, sep = Ext.isGecko ? "+" : ",";

		function fn(m, name) {
			name = "values['" + name + "']";
			return "'" + sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
		}

		eval("this.compiled = function(values){ return " + (Ext.isGecko ? "'" : "['") + me.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) + (Ext.isGecko ? "';};" : "'].join('');};"));
		return me;
	},
	insertFirst : function(el, values, returnElement) {
		return this.doInsert('afterBegin', el, values, returnElement);
	},

	insertBefore : function(el, values, returnElement) {
		return this.doInsert('beforeBegin', el, values, returnElement);
	},
	insertAfter : function(el, values, returnElement) {
		return this.doInsert('afterEnd', el, values, returnElement);
	},

	append : function(el, values, returnElement) {
		return this.doInsert('beforeEnd', el, values, returnElement);
	},

	doInsert : function(where, el, values, returnEl) {
		el = Ext.getDom(el);
		var newNode = core.DomHelper.insertHtml(where, el, this.applyTemplate(values));
		return returnEl ? Ext.get(newNode, true) : newNode;
	},
	overwrite : function(el, values, returnElement) {
		el = Ext.getDom(el);
		el.innerHTML = this.applyTemplate(values);
		return returnElement ? Ext.get(el.firstChild, true) : el.firstChild;
	},
	apply : function(values) {
		this.applyTemplate.call(this, values);
	}
});

