(function(){var a=KISSY;window.FB=window.FB||{config:function(b){b.path||(b.path=""),b.path=b.path.replace(/\/$/,"");var c=[],d={},e=a.substitute("{path}/{name}/{version}/",b),f=b.debug?!0:KISSY.Config.debug,g=a.substitute("{path}/{name}/{pub}/",b);a.mix(d,b,!0,["charset","tag"]),c.push(a.merge(d,{name:"common",path:b.path})),c.push(a.merge(d,{name:"gallery",path:"http://a.tbcdn.cn/s/kissy"})),f&&(c.push(a.merge(d,{name:"utils",path:b.path})),a.Config.debug=!0),c.push(a.merge(d,{name:"1.0",path:b.oldpath})),c.push(a.merge(d,{name:"page",path:f?e:g})),a.config({packages:c})}},window.FUNCTIONLIMIT=!1,window.PAGECONFIG={pub:"20130312",Mcore:"20130421",Mcare:"20130417",Mcrm:"20130320",Micon:"20130411",Mlist:"",Mmaterial:"20130419",Mmember:"20130331",Moptim:"20130506",Mpoint:"",Mpromodesc:"",Mpromoprops:"20130321",Mpromotion:"20130426",Mratedesc:"",Msmart:"20130429",Msub:"",Mtool:"20130420",Mudp:"",Mshopreport:"20130321",Mperformance:"20130403"}})(); 