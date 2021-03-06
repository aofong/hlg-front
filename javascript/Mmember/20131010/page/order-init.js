/*
combined files : 

utils/showPages/index
page/order-init

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
KISSY.add('page/order-init',function (S,showPages,Overlay,Uploader,DefaultTheme) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return orderControl = {
	    	paginator : null,
	    	msg :null,
	    	dialog : null,
	    	isFisrst : true,
	    	init : function() {
		
		
	     //上传组件插件
        var plugins = 'gallery/uploader/1.4/plugins/auth/auth,' +
                'gallery/uploader/1.4/plugins/urlsInput/urlsInput,' +
                'gallery/uploader/1.4/plugins/proBars/proBars';

        S.use(plugins,function(S,Auth,UrlsInput,ProBars){
            var uploader = new Uploader('#J_UploaderBtn',{
                //处理上传的服务器端脚本路径
                action:uploaderFileUrl
            });
            //使用主题
            uploader.theme(new DefaultTheme({
                queueTarget:'#J_UploaderQueue'
            }))
                    //验证插件
            uploader.plug(new Auth({
                        //最多上传个数
                        max:3,
                        //图片最大允许大小
                        maxSize:1048576
                    }))
                     //url保存插件
                    .plug(new UrlsInput({target:'#J_Urls'}))
                    //进度条集合
                    .plug(new ProBars());
            
    		uploader.on("success", function (ev) {
    			
					//window.location.href= curentUrl;
					new H.widget.msgBox({ 
						type: "sucess", 
						content: "上传成功",
						dialogType:"msg", 
						autoClose:true, 
						timeOut:3000
					});
    			
    			
    		})
    		uploader.on("error", function (ev) {
    			//前端验证返回的失败
    			if(ev.status == -1 ){
    				new H.widget.msgBox({
    				    title:"错误提示",
    				    content:ev.msg,
    				    type:"error"
    				});
    			}else{
    				if(!ev.result.error){
    					new H.widget.msgBox({ 
    						type: "sucess", 
    						content: "上传成功",
    						dialogType:"msg", 
    						autoClose:true, 
    						timeOut:3000
    					});
    					window.location.href= curentUrl;
    				}else{
    					new H.widget.msgBox({
    					    title:"错误提示",
    					    content:ev.result.desc,
    					    type:"error"
    					});
    					DOM.hide('#J_UploaderQueue');
    				}
    			}
    		})
        });
		
		
		
		
		
		
		
		
		
		
		
		
		
		
				Event.delegate(document,'click','.J_Delete',function(ev){
					var file_id = DOM.attr(ev.currentTarget,'data');  
	        		if(!orderControl.dialog){
	        			orderControl.dialog = new Overlay.Dialog({
		     	            title:'删除',
		     	            width:220,
		     	            height:160,
		     	            mask:false,
		     	            buttons:[
			     	                   {
			     	                     text:'确定',
			     	                     elCls : 'bui-button bui-button-primary',
			     	                     handler : function(){
			     	                       this.hide();
			     	                     }
			     	                   },{
			     	                     text:'取消',
			     	                     elCls : 'bui-button',
			     	                     handler : function(){
			     	                       this.hide();
			     	                     }
			     	                   }
		     	                 ],
		     	            
		     	            bodyContent:'确定删除？'
	     	          });
	        	 }
     	         orderControl.dialog.show();
     	         Event.on('.bui-button-primary','click',function(){
 	         	    var submitHandle = function(o){
 						new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "删除成功",
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
 						window.location.reload();
	         	    };		     	        	 
 	         	    var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
	         	    };
     	        	data = 'file_id='+file_id;
	         	    new H.widget.asyncRequest().setURI(deleteFileUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
     	         })
				});
	        }

}
   
}, {
    requires: ['utils/showPages/index','bui/overlay','gallery/uploader/1.4/index','gallery/uploader/1.4/themes/default/index','gallery/uploader/1.4/themes/default/style.css']
});
