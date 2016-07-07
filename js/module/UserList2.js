/**
 *author: spq
 */
Ext.define('js.module.UserList2', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	//url : 'json/userList.json',
	template : [
		'<div class="title">用户列表 - 共{users.length}条</div>', 
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
		users : [{
			name: 'sun',
			sex: 'm',
			desc: 'fdas'
		}],
	},
	constructor : function() {
		var me = this;
		window.m = this;
		console.log('UserList 初始化');
		this.super(arguments);
		
		$('button', this.el).on('click', function() {
			alert('ok')
			me.vdt.update({
				users : [{}],
			})	
		});
		
	}
});
