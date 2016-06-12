/**
 *author: spq 
 */
Ext.define('js.module.UserEdit', {
	extend: 'core.DataView',
	renderTo: 'c1',
	template: [
		'<div>',
			'<ul>',
				'<li>',
					'name:<input name=name value="{name}" />',
				'</li>',
				'<li>',
					'sex:<input name=sex value={sex} />',
				'</li>',
				'<li>',
					'desc:<input name=desc value="{desc}" />',
				'</li>',
			'</ul>',
			'<button>提交</button>',
		'</div>'
	],
	url: 'json/userDetail.json',
	data: {
		name: 'sun',
		sex: 'm',
		desc: 'this is description'
	},
	constructor: function() {
		console.log('UserEdit 初始化');
		this.super(arguments);
		
		this.on('afterload', function() {
			$('button').click(function() {
				alert('click')
			})
		});
	}
});
