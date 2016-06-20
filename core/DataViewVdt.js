/**
 *author: spq 
 */
// 
Ext.define('core.DataViewVdt', {
	extend: 'core.DataView',
	data: {},
	
	onRender: function(container, position) {	// 重写父类
		
		this.widgetId = this.getId();
		
		var tpl = this.template.constructor == Array ? this.template.join('') : this.template;
		tpl = this.getTemplate(tpl);
		this.template = '<div>' + tpl + '</div>';
		
		var vdt = this.vdt = Vdt(this.template);
		
		this.el = vdt.render(this.data);
		this.el.setAttribute('widget', this.$className);
		//this.el.appendChild(vdt.render(this.data));
		
		if (container.constructor == jQuery) {
			this.container = container[0];
		} else if (container instanceof HTMLElement) {
			this.container = container;
		} else if (container.constructor == String) {
			this.container = document.getElementById(container);
		}
		this.container.appendChild(this.el);
		
		if(typeof this.url == 'string') {
			this.load(this.url);	
		}
	},
	
	// 将<for>标签转成vdt的形式
	getTemplate: function(html) {
		return html.replace(/<each[^>]+>/g, function(a, b) {
	   		//var r = a.match(/([^\s=]+)=(['"\s]?)([^'"]+)\2(?=\s|$|>)/);
	   		var r = a.match(/([^\s=]+)=(['"\s]?)([^'"]+)\2(?=\s|$|>)/g);
	   	
	   		var arrVariable = [];
	   		var indexVariable = [];
	   		
	   		for(var i = 0; i < r.length; i ++) {
	   			b = r[i].replace(/[\s|"]/g, '').split('=');
	   			if(b[0] === 'index') {
	   				indexVariable = b;
	   			} else {
	   				arrVariable = b;
	   			}
	   		}
	   		
	   		return ' {' + arrVariable[0] +  '.map(function(' + arrVariable[1] + ', ' + (indexVariable[1] !== undefined ? indexVariable[1] : 'index') + ') { return ';
	   	}).replace(/<\/each>/g, ' })}  ');
	},
	
	load: function(arg0) {
		var me = this;
		if(arg0 == null) {
			return;
		}
		
		if(me.fireEvent('beforeload') === false) {
			return;
		};
		if(arg0.constructor == Object || arg0.constructor == Array) {
			this.data = arg0;
			afterLoad.call(this);
		} else if(arg0.constructor == String) {
			//setTimeout(function() {
				$.getJSON(arg0, {
					_d: new Date().getTime()
				}, function(data) {
					me.data = data;
					afterLoad.call(me);
				});
			//},100);
		}
		
		function afterLoad() {
			this.fireEvent('load', me.data);
			
			this.vdt.update(me.data);
			this.fireEvent('afterload', me.data);
		}
	},
	refresh: function() {
		this.initData();
	}
});


