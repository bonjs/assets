Ext.define('core.Test', {			// 定义命名空间和类名
	extend: 'core.DataView',		// 继承自的类，如没有定义默认原生js的Object类
	requires: ['core.A'],	// 需要引用的其他类(A.js,B.js在本类初始化前会被加载)
	myName: 'tom',				// 自定义成员属性（成员变量）
	constructor : function() {	// 构造方法
		console.log('test init');
		this.callParent();		// 调用父类方法
		//this.meMethod();		// 调用自定义方法
	},
	myMethod: function() {		// 自定义方法
		
	}
});
