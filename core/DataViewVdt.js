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
		
		if(container == undefined) {
			return;
		}
		
		if(container.constructor == String) {
			this.container = document.getElementById(container);
		} else {
			this.container = $(container)[0];
		}
		
		this.container.appendChild(this.el);
		
		if(typeof this.url == 'string') {
			this.load(this.url);	
		}
	},
	
	// 将<each>标签转成vdt的形式
		/*
	getTemplate: function(html) {
		var reg = /<each([^>]+)>/g;
		return html.replace(reg, function(x, a) {
			var r = /(\w*\.*\w*)+?="(\w*\.*\w*)+?"/g;
			var arr, indexVar, arrVar, itemVar;
			while(arr = r.exec(a)) {
				if(arr[1] == 'index') {
					indexVar = arr[2];
				} else {
					arrVar = arr[1];
					itemVar = arr[2];
				}
			}
			return ' { ' + arrVar + '.map(function(' + itemVar + ', ' + (indexVar !== undefined ? indexVar : 'index') + ') { return ';
		}).replace(/<\/each>/g, ' })}  ').replace(/\n/g, '');
	},	
	*/
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
	   	}).replace(/<\/each>/g, ' })}  ').replace(/\n/g, '');
	},
	
	update: function(data) {	// 局部数据更新(只更新传入的的数据, 没有传入的数据保持原状)
		
	},
	
	// 	清空列表  (将data中的数据清空, 保留function, 数组变成空数组，对象变成空对象，字符串变成空字符串)
	clear: function() {
		var d = this.data;
		for(var k in d) {
			if(d[k] == null) {
				return;
			}
			if(d[k].constructor == Array) {
				d[k] = [];
			} else if(d[k].constructor == Object) {
				d[k] = {};
			} else if(d[k].constructor == String) {
				d[k] = "";
			}
		}
		this.refresh();
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
		this.vdt.update(this.data);
	}
});


