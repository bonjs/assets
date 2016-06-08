/**
 *author: spq 
 */
// 组件
Ext.define('core.Component', {
	extend : 'core.Observable',
	//requires: ['core.XTemplate'],
	template : '<div></div>',
	data: {},
	constructor : function(config) {
		this.callParent(arguments);
		if (config) {
			Ext.apply(this, config);
		} else {
			config = {};
		}

		if (this.listeners) {
			this.on(this.listeners);
			this.listeners = null;
			//change the value to remove any on prototype
		}

		if (this.renderTo) {
			this.render(this.renderTo);
			delete this.renderTo;
		}
	},

	render : function(container, position) {
		if (this.fireEvent('beforerender') === false) {
			return;
		}
		
		this.el = document.createElement('div');
		this.el.setAttribute('widget', this.$className);
		
		this.onRender(container, position);

		this.fireEvent('render');

		this.afterRender();

		this.fireEvent('afterrender');
	},
	onRender : function(container, position) {
		
		this.template = this.template.constructor == Array ? this.template.join('') : this.template;
		this.template = this.substitute(this.template, this.data);
		console.log(this.template);
		this.el.innerHTML = this.template;

		if (container.constructor == jQuery) {
			this.container = container[0];
		} else if (container instanceof HTMLElement) {
			this.container = container;
		} else if (container.constructor == String) {
			this.container = document.getElementById(container);
		}
		
		this.container.appendChild(this.el);
		
	},
	substitute: function(html, data) {
		var reg = /\{([\w-]+)\}/g;	// /\{([^\}]+)\}/g
		return html.replace(reg, function(el, key) {
			var v = data[key];
			return v === void 0 ? key : v;
		});
	},

	show: function() {
		this.el.forEach(function(e, i) {
			e.style.display = 'block';
		});
		this.fireEvent('show');
	},
	hide: function() {
		Ext.each(function(e, i) {
			e.style.display = 'none';
		});
		this.fireEvent('hide');
	},
	afterRender : function() {
	},
	destroy: function() {
		this.onDestroy();
		if(this.el) {
			$(this.el).children().remove();
		}
		this.el = undefined;
		this.template = undefined;
		this.container = undefined;
	},
	onDestroy: function() {
		//throw new error("抽象类必须被重写");
	}
});
