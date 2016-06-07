/**
 *author: spq 
 */
// 组件
Ext.define('core.DomHelper', {
	singleton: true,
	constructor: function() {
		var tempTableEl = null,
        emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
        tableRe = /^table|tbody|tr|td$/i,
        confRe = /tag|children|cn|html$/i,
        tableElRe = /td|tr|tbody/i,
        cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
        endRe = /end/i,
        pub,
        // kill repeat to save bytes
        afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

	    // private
	    function doInsert(el, o, returnElement, pos, sibling, append){
	        var newNode = pub.insertHtml(pos, Ext.getDom(el), createHtml(o));
	        return returnElement ? Ext.get(newNode, true) : newNode;
	    }
	
	    // build as innerHTML where available
	    function createHtml(o){
	        var b = '',
	            attr,
	            val,
	            key,
	            keyVal,
	            cn;
	
	        if(typeof o == "string"){
	            b = o;
	        } else if (Ext.isArray(o)) {
	            for (var i=0; i < o.length; i++) {
	                if(o[i]) {
	                    b += createHtml(o[i]);
	                }
	            };
	        } else {
	            b += '<' + (o.tag = o.tag || 'div');
	            for (attr in o) {
	                val = o[attr];
	                if(!confRe.test(attr)){
	                    if (typeof val == "object") {
	                        b += ' ' + attr + '="';
	                        for (key in val) {
	                            b += key + ':' + val[key] + ';';
	                        };
	                        b += '"';
	                    }else{
	                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
	                    }
	                }
	            };
	            // Now either just close the tag or try to add children and close the tag.
	            if (emptyTags.test(o.tag)) {
	                b += '/>';
	            } else {
	                b += '>';
	                if ((cn = o.children || o.cn)) {
	                    b += createHtml(cn);
	                } else if(o.html){
	                    b += o.html;
	                }
	                b += '</' + o.tag + '>';
	            }
	        }
	        return b;
	    }
	
	    function ieTable(depth, s, h, e){
	        tempTableEl.innerHTML = [s, h, e].join('');
	        var i = -1,
	            el = tempTableEl,
	            ns;
	        while(++i < depth){
	            el = el.firstChild;
	        }
	//      If the result is multiple siblings, then encapsulate them into one fragment.
	        if(ns = el.nextSibling){
	            var df = document.createDocumentFragment();
	            while(el){
	                ns = el.nextSibling;
	                df.appendChild(el);
	                el = ns;
	            }
	            el = df;
	        }
	        return el;
	    }
	
	    /**
	     * @ignore
	     * Nasty code for IE's broken table implementation
	     */
	    function insertIntoTable(tag, where, el, html) {
	        var node,
	            before;
	
	        tempTableEl = tempTableEl || document.createElement('div');
	
	        if(tag == 'td' && (where == afterbegin || where == beforeend) ||
	           !tableElRe.test(tag) && (where == beforebegin || where == afterend)) {
	            return;
	        }
	        before = where == beforebegin ? el :
	                 where == afterend ? el.nextSibling :
	                 where == afterbegin ? el.firstChild : null;
	
	        if (where == beforebegin || where == afterend) {
	            el = el.parentNode;
	        }
	
	        if (tag == 'td' || (tag == 'tr' && (where == beforeend || where == afterbegin))) {
	            node = ieTable(4, trs, html, tre);
	        } else if ((tag == 'tbody' && (where == beforeend || where == afterbegin)) ||
	                   (tag == 'tr' && (where == beforebegin || where == afterend))) {
	            node = ieTable(3, tbs, html, tbe);
	        } else {
	            node = ieTable(2, ts, html, te);
	        }
	        el.insertBefore(node, before);
	        return node;
	    }
	
	
	    pub = {
	        markup : function(o){
	            return createHtml(o);
	        },
	        applyStyles : function(el, styles){
	            if(styles){
	                var i = 0,
	                    len,
	                    style,
	                    matches;
	
	                el = Ext.fly(el);
	                if(typeof styles == "function"){
	                    styles = styles.call();
	                }
	                if(typeof styles == "string"){
	                    while((matches = cssRe.exec(styles))){
	                        el.setStyle(matches[1], matches[2]);
	                    }
	                }else if (typeof styles == "object"){
	                    el.setStyle(styles);
	                }
	            }
	        },
	
	        insertHtml : function(where, el, html){
	            var hash = {},
	                hashVal,
	                setStart,
	                range,
	                frag,
	                rangeEl,
	                rs;
	
	            where = where.toLowerCase();
	            // add these here because they are used in both branches of the condition.
	            hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
	            hash[afterend] = ['AfterEnd', 'nextSibling'];
	
	            if (el.insertAdjacentHTML) {
	                if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
	                    return rs;
	                }
	                // add these two to the hash.
	                hash[afterbegin] = ['AfterBegin', 'firstChild'];
	                hash[beforeend] = ['BeforeEnd', 'lastChild'];
	                if ((hashVal = hash[where])) {
	                    el.insertAdjacentHTML(hashVal[0], html);
	                    return el[hashVal[1]];
	                }
	            } else {
	                range = el.ownerDocument.createRange();
	                setStart = 'setStart' + (endRe.test(where) ? 'After' : 'Before');
	                if (hash[where]) {
	                    range[setStart](el);
	                    frag = range.createContextualFragment(html);
	                    el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
	                    return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
	                } else {
	                    rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
	                    if (el.firstChild) {
	                        range[setStart](el[rangeEl]);
	                        frag = range.createContextualFragment(html);
	                        if(where == afterbegin){
	                            el.insertBefore(frag, el.firstChild);
	                        }else{
	                            el.appendChild(frag);
	                        }
	                    } else {
	                        el.innerHTML = html;
	                    }
	                    return el[rangeEl];
	                }
	            }
	            throw 'Illegal insertion point -> "' + where + '"';
	        },
	        insertBefore : function(el, o, returnElement){
	            return doInsert(el, o, returnElement, beforebegin);
	        },
	
	        insertAfter : function(el, o, returnElement){
	            return doInsert(el, o, returnElement, afterend, 'nextSibling');
	        },
	
	        insertFirst : function(el, o, returnElement){
	            return doInsert(el, o, returnElement, afterbegin, 'firstChild');
	        },
	
	        append : function(el, o, returnElement){
	            return doInsert(el, o, returnElement, beforeend, '', true);
	        },
	        overwrite : function(el, o, returnElement){
	            el = Ext.getDom(el);
	            el.innerHTML = createHtml(o);
	            return returnElement ? Ext.get(el.firstChild) : el.firstChild;
	        },
	
	        createHtml : createHtml
	    };
	    return pub;
    }
});


