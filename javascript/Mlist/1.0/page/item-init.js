/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,beautifyForm,Select) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return 	itemControl = {
		    	paginator : null,
		    	listItemsPaginator : null,
		    	msg : null,
		    	isTarget : false,
		    	
		    	currentMode : step,
		    	initFlag1 : false,
		    	initFlag2 : false,
		    	init : function() {
						
						itemControl.Form = new beautifyForm();
						//选择分类
					    promoSelect = new Select.Select({  
						    render:'#J_SelectItemCidBox',
					      	valueField:'#J_SelectItemCid',
					      	items:S.JSON.parse(sellerCats),
					      	visibleMode : 'display'
						});
						promoSelect.render();
						promoSelect.setSelectedValue('0'); 
						DOM.css(DOM.get('.bui-list-picker'),{'left':'-999px','top':'-999px'});
						// 全部 出售中 库中
						var Sellingitems = [
					      {text:'全部',value:'0'},
					      {text:'出售中',value:'1'},
					      {text:'库中',value:'2'}
					    ],
					    SellingSelect = new Select.Select({  
						    render:'#J_SelectItemSelling',
					      	valueField:'#J_SearchSelling',
					      	items:Sellingitems
						});
						SellingSelect.render();
						SellingSelect.setSelectedValue('0');
						
						
						//默认排序
						var items3 = [
							{text:'默认排序',value:'3'},
							{text:'上架时间:早',value:'0'},
							{text:'上架时间:晚',value:'1'}
								     
						],
						sortSelect = new Select.Select({  
							render:'#J_SelectItemSort',
							valueField:'#J_SelectItemSortHide',
							items:items3
						});
						sortSelect.render();
						sortSelect.setSelectedValue('0');
						sortSelect.on('change', function(ev){
							itemControl.searchTbItems();
						});
						 
						//状态
						var items4 = [
							{text:'状态',value:'0'},
							{text:'等待处理',value:'3'},
							{text:'处理失败',value:'4'},
							{text:'成功加入',value:'5'}
								     
						],
						statusSelect = new Select.Select({  
							render:'#J_SearchStatusBox',
							valueField:'#J_SearchStatus',
							items:items4
						});
						statusSelect.render();
						statusSelect.setSelectedValue(status);
						statusSelect.on('change', function(ev){
							itemControl.loadItems();
						});
						
						Event.on('.J_Tab','click',function(ev){
							var v =DOM.attr(ev.currentTarget,'data');
							if(v == '1'){
								itemControl.isTarget = false;
								itemControl.show('1');
							}else{
								if(itemControl.hasItems() && !itemControl.isTarget){
									itemControl.isTarget = true;
									new H.widget.msgBox({
									    title: "操作提示",
									    content: "将勾选的宝贝加入列表吗",
									    type: "confirm",
									    buttons: [{ value: "确定" }, { value: "取消" }],
									    success: function (result) {
									        if (result == "确定") {
									        	itemControl.addItems();
									        }
									    },
									    beforeClose: function () {Event.fire(DOM.query('.J_Tab')[1],'click')}
									});
									return  false;
								}
								itemControl.show('2');
							}
						})	
						Event.on('#J_RightSearchBtn','click',function(ev){
							if(itemControl.currentMode == '1'){
								itemControl.searchTbItems();
							} else if(itemControl.currentMode == '2'){
								itemControl.loadItems();
							}
						});	
						
						
						 Event.on(DOM.query('.J_Tiger'),'mouseenter mouseleave',function(ev){
		     	        	  if(ev.type == 'mouseenter'){
		     	        		  DOM.addClass(ev.currentTarget,'current');
		     	        	  }else{
		     	        		 DOM.removeClass(ev.currentTarget,'current');
		     	        	  }
		     	          })
		     	          Event.on(DOM.query('.J_Page'),'click',function(ev){
		     	        	  var v = DOM.attr(ev.currentTarget,'data');
			 					if (itemControl.currentMode == '1' ) {
			 						 DOM.removeClass(DOM.query('#J_TopLeft .J_Page'),'active');
			 						 DOM.addClass(ev.currentTarget,'active');
			 						DOM.html(DOM.get('#J_TopLeft .value'),v);
			 						 DOM.val('#J_SelectItemPage',v);
			     	        	   itemControl.searchTbItems();
			 					}else{
			 						DOM.removeClass(DOM.query('#J_TopRight .J_Page'),'active');
			 						DOM.addClass(ev.currentTarget,'active');
			 						DOM.html(DOM.get('#J_TopRight .value'),v);
			 						 DOM.val('#J_RightSelectItemPage',v);
			 						itemControl.loadItems();
			 					}
		     	          })
		     	          /*下一步*/
		     	         Event.on('#J_NextStep','click',function(ev){
		     	        	Event.fire(DOM.query('.J_Tab')[1],'click');
						 });	
						 /*上一步*/
		     	         Event.on('#J_BaceStep','click',function(ev){
		     	        	Event.fire(DOM.query('.J_Tab')[0],'click');
						 });
						 
						itemControl.show();
						 
						 
					var timeFunName = null;
			        Event.delegate(document,'click dblclick','.J_TopAddToPromo',function(ev){
			        	if(isVersionPer('material')){
			                    return ;
			            }
			        	var id = DOM.attr(ev.currentTarget,'data');
			        	if(ev.type == 'click'){
				        	 clearTimeout(timeFunName);
				        	 timeFunName = setTimeout(function () {
		                         //console.log('单击');
		                     	if(id == '1'){
		                     		itemControl.addItems()
								}else{
									itemControl.batchAddItems();
								}
		                      }, 300); 
			        	}if(ev.type == 'dblclick') {
	                    	 clearTimeout(timeFunName); 
	                    	 //console.log('双击');
	                    	 if(id == '1'){
		                     	itemControl.addItems()
							 }else{
								itemControl.batchAddItems();
							 }
	                     }
	                });
		    	    Event.on("#J_TopCheckAll", "click", itemControl.checkAll);
		    	    Event.on("#J_BottonCheckAll", "click", itemControl.checkAll);
		    	    
		    	    Event.on("#J_RightCheckAll", "click", itemControl.rightCheckAll);
		    	    Event.on("#J_RightBottonCheckAll", "click", itemControl.rightCheckAll);
		    	    
		    	    Event.on("#J_RemoveItems", "click", itemControl.removeItems);
		    	    Event.on('#J_BatchRetry','click',itemControl.batchRetry); //从批量重试
		        },
		    	show : function(mode){
		        	if( typeof(mode) != 'undefined'){
		        		itemControl.currentMode = mode;
		        	}else{
		        		mode = itemControl.currentMode;
		        	}
		        	DOM.removeClass('.J_Tab','current');
					if (mode == '1' ) {
						if(!itemControl.initFlag1){
							if(isRelayTasks == 0){
								itemControl.searchTbItems();
							}
							itemControl.initFlag1 = true;
						}
						DOM.show('.J_Seach_1');
						DOM.hide('.J_Seach_2');
						DOM.addClass(DOM.query('.J_Tab')[0],'current');
						DOM.get('#main-content-div-1').style.display = '';
						DOM.get('#main-content-div-2').style.display = 'none';
					}
					if (mode == '2') {
						if(!itemControl.initFlag2){
							itemControl.loadItems();
							itemControl.initFlag2 = true;	
						}
						DOM.addClass(DOM.query('.J_Tab')[1],'current');
						DOM.show('.J_Seach_2');
						DOM.hide('.J_Seach_1');
						DOM.get('#main-content-div-1').style.display = 'none';
						DOM.get('#main-content-div-2').style.display = '';
					}
				},
				 searchTbItems : function() {
		            var submitHandle = function(o) {
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.css(DOM.get('#J_LEmpty') ,'display','none');
							DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
						} else {
							DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
							DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
						}
						itemControl.renderItems(o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						itemControl.paginator = new showPages('itemControl.paginator').setRender(itemControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
						itemControl.paginator.setPageCount(pageCount).printHtml('#J_TopPaging',3);
		    	    };
		        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
					var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	    	
		    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
		            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
							data +="&id="+listId;
		    	    	if (type == 0) {
							//价格区间
							var startPrice = DOM.val(DOM.get("#J_StartPrice"));
							var endPrice = DOM.val(DOM.get("#J_EndPrice"));
							data += "&start_price="+startPrice+"&end_price="+endPrice;
						}
		 			DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				renderItems: function(c) {
		    	    DOM.html(DOM.get("#J_TbItemList"), c);
		        	var lis = DOM.query("#J_TbItemList .J_TbItem");
		        	Event.on(lis, "mouseenter mouseleave click", function(ev){
		        		var el = DOM.get('.J_CheckBox',ev.currentTarget);
		        		if(el.disabled) return;
		        		if(ev.type == 'mouseenter'){
							DOM.addClass(ev.currentTarget,'current');
		        		}else if(ev.type == 'mouseleave'){
							DOM.removeClass(ev.currentTarget,'current');
						}
		        	});
		        	itemControl.Form.setCheckboxOff(DOM.get('#J_BottonCheckAll'));
    				itemControl.Form.setCheckboxOff(DOM.get('#J_TopCheckAll'));
		        	itemControl.Form.renderAll('#J_TbItemList');
		        	DOM.html('#J_SeletedNum',0);
		        	Event.on(DOM.query('#J_TbItemList .J_CheckBox'),'click',function(ev){
		        		//ev.stopPropagation();
		        		var checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
	        			var len = checkBoxs.length;
	        			var j = 0 ;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(checkBoxs[i].checked){
								j++;
							} 
						}
		        		DOM.html('#J_SeletedNum',j);
		        		var iid = ev.currentTarget.value;
		        		if(this.checked){
		        			var checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
		        			var len = checkBoxs.length;
		        			var allFlag = true;
		        			for(i=0; i<len; i++){
								if(checkBoxs[i].disabled) continue;
								if(!checkBoxs[i].checked){
									allFlag = false;
									break;
								} 
							}
		        			if(allFlag){
		        				itemControl.Form.setCheckboxOn(DOM.get('#J_BottonCheckAll'));
								itemControl.Form.setCheckboxOn(DOM.get('#J_TopCheckAll'));
		        			}
		        		}else{
		        			itemControl.Form.setCheckboxOff(DOM.get('#J_BottonCheckAll'));
		        			itemControl.Form.setCheckboxOff(DOM.get('#J_TopCheckAll'));
		        		}
		        	});
				},
				
		    	handlePagination : function(turnTo) {
			    	pageId = turnTo;
		    		var submitHandle = function(o) {
		    			 totalRecords = o.payload.totalRecords;
		 				if(totalRecords > 0){
		 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
		 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
		 				} else {
		 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
		 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
		 				}
		 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
		    			itemControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
						itemControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
		        	    itemControl.renderItems(o.payload.body);
		 				DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent'); 
			    	};
			    		 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
					var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	    	
		    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
		            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
							data +="&id="+listId;
		    	    	if (type == 0) {
							//价格区间
							var startPrice = DOM.val(DOM.get("#J_StartPrice"));
							var endPrice = DOM.val(DOM.get("#J_EndPrice"));
							data += "&start_price="+startPrice+"&end_price="+endPrice;
						}
			           data += "&page_id="+pageId;
					   DOM.show('#J_LeftLoading');
						DOM.hide('#J_MainLeftContent');
		    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				checkAll : function(e) {
					//e.stopPropagation();
					checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
					len = checkBoxs.length;
					for(i=0; i<len; i++){
						var iid = checkBoxs[i].value;
						if(checkBoxs[i].disabled) continue;
						if(this.checked){
							if(e.currentTarget.id == 'J_TopCheckAll'){
								itemControl.Form.setCheckboxOn(DOM.get('#J_BottonCheckAll'));
							}else{
								itemControl.Form.setCheckboxOn(DOM.get('#J_TopCheckAll'));
							}
							itemControl.Form.setCheckboxOn(checkBoxs[i]);
							DOM.html('#J_SeletedNum',DOM.val('#J_SelectItemPage'));
						} else {
							if(e.currentTarget.id == 'J_TopCheckAll'){
								itemControl.Form.setCheckboxOff(DOM.get('#J_BottonCheckAll'));
							}else{
								itemControl.Form.setCheckboxOff(DOM.get('#J_TopCheckAll'));
							}
							itemControl.Form.setCheckboxOff(checkBoxs[i]);
							DOM.html('#J_SeletedNum',0);
						}
					}
				},
				hasItems: function() {
					checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
					var len = checkBoxs.length;
					var flag = false;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
							flag = true ;
							break;
						}
		            }
					return flag;
					
				},
				addItems: function() {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					DOM.attr('#J_TopAddItems','disabled',true);
					DOM.addClass('#J_TopAddItems','button-disabled');
					checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
					var json = [];
					var itemXml = '';
					var len = checkBoxs.length;
					var error = false;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
		                    var id = checkBoxs[i].value;
		                    var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
		    				var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
		    				var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
							var outId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
		                    o = '{"id":"' + id + '", "outer_id":"' + outId + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"' + picUrl +'"}';
		                    o = eval('(' + o + ')');
		                    json.push(o);
						}
		            }
					if(json.length == 0){
		   			   new H.widget.msgBox({
						    title:"错误提示",
						    content:'未选择任何宝贝'	,
						    autoClose:true,
						    timeOut:1000
						});
						DOM.attr('#J_TopAddItems','disabled',false);
						DOM.removeClass('#J_TopAddItems','button-disabled');
						return;
					}
		            var itemsJson = KISSY.JSON.stringify(json);
		            var submitHandle = function(o) {
		            	DOM.attr('#J_TopAddItems','disabled',false);
		            	DOM.removeClass('#J_TopAddItems','button-disabled');
						if (o.payload.limit != null) {
							new H.widget.msgBox({
							    title:"操作失败",
							    content:o.payload.limit,
							    type:"error"
							});
						}
		   			    new H.widget.msgBox({
						    type:"sucess",
							dialogType : 'msg',
						    content:'宝贝成功加入活动',
						    autoClose:true,
						    timeOut:2000
						});
						if(itemControl.paginator){
							itemControl.paginator.toPage(itemControl.paginator.page);
						}else{
							itemControl.searchTbItems();
						}
		    	    };
		    	    var errorHandle = function(o) {
		    	    	DOM.attr('#J_TopAddItems','disabled',false);
		    	    	DOM.removeClass('#J_TopAddItems','button-disabled');
						 new H.widget.msgBox({
						    type:"error",
						    content:o.desc
						});
		        	};
		     	    var data = "id="+listId+"&items="+itemsJson+"&form_key="+FORM_KEY;
		    	    new H.widget.asyncRequest().setURI(addItemsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				},
		        batchAddItems: function() {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
		        	var submitHandle = function(o) {
						 itemControl.msg.hide(); 
						 new H.widget.msgBox({
						    type:"sucess",
							dialogType : 'msg',
						    content:'操作成功',
						    autoClose:true,
						    timeOut:2000
						});
		        		S.later(function(){window.location.reload();},1000,false ,null,null);
		        	};
		            var data = "&id="+listId;
		    		var cid = DOM.val(DOM.get("#J_SelectItemCid"));
		    		if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		    			var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		        	}else{
		        	    var title ='';
		        	}
			    	var type = DOM.val(DOM.get("#J_SearchSelling"));
			    	data += "&title="+title+"&cid="+cid+"&type="+type;
		    	    var startPrice = DOM.val(DOM.get("#J_StartPrice"));
		    	    var endPrice = DOM.val(DOM.get("#J_EndPrice"));
		    	    data += "&start_price="+startPrice+"&end_price="+endPrice;
					
		        	DOM.attr('#J_TopBatchAddItems','disabled',true);
		        	DOM.addClass('#J_TopBatchAddItems','button-disabled');
	   			    itemControl.msg = new H.widget.msgBox({
						dialogType : 'loading',
					    content:'系统正在处理，请稍候'
					});
		        	new H.widget.asyncRequest().setURI(batchAddItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
		       
				forceDelItem : function(itemId) {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					var submitHandle = function(o) {
							itemControl.msg.hide();
		        	    	if(itemControl.listItemsPaginator){
								itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
							}else{
								itemControl.loadItems();
							}
					};
					var data = "list_item_id="+itemId;
	   			   itemControl.msg = new H.widget.msgBox({
						dialogType : 'loading',
					    content:'强制删除中，请稍候'
					});				
		    	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				
				retry : function(itemId) {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					var submitHandle = function(o) {
						itemControl.msg.hide();
		        	    if(itemControl.listItemsPaginator){
							itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
						}else{
							itemControl.loadItems();
						}
					};
					var data = "list_item_id="+itemId;
	   			    itemControl.msg = new H.widget.msgBox({
						dialogType : 'loading',
					    content:'系统正在处理中，请稍候'
					});					
		    	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				
				batchRetry :function(){
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					var submitHandle = function(o) {
						itemControl.msg.hide();
						if(itemControl.paginator){
							itemControl.paginator.toPage(itemControl.paginator.page);
						}else{
							itemControl.searchTbItems();
						}
					};
					var data = "id="+listId;
	   			    itemControl.msg = new H.widget.msgBox({
						dialogType : 'loading',
					    content:'系统正在处理中，请稍候'
					});					
		    	    new H.widget.asyncRequest().setURI(batchRetryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					
				},
		    	loadItems :function() {
			    	var submitHandle = function(o) {
		        	    totalRecords = o.payload.totalRecords;
		        	    
		        	    DOM.html('#J_SucessNum',totalRecords);
		        	    if(totalRecords > 0){
							DOM.css(DOM.get('#J_REmpty'), 'display','none');	
							DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display','');
						} else {
							DOM.css(DOM.get('#J_REmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display' ,'none');
						}
		        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
		        	    itemControl.renderPromoItems()
		        	    var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
		    	    	itemControl.listItemsPaginator = new showPages('itemControl.listItemsPaginator').setRender(itemControl.listItemsPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
		    	    	itemControl.listItemsPaginator.setPageCount(pageCount).printHtml('#J_TopRightPaging',3);
		    	    	DOM.hide('#J_RightLoading');
						DOM.show('#J_MainRightContent');
		    	    }
					if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
					var status = DOM.val(DOM.get('#J_SearchStatus'));
			    	var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		    	    var data = "q="+title+"&status="+status+"&pageSize="+itemPage+"&id="+listId;
		 			DOM.show('#J_RightLoading');
					DOM.hide('#J_MainRightContent');
		    	    new H.widget.asyncRequest().setURI(loadItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				listItemsPaginationHandle : function(turnTo) {
					pageId = turnTo;
		    		var submitHandle = function(o) {
		    			totalRecords = o.payload.totalRecords;
		    			 DOM.html('#J_SucessNum',totalRecords);
		        	    if(totalRecords > 0){
							DOM.css(DOM.get('#J_REmpty'), 'display','none');	
							DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display','');
						} else {
							DOM.css(DOM.get('#J_REmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display' ,'none');
						}
		        	    var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
		    			itemControl.listItemsPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
		    			itemControl.listItemsPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopRightPaging',3);
		    			DOM.html(DOM.get("#J_PromotionItemList") , o.payload.body);
		    			itemControl.renderPromoItems()
		 				DOM.hide('#J_RightLoading');
						DOM.show('#J_MainRightContent');
			    	};
			    	if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
					var status = DOM.val(DOM.get('#J_SearchStatus'));
			    	var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		    	    var data = "q="+title+"&status="+status+"&pageSize="+itemPage+"&id="+listId+"&page_id="+pageId;
					DOM.show('#J_RightLoading');
					DOM.hide('#J_MainRightContent');
		    	    new H.widget.asyncRequest().setURI(loadItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				renderPromoItems : function(){
					var lis = DOM.query("#J_PromotionItemList .J_TbItem");
		        	Event.on(lis, "mouseenter mouseleave click", function(ev){
		        		var el = DOM.get('#'+ev.currentTarget.id+' .J_CheckBox');
		        		if(el.disabled) return;
		        		if(ev.type == 'mouseenter' || ev.type == 'mouseleave'){
		        			DOM.toggleClass(ev.currentTarget, 'current');
		        		}
//		        		else if(ev.type == 'click'){
//		        			if(el.checked == false){
//		        				el.checked = true;
//		        				itemControl.Form.setCheckboxOn(el)
//		        			}else{
//		        				itemControl.Form.setCheckboxOff(DOM.get('#J_RightBottonCheckAll'));
//			        			itemControl.Form.setCheckboxOff(DOM.get('#J_RightCheckAll'));
//		        				el.checked = false;
//		        				itemControl.Form.setCheckboxOff(el)
//		        			}
//		        		}
		        	})
		        	itemControl.Form.setCheckboxOff(DOM.get('#J_RightBottonCheckAll'));
    				itemControl.Form.setCheckboxOff(DOM.get('#J_RightCheckAll'));
    				itemControl.Form.renderAll('#J_PromotionItemList');
		        	
		        	Event.on(DOM.query('#J_PromotionItemList .J_CheckBox'),'click',function(ev){
		        		//ev.stopPropagation();
		        		var iid = ev.currentTarget.value;
		        		if(this.checked){
		        			var checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
		        			var len = checkBoxs.length;
		        			var allFlag = true;
		        			for(i=0; i<len; i++){
								if(checkBoxs[i].disabled) continue;
								if(!checkBoxs[i].checked){
									allFlag = false;
									break;
								} 
							}
		        			if(allFlag){
		        				itemControl.Form.setCheckboxOn(DOM.get('#J_RightBottonCheckAll'));
								itemControl.Form.setCheckboxOn(DOM.get('#J_RightCheckAll'));
		        			}
		        		}else{
		        			itemControl.Form.setCheckboxOff(DOM.get('#J_RightBottonCheckAll'));
		        			itemControl.Form.setCheckboxOff(DOM.get('#J_RightCheckAll'));
		        		}
		        	});
		        		
				},
				retryHandle : function(e) {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					var id = DOM.attr(this,'data');
					var submitHandle = function(o) {
						if(itemControl.listItemsPaginator){
							itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
						}else{
							itemControl.loadItems();
						}
					}
		    	    var data = "list_item_id="+id+"&form_key="+FORM_KEY;
		    	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
				},
				
				removeItems : function(e) {
					if(!showPermissions('editor_material','促销素材')){
						return ;
					}
					DOM.attr('#J_RemoveItems','disabled',true);
					DOM.addClass('#J_RemoveItems','button-disabled');
					e.preventDefault();
					itemIds = [];
					checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
					len = checkBoxs.length;
					for(i=0; i<len; i++){
		                if(checkBoxs[i].checked && !checkBoxs[i].disabled){
		                	itemIds.push(checkBoxs[i].value);
		                }
					}
					if(itemIds.length == 0){
		   			   new H.widget.msgBox({
						    title:"错误提示",
						    content:'未选择任何宝贝'	,
						    autoClose:true,
						    timeOut:1000
						});
						DOM.attr('#J_RemoveItems','disabled',false);
						DOM.removeClass('#J_RemoveItems','button-disabled');
						return;
					}
					var submitHandle = function(o) {
						DOM.attr('#J_RemoveItems','disabled',false);
						DOM.removeClass('#J_RemoveItems','button-disabled');
						if(itemControl.listItemsPaginator){
							itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
						}else{
							itemControl.loadItems();
						}
			   			   new H.widget.msgBox({
							    title:"",
								dialogType : 'loading',
							    content:'已成功添加任务，稍后即可同步到淘宝，可刷新页面查看状态'	,
							    autoClose:true,
							    timeOut:2000
							});
		    	    };
		    	    var data = "id="+listId+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
		    	    new H.widget.asyncRequest().setURI(removeItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
				},
				rightCheckAll : function(e) {
					//e.stopPropagation();
					checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
					len = checkBoxs.length;
					for(i=0; i<len; i++){
						var iid = checkBoxs[i].value;
						if(checkBoxs[i].disabled) continue;
						if(this.checked){
							if(e.currentTarget.id == 'J_RightCheckAll'){
								itemControl.Form.setCheckboxOn(DOM.get('#J_RightBottonCheckAll'));
							}else{
								itemControl.Form.setCheckboxOn(DOM.get('#J_RightCheckAll'));
							}
							itemControl.Form.setCheckboxOn(checkBoxs[i]);
						} else {
							if(e.currentTarget.id == 'J_RightCheckAll'){
								itemControl.Form.setCheckboxOff(DOM.get('#J_RightBottonCheckAll'));
							}else{
								itemControl.Form.setCheckboxOff(DOM.get('#J_RightCheckAll'));
							}
							itemControl.Form.setCheckboxOff(checkBoxs[i]);
						}
					}
				}
		}
}, {
    requires: ['utils/showPages/index','utils/beautifyForm/index','bui/select']
});