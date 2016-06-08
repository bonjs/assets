/**
 *author: spq 
 */
Ext.define('js.module.UserWay', {
	extend: 'core.DataViewWay',
	renderTo: 'c1',
	url: 'json/userDetail.json',
	template : [
		'<div>',
			'<ul>',
		   		'<li>{name}</li>',
		   		'<li>{sex}</li>',
		   		'<li>{desc}</li>',
			'</ul>',
		'</div>',
		'<button class=a>提交</button>'
	],
	/*
	data: [
		{name: 'sun', sex: 'm', desc:'fdsafds'},
		{name: 'tom', sex: 'm', desc:'aaas'},
	],*/
	constructor: function() {
		var me = this;
		console.log('UserList 初始化');
		this.super(arguments);
		
		$('button', this.el).click(function() {
			
			me.load('json/userDetail.json');
			
		})
	}
});
