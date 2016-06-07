/**
 *author: spq 
 */
Ext.define('js.module.Dog', {
	extend: 'core.DataView',
	// singleton: true,
	renderTo: 'c1',
	url: 'json/dogData.json',
	template: '<div style="border: 1px red solid">{dogName}</div>',
	data: {dogName: '狗狗'},
	constructor: function() {
		console.log('dog 初始化');
		this.callParent(arguments);
	},
	say: function() {
		console.log('duoduo say');
	}
});
