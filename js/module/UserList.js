/**
 *author: spq
 */
Ext.define('js.module.UserList', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	url : 'json/userList.json',
	template : [
		'<div class="title">用户列表 - 共{count}条</div>', 
		'<each users="u">', 
			'<ul>', 
				'<li>{u.name}</li>', 
				'<li>{u.sex}</li>', 
				'<li>{u.desc}</li>', 
			'</ul>', 
		'</each>', 
		'<button>刷新</button>',
	],
	data : {
		title : '',
		count: '',
		users : []
	},
	constructor : function() {
		var me = this;
		console.log('UserList 初始化');
		this.callParent(arguments);
		this.on('load', function(data) {// load之前可对返回的数据进行修改
			this.data = {
				count: data.length,
				users : data
			};
		});
		
		$('button', this.el).click(function() {
			me.load('json/userList2.json');
		});
	}
});
