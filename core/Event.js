/**
 *author: spq 
 */
// 事件
Ext.define('core.Event', {
	constructor : function(obj, name) {
		this.name = name;
		this.obj = obj;
		this.listeners = [];
	},
	addListener : function(fn, scope, options) {
		var me = this, l;
		scope = scope || me.obj;
		if (!me.isListening(fn, scope)) {
			l = me.createListener(fn, scope, options);
			if (me.firing) {// if we are currently firing this event, don't disturb the listener loop
				me.listeners = me.listeners.slice(0);
			}
			me.listeners.push(l);
		}
	},

	createListener : function(fn, scope, o) {
		o = o || {}, scope = scope || this.obj;
		var l = {
			fn : fn,
			scope : scope,
			options : o
		}, h = fn;
		if (o.target) {
			h = createTargeted(h, o, scope);
		}
		if (o.delay) {
			h = createDelayed(h, o, l, scope);
		}
		if (o.single) {
			h = createSingle(h, this, fn, scope);
		}
		if (o.buffer) {
			h = createBuffered(h, o, l, scope);
		}
		l.fireFn = h;
		return l;
	},

	findListener : function(fn, scope) {
		var list = this.listeners, i = list.length, l;

		scope = scope || this.obj;
		while (i--) {
			l = list[i];
			if (l) {
				if (l.fn == fn && l.scope == scope) {
					return i;
				}
			}
		}
		return -1;
	},

	isListening : function(fn, scope) {
		return this.findListener(fn, scope) != -1;
	},

	removeListener : function(fn, scope) {
		var index, l, k, me = this, ret = false;
		if (( index = me.findListener(fn, scope)) != -1) {
			if (me.firing) {
				me.listeners = me.listeners.slice(0);
			}
			l = me.listeners[index];
			if (l.task) {
				l.task.cancel();
				delete l.task;
			}
			k = l.tasks && l.tasks.length;
			if (k) {
				while (k--) {
					l.tasks[k].cancel();
				}
				delete l.tasks;
			}
			me.listeners.splice(index, 1);
			ret = true;
		}
		return ret;
	},

	// Iterate to stop any buffered/delayed events
	clearListeners : function() {
		var me = this, l = me.listeners, i = l.length;
		while (i--) {
			me.removeListener(l[i].fn, l[i].scope);
		}
	},

	fire : function() {
		var me = this, listeners = me.listeners, len = listeners.length, i = 0, l;

		if (len > 0) {
			me.firing = true;
			var args = Array.prototype.slice.call(arguments, 0);
			for (; i < len; i++) {
				l = listeners[i];
				if (l && l.fireFn.apply(l.scope || me.obj || window, args) === false) {
					return (me.firing = false);
				}
			}
		}
		me.firing = false;
		return true;
	}
});
