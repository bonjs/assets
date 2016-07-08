/**
 *author: spq
 */
Ext.define('js.module.Portal', {
	extend : 'core.DataViewVdt',
	requires: ['js.module.User', 'js.module.UserList'],
	template : [
		'<div>', 
			'<div class="a1 row"></div>', 
			'<div class="a2 row"></div>', 
			'<div class="a3 row"></div>', 
			'<div class="a4 row"></div>', 
		'</div>'
	],
	data : {
		title : '',
		users : []
	},
	constructor : function() {
		this.callParent(arguments);
		
		var user = Ext.create('js.module.User', {
			renderTo: $('.a1')
		});
		var userList = Ext.create('js.module.UserList', {
			renderTo: $('.a2')
		});
		var userEdit = Ext.create('js.module.UserEdit', {
			renderTo: $('.a3')
		});
		var dog = Ext.create('js.module.Dog', {
			renderTo: $('.a4')
		});
	}
});
