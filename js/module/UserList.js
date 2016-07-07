/**
 *author: spq
 */
Ext.define('js.module.UserList', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	url : 'json/userList.json',
	//template: document.getElementById('aa').innerHTML,
	template : [
		'<div class="title">{name} 用户列表 - 共{users.length}条</div>', 
		'<div>',
			'<each users="u">', 
				'<ul>',
					'<li>{u.name}</li>', 
					'<li>{u.sex}</li>', 
					'<li>{u.desc}</li>', 
				'</ul>', 
			'</each>',
		'</div>',
		'<button>刷新</button>',
		/**
		 * 使用循环的会把同级加的事件给冲到, 所以不要把循环和添加事件的dom放在一级,可把循环把进一个dom中解决
		 */
	],
	data : {
		users : [],
		name: '哈哈'
	},
	constructor : function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		
		this.on('load', function(data) {
			this.data.users = data;;
		});
		
		$('button', this.el).click(function() {
			me.load('json/userList2.json');
		});
		
	}
});
