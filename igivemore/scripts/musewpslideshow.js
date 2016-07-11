/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2012 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(a,b,c,d,f){c.Plugins.SlideShowCaptions={defaultOptions:{captionClassName:"SSSlideCaption"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(a){var b=a._findWidgetElements("."+a.options.captionClassName);if(b.length)a._sscpCaptions=b,b.css("display","none"),a.slides.bind("wp-panel-show",function(a,c){b.eq(c.panelIndex).css("display","block")}),a.slides.bind("wp-panel-hide",
function(a,c){b.eq(c.panelIndex).css("display","none")}),a.bind("ready",function(){b.eq(a.slides.activeIndex).css("display","block")})}};c.Plugins.SlideShowLabel={defaultOptions:{labelClassName:"SlideShowLabel"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(a){var b=this,c=a._findWidgetElements("."+a.options.labelClassName);if(c.length)a._$sslpLabels=c,a.slides.bind("wp-panel-show",
function(){b._updateLabels(a)}),a.bind("ready",function(){b._updateLabels(a)})},_findAllTextNodes:function(a,b){b=b||[];switch(a.nodeType){case 3:b.push(a);break;case 1:if(a.nodeName.toLowerCase()!=="script")for(var c=a.firstChild;c;)this._findAllTextNodes(c,b),c=c.nextSibling}a.nextSibling&&this._findAllTextNodes(a.nextSibling,b);return b},_updateLabels:function(a){var b=this,c=a.slides,d=c.activeIndex+1,f=c.$element.length;a._$sslpLabels.each(function(){for(var a=b._findAllTextNodes(this),c=a.length,
h=0,g=function(a){return++h===1?d:h===2?f:a},n=0;n<c;n++){var o=a[n],s=o.nodeValue,u=s.replace(/\d+/g,g);if(u!==s)o.nodeValue=u}})}};c.Plugins.Lightbox={defaultOptions:{lightboxPartsSelector:".PamphletLightboxPart",closeBtnClassName:"PamphletCloseButton"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b._sslbpAutoPlay=c.autoPlay;c.autoPlay=!1;b.bind("before-transform-markup",function(){d._beforeTransformMarkup(b)});b.bind("attach-behavior",function(){d._attachBehavior(b)})},
_beforeTransformMarkup:function(a){a._sslbpShownInitially=!0;var b=a._findWidgetElements("."+a.options.slideClassName);if(b.filter(":hidden").length==0)a._sslbpSlideOffset=b.offset();else{a._sslbpShownInitially=!1;var d=a._findWidgetElements("."+a.options.viewClassName);a._sslbpSlideOffset={top:c.Utils.getCSSIntValue(d,"top")+c.Utils.getCSSIntValue(b,"top"),left:c.Utils.getCSSIntValue(d,"left")+c.Utils.getCSSIntValue(b,"left")}}},_attachBehavior:function(a){var b=this,d=a.options;a.tabs.$element.bind(d.event,
function(){b._openLightbox(a)});a.slides.bind("wp-panel-before-show",function(){b._openLightbox(a)});if(c.Browser.Features.Touch&&d.fullScreen)a.slides.$element.not("a[href]").on("click",function(){b._closeLightbox(a)});a._$sslbpCloseBtn=a._findWidgetElements("."+d.closeBtnClassName).bind("click",function(){b._closeLightbox(a)});b._initializeMarkup(a)},_initializeMarkup:function(b){var d=b.options,f=b._findWidgetElements("."+d.viewClassName),j=b.slides.$element,i=f,m=b._sslbpSlideOffset,l=j.outerWidth(),
p=j.outerHeight(),q=b._findWidgetElements(d.lightboxPartsSelector),i=a(f[0].parentNode).filter("."+d.clipClassName);i.length===0&&(i=f);q.each(function(d,f){var g=a(f);if(g.css("position")!=="fixed"){var i=b._sslbpShownInitially?g.offset():{top:c.Utils.getCSSIntValue(g,"top"),left:c.Utils.getCSSIntValue(g,"left")};g.css({left:i.left-m.left,top:i.top-m.top})}}).addClass("popup_element");var n=a('<div id="'+(f.attr("id")||"")+'"></div>').css({left:0,top:0,width:"auto",height:"auto",padding:0,margin:0,
zIndex:"auto"}),o;d.fullScreen&&(o=a('<div class="fullScreenContent fullscreen"/>'),o.css({paddingLeft:f.css("padding-left"),paddingRight:f.css("padding-right"),paddingTop:f.css("padding-top"),paddingBottom:f.css("padding-bottom"),borderColor:f.css("border-left-color"),borderStyle:f.css("border-left-style"),borderLeftWidth:f.css("border-left-width"),borderRightWidth:f.css("border-right-width"),borderTopWidth:f.css("border-top-width"),borderBottomWidth:f.css("border-bottom-width")}),o.append(i),n.css({border:"none"}));
f.removeAttr("id");var s=a("<div class='overlayWedge'></div>").insertBefore(j[0]);n.append(f.children().not("."+d.slideClassName));f.append(j);n.css({visibility:"hidden"}).appendTo(document.body);var f=n.outerWidth(),u=n.outerHeight();n.detach().css({visibility:""});i.css({position:d.fullScreen?"relative":"absolute",padding:0,left:0,top:0,borderWidth:0,background:"none"});d.fullScreen||i.css({width:l,height:p});d.transitionStyle==="fading"&&j.css({position:"absolute",left:0,top:0});var x;if(b._fstpPositionSlides||
b._csspResizeFullScreenImages)x=function(a,c){b._fstpPositionSlides&&b._fstpPositionSlides(a,c);b._csspResizeFullScreenImages&&b._csspResizeFullScreenImages(b,b.slides.$element,d.heroFitting)};l=-l/2;p=-p/2;i=a("<div class='LightboxContent'></div>").css({position:"absolute"}).append(d.fullScreen?o:i).append(q).museOverlay({autoOpen:!1,offsetLeft:l,offsetTop:p,overlayExtraWidth:f,overlayExtraHeight:u,$overlaySlice:n,$overlayWedge:s,onClose:function(){b.stop()},$fullScreenContent:o,resizeSlidesFn:x});
if(a.browser.msie&&a.browser.version<9){var v=n[0];c.Utils.needPIE(function(){PIE.detach(v);PIE.attach(v)})}b._$sslbpOverlay=i;b._csspIsImageSlideShow||j.each(function(){c.Utils.detachIframesAndObjectsToPauseMedia(a(this))})},_openLightbox:function(b){var d=b._$sslbpOverlay;d.data("museOverlay").isOpen||(d.museOverlay("open"),b._sslbpAutoPlay&&b.play());b._csspIsImageSlideShow||c.Utils.attachIframesAndObjectsToResumeMedia(a(b.slides.activeElement))},_closeLightbox:function(b){b._$sslbpOverlay.data("museOverlay").isOpen&&
(b.stop(),b._$sslbpOverlay.museOverlay("close"),b._csspIsImageSlideShow||c.Utils.detachIframesAndObjectsToPauseMedia(a(b.slides.activeElement)))}};c.Plugins.ContentSlideShow={defaultOptions:{displayInterval:3E3,transitionDuration:500,transitionStyle:"fading",contentLayout_runtime:"stack",event:"click",deactivationEvent:"none",hideAllContentsFirst:!1,shuffle:!1},slideShowOverrides:{slideshowClassName:"SlideShowWidget",viewClassName:"SlideShowContentPanel",slideClassName:"SSSlide",slideLinksClassName:"SSSlideLinks",
slideLinkClassName:"SSSlideLink",slideLinkActiveClassName:"SSSlideLinkSelected",slideCountClassName:"SSSlideCount",firstBtnClassName:"SSFirstButton",lastBtnClassName:"SSLastButton",prevBtnClassName:"SSPreviousButton",nextBtnClassName:"SSNextButton",playBtnClassName:"SSPlayButton",stopBtnClassName:"SSStopButton",closeBtnClassName:"SSCloseButton",heroFitting:"fitContentProportionally",thumbFitting:"fillFrameProportionally",lightboxPartsSelector:".SlideShowCaptionPanel, .SSFirstButton, .SSPreviousButton, .SSNextButton, .SSLastButton, .SlideShowLabel, .SSCloseButton",
lightboxEnabled_runtime:!1,fullScreen:!1},compositionOverrides:{slideshowClassName:"PamphletWidget",viewClassName:"ContainerGroup",slideClassName:"Container",slideLinkClassName:"Thumb",slideLinkActiveClassName:"PamphletThumbSelected",prevBtnClassName:"PamphletPrevButton",nextBtnClassName:"PamphletNextButton",closeBtnClassName:"PamphletCloseButton",lightboxPartsSelector:".PamphletLightboxPart"},initialize:function(d,f){var g=this,j=d.$element.hasClass("SlideShowWidget"),i=j?g.slideShowOverrides:g.compositionOverrides;
d._csspIsImageSlideShow=j;d._csspIsDynamicSlideshow=j&&d.$element.parent().hasClass("mu-query");a.extend(f,a.extend({},g.defaultOptions,i,f));if(f.hideAllContentsFirst)f.defaultIndex=-1;if(f.lightboxEnabled_runtime)f.contentLayout_runtime="lightbox";if(f.fullScreen)d._csspPositionImage=g._positionImage;j&&(b.Widget.ContentSlideShow.slideImageIncludePlugin.initialize(d,f),c.Plugins.SlideShowLabel.initialize(d,f),c.Plugins.SlideShowCaptions.initialize(d,f));f.transitionStyle=="fading"?b.Widget.ContentSlideShow.fadingTransitionPlugin.initialize(d,
f):c.Browser.Features.Touch&&c.Browser.Features.Touch.Start=="touchstart"&&f.enableSwipe===!0?b.Widget.ContentSlideShow.swipeTransitionPlugin.initialize(d,f):b.Widget.ContentSlideShow.filmstripTransitionPlugin.initialize(d,f);if(f.contentLayout_runtime==="lightbox"){if(f.fullScreen)d._csspResizeFullScreenImages=g._resizeFullScreenImages;c.Plugins.Lightbox.initialize(d,f)}f.shuffle===!0&&b.Widget.ContentSlideShow.shufflePlayPlugin.initialize(d,f);d.bind("transform-markup",function(){g._transformMarkup(d)});
d.bind("attach-behavior",function(){g._attachBehavior(d)})},_transformMarkup:function(b){var d=b.options,f=b._findWidgetElements("."+d.viewClassName);if(d.transitionStyle!=="fading"){var j=a('<div class="'+d.clipClassName+'"/>'),i=b._findWidgetElements("."+d.slideClassName),m=i.outerWidth(),i=i.outerHeight();if(d.fullScreen)j.addClass("fullscreen");else{var l={position:"relative",width:m+"px",height:i+"px",overflow:"hidden"},p=f.css("position");if(p==="absolute")l.position=p,l.left=f.css("left"),
l.top=f.css("top");else if(p==="fixed"){var q=c.Utils.getStyleSheetRuleById(c.Utils.getPageStyleSheet(),f.get(0).id);l.position=p;l.left=c.Utils.getRuleProperty(q,"left");l.top=c.Utils.getRuleProperty(q,"top");l.bottom=c.Utils.getRuleProperty(q,"bottom");l.right=c.Utils.getRuleProperty(q,"right")}j.css(l)}d.fullScreen||f.css({width:m+"px",height:i+"px"});f.css({position:"relative",top:"0",left:"0",margin:"0",overflow:"hidden"}).wrap(j)}else p=f.css("position"),!d.fullScreen&&p!=="fixed"&&f.css({width:"0",
height:"0"});b._csspIsDynamicSlideshow&&this._layoutThumbs(b)},_attachBehavior:function(b){var f=this,g=b.options,j=b.tabs,i=b.slides.$element,m=g.slideLinkActiveClassName;b._csspIsDynamicSlideshow&&(f._setupImagePositioning(b,b.slides.$element,g.heroFitting,g.fullScreen),f._setupImagePositioning(b,b.tabs.$element,g.thumbFitting,!1));if(g.fullScreen&&(f._resizeFullScreenImages(b,b.slides.$element,g.heroFitting),g.contentLayout_runtime!=="lightbox"))a(d).on("orientationchange resize",function(){f._resizeFullScreenImages(b,
b.slides.$element,g.heroFitting)});if(j){var l=j.$element;g.event==="mouseover"&&l.bind("mouseenter",function(){var b=a(this);b.data("enter",!0);j.selectTab(l.index(b))});g.deactivationEvent==="mouseout_trigger"?l.bind("mouseleave",function(){var c=a(this);c.data("enter",!1);b.slides.hidePanel(l.index(c))}):g.deactivationEvent==="mouseout_both"&&(l.bind("mouseleave",function(){var c=a(this),d=l.index(c),f=i.eq(d);c.data("enter",!1);c.data("setTimeout")||(c.data("setTimeout",!0),setTimeout(function(){!f.data("enter")&&
!c.data("enter")&&b.slides.hidePanel(d);c.data("setTimeout",!1)},300))}),i.bind("mouseenter",function(){a(this).data("enter",!0)}),i.bind("mouseleave",function(){var c=a(this),d=i.index(c),f=l.eq(d);c.data("enter",!1);f.data("setTimeout")||(f.data("setTimeout",!0),setTimeout(function(){!c.data("enter")&&!f.data("enter")&&b.slides.hidePanel(d);f.data("setTimeout",!1)},300))}))}j&&m&&(g.hideAllContentsFirst||j.$element.eq(j.options.defaultIndex).addClass(m),b.slides.bind("wp-panel-show",function(a,
b){j.$element.eq(b.panelIndex).addClass(m)}).bind("wp-panel-hide",function(a,b){j.$element.eq(b.panelIndex).removeClass(m)}));f._attachStopOnClickHandler(b,b.$firstBtn);f._attachStopOnClickHandler(b,b.$lastBtn);f._attachStopOnClickHandler(b,b.$previousBtn);f._attachStopOnClickHandler(b,b.$nextBtn);f._attachStopOnClickHandler(b,b.$playBtn);f._attachStopOnClickHandler(b,b.$stopBtn);f._attachStopOnClickHandler(b,b.$closeBtn);j&&g.contentLayout_runtime!=="lightbox"&&f._attachStopOnClickHandler(b,j.$element);
b._csspIsImageSlideShow||b.slides.bind("wp-panel-hide",function(b,d){c.Utils.detachIframesAndObjectsToPauseMedia(a(d.panel))}).bind("wp-panel-show",function(b,d){c.Utils.attachIframesAndObjectsToResumeMedia(a(d.panel))})},_attachStopOnClickHandler:function(a,b){b.bind(a.options.event==="click"?"click":"mouseover",function(){a.stop()})},_hitTest:function(a,b){b.outerWidth()===0&&(b=b.children(".popup_anchor").children(".popup_element").eq(0));var c=b.offset(),c={x:c.left,y:c.top,width:b.outerWidth(),
height:b.outerHeight()};return a.pageX>=c.x&&a.pageX<=c.x+c.width&&a.pageY>=c.y&&a.pageY<=c.y+c.height},_layoutThumbs:function(b){var d=b.options,f=c.Utils.getStyleValue;b._findWidgetElements("."+d.slideLinksClassName).each(function(){var b=a(this).find("."+d.slideLinkClassName);firstThumb=b[0];tWidth=f(firstThumb,"width");tHeight=f(firstThumb,"height");gapH=f(firstThumb,"margin-right");gapV=f(firstThumb,"margin-bottom");borderL=f(firstThumb,"border-left-width");borderR=f(firstThumb,"border-right-width");
borderT=f(firstThumb,"border-top-width");borderB=f(firstThumb,"border-bottom-width");gWidth=f(this,"width");paddingL=f(this,"padding-left");paddingT=f(this,"padding-top");maxNumThumb=Math.floor((gWidth+gapH)/(tWidth+borderL+borderR+gapH));gStyle=this.runtimeStyle?this.runtimeStyle:this.style;numRow=Math.ceil(b.length/maxNumThumb);firstRowNum=b.length<maxNumThumb?b.length:maxNumThumb;leftPos=leftMostPos=c.Utils.pixelRound((gWidth-(tWidth+borderL+borderR)*firstRowNum-gapH*(firstRowNum-1))/2)+paddingL;
topPos=paddingT;numInRow=1;gStyle.height=(tHeight+borderT+borderB)*numRow+gapV*(numRow-1)+"px";b.each(function(){numInRow>firstRowNum&&(numInRow=1,leftPos=leftMostPos,topPos+=tHeight+borderT+borderB+gapV);numInRow++>1&&(leftPos+=tWidth+borderL+borderR+gapH);var a=this.runtimeStyle?this.runtimeStyle:this.style;a.marginRight="0px";a.marginBottom="0px";a.left=leftPos+"px";a.top=topPos+"px"})})},_resizeFullScreenImages:function(b,c,d){c.each(function(){a(this).find("img").each(function(){this.complete&&
!a(this).hasClass(b.options.imageIncludeClassName)&&b._csspPositionImage(this,d,!0)})})},_setupImagePositioning:function(b,c,d,f){var i=this;c.each(function(){a(this).find("img").each(function(){var b=this;b.complete?i._positionImage(b,d,f):a(b).load(function(){i._positionImage(b,d,f)})})})},_positionImage:function(b,k,g,j,i){var m=a(d),l=b.runtimeStyle?b.runtimeStyle:b.style,p=g?d.innerWidth?d.innerWidth:m.width():b.width,m=g?d.innerHeight?d.innerHeight:m.height():b.height,j=j!==f?j:c.Utils.getNaturalWidth(b),
i=i!==f?i:c.Utils.getNaturalHeight(b);g&&(b=a(b),j===0&&(j=b.data("imageWidth")),i===0&&(i=b.data("imageHeight")));if(p==j&&m==i)l.marginTop="0px",l.marginLeft="0px";else{var q=j,b=i;if(k=="fillFrameProportionally"){if(g||j>p&&i>m)k=j/p,g=i/m,k<g?(b=i/k,q=p):(b=m,q=j/g)}else if(k=="fitContentProportionally"&&(g||j>p||i>m))k=j/p,g=i/m,k>g?(b=i/k,q=j/k):(b=i/g,q=j/g);l.width=c.Utils.pixelRound(q)+"px";l.height=c.Utils.pixelRound(b)+"px";l.marginTop=c.Utils.pixelRound((m-b)/2)+"px";l.marginLeft=c.Utils.pixelRound((p-
q)/2)+"px"}}};a.extend(b.Widget.ContentSlideShow.slideImageIncludePlugin.defaultOptions,{imageIncludeClassName:"ImageInclude",slideLoadingClassName:"SSSlideLoading"});b.Widget.ContentSlideShow.prototype.defaultPlugins=[c.Plugins.ContentSlideShow]})(jQuery,WebPro,Muse,window);
