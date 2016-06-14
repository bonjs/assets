/**
 *author: spq
 */
Ext.define('js.module.UserList', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	url : 'json/userList.json',
	template : [
		'<div style="border: 1px red solid">', 
			'<div style="background-color: #066; COLOR: WHITE; PADDING: 3PX">title: {title}</div>', 
			'<for users="u">', 
				'<ul>', 
					'<li>{u.name}</li>', 
					'<li>{u.sex}</li>', 
					'<li>{u.desc}</li>', 
				'</ul>', 
			'</for>', 
			'<button>刷新</button>',
		'</div>'
	],
	data : {
		title : '',
		users : []
	},
	constructor : function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		this.on('load', function(data) {// load之前可对返回的数据进行修改
			this.data = {
				title : '这是标题',
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
				"sex" : "f",
				"desc" : "aaas"
			}, {
				name : '魂牵梦萦',
				sex : '男',
				desc : '魂牵梦萦'
			}, {
				name : '魂牵梦萦',
				sex : '男',
				desc : '魂牵梦萦'
			}]);
		});
	}
});
