/*1300132236,169775557*/

if (window.CavalryLogger) { CavalryLogger.start_js(["g83A5"]); }

function EmuController(a,d,b,c){this.impression=d;this.context=b;this.flags=c;this.containerId=a;DataStore.set($(a),'emuController',this);return this;}copy_properties(EmuController,{fromContainer:function(a){var b=ge(a);if(!b)return null;return DataStore.get(b,'emuController');},getEventClass:function(a){return "emuEvent"+String(a).trim();}});copy_properties(EmuController.prototype,{EVENT_HANDLER_PATH:'/ajax/emu/end.php',CLICK:1,FAN:"fad_fan",FLAG_LOGGING_DISABLED_JAVASCRIPT:4,event:function(c,b,d,a){var e={eid:this.impression,f:this.flags,c:this.context,ui:this.containerId,en:c,a:1};if(b)e.ed=JSON.stringify(b);if(!a)var a=bagofholding;var f=new AsyncRequest().setURI(this.EVENT_HANDLER_PATH).setData(e).setErrorHandler(a);if(d)f.setHandler(d);f.send();},redirect:function(){var a={eid:this.impression,f:this.flags,c:this.context,ui:this.containerId,en:this.CLICK,a:0,sig:Math.floor(Math.random()*65535)+65536};if(a.f&this.FLAG_LOGGING_DISABLED_JAVASCRIPT)a.f-=this.FLAG_LOGGING_DISABLED_JAVASCRIPT;var b=new URI(this.EVENT_HANDLER_PATH);b.setQueryData(a);goURI(b);}});
var ShortClickHandlers={EVENT_NAME_CAME_BACK:'cameback',onclicked:function(a){if(this.onsite)return;if(a.button!==0||a.getModifiers().any)return;this.click_ts=(+new Date());if(this.listeners!==undefined)for(var b in this.listeners)this.listeners[b].remove();this.listeners={focus:Event.listen(window,'focus',ShortClickHandlers.oncameback.bind(this))};},oncameback:function(c){var b=(+new Date())-this.click_ts;this.listeners[c.type].remove();var a={click_ts:this.click_ts,length:b,trigger:c.type};this.sendData(ShortClickHandlers.EVENT_NAME_CAME_BACK,a);}};
function EmuTracker(a,c){this.base=EmuController.fromContainer(a);!this.base;this.onsite=c;var b=DOM.scry($(a),"a."+EmuController.getEventClass(EmuTracker.EVENT_CLICK));b.each(function(d){Event.listen(d,'click',ShortClickHandlers.onclicked.bind(this));}.bind(this));return this;}copy_properties(EmuTracker,{EVENT_CLICK:1});copy_properties(EmuTracker.prototype,{sendData:function(b,a){this.base.event(b,a);}});
function ads_refresh(k,g,f,h,l,j){if(window.ads_refreshing)return;if(l===undefined)l=0;if(j===undefined)j=0;var i=['sidebar_ads','home_sponsor_nile','ego'];var e=[];for(var d=0;d<i.length;d++)if(ge(i[d])||(i[d]=='ego'&&DOM.scry($('content'),'div.ego_column').length>0))e.push(i[d]);if(e.length===0)return;var c={page:g,queryId:j,tab:k,timestamp:(+new Date()),locations:e,photo_refresh:(h?'yes':'no'),cache:l};if(e.indexOf('ego')>=0)c.page_url=URI.getRequestURI().toString();var b=function(r){window.ads_refreshing=false;var m=r.getPayload();for(var q in m){if(q=='ego'){var n=DOM.scry($('content'),'div.ego_column');if(n.length>0){DOM.replace(n[0],HTML(m[q]));for(var p=1;p<n.length;++p)DOM.empty(n[p]);}continue;}var o=ge(q);if(o&&m[q].length>0)if(ua.ie()<7){o.outerHTML=m[q];}else DOM.replace(o,HTML(m[q]));}if(f)f(r);};var a=function(m){window.ads_refreshing=false;};new AsyncRequest().setURI('/ajax/location_refresh.php').setData(c).setOption('bundle',true).setHandler(b).setErrorHandler(a).send();window.ads_refreshing=true;}
var XD={_callbacks:[],_opts:{autoResize:false,allowShrink:true,channelUrl:null,hideOverflow:false,newResizeMethod:false,resizeTimeout:100,resizeWidth:false,expectResizeAck:false,resizeAckTimeout:6000},_lastResizeAckId:0,_resizeCount:0,_resizeTimestamp:0,init:function(a){this._opts=copy_properties(copy_properties({},this._opts),a);if(this._opts.autoResize)this._startResizeMonitor();Arbiter.subscribe('Connect.Unsafe.resize.ack',function(c,b){if(!b.id)b.id=this._resizeCount;if(b.id>this._lastResizeAckId)this._lastResizeAckId=b.id;}.bind(this),Arbiter.BEHAVIOUR_PERSISTANT);},send:function(b,a){a=a||this._opts.channelUrl;if(!a)return;if(a.substr(0,4)!='http')return;var h=a+'&'+URI.implodeQuery(b),d='f'+(Math.random()*(1<<30)).toString(16).replace('.',''),c=document.body.appendChild(document.createElement('div')),g=false;c.style.position='absolute';c.style.top='-10000px';c.style.width='1px';c.style.height='1px';XD._callbacks[d]=function(){if(g){(function(){c.parentNode.removeChild(c);}).defer(3000);delete XD._callbacks[d];}};if(ua.ie()){var e=('<iframe '+' src="'+h+'"'+' onload="XD._callbacks.'+d+'()"'+'></iframe>');c.innerHTML='<iframe src="javascript:false"></iframe>';g=true;(function(){c.innerHTML=e;}).defer();}else{var f=document.createElement('iframe');f.onload=XD._callbacks[d];c.appendChild(f);g=true;f.src=h;}},_computeSize:function(){var a=document.body,e=document.documentElement,h=0,f;if(this._opts.newResizeMethod){f=Math.max(Math.max(a.offsetHeight,a.scrollHeight)+a.offsetTop,Math.max(e.offsetHeight,e.scrollHeight)+e.offsetTop);}else{if(ua.ie()){f=Math.max(a.offsetHeight,a.scrollHeight)+a.offsetTop;}else f=e.offsetHeight+e.offsetTop;if(window.Dialog)f=Math.max(f,Dialog.max_bottom);}if(this._opts.resizeWidth){if(a.offsetWidth<a.scrollWidth){h=a.scrollWidth+a.offsetLeft;}else{var d=a.childNodes;for(var g=0;g<d.length;g++){var b=d[g];var c=b.offsetWidth+b.offsetLeft;if(c>h)h=c;}}if(XD.forced_min_width)h=Math.max(h,XD.forced_min_width);if(e.clientLeft>0)h+=(e.clientLeft*2);if(e.clientTop>0)f+=(e.clientTop*2);}return {width:h,height:f};},_startResizeMonitor:function(){var b,a=document.documentElement;if(this._opts.hideOverflow){a.style.overflow='hidden';document.body.style.overflow='hidden';}(function(){var f=this._computeSize();var g=new Date().getTime();var c=this._lastResizeAckId<this._resizeCount&&(g-this._resizeTimestamp)>this._opts.resizeAckTimeout;if(!b||(this._opts.expectResizeAck&&c)||(this._opts.allowShrink&&b.width!=f.width)||(!this._opts.allowShrink&&b.width<f.width)||(this._opts.allowShrink&&b.height!=f.height)||(!this._opts.allowShrink&&b.height<f.height)){b=f;this._resizeCount++;this._resizeTimestamp=g;var e={type:'resize',height:f.height,ackData:{id:this._resizeCount}};if(f.width&&f.width!=0)e.width=f.width;try{if(URI(document.referrer).isFacebookURI()&&window.parent!=window&&window.name&&window.parent.location&&URI(window.parent.location).isFacebookURI()){var iframes=window.parent.document.getElementsByTagName('iframe');for(var i in iframes)if(iframes[i].name==window.name){if(this._opts.resizeWidth)iframes[i].style.width=e.width+'px';iframes[i].style.height=e.height+'px';}}this.send(e);}catch(d){this.send(e);}}}).bind(this).recur(this._opts.resizeTimeout);}};var UnverifiedXD=copy_properties({},XD);
var Base64=(function(){var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';function d(e){e=(e.charCodeAt(0)<<16)|(e.charCodeAt(1)<<8)|e.charCodeAt(2);return String.fromCharCode(c.charCodeAt(e>>>18),c.charCodeAt((e>>>12)&63),c.charCodeAt((e>>>6)&63),c.charCodeAt(e&63));}var a='>___?456789:;<=_______'+'\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31'+'______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';function b(e){e=(a.charCodeAt(e.charCodeAt(0)-43)<<18)|(a.charCodeAt(e.charCodeAt(1)-43)<<12)|(a.charCodeAt(e.charCodeAt(2)-43)<<6)|a.charCodeAt(e.charCodeAt(3)-43);return String.fromCharCode(e>>>16,(e>>>8)&255,e&255);}return {encode:function(f){f=unescape(encodeURI(f));var e=(f.length+2)%3;f=(f+'\0\0'.slice(e)).replace(/[\s\S]{3}/g,d);return f.slice(0,f.length+e-2)+'=='.slice(e);},decode:function(g){g=g.replace(/[^A-Za-z0-9+\/]/g,'');var f=(g.length+3)&3,e;g=(g+'AAA'.slice(f)).replace(/..../g,b);g=g.slice(0,g.length+f-3);try{return decodeURIComponent(escape(g));}catch(e){throw new Error('Not valid UTF-8');}},encodeObject:function(e){return Base64.encode(JSON.stringify(e));},decodeObject:function(e){return JSON.parse(Base64.decode(e));},encodeNums:function(e){return String.fromCharCode.apply(String,e.map(function(f){return c.charCodeAt((f|-(f>63))&-(f>0)&63);}));}};})();
function ContextualDialog(b){var a=new Dialog();copy_properties(a,ContextualDialog.prototype);a._setFromModel(b);return a;}ContextualDialog.prototype={setContext:function(a){this._context=a;this._dirty();return this;},_buildDialogContent:function(){Bootloader.loadComponents('contextual-dialog-css',function(){CSS.addClass(this._obj,'contextual_dialog');this._content=this._frame=$N('div',{className:'contextual_dialog_content'});this._arrow=$N('div',{className:'arrow'});DOM.setContent(this._popup,[this._content,this._arrow]);}.bind(this));},_resetDialogObj:function(){if(!this._context)return;var a=Vector2.getElementPosition(this._context);var c=this._context.offsetWidth,b=this._context.offsetHeight;var d=a.x,e=a.y+b;if(c<64)d+=c/2-32;new Vector2(d,e,'document').setElementPosition(this._popup);},_renderDialog:function(a){if(window!=top)this._auto_focus=false;Dialog.prototype._renderDialog.call(this,a);}};
function ScrollingPager(d,c,a,b){this.scroll_loader_id=d;this.pagelet_src=c;this.data=a;this.options=b||{};if(this.options.target_id){this.target_id=this.options.target_id;this.options.append=true;}else this.target_id=d;this.handler=null;}ScrollingPager.prototype={register:function(){this.onvisible=new OnVisible($(this.scroll_loader_id),this.getHandler(),false,this.options.buffer,this.options);},getHandler:function(){if(this.handler)return this.handler;function a(){CSS.addClass($(this.scroll_loader_id).firstChild,'async_saving');UIPagelet.loadFromEndpoint(this.pagelet_src,this.target_id,this.data,this.options);}return a.bind(this);},setHandler:function(a){this.handler=a;}};

if (window.Bootloader) { Bootloader.done(["g83A5"]); }