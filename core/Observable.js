/**
 *author: spq 
 */
// 事件处理
Ext.define('core.Observable', {
	requires : 'core.Event',
	filterOptRe : /^(?:scope|delay|buffer|single)$/,
	
	constructor : function(config) {
		var me = this, e = me.events;
		me.events = e || {};
	},

	fireEvent : function() {
		var a = Array.prototype.slice.call(arguments, 0), ename = a[0].toLowerCase(), me = this, ret = true, ce = me.events[ename], cc, q, c;
		if (me.eventsSuspended === true) {
			if ( q = me.eventQueue) {
				q.push(a);
			}
		} else if ( typeof ce == 'object') {
			if (ce.bubble) {
				if (ce.fire.apply(ce, a.slice(1)) === false) {
					return false;
				}
				c = me.getBubbleTarget && me.getBubbleTarget();
				if (c && c.enableBubble) {
					cc = c.events[ename];
					if (!cc || typeof cc != 'object' || !cc.bubble) {
						c.enableBubble(ename);
					}
					return c.fireEvent.apply(c, a);
				}
			} else {
				a.shift();
				ret = ce.fire.apply(ce, a);
			}
		}
		return ret;
	},

	addListener : function(eventName, fn, scope, o) {
		var me = this, e, oe, isF, ce;
		if ( typeof eventName == 'object') {
			o = eventName;
			for (e in o) {
				oe = o[e];
				if (!me.filterOptRe.test(e)) {
					me.addListener(e, oe.fn || oe, oe.scope || o.scope, oe.fn ? oe : o);
				}
			}
		} else {
			eventName = eventName.toLowerCase();
			ce = me.events[eventName] || true;
			if ( typeof ce == 'boolean') {
				me.events[eventName] = ce = new core.Event(me, eventName);
			}
			ce.addListener(fn, scope, typeof o == 'object' ? o : {});
		}
	},

	removeListener : function(eventName, fn, scope) {
		var ce = this.events[eventName.toLowerCase()];
		if ( typeof ce == 'object') {
			ce.removeListener(fn, scope);
		}
	},

	purgeListeners : function() {
		var events = this.events, evt, key;
		for (key in events) {
			evt = events[key];
			if ( typeof evt == 'object') {
				evt.clearListeners();
			}
		}
	},

	addEvents : function(o) {
		var me = this;
		me.events = me.events || {};
		if ( typeof o == 'string') {
			var a = arguments, i = a.length;
			while (i--) {
				me.events[a[i]] = me.events[a[i]] || true;
			}
		} else {
			Ext.applyIf(me.events, o);
		}
	},

	hasListener : function(eventName) {
		var e = this.events[eventName.toLowerCase()];
		return typeof e == 'object' && e.listeners.length > 0;
	},

	suspendEvents : function(queueSuspended) {
		this.eventsSuspended = true;
		if (queueSuspended && !this.eventQueue) {
			this.eventQueue = [];
		}
	},

	resumeEvents : function() {
		var me = this, queued = me.eventQueue || [];
		me.eventsSuspended = false;
		delete me.eventQueue;
		Ext.each(queued, function(e) {
			me.fireEvent.apply(me, e);
		});
	},
	on : function() {
		this.addListener.apply(this, arguments);
	},
	un : function() {
		this.removeListener.apply(this, arguments);
	}
});
