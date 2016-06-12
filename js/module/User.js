/**
 *author: spq 
 */
Ext.define('js.module.User', {	// 声明类
	extend: 'core.DataView',	// 继承的类，所有的ui组件都继承此类，如不设置则默认继承的Object类
	// singleton: true,
	renderTo: 'c1',				// 渲染到哪个dom，　［jq对象\HTMLElement对象\id字符串］
	url: 'json/userDetail.json',		// 请求后台数据
	template: [					// 对应的HTML结构，　相当于v层
		'<div style="border: 1px red solid">',
			'<ul>',
				'<li>',
					'名称:{name}',
				'</li>',
				'<li>',
					'性别:{sex}',
				'</li>',
				'<li>',
					'描述:{desc}',
				'</li>',
			'</tpl>',
		'</div>',
	],
	data: {					// 如没有设置url, 则数据在此获取, 相当于m层
		name: '曾经年少爱追梦',
		sex: '男',
		desc: '描述'
	},
	listeners: {			// 要监听的事件, 下面两个事件是在父类Component中定义的
		'render': function() {
			console.log('render fire');
		},
		'beforerender': function() {
			console.log('渲染前触发')	; //　
		}
	},
	
	// 构造方法
	constructor : function() {		// 如不重写可以不写
		console.log('user 初始化');
		this.super(arguments);
		
		this.on('say', function() {	// 自定义事件
			console.lgo('say');
		});	
	},
	say : function() {
		console.log('user say');
		this.fireEvent('say');		// 触发事件
	}
});
