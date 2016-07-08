/**
 * Created by heyanlong on 16/6/23.
 */
/**
 * Created by heyanlong on 16/6/21.
 */
Ext.define('core.Page', {
    extend: 'core.DataViewVdt',
    per_page: 10,
    total: -1,
    current_page: 1,
    start: 1,
    end: 1,
    totalPage: 0,
    template: [
        '<ul class="pagination">',
        '<li class="disabled Previous"><a class="Previous" href="javascript:;" aria-label="Previous"> <span aria-hidden="true">上一页</span> </a> </li>',
        '<each pageList="page">',
        '<li class="page"><a class="page" href="javascript:;">{page}</a></li>',
        '</each>',
        '<li class="Next">',
        '<a class="Next" href="javascript:;" aria-label="Next">',
        '<span aria-hidden="true">下一页</span></a>',
        '</li>',
        '</ul>'
    ],
    data: {
        "pageList": []
    },
    constructor: function (opt) {

        this.callParent(arguments);
        var me = this;
        this.refreshData();

        $(this.el).on('click', 'a', function () {

            var no = me.current_page;
            if ($(this).hasClass('Next')) {
                if (!$(this).parent('li').hasClass('disabled')) {
                    ++no;
                } else {
                    return false;
                }
            } else if ($(this).hasClass('Previous')) {
                if (!$(this).parent('li').hasClass('disabled')) {
                    --no;
                } else {
                    return false;
                }
            } else if ($(this).hasClass('page')) {
                no = $(this).text();
            }

            me.current_page = parseInt(no);

            me.fireEvent('pageClick', parseInt(no));
        });
    },
    setTotal: function (total) {
        this.total = total;
        this.refreshData();
    },
    refreshData: function () {
        var me = this;
        if (this.total == -1) {
            return false;
        }

        this.totalPage = Math.ceil(this.total / this.per_page);

        if (this.totalPage > 10) {
            // 计算开始渲染的页码
            if (this.current_page >= 7 && (this.current_page + 4) <= this.totalPage) {
                this.start = this.current_page - 5;
                this.end = this.start + 9;
            } else if ((this.current_page + 4) > this.totalPage) {
                this.start = this.totalPage - 9;
                this.end = this.start + 9;
            }
        } else {
            this.end = this.totalPage;
        }

        this.data.pageList = [];

        for (var i = this.start; i <= this.end; i++) {
            this.data.pageList.push(i);
        }


        this.vdt.update(this.data);

        $('li.page').removeClass('active');
        $('li.page > a').each(function (i, v) {
            if (parseInt($(v).text()) == me.current_page) {
                $(v).parent().addClass('active');
                return false;
            }
        });

        if (this.current_page > 1) {
            $('li.Previous', this.el).removeClass('disabled');
        } else {
            $('li.Previous', this.el).addClass('disabled');
        }

        if (this.current_page >= this.totalPage) {
            $('li.Next', this.el).addClass('disabled');
        } else {
            $('li.Next', this.el).removeClass('disabled');
        }

        $('li', this.el).remove('active');
    }
});


