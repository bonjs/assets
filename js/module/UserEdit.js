/**
 *author: spq 
 */
Ext.define('js.module.UserEdit', {
	extend: 'core.DataViewVdt',
	renderTo: 'c1',
	template: [
		'<form>',
			'<div class="title">编辑用户</div>',
			'<div>',
				'<ul>',
					'<li>',
						'<label>name:</label><input name="name" value={name} />',
					'</li>',
					'<li>',
						'<label>sex:</label><input name="sex" value={sex} />',
					'</li>',
					'<li>',
						'<label>desc:</label><input name="desc" value={desc} />',
					'</li>',
				'</ul>',
				'<button>提交</button>',
			'</div>',
		'</form>',
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
		var me = this;
		
		var form = $('form', this.el);
		$('button', this.el).click(function(e) {
			e.preventDefault();
			
			var d = me.getFormData(form);
			alert('提交 ' + JSON.stringify(d));
		});
	},
	getFormData: function(form) {
		var s = $(form).serialize();
		var o = {};
		s.split('&').forEach(function(item, i) {
			var it = item.split('=');
			o[it[0]] = it[1];
		});
		return o;
	}
});
