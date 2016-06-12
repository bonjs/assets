/**
 *author: spq 
 */
Ext.define('js.module.UserList', {
	extend: 'core.DataViewVdt',
	renderTo: 'c1',
	url: 'json/userList.json',
	template : [
		'<div style="border: 1px red solid">',
			'<div>title: {title}</div>',
			'<for users="u">',
				'<ul>',
					'<li>{u.name}</li>',
					'<li>{u.sex}</li>',
					'<li>{u.desc}</li>',
				'</ul>',
			'</for>',
		'</div>'
	],
	data: {
		title: '',
		users: []
	},
	constructor: function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		this.on('load', function(data) {
			this.data = {
				title: '这是标题',
				users:data
			};
		});
	}
});
