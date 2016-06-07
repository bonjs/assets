/**
 *author: spq 
 */
Ext.define('js.module.UserList', {
	extend: 'core.DataView',
	renderTo: 'c1',
	url: 'json/userList.json',
	template : [
		'<div>',
			'<tpl for=".">',
				'<ul>',
					'<li>{name}</li>',
					'<li>{sex}</li>',
					'<li>{desc}</li>',
				'</ul>',
			'</tpl>',
		'</div>'
	],
	/*
	data: [
		{name: 'sun', sex: 'm', desc:'fdsafds'},
		{name: 'tom', sex: 'm', desc:'aaas'},
	],*/
	constructor: function() {
		var me = this;
		console.log('UserList 初始化');
		this.callParent(arguments);
		console.log($('div[tag=test]', this.el).length);
		
	}
});
