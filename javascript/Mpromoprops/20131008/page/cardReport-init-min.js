KISSY.add("utils/showPages/index",function(a){function e(a){var b=this;if(!(b instanceof e))return new e(a);this.pageNum=4,this.name=a,this.page=1,this.pageCount=200,this.argName="page"}var b=a.DOM,c=a.Event,d=document;return a.mix(e.prototype,{jump:function(){return undefined},checkPages:function(){isNaN(parseInt(this.page))&&(this.page=1),isNaN(parseInt(this.pageCount))&&(this.pageCount=1),this.page<1&&(this.page=1),this.pageCount<1&&(this.pageCount=1),this.page>this.pageCount&&(this.page=this.pageCount),this.page=parseInt(this.page),this.pageCount=parseInt(this.pageCount)},_createHtml:function(a){var b=this,c="",d=this.page-1,e=this.page+1;if(a==""||typeof a=="undefined")a=1;switch(a){case 1:c+='<div class="page-bottom"> <div class="sabrosus">',c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;",c+='<input style="" type="text"  class="page-input" id="pageInput'+b.name+'"  value="\u9875\u7801" onkeypress="return window.'+b.name+".formatInputPage(event);\" onfocus=\"this.className='page-input page-input-text-on ';if(this.value=='\u9875\u7801'){this.value = '';}\" onblur=\"this.className='page-input';if(this.value==''){this.value = '\u9875\u7801'}\">",c+='<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);" >',c+="</font>",d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<span title="\u4e0a\u4e00\u9875" class="pre page-pic-no" onclick="'+b.name+".toPage("+d+');"></span>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<span title="\u4e0b\u4e00\u9875" class="next page-pic-no" onclick="'+b.name+".toPage("+e+');"></span>',c+='<div style="clear:both"></div></div></div> ';break;case 2:if(this.pageCount>1){c+='<div class="page-bottom"> <div class="sabrosus">',this.pageCount>5&&(c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;",c+='<input style="" type="text"  class="page-input" id="pageInput'+b.name+'"  value="\u9875\u7801" onkeypress="return window.'+b.name+".formatInputPage(event);\" onfocus=\"this.className='page-input page-input-text-on ';if(this.value=='\u9875\u7801'){this.value = '';}\" onblur=\"this.className='page-input';if(this.value==''){this.value = '\u9875\u7801'}\">",c+='<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);" >',c+="</font>"),d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<span title="\u4e0a\u4e00\u9875" class="pre page-pic-no" onclick="'+b.name+".toPage("+d+');"></span>',this.page==1;if(this.page-2<=0){var f=1;if(this.pageCount>this.page+4)var g=this.page+4;else var g=this.pageCount}else if(this.page+2>=this.pageCount){var f=this.pageCount-4;if(this.pageCount>this.page+4)var g=this.page+4;else var g=this.pageCount}else{var f=this.page-2;if(this.pageCount>this.page+2)var g=this.page+2;else var g=this.pageCount}for(var h=f;h<=g;h++)h>0&&(h==this.page?c+='<span class="current a-padding">'+h+"</span>":c+='<a class="a-padding" href="javascript:'+b.name+".toPage("+h+');">'+h+"</a>");this.page+5<this.pageCount&&(c+='<a class="a-padding" title="" href="javascript:'+b.name+".toPage("+(this.page+3)+');">...</a>'),this.page==this.pageCount,e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<span title="\u4e0b\u4e00\u9875" class="next page-pic-no" onclick="'+b.name+".toPage("+e+');"></span>',c+='<div style="clear:both"></div></div></div> '}break;case 3:c+='<div class="page-top"><div class="sabrosus"><span class="count">'+this.page+" / "+this.pageCount+"</span>",d<1?c+=' <span class="pre-none page-pic-no"></span>':c+='<a class="border-left-dedede" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',c+='<div style="clear:both"></div></div></div>'}return c},formatInputPage:function(a){var b=navigator.appName=="Microsoft Internet Explorer"?!0:!1;if(!b)var c=a.which;else var c=event.keyCode;return c==8||c==46||c>=48&&c<=57?!0:!1},toPage:function(a,b){var c=1,d=this;typeof a=="object"?c=a.options[a.selectedIndex].value:c=a,d.jump(c,b,"")},printHtml:function(a,c){return this.checkPages(),b.html(a,this._createHtml(c)),this},setPageCount:function(a){return this.pageCount=a,this},getPageCount:function(){return this.pageCount},setRender:function(a){return this.jump=a,this},setPageNum:function(a){return this.pageNum=a,this},setPage:function(a){return this.page=a,this}}),e}),KISSY.add("page/cardReport-init",function(a,b,c){var d=a.DOM,e=a.Event;return cardReport={paginator:null,msg:null,isFisrst:!0,init:function(){e.on("#J_LeftSearch","click",function(){cardReport.searchTbItems()}),e.on(doc,"keydown",function(a){a.which===13&&(cardReport.paginator?cardReport.paginator.toPage(cardReport.paginator.page):cardReport.searchTbItems())}),select=new c.Select({render:"#J_SearchTypesBox",valueField:"#J_SearchTypes",items:items}),select.render(),select.on("change",function(a){cardReport.showReportView(),cardReport.searchTbItems()}),select1=new c.Select({render:"#J_DTypesBox",valueField:"#J_DTypes",items:[{text:"\u83b7\u53d6",value:"1"},{text:"\u6d88\u8d39",value:"2"}]}),select1.render(),select1.on("change",function(a){}),select2=new c.Select({render:"#J_SearchStatusBox",valueField:"#J_SearchStatus",items:[{text:"\u72b6\u6001",value:"0"},{text:"\u6210\u529f",value:"2"},{text:"\u5931\u8d25",value:"4"}]}),select2.render(),select2.on("change",function(a){}),cardReport.showReportView(),cardReport.searchTbItems()},searchTbItems:function(){var a=function(a){d.hide("#J_LeftLoading"),d.show("#J_MainLeftContent"),totalRecords=a.payload.totalRecords,totalRecords>0?d.css(d.get("#J_LEmpty"),"display","none"):d.css(d.get("#J_LEmpty"),"display",""),cardReport.renderItems(a.payload.body);var c=Math.ceil(totalRecords/a.payload.pageNum);cardReport.paginator=(new b("cardReport.paginator")).setRender(cardReport.handlePagination).setPageCount(c).printHtml("#J_Paging",2)},c=cardReport.getData();d.show("#J_LeftLoading"),d.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(loadTbItemsUrl).setMethod("GET").setHandle(a).setData(c).send()},renderItems:function(a){d.html(d.get("#J_TbItemList"),a)},handlePagination:function(a){pageId=a;var b=function(a){totalRecords=a.payload.totalRecords,totalRecords>0?d.css(d.get("#J_LEmpty"),"display","none"):d.css(d.get("#J_LEmpty"),"display","");var b=Math.ceil(totalRecords/a.payload.pageNum);cardReport.paginator.setPage(pageId).setPageCount(b).printHtml("#J_Paging",2),cardReport.renderItems(a.payload.body),d.hide("#J_LeftLoading"),d.show("#J_MainLeftContent")},c=cardReport.getData();c+="&page_id="+pageId,d.show("#J_LeftLoading"),d.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(loadTbItemsUrl).setMethod("GET").setHandle(b).setData(c).send()},getData:function(){if(d.val(d.get("#J_SearchTitle"))!="\u8f93\u5165\u4e70\u5bb6\u6635\u79f0")var a=encodeURIComponent(d.val(d.get("#J_SearchTitle")));else var a="";var b=d.val(d.get("#J_DTypes")),c=d.val(d.get("#J_SearchStatus")),e=d.val("#J_SearchTypes"),f="pid="+e+"&nick="+a+"&status="+c+"&dtype="+b;return f},showReportView:function(){var a=function(a){cardReport.chart&&cardReport.chart.destroy(),cardReport.chart=new Highcharts.Chart({chart:{renderTo:"J_BaoBiao",height:400,marginBottom:60},title:{text:null},credits:{enabled:!1},legend:{floating:!0,align:"left",x:450,y:5},colors:["#8bd167","#4dc1e8","#fb6e52","#ffce55","#656d78","#ac92ed","#ec87c1","#4b89dc","#db4453","#d8ad88","#00d39f","#a2b1c7","#5937ae","#bc3783"],xAxis:{categories:a.payload.xdata,labels:{step:a.payload.xkuadu}},yAxis:[{lineWidth:1,tickWidth:1,title:{align:"high",offset:0,text:"",rotation:0,y:-10},min:0}],tooltip:{formatter:function(a){var b;return b=""+this.x+"\u53f7: "+this.y,b}},series:[{type:"spline",name:"\u9886\u53d6",data:a.payload.send},{type:"spline",name:"\u6d88\u8d39",data:a.payload.consume}]})},b=function(a){d.html(d.get("#J_BaoBiao"),a.desc,!0)},c=d.val("#J_SearchTypes"),e="pid="+c;(new H.widget.asyncRequest).setURI(showReportViewUrl).setMethod("GET").setHandle(a).setErrorHandle(b).setData(e).send()}}},{requires:["utils/showPages/index","bui/select"]}); 