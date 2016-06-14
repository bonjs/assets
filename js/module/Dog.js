/**
 *author: spq 
 */
Ext.define('js.module.Dog', {
	extend: 'core.DataViewVdt',
	// singleton: true,
	renderTo: 'c1',
	url: 'json/dogData.json',
	template: [
		'<div>',
			'<div class="title">dog信息</div>',
			'<ul>',
				'<li>dog名称:{dogName}</li>',
			'</ul>',
		'</div>'
	],
	data: {dogName: ''},
	constructor: function() {
		console.log('dog 初始化');
		this.super(arguments);
	}
});
