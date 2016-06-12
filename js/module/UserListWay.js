/**
 *author: spq 
 */
Ext.define('js.module.UserListWay', {
	extend: 'core.DataViewWay',
	renderTo: 'c1',
	url: 'json/userList.json',
	template : [
		'<repeat>',
			'<ul>',
		   		'<li>{name}</li>',
		   		'<li>{sex}</li>',
		   		'<li>{desc}</li>',
			'</ul>',
		'</repeat>',
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
			
			
			me.load([
							{"name": "sun", "sex": "m", "desc":"fdsafds"},
							{"name": "tom", "sex": "m", "desc":"aaas"},
							
							{"name": "测试", "sex": "m", "desc":"aaas"}
						]);
			
		})
	}
});
