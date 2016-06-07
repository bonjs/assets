/**
 *author: spq 
 */
// 路由
Ext.define('js.MainRouter', {
	
	lastComponent: {},
	activeComponent: {},
	doRouter: function(modulName) {
		var lc = this.lastComponent;
		lc = this.activeComponent;	// 记录上个组件，然后销毁掉
		this.activeComponent = Ext.create(modulName);
		
		if(lc instanceof core.Component) {
			lc.destroy();
		}
		lc = undefined;
	},
	// 构造方法
	constructor : function() {
		var me = this;
		this.callParent(arguments);
		
		var routes = {
			'/user': function() {
				me.doRouter('js.module.User');
			},
			'/dog': function(id) {
				me.doRouter('js.module.Dog');
			},
			'/userList': function(id) {
				me.doRouter('js.module.UserList');
			}
		};
		
		Router(routes).init();
	}
});
