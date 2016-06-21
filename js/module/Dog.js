/**
 *author: spq 
 */
Ext.define('js.module.Dog', {
	extend: 'core.DataViewVdt',
	renderTo: 'c1',
	url: 'json/dogData.json',
	template: [
		'<div class="title">dog信息</div>',
		'<ul>',
			'<li>dog名称:{dogName}</li>',
		'</ul>'
	],
	data: {dogName: ''},
	constructor: function() {
		console.log('dog 初始化');
		this.super(arguments);
	}
});
