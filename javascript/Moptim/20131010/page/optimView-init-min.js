KISSY.add("utils/showPages/index",function(a){function e(a){var b=this;if(!(b instanceof e))return new e(a);this.pageNum=4,this.name=a,this.page=1,this.pageCount=200,this.argName="page"}var b=a.DOM,c=a.Event,d=document;return a.mix(e.prototype,{jump:function(){return undefined},checkPages:function(){isNaN(parseInt(this.page))&&(this.page=1),isNaN(parseInt(this.pageCount))&&(this.pageCount=1),this.page<1&&(this.page=1),this.pageCount<1&&(this.pageCount=1),this.page>this.pageCount&&(this.page=this.pageCount),this.page=parseInt(this.page),this.pageCount=parseInt(this.pageCount)},_createHtml:function(a){var b=this,c="",d=this.page-1,e=this.page+1;if(a==""||typeof a=="undefined")a=1;switch(a){case 1:c+='<div class="page-bottom"> <div class="sabrosus">',c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;",c+='<input style="" type="text"  class="page-input" id="pageInput'+b.name+'"  value="\u9875\u7801" onkeypress="return window.'+b.name+".formatInputPage(event);\" onfocus=\"this.className='page-input page-input-text-on ';if(this.value=='\u9875\u7801'){this.value = '';}\" onblur=\"this.className='page-input';if(this.value==''){this.value = '\u9875\u7801'}\">",c+='<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);" >',c+="</font>",d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<span title="\u4e0a\u4e00\u9875" class="pre page-pic-no" onclick="'+b.name+".toPage("+d+');"></span>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<span title="\u4e0b\u4e00\u9875" class="next page-pic-no" onclick="'+b.name+".toPage("+e+');"></span>',c+='<div style="clear:both"></div></div></div> ';break;case 2:if(this.pageCount>1){c+='<div class="page-bottom"> <div class="sabrosus">',this.pageCount>5&&(c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;",c+='<input style="" type="text"  class="page-input" id="pageInput'+b.name+'"  value="\u9875\u7801" onkeypress="return window.'+b.name+".formatInputPage(event);\" onfocus=\"this.className='page-input page-input-text-on ';if(this.value=='\u9875\u7801'){this.value = '';}\" onblur=\"this.className='page-input';if(this.value==''){this.value = '\u9875\u7801'}\">",c+='<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);" >',c+="</font>"),d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<span title="\u4e0a\u4e00\u9875" class="pre page-pic-no" onclick="'+b.name+".toPage("+d+');"></span>',this.page==1;if(this.page-2<=0){var f=1;if(this.pageCount>this.page+4)var g=this.page+4;else var g=this.pageCount}else if(this.page+2>=this.pageCount){var f=this.pageCount-4;if(this.pageCount>this.page+4)var g=this.page+4;else var g=this.pageCount}else{var f=this.page-2;if(this.pageCount>this.page+2)var g=this.page+2;else var g=this.pageCount}for(var h=f;h<=g;h++)h>0&&(h==this.page?c+='<span class="current a-padding">'+h+"</span>":c+='<a class="a-padding" href="javascript:'+b.name+".toPage("+h+');">'+h+"</a>");this.page+5<this.pageCount&&(c+='<a class="a-padding" title="" href="javascript:'+b.name+".toPage("+(this.page+3)+');">...</a>'),this.page==this.pageCount,e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<span title="\u4e0b\u4e00\u9875" class="next page-pic-no" onclick="'+b.name+".toPage("+e+');"></span>',c+='<div style="clear:both"></div></div></div> '}break;case 3:c+='<div class="page-top"><div class="sabrosus"><span class="count">'+this.page+" / "+this.pageCount+"</span>",d<1?c+=' <span class="pre-none page-pic-no"></span>':c+='<a class="border-left-dedede" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',c+='<div style="clear:both"></div></div></div>'}return c},formatInputPage:function(a){var b=navigator.appName=="Microsoft Internet Explorer"?!0:!1;if(!b)var c=a.which;else var c=event.keyCode;return c==8||c==46||c>=48&&c<=57?!0:!1},toPage:function(a,b){var c=1,d=this;typeof a=="object"?c=a.options[a.selectedIndex].value:c=a,d.jump(c,b,"")},printHtml:function(a,c){return this.checkPages(),b.html(a,this._createHtml(c)),this},setPageCount:function(a){return this.pageCount=a,this},getPageCount:function(){return this.pageCount},setRender:function(a){return this.jump=a,this},setPageNum:function(a){return this.pageNum=a,this},setPage:function(a){return this.page=a,this}}),e}),KISSY.add("page/optimView-init",function(a,b,c,d,e){var a=KISSY,f=a.DOM,g=a.Event;return optimView={paginator:null,msg:null,dialog:null,tabs:null,init:function(){optimView.loadDetail(),g.on("#J_LoadDetail","click",function(a){optimView.loadDetail()}),g.on("#J_UpdateItem","click",function(a){optimView.updateItem()}),optimView.tabs=(new d.Tabs("#wrapper",{navCls:"ks-switchable-nav",triggerType:"click",contentCls:"main-content",activeTriggerCls:"current"})).on("switch",function(a){var b=a.currentIndex;switch(b){case 0:optimView.loadWords();break;case 1:optimView.loadHotWords();break;case 2:optimView.loadCidHots();break;case 3:optimView.loadUpWords();break;case 4:optimView.loadTrains();break;case 5:optimView.loadHotProducts()}})},loadDetail:function(a){var b=f.val("#J_ItemId"),c=f.val("#J_ItemTitle"),d=f.val("#J_Cid"),e="id="+b+"&title="+c+"&refresh=true"+"&topcid="+d,g=function(a){f.html("#J_GradeArea",a.payload.body)},h=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return};f.html("#J_GradeArea",'<div class="center loading" style="margin-top:150px;"></div>'),(new H.widget.asyncRequest).setURI(loadDetailUrl).setMethod("POST").setHandle(g).setErrorHandle(h).setData(e).send()},itemInfo:function(){var a=function(a){var b=a.payload.body;optimView.dialog=new e.Dialog({width:490,headerContent:"\u8bc4\u5206\u8be6\u60c5",bodyContent:b,mask:!1,align:{points:["cc","cc"]},buttons:[{text:"\u5173\u95ed",elCls:"bui-button",handler:function(){this.hide()}}],closable:!0,draggable:!0,aria:!0}),optimView.dialog.show()},b=f.val("#J_ItemId"),c="id="+b;(new H.widget.asyncRequest).setURI(itemInfoUrl).setMethod("GET").setHandle(a).setData(c).send()},updateItem:function(){var a=function(a){new H.widget.msgBox({type:"sucess",content:"\u66f4\u65b0\u6210\u529f\uff01",dialogType:"msg",autoClose:!0,timeOut:3e3})},b=f.val("#J_ItemId");if(f.val(f.get("#J_ItemTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var c=encodeURIComponent(f.val(f.get("#J_ItemTitle")));else var c="";var d="item_id="+b+"&title="+c;(new H.widget.asyncRequest).setURI(updateItemUrl).setMethod("POST").setHandle(a).setData(d).send()},loadCidHots:function(){var a=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab3List"),"display",""),f.css(f.get("#J_Tab3Empty"),"display","none")):(f.css(f.get("#J_Tab3List"),"display","none"),f.css(f.get("#J_Tab3Empty"),"display","")),f.html("#J_Tab3List",a.payload.body);var c=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator=(new b("optimView.paginator")).setRender(optimView.tab3Pagination).setPageCount(c).printHtml("#J_Tab3Paging",3)};if(f.val(f.get("#J_Tab3Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab3Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadCidHotsUrl).setMethod("POST").setHandle(a).setData(g).send()},tab3Pagination:function(a){pageId=a;var b=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab3List"),"display",""),f.css(f.get("#J_Tab3Empty"),"display","none")):(f.css(f.get("#J_Tab3List"),"display","none"),f.css(f.get("#J_Tab3Empty"),"display","")),f.html("#J_Tab3List",a.payload.body);var b=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator.setPage(pageId).setPageCount(b).printHtml("#J_Tab3Paging",3)};if(f.val(f.get("#J_Tab3Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab3Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d+"&page_id="+pageId;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadCidHotsUrl).setMethod("POST").setHandle(b).setData(g).send()},loadUpWords:function(){var a=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab4List"),"display",""),f.css(f.get("#J_Tab4Empty"),"display","none")):(f.css(f.get("#J_Tab4List"),"display","none"),f.css(f.get("#J_Tab4Empty"),"display","")),f.html("#J_Tab4List",a.payload.body);var c=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator=(new b("optimView.paginator")).setRender(optimView.tab4Pagination).setPageCount(c).printHtml("#J_Tab4Paging",3)};if(f.val(f.get("#J_Tab4Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab4Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadUpWordsUrl).setMethod("POST").setHandle(a).setData(g).send()},tab4Pagination:function(a){pageId=a;var b=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab4List"),"display",""),f.css(f.get("#J_Tab4Empty"),"display","none")):(f.css(f.get("#J_Tab4Empty"),"display",""),f.css(f.get("#J_Tab4Empty"),"display","none")),f.html("#J_Tab4List",a.payload.body);var b=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator.setPage(pageId).setPageCount(b).printHtml("#J_Tab4Paging",3)};if(f.val(f.get("#J_Tab4Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab4Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d+"&page_id="+pageId;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadUpWordsUrl).setMethod("POST").setHandle(b).setData(g).send()},loadTrains:function(){var a=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab5List"),"display",""),f.css(f.get("#J_Tab5Empty"),"display","none")):(f.css(f.get("#J_Tab5List"),"display","none"),f.css(f.get("#J_Tab5Empty"),"display","")),f.html("#J_Tab5List",a.payload.body);var c=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator=(new b("optimView.paginator")).setRender(optimView.tab5Pagination).setPageCount(c).printHtml("#J_Tab5Paging",3)};if(f.val(f.get("#J_Tab5Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab5Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadTrainsUrl).setMethod("POST").setHandle(a).setData(g).send()},tab5Pagination:function(a){pageId=a;var b=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab5List"),"display",""),f.css(f.get("#J_Tab5Empty"),"display","none")):(f.css(f.get("#J_Tab5List"),"display","none"),f.css(f.get("#J_Tab5Empty"),"display","")),f.html("#J_Tab5List",a.payload.body);var b=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator.setPage(pageId).setPageCount(b).printHtml("#J_Tab5Paging",3)};if(f.val(f.get("#J_Tab5Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab5Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d+"&page_id="+pageId;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadTrainsUrl).setMethod("POST").setHandle(b).setData(g).send()},loadHotProducts:function(){var a=function(a){f.hide("#J_RightLoading"),f.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,f.css(f.get("#J_NoteIcon"),"display","none"),totalRecords>0?(f.css(f.get("#J_Tab6List"),"display",""),f.css(f.get("#J_Tab6Empty"),"display","none")):(f.css(f.get("#J_Tab6List"),"display","none"),f.css(f.get("#J_Tab6Empty"),"display","")),f.html("#J_Tab6List",a.payload.body);var c=Math.ceil(totalRecords/a.payload.pageNum);optimView.paginator=(new b("optimView.paginator")).setRender(optimView.handlePagination).setPageCount(c).printHtml("#J_BottomPaging",2),optimView.paginator=(new b("optimView.paginator")).setRender(optimView.handlePagination).setPageCount(c).printHtml("#J_TopPaging",3)};if(f.val(f.get("#J_Tab6Keyword"))!="\u8f93\u5165\u70ed\u8bcd")var c=encodeURIComponent(f.val(f.get("#J_Tab6Keyword")));else var c="";var d=12,e=f.val("#J_ItemCid"),g="keyword="+c+"&cid="+e+"&pageSize="+d;f.show("#J_RightLoading"),f.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadHotProductsUrl).setMethod("POST").setHandle(a).setData(g).send()},changeGroup:function(a){var b=f.query("#J_WordChoose .hotword-word"),c=f.query(".J_WordGroup");f.hide(c),f.removeClass(b,"current-word"),f.show("#J_WordGroup"+a),f.addClass("#J_WordChose"+a,"current-word")},checkTitleNotice:function(a){var b=a.replace(/[^\x00-\xff]/g,"**").length;if(b>60)f.html(f.get("#J_Notice"),"\u5b9d\u8d1d\u6807\u9898\u8d85\u8fc7\u6dd8\u5b9d\u9650\u5236\uff0830\u4e2a\u6c49\u5b57\uff09"),f.html(f.get("#J_Zs"),"");else{var c=60-b;f.html(f.get("#J_Notice"),""),f.html(f.get("#J_Zs"),'\u60a8\u8fd8\u80fd\u8f93\u5165<span style="margin:0 5px;">'+c+"</span>\u4e2a\u5b57\u7b26")}}}},{requires:["utils/showPages/index","overlay","switchable","bui/overlay"]}); 