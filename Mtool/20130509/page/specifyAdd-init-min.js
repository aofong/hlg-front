KISSY.add("utils/showPages/index",function(a){function e(a){var b=this;if(!(b instanceof e))return new e(a);this.pageNum=4,this.name=a,this.page=1,this.pageCount=200,this.argName="page"}var b=a.DOM,c=a.Event,d=document;return a.mix(e.prototype,{jump:function(){return undefined},checkPages:function(){isNaN(parseInt(this.page))&&(this.page=1),isNaN(parseInt(this.pageCount))&&(this.pageCount=1),this.page<1&&(this.page=1),this.pageCount<1&&(this.pageCount=1),this.page>this.pageCount&&(this.page=this.pageCount),this.page=parseInt(this.page),this.pageCount=parseInt(this.pageCount)},_createHtml:function(a){var b=this,c="",d=this.page-1,e=this.page+1;if(a==""||typeof a=="undefined")a=1;switch(a){case 1:c+='<span class="number">',this.page!=1&&(c+='<span title="Page 1"><a href="javascript:'+b.name+'.toPage(1);">1</a></span>'),this.page>=5&&(c+="<span>...</span>");if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount;for(var g=this.page-2;g<=f;g++)g>0&&(g==this.page?c+='<span title="Page '+g+'">'+g+"</span>":g!=1&&g!=this.pageCount&&(c+='<span title="Page '+g+'"><a href="javascript:'+b.name+".toPage("+g+');">'+g+"</a></span>"));this.page+3<this.pageCount&&(c+="<span>...</span>"),this.page!=this.pageCount&&(c+='<span title="Page '+this.pageCount+'"><a href="javascript:'+b.name+".toPage("+this.pageCount+');">'+this.pageCount+"</a></span>"),c+="</span><br />";break;case 2:if(this.pageCount>1){c+='<div class="page-bottom"> <div class="sabrosus">',d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',this.page==1;if(this.page-2<=0){var h=1;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else if(this.page+2>=this.pageCount){var h=this.pageCount-4;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else{var h=this.page-2;if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount}for(var g=h;g<=f;g++)g>0&&(g==this.page?c+='<span class="current a-padding">'+g+"</span>":c+='<a class="a-padding" href="javascript:'+b.name+".toPage("+g+');">'+g+"</a>");this.page+5<this.pageCount&&(c+='<a class="a-padding" title="" href="javascript:'+b.name+".toPage("+(this.page+3)+');">...</a>'),this.page==this.pageCount,e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',this.pageCount>5&&(c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;\u5230\u7b2c&nbsp;",this.page>=this.pageCount?c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+this.pageCount+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875':c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+(this.page+1)+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875',c+='<input type="button" value="" class="page-pic-no gray-btm-h-go w-30 btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);">',c+="</font>"),c+='<div style="clear:both"></div></div></div> '}break;case 3:c+='<div class="page-top"><div class="sabrosus"><span class="count">'+this.page+" / "+this.pageCount+"</span>",d<1?c+=' <span class="pre-none page-pic-no"></span>':c+='<a class="border-left-dedede" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',c+='<div style="clear:both"></div></div></div>'}return c},formatInputPage:function(a){var b=navigator.appName=="Microsoft Internet Explorer"?!0:!1;if(!b)var c=a.which;else var c=event.keyCode;return c==8||c==46||c>=48&&c<=57?!0:!1},toPage:function(a,b){var c=1,d=this;typeof a=="object"?c=a.options[a.selectedIndex].value:c=a,d.jump(c,b,"")},printHtml:function(a,c){return this.checkPages(),b.html(a,this._createHtml(c)),this},setPageCount:function(a){return this.pageCount=a,this},getPageCount:function(){return this.pageCount},setRender:function(a){return this.jump=a,this},setPageNum:function(a){return this.pageNum=a,this},setPage:function(a){return this.page=a,this}}),e}),KISSY.add("page/specifyAdd-init",function(a,b){var a=KISSY,c=a.DOM,d=a.Event;return specifyAdd={msg:null,isLoad:!1,paginator:null,init:function(){specifyAdd.run()},run:function(){specifyAdd.searchTbItems(),d.on("#J_SelectItemCid","change",function(a){specifyAdd.searchTbItems()}),d.on("#J_SearchBtn","click",function(a){specifyAdd.searchTbItems()})},searchTbItems:function(){var a=function(a){c.attr("#J_LCheckAll-b","checked",!1),c.hide("#J_RightLoading"),c.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,c.css(c.get("#J_NoteIcon"),"display","none"),totalRecords>0?(c.css(c.get("#J_REmpty"),"display","none"),c.css(c.query(".J_PromotionItemBtnHolder"),"display","")):(c.css(c.get("#J_REmpty"),"display",""),c.css(c.query(".J_PromotionItemBtnHolder"),"display","none"),c.css(c.query(".J_ControlBtm"),"display","none")),c.html("#J_PromotionItemList",a.payload.body);var e=c.query("#J_PromotionItemList .J_CheckBox");selectItemNum=0,changeItemId="",d.on(e,"click",function(a){this.checked||c.attr("#J_TCheckAll","checked",!1)});var f=Math.ceil(totalRecords/a.payload.pageNum);specifyAdd.paginator=(new b("specifyAdd.paginator")).setRender(specifyAdd.handlePagination).setPageCount(f).printHtml("#J_BottomPaging",2),specifyAdd.paginator=(new b("specifyAdd.paginator")).setRender(specifyAdd.handlePagination).setPageCount(f).printHtml("#J_TopPaging",3)};if(c.val(c.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var e=encodeURIComponent(c.val(c.get("#J_SearchTitle")));else var e="";var f=c.val(c.get("#J_SelectItemPage")),g=c.val(c.get("#J_SelectItemCid")),h=c.val(c.get("#J_SearchSelling")),i=c.val(c.get("#J_SelectItemOrder")),j="recommend="+recommend+"&q="+e+"&cid="+g+"&type="+h;j+="&itemOrder="+i+"&pageSize="+f;if(h==0){var k=c.val(c.get("#J_StartPrice")),l=c.val(c.get("#J_EndPrice"));j+="&start_price="+k+"&end_price="+l}c.show("#J_RightLoading"),c.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(getItemsFromTbUrl).setMethod("GET").setHandle(a).setData(j).send()},handlePagination:function(a){pageId=a;var b=function(a){c.hide("#J_RightLoading"),c.show("#J_MainRightContent"),totalRecords=a.payload.totalRecords,c.attr("#J_LCheckAll-b","checked",!1),c.css(c.get("#J_NoteIcon"),"display","none"),totalRecords>0?(c.css(c.get("#J_REmpty"),"display","none"),c.css(c.query(".J_PromotionItemBtnHolder"),"display","")):(c.css(c.get("#J_REmpty"),"display",""),c.css(c.query(".J_PromotionItemBtnHolder"),"display","none")),c.html("#J_PromotionItemList",a.payload.body);if(!specifyAdd.checkBoxs)var b=c.query("#J_PromotionItemList .J_CheckBox");else var b=specifyAdd.checkBoxs;var e=b.length,f=changeItemId.split(",");for(var g=0;g<e;g++)for(var h=0;h<f.length;h++)f[h]==b[g].value&&(b[g].checked=!0);var i=c.query("#J_PromotionItemList .J_CheckBox");d.on(i,"click",function(a){this.checked||c.attr("#J_TCheckAll","checked",!1)});var j=Math.ceil(totalRecords/a.payload.pageNum);specifyAdd.paginator.setPage(pageId).setPageCount(j).printHtml("#J_BottomPaging",2),specifyAdd.paginator.setPage(pageId).setPageCount(j).printHtml("#J_TopPaging",3)};if(c.val(c.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var e=encodeURIComponent(c.val(c.get("#J_SearchTitle")));else var e="";var f=c.val(c.get("#J_SelectItemPage")),g=c.val(c.get("#J_SelectItemCid")),h=c.val(c.get("#J_SearchSelling")),i=c.val(c.get("#J_SelectItemOrder")),j="recommend="+recommend+"&q="+e+"&cid="+g+"&type="+h;j+="&itemOrder="+i+"&pageSize="+f+"&page_id="+pageId;if(h==0){var k=c.val(c.get("#J_StartPrice")),l=c.val(c.get("#J_EndPrice"));j+="&start_price="+k+"&end_price="+l}c.show("#J_RightLoading"),c.hide("#J_MainRightContent"),c.attr("#J_TCheckAll","checked")&&c.prop("#J_TCheckAll","checked",!1),(new H.widget.asyncRequest).setURI(getItemsFromTbUrl).setMethod("GET").setHandle(b).setData(j).send()},swLJCheck:function(b){b.checked?(a.each(a.all(".J_LCheckBox"),function(a){c.attr(a,"disabled")!="disabled"&&c.attr(a,"checked",!0)}),c.attr("#J_LCheckAll","checked",!0),c.attr("#J_LCheckAll-b","checked",!0)):(a.each(a.all(".J_LCheckBox"),function(a,b){c.attr(a,"disabled")!="disabled"&&c.attr(a,"checked",!1)}),c.attr("#J_LCheckAll","checked",!1),c.attr("#J_LCheckAll-b","checked",!1))},addItemToSpecify:function(a){if(!showPermissions("editor_tool","\u5de5\u5177\u7bb1"))return;specifyAdd.msg=new H.widget.msgBox({title:"",dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406"});var b=new Array,d={},e=c.get("#Ltd-"+a);d.itemId=c.val(c.get(".numIid",e)),d.title=c.val(c.get(".itemTitle",e)),d.picUrl=c.val(c.get(".picUrl",e)),d.delistTime=c.val(c.get(".delistTime",e)),b.push(d),c.html("#add-item-msg",""),specifyAdd.ajaxPostProcessItems(1,b)},addItemsToSpecify:function(){if(!showPermissions("editor_tool","\u5de5\u5177\u7bb1"))return;specifyAdd.msg=new H.widget.msgBox({title:"",dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406"});var b=new Array;a.each(a.all(".J_LCheckBox"),function(a,d){if(c.attr(a,"checked")==1||c.attr(a,"checked")=="checked"){var e=c.val(a),f={},g=c.get("#Ltd-"+e);f.itemId=c.val(c.get(".numIid",g)),f.title=c.val(c.get(".itemTitle",g)),f.picUrl=c.val(c.get(".picUrl",g)),f.delistTime=c.val(c.get(".delistTime",g)),b.push(f)}});if(b.length==0)return specifyAdd.msg.hide(),new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u672a\u9009\u62e9\u4efb\u4f55\u5b9d\u8d1d",type:"error"}),c.html("#add-item-msg",'<font color="red">\u60a8\u672a\u9009\u62e9\u5b9d\u8d1d\uff01</font>'),!1;c.html("#add-item-msg",""),specifyAdd.ajaxPostProcessItems(1,b)},ajaxPostProcessItems:function(a,b){var d=b.length;b=JSON.stringify(b),b=encodeURIComponent(b);var e="isAjax=1&recommend="+recommend+"&added="+a+"&items="+b;if(recommend){var f=c.val("#remain_count")-d;if(f<0){var g=c.val("#J_RemainNum");specifyAdd.msg.hide();var h="\u4eb2\uff0c\u5fc5\u63a8\u8350\u7684\u5b9d\u8d1d\u4e0d\u80fd\u591a\u4f59"+g+"\u4e2a\u54e6";return Math.abs(f)>0&&(h+="\u8bf7\u5220\u9664"+Math.abs(f)+"\u4e2a\u5b9d\u8d1d\uff0c\u518d\u52a0\u5165\uff01"),new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:h,type:"error"}),!1}e+="&remain_count="+c.val("#remain_count")}var i=function(a){var b=a.payload.added,c=a.payload.items;if(b=="1")for(var d=0;d<c.length;d++)specifyAdd.addItemProcess(c[d]);else for(var d=0;d<c.length;d++)specifyAdd.delItemProcess(c[d]);specifyAdd.msg.hide()},j=function(a){specifyAdd.msg.hide(),new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return};(new H.widget.asyncRequest).setURI(switchItemsToSpecifyUrl).setMethod("POST").setHandle(i).setErrorHandle(j).setData(e).send()},addItemProcess:function(a){recommend=="1"?c.html("#Ltd-"+a.itemId,"\u5df2\u63a8\u8350"):c.html("#Ltd-"+a.itemId,"\u5df2\u6392\u9664"),c.attr("#Lcb-"+a.itemId,"disabled","disabled"),c.removeAttr("#Lcb-"+a.itemId,"checked"),recommend=="1"&&(c.val("#remain_count",parseInt(c.val("#remain_count"))-1),c.html("#rcount",c.val("#remain_count")))},delItemProcess:function(a){c.remove("#Rtr-"+a.itemId)}}},{requires:["utils/showPages/index"]}); 