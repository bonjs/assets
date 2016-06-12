/**
 *author: spq 
 */
Ext.define('js.module.Dog', {
	extend: 'core.DataViewVdt',
	// singleton: true,
	renderTo: 'c1',
	url: 'json/dogData.json',
	template: '<div style="border: 1px red solid">dogName: {dogName}</div>',
	data: {dogName: ''},
	constructor: function() {
		console.log('dog 初始化');
		this.super(arguments);
	}
});
