/**
 *author: spq
 */
Ext.define('js.module.DyadicArray', {
	extend : 'core.DataViewVdt',
	renderTo : 'c1',
	template : [
		'<div class="title">DyadicArray 二维数组</div>', 
		'<each data="da">', 
			'<div style="border: 1px red solid">',
				'<div>标题</div>',
				'<each da="d">',
					'<li style="border-right:1px blue solid" innerHTML="&emsp;">{d}</li>',
				'</each>',
			'</div>', 
		'</each>',
		'<button>刷新</button>',
	],
	data : {
		data: [
		]
	},
	constructor : function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		this.load({
			data: [
				['a', 'b', 'c'],
				['a', 'b', 'c'],
				['a', 'b', 'c'],
				['a', 'ba', 'c']
			]
		});
	}
});
