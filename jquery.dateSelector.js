$.fn.dateSelector = function() {
	var me = this;
	var collapseModule = function() {
		var html = [
			'<div class="collapse hide">',
				'<div class="left">',
					'<ul><li class="prev arrows">◀</li><li class="next arrows">▶</li></ul>',
					'<div class="year"></div>',
				'</div>',
				'<div class="month"></div>',
				'<div class="close">&times;</div>',
			'</div>'
		].join('');
		
		var collapse = $(html); 
		collapse.css({
			left: me.offset().left,
			top: me.offset().top + me.outerHeight()
		});
		
		collapse.on('click', '.close', function() {
			collapse.addClass('hide');
		});
		
		$(document.body).append(collapse);
		return {
			collapse: collapse
		};
	}();
	
	var date = new Date();
	
	// 年份模块 
	var yearModule = function() {
		var collapse = collapseModule.collapse;
		var year = date.getFullYear();
		// 初始化左侧年份
		var activateIndex = 0;	// 当前的显示第几个tab
		
		var yearDiv = $('.left div.year', collapse);
		for(var i = 0; i < 4; i ++) {
			var ul = $('<ul />').addClass('hide');
			
			i == 0 && ul.removeClass('hide');
			yearDiv.append(ul);
			for(var y = 0; y < 8; y ++) {
				ul.append('<li>' + (year --) + '</li>');
			}
		}
		collapse.on('click', '.next', function() {
			activateIndex >= 3 || step(++ activateIndex);
		});
		
		collapse.on('click', '.prev', function() {
			activateIndex <= 0 || step(-- activateIndex);
		});
		
		collapse.on('click', 'div.year li', function(a, b) {	// 点击年时, 年的样式更改
			collapse.find('div.year li').removeClass('collapse-li-select');
			$(this).addClass('collapse-li-select');
			
			monthModule.showMonth();
		});
		
		function step(index) {
			$('.collapse .year ul').addClass('hide');
			$('.collapse .year ul:eq(' + index + ')').removeClass('hide');
			activateIndex = index;
		}
		return {
			activateIndex: activateIndex,
			step: step,
			getValue: function() {
				return yearDiv.find('ul li.collapse-li-select').html();
			},
			setValue: function(year) {
				var tabIndex = parseInt((date.getFullYear() - year) / 8);
				this.step(tabIndex);
				
				var years = collapse.find('.year ul').eq(activateIndex).children();
				years.each(function(i, it) {
					if($(it).html() == year) {
						$(it).addClass('collapse-li-select');
					} else {
						$(it).removeClass('collapse-li-select');
					}
				});
			}
		};
	}();
	
	// 月份模块
	var monthModule = function() {
		
		var collapse = collapseModule.collapse;
		var months = $('<ul />');
		for(var i = 1; i <= 12; i ++) {
			var m = $('<li />').attr('month', i < 10 ? '0' + i : i).html(i + '月');
			months.append(m);
			$('div.month', collapse).append(months);
		}
		collapse.on('click', 'div.month li', function(a, b) {
			collapse.find('div.month li').removeClass('collapse-li-select');
			$(this).addClass('collapse-li-select');
			
			me.val(yearModule.getValue() + '-' + monthModule.getValue());
			collapse.addClass('hide');
		});
		
		return {
			showMonth: function() {		//根据是否是今年来决定是否显示所有的月份
				if(yearModule.getValue() == date.getFullYear()) {
					collapse.find('.month li:gt(' + date.getMonth() + ')').addClass('hide');
				} else {
					collapse.find('.month li').removeClass('hide');
				}
				collapse.find('.month li').removeClass('collapse-li-select');
			},
			setValue: function(month) {
				months.children().each(function(i, it) {
					if($(it).attr('month') == month) {
						$(it).addClass('collapse-li-select');
					} else {
						$(it).removeClass('collapse-li-select');
					}
				});
			},
			getValue: function() {
				return months.find('li.collapse-li-select').attr('month');
			}
		};
	}();

	this.on({
		focus: function() {
			collapseModule.collapse.removeClass('hide');
		}
	});
	
	if(me.val() == '') {
		yearModule.setValue(date.getFullYear());
		monthModule.setValue(date.getMonth());
	}
	
	if(/^\d{4}-\d{2}$/.test(me.val())) {
		var arr = me.val().split('-');
		var year = arr[0];
		var month = arr[1];

		yearModule.setValue(year);
		monthModule.setValue(month);
	}
};