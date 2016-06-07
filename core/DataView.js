/**
 *author: spq 
 */
// 
Ext.define('core.DataView', {
	extend: 'core.Component',
	requires: ['core.XTemplate'],
	data: {},
	url: '',
	
	constructor : function() {
		console.log('DataView init' + this.template);
		var me = this;
		this.callParent(arguments);
		
		this.on('load', function(data) {
			$(this.el).children().remove();
		});
	},
	initData: function() {
		var me = this;
		
		if(this.url) {
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
			this.tpl.append(this.el, data);
			this.container.appendChild(this.el);
			this.fireEvent('afterload', data);
		}
	},
	refresh: function() {
		this.initData();
	},
	onRender: function(container, position) {	// 重写父类
		var me = this;
		
		var tpl = this.tpl = new Ext.create('core.XTemplate', this.template);
		if (container.constructor == jQuery) {
			this.container = container[0];
		} else if (container instanceof HTMLElement) {
			this.container = container;
		} else if (container.constructor == String) {
			this.container = document.getElementById(container);
		}
		
		this.initData();
	}
});


