/**
 *author: spq 
 */
// 组件
Ext.define('core.Component', {
	extend : 'core.Observable',
	//requires: ['core.XTemplate'],
	requires: ['core.RoleMap'],
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

		//if (this.renderTo) {
			this.render(this.renderTo);
			delete this.renderTo;
		//}
	},

	render : function(container, position) {
		if (this.fireEvent('beforerender') === false) {
			return;
		}
		
		this.el = document.createElement('div');
		this.el.setAttribute('widget', this.$className);
		
		this.onRender(container, position);
		
		this.initRoles();

		this.fireEvent('render');

		this.afterRender();

		this.fireEvent('afterrender');
	},
	onRender : function(container, position) {
		
		this.template = this.template.constructor == Array ? this.template.join('') : this.template;
		this.template = this.substitute(this.template, this.data);
		
		this.el.innerHTML = this.template;
	
		if(container == undefined) {
			return;
		}
	
		if(container.constructor == String) {
			this.container = document.getElementById(container);
		} else {
			this.container = $(container)[0];
		}
		
		this.container.appendChild(this.el);
	},
	
	initRoles: function() {
		var me = this;
		
		this.roles = new core.RoleMap(),
		$('*[data-role]', this.el).each(function(i, dom) {
			//me.roles[dom['data-role']] = dom;
			me.roles.set(dom['data-role'], dom);
		});
	},
	
	substitute: function(html, data) {
		var reg = /\{([^\}]+)\}/g; ///\{([\w-]+)\}/g;	
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
			$(this.el).remove();
		}
		this.el = undefined;
		this.template = undefined;
		this.container = undefined;
	},
	onDestroy: function() {
		//throw new error("抽象类必须被重写");
	},
	getId: function() {	// 获取一个唯一标识  形如 js.module.UserListWay-kipt646o
		return [
			this.$className,
			'-',
			Math.random().toString(36).slice(2, 10)
		].join('');
	}
	
});
