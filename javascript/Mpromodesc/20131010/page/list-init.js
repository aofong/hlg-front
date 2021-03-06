/*
combined files : 

utils/showPages/index
page/list-init

*/
/**
 * @分页组件
 * @author  @sjs_stef
 */
KISSY.add('utils/showPages/index',function (S) {
    var DOM = S.DOM, Event = S.Event, doc = document;
  
    function showPages(name) { //初始化属性 
        var self = this; 
        if (!(self instanceof showPages)) { 
            return new showPages(name); 
        }   
        this.pageNum = 4 ;   
        this.name = name;      //对象名称
        this.page = 1;         //当前页数
        this.pageCount = 200;    //总页数
        this.argName = 'page'; //参数名    
    }

    S.mix(showPages.prototype,{
        jump: function() {
            return undefined;
        },
        
        //进行当前页数和总页数的验证
        checkPages: function() { 
            if (isNaN(parseInt(this.page))) this.page = 1;
            if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
            if (this.page < 1) this.page = 1;
            if (this.pageCount < 1) this.pageCount = 1;
            if (this.page > this.pageCount) this.page = this.pageCount;
            this.page = parseInt(this.page);
            this.pageCount = parseInt(this.pageCount);
        },
        
        //生成html代码    
        _createHtml: function(mode) { 
       
            var self = this, strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;   
            if (mode == '' || typeof(mode) == 'undefined') mode = 1;
        
            switch (mode) {
                case 1: 
                    //模式1 (页数)
                     strHtml += '<div class="page-bottom"> <div class="sabrosus">';
	   					strHtml += '<font class="number">';
	   					strHtml += '共'+this.pageCount+'页&nbsp;';
	   					strHtml += '<input style="" type="text"  class="page-input" id="pageInput' + self.name + '"  value="页码" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.className=\'page-input page-input-text-on \';if(this.value==\'页码\'){this.value = \'\';}" onblur="this.className=\'page-input\';if(this.value==\'\'){this.value = \'页码\'}">';
	   					strHtml += '<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);" >';
	   					strHtml += '</font>';	
	   				    if (prevPage < 1) {
	                        strHtml += '<span class="pre-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<span title="上一页" class="pre page-pic-no" onclick="' + self.name + '.toPage(' + prevPage + ');"></span>';
	                    }
	   					if (nextPage > this.pageCount) {
	                    	strHtml += '<span class="next-none page-pic-no"></span>';
	                    } else {
	                    	strHtml += '<span title="下一页" class="next page-pic-no" onclick="' + self.name + '.toPage(' + nextPage + ');"></span>';
	                    }
	   				 strHtml += '<div style="clear:both"></div></div></div> '; 
                    break;
                                 
                    case 2: 
    					//模式2 (前后缩略,页数,首页,前页,后页,尾页)
                    	
    					if(this.pageCount > 1){
    	                    strHtml += '<div class="page-bottom"> <div class="sabrosus">';
    	                    
    	                    if (this.pageCount > 5) {
    		   					strHtml += '<font class="number">';
    		   					strHtml += '共'+this.pageCount+'页&nbsp;';
    		   					strHtml += '<input style="" type="text"  class="page-input" id="pageInput' + self.name + '"  value="页码" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.className=\'page-input page-input-text-on \';if(this.value==\'页码\'){this.value = \'\';}" onblur="this.className=\'page-input\';if(this.value==\'\'){this.value = \'页码\'}">';
    		   					strHtml += '<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);" >';
    		   					strHtml += '</font>';	
    	                    }
    	                    
    	                    
    	                    if (prevPage < 1) {
    	                        strHtml += '<span class="pre-none page-pic-no"></span>';
    	                    } else {
    	                        strHtml += '<span title="上一页" class="pre page-pic-no" onclick="' + self.name + '.toPage(' + prevPage + ');"></span>';
    	                    }
    	                    
    	                    if (this.page != 1) {
    							//strHtml += ' <a class="a-padding" href="javascript:' + self.name  + '.toPage(1);">1</a>';
    						}
    						if(this.page - 2<=0){
    							var start = 1;
    								if (this.pageCount > this.page + 4) {
    	                           		var endPage = this.page + 4;
    	                           } else {
    	                             	var endPage = this.pageCount; 
    	                            }
    						}else if(this.page + 2>=this.pageCount){
    							var start = this.pageCount-4;
    							if (this.pageCount > this.page + 4) {
    	                       		var endPage = this.page + 4;
    	                        } else {
    	                         	var endPage = this.pageCount; 
    	                        }
    						}else {
    							var start = this.page - 2;
    							if (this.pageCount > this.page + 2) {
    		                           		var endPage = this.page + 2;
    		                           } else {
    		                             	var endPage = this.pageCount; 
    		                             }
    						}
    	                    for (var i = start; i <= endPage; i++) {
    	                    if (i > 0) {
    	                       	if (i == this.page) {
    	                           	strHtml += '<span class="current a-padding">'+ i + '</span>';
    	                        } else {
    	                           // if (i != 1 && i != this.pageCount) {
    	                              	strHtml += '<a class="a-padding" href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a>';
    	                           // }
    						      }
    	                    }
    	                    }
    	                    if (this.page + 5 < this.pageCount) {
    							strHtml += '<a class="a-padding" title="" href="javascript:' + self.name + '.toPage(' + (this.page + 3) + ');">...</a>';
    						}
    				  	    if (this.page != this.pageCount) {
    							//strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
    						}
    						if (nextPage > this.pageCount) {
    	                    	strHtml += '<span class="next-none page-pic-no"></span>';
    	                    } else {
    	                    	strHtml += '<span title="下一页" class="next page-pic-no" onclick="' + self.name + '.toPage(' + nextPage + ');"></span>';
    	                      }
    						
    						
    						
    	                   strHtml += '<div style="clear:both"></div></div></div> ';
    					}
                       break;
    			   case 3 :
    				   strHtml += '<div class="page-top"><div class="sabrosus"><span class="count">' + this.page + ' / ' + this.pageCount + '</span>';
                       if (prevPage < 1) {
                           strHtml += ' <span class="pre-none page-pic-no"></span>';
                       } else {
                           strHtml += '<a class="border-left-dedede" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
                         }
                       if (nextPage > this.pageCount) {
                       	strHtml += '<span class="next-none page-pic-no"></span>';
                       } else {
                           strHtml += '<a href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
                         }
                      strHtml += '<div style="clear:both"></div></div></div>';
                      break;
                    
            }
            return strHtml; 
               
        },
         //限定输入页数格式
        formatInputPage : function(e){
            var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
            if(!ie) var key = e.which;
            else var key = event.keyCode;
            if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
            return false;
        },
      
        //页面跳转 返回将跳转的页数
        toPage: function( page ,flag) { 
            var turnTo = 1;
            var self = this;    
            if (typeof(page) == 'object') {
                turnTo = page.options[page.selectedIndex].value;
            } else {
                turnTo = page;
              }
            
            self.jump(turnTo,flag,'');
              
        },
              
        //显示html代码
        printHtml: function(contian, mode) {  
            this.checkPages();
            DOM.html(contian,this._createHtml(mode));
            return this;
        },
                   
        //设置总页数           
        setPageCount: function( pagecount ) {
            this.pageCount=pagecount;
            return this;
        },              
        
        getPageCount: function() {
            return this.pageCount;
        },
        
        //设置跳转 执行函数
        setRender: function(fn) {
            this.jump = fn;
            return this;
        },  
        setPageNum:function(page_num){
            this.pageNum = page_num;
            return this;
         },
        setPage:function(page){
            this.page = page;  
            return this; 
        }          

               
    });

    return showPages;
  
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/list-init',function (S,showPages,O) {
    // your code here

	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return  promodescControl = {
				msg :null ,
				paginator:null,
				//搜索活动中宝贝
				isLoad : false,
	        	searchPromoItems : function() {
					if(!promodescControl.isLoad){
							promodescControl.isLoad = true;
					}
		            var submitHandle = function(o) {
		            	DOM.hide('#promoList');
		            	DOM.hide('#J_PromoDetail');
		            	DOM.show('#itemList');
		            	DOM.show('#J_BackToPromoList');
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.get('#J_LEmpty').style.display = 'none';
							DOM.removeClass(DOM.query(".J_PromotionItemBtnHolder"),'ks-hidden');
						} else {
							DOM.get('#J_LEmpty').style.display = '';
							DOM.addClass(DOM.query(".J_PromotionItemBtnHolder"),'ks-hidden');
						}
						DOM.html('#J_PromoItems',o.payload.body);
						pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						promodescControl.paginator = new showPages('promodescControl.paginator').setRender(promodescControl.handlePagination).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		    	    };
		    	    var errorHandle = function(o){
		    	    	DOM.show('#promoList');
		    	    	DOM.show('#J_PromoDetail');
		            	DOM.hide('#itemList');
		            	DOM.hide('#J_BackToPromoList');
		            	promodescControl.msg.setMsg(o.desc).show();
		            	promodescControl.msg.hide(true);
		    	    };
	    	    if(DOM.val(DOM.get("#J_SearchTitle")) != '输入关键字、商品ID、货号'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
	    	    var status = DOM.val(DOM.get("#J_SearchStatus"));
		    	var data = "keytitle="+title+'&status='+status;
		    	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	   				if(totalRecords > 0){
	   					DOM.get('#J_LEmpty').style.display = 'none';
	   					DOM.removeClass(DOM.get(".J_PromotionItemBtnHolder"),'ks-hidden');
	   				} else {
	   					DOM.get('#J_LEmpty').style.display = '';
	   					DOM.addClass(DOM.get(".J_PromotionItemBtnHolder"),'ks-hidden');
	   				}
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					DOM.html('#J_PromoItems',o.payload.body);
					promodescControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '输入关键字、商品ID、货号'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
		   	    var status = DOM.val(DOM.get("#J_SearchStatus"));
		    	var data = "keytitle="+title+'&status='+status+"&page_id="+pageId;
		    	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			init : function() {
				Event.delegate(document,'click','.J_BackTo',function(){
					DOM.show('#promoList');
					DOM.show('#J_PromoDetail');
		        	DOM.hide('#itemList');
		        	DOM.hide('#J_BackToPromoList');
				})
				var deleteHandle = function(e) {
					if(!showPermissions('editor_promodesc','促销详情')){
						return ;
					}
					var pid = DOM.attr(this,'data');
					new H.widget.msgBox({
					    title: "删除活动",
					    content: '系统将为您取消此活动的促销详情',
					    type: "confirm",
					    buttons: [{ value: "确定删除" }, { value: "取消" }],
					    success: function (result) {
					        if (result == "确定删除") {
								var submitHandle = function(o) {
								  	window.location.href= currentPageUrl;
								};
								var error = function(o){
									new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
								};
								var data = "pid="+pid+"&form_key="+FORM_KEY;
					     	    new H.widget.asyncRequest().setURI(deleteUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
					        }
					    }
					});
				};
				var oTriggers = DOM.query('.J_Delete');
		    	Event.on(oTriggers, "click", deleteHandle);

		    	Event.on(DOM.query('.J_GetTemplet'), "click", function(){
		    		var getTempletHandle = function(o) {
		    			promodescControl.msg.hide();
		    			var cont = '<div><textarea style="width:380px;height:200px;margin:5px" id="J_Templet_Content" onclick="this.select()">'+o.payload+'</textarea></br><span class="btm-68-gray fl"><a href="#2"  class="J_Copy"><span>点此复制</span></a></span><span style="height:31px;line-height:31px">鼠标于框内CTRL+C：复制、CTRL+V：粘贴</span></div>';
						var TempletPanel = new O.Dialog({
						      width: 395,
						      headerContent: '获取海报代码',
						      bodyContent: cont,
						      mask: true,
						      align: {
						          points: ['cc', 'cc']
						      },
						      closable :true,
						      draggable: true,
						      aria:true
						  });
						TempletPanel.render();
						TempletPanel.show();
		    			H.util.clipboard('.J_Copy','#J_Templet_Content');
		    		};
		    		var error = function(o){
		    			promodescControl.msg.hide();
						new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
		    		};
		    		var pid = DOM.attr(this,'data');
		    		var data = "pid="+pid+"&form_key="+FORM_KEY;
		    		promodescControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'获取代码中，请稍候'	
								});
		     	    new H.widget.asyncRequest().setURI(getTempletUrl).setMethod("GET").setHandle(getTempletHandle).setErrorHandle(error).setData(data).send();

		    	});
		    	/*预览*/
			     var pop = new O.Popup({
			            elStyle : {
			                border : "1px solid gray"
			            },
			            effect : {
			                effect : "fade", //popup层显示动画效果，slide是展开，也可以"fade"渐变
			                duration : 0.5
			            }
			        });
		    	 Event.delegate(document,'mouseenter mouseleave','.J_PreviewTemplet', function(ev) {
						if(ev.type=='mouseenter'){
							 var id = DOM.attr(ev.currentTarget,'data');
							 var str = DOM.html('#J_PreviewContent_'+id);						    	
							// pop.set("content", DOM.create());
					    	 pop.set("content", str);
				    		 pop.set('align', {
				                 node : ev.currentTarget,
				                 points : ["tl", "br"],
				                 offset : [130, 0]
				             });
			    		 	pop.show();
						}else{
							pop.hide();
						}
		         });
			},
			//将活动中宝贝移除
			removePromotionItemHandle : function(promo_itemid,pidi,type) {
				if(!showPermissions('editor_promodesc','促销详情')){
					return ;
				}
				DOM.attr('#J_RemovePromotionItems','disabled',true);
				DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
				itemIds = [];
				if(promo_itemid && pidi){
					itemIds.push(promo_itemid);
					pid = pidi;
				}else{
					checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
					var len = checkBoxs.length;
					for(i=0; i<len; i++){
	                    if(checkBoxs[i].checked && !checkBoxs[i].disabled){
	                    	itemIds.push(checkBoxs[i].value);
	                    }
					}
				}
				if(itemIds.length == 0){
						new H.widget.msgBox({
								    title:"错误提示",
								    content:'未选择任何宝贝！',
								    type:"error",
									autoClose:true,
									timeOut :2000
								
								});
					DOM.attr('#J_RemovePromotionItems','disabled',false);
				    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
					return ;
				}
				
				var submitHandle = function(o) {
					DOM.attr('#J_RemovePromotionItems','disabled',false);
				    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
					if(promodescControl.paginator){
						promodescControl.paginator.toPage(promodescControl.paginator.page);
					}else{
						promodescControl.searchPromoItems();
					}
					
        	    };
        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			}
	}
	
	
	
	
}, {
    requires: ['utils/showPages/index','overlay']
});
