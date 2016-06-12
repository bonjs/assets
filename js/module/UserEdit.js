/**
 *author: spq 
 */
Ext.define('js.module.UserEdit', {
	extend: 'core.DataViewVdt',
	renderTo: 'c1',
	template: [
		'<div>',
			'<ul>',
				'<li>',
					'name:<input name="name" value={name} />',
				'</li>',
				'<li>',
					'sex:<input name="sex" value={sex} />',
				'</li>',
				'<li>',
					'desc:<input name="desc" value={desc} />',
				'</li>',
			'</ul>',
			'<button>提交</button>',
		'</div>'
	],
	url: 'json/userDetail.json',
	data: {
		name: '',
		sex: '',
		desc: ''
	},
	constructor: function() {
		console.log('UserEdit 初始化');
		this.super(arguments);
		
		$('button', this.el).click(function() {
			alert('click')
		})
	}
});
