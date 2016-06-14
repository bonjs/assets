/**
 *author: spq
 */
Ext.define('js.module.UserList', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	url : 'json/userList.json',
	template : [
		'<div>', 
			'<div class="title">{title} - {count}条</div>', 
			'<each users="u">', 
				'<ul>', 
					'<li>{u.name}</li>', 
					'<li>{u.sex}</li>', 
					'<li>{u.desc}</li>', 
				'</ul>', 
			'</each>', 
			'<button>刷新</button>',
		'</div>'
	],
	data : {
		title : '',
		count: '',
		users : []
	},
	constructor : function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		this.on('load', function(data) {// load之前可对返回的数据进行修改
			this.data = {
				title : '用户列表',
				count: data.length,
				users : data
			};
		});
		
		$('button', this.el).click(function() {
			me.load([{
				"name" : "Sun",
				"sex" : "m",
				"desc" : "fdsafds"
			}, {
				"name" : "tom",
				"sex" : "m",
				"desc" : "aaas"
			}, {
				name : 'fdsafdsafds',
				sex : 'm',
				desc : '魂牵梦萦'
			}, {
				name : '魂牵梦萦',
				sex : 'm',
				desc : '魂牵梦萦'
			}]);
		});
	}
});
