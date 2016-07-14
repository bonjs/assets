/**
 *author: spq 
 */
Ext.define('js.module.Dog', {
	extend: 'core.DataViewVdt',
	// singleton: true,
	renderTo: 'c1',
	//url: 'json/dogData.json',
	data: {
		list: [
			{dogName: 'aaa'},
			{dogName: 'aaa'},
			{dogName: 'aaa'},
		]
	},
	template: [
		'<div class="title">dog信息</div>',
		'<ul>',
			'<each list="u">',
				'<li>dog名称:{u.dogName}</li>',
			'</each>',
		'</ul>',
	],
	constructor: function() {
		//console.log('dog 初始化');
		this.callParent(arguments);
	}
});
