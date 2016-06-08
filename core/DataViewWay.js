/**
 *author: spq 
 */
// 
Ext.define('core.DataViewWay', {
	extend: 'core.DataView',
	data: {},
	
	constructor: function() {
		this.super(arguments);
	},
	
	onRender: function(container, position) {	// 重写父类
		
		this.widgetId = this.getId();
		this.template = this.template.constructor == Array ? this.template.join('') : this.template;
		this.template = this.parseTemplate(this.template);
		console.log(this.template);
		
		//this.el.setAttribute('way-scope', this.widgetId);
		
		this.el.innerHTML = this.template;

		if (container.constructor == jQuery) {
			this.container = container[0];
		} else if (container instanceof HTMLElement) {
			this.container = container;
		} else if (container.constructor == String) {
			this.container = document.getElementById(container);
		}
		this.container.appendChild(this.el);
		
		this.initData();
	},
	initData: function() {
		var me = this;
		
		if(typeof this.url == 'string') {
			if(me.fireEvent('beforeload') === false) {
				return;
			};
			$.post(this.url, { }, function(data) {
				afterLoad.call(me, data);
			});
		} else if(this.data) {
			afterLoad.call(me, this.data);
		}
		
		function afterLoad(data) {
			this.fireEvent('load', data);
			
			way.set(this.widgetId, data);
			this.fireEvent('afterload', data);
		}
	},
	parseTemplate: function(html) {
		var me = this;
		var reg = /\>{([\w-]+)\}/g;	// /\{([^\}]+)\}/g
		return html.replace(/<repeat/gi, function(a, b){
			return '<div way-repeat="' + me.widgetId + '"';
		}).replace(/<\/repeat>/gi, function(){
			return '</div>';
		}).replace(reg, function(el, key) {
			return ' way-data="' + key + '">';
		});
	},
	load: function(arg0) {
		if(arg0 == null) {
			return;
		}
		if(arg0.constructor == Object || arg0.constructor == Array) {
			way.set(this.widgetId, arg0);
		} else if(arg0.constructor == String) {
			$.post(arg0, function(data) {
				way.set(this.widgetId, data);
			});	
		}
	},
	refresh: function() {
		this.initData();
	},
	
	getId: function() {	// 获取一个唯一标识  形如 js.module.UserListWay-kipt646o
		return [
			this.$className,
			'-',
			Math.random().toString(36).slice(2, 10)
		].join('');
	}
	
});


