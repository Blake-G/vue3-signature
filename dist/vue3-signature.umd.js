!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):(t="undefined"!=typeof globalThis?globalThis:t||self)["vue3-signature"]=e(t.vue)}(this,(function(t){"use strict";
/*!
   * Signature Pad v3.0.0-beta.4 | https://github.com/szimek/signature_pad
   * (c) 2020 Szymon Nowak | Released under the MIT license
   */class e{constructor(t,e,i){this.x=t,this.y=e,this.time=i||Date.now()}distanceTo(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}equals(t){return this.x===t.x&&this.y===t.y&&this.time===t.time}velocityFrom(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):0}}class i{constructor(t,e,i,o,s,n){this.startPoint=t,this.control2=e,this.control1=i,this.endPoint=o,this.startWidth=s,this.endWidth=n}static fromPoints(t,e){const o=this.calculateControlPoints(t[0],t[1],t[2]).c2,s=this.calculateControlPoints(t[1],t[2],t[3]).c1;return new i(t[1],o,s,t[2],e.start,e.end)}static calculateControlPoints(t,i,o){const s=t.x-i.x,n=t.y-i.y,h=i.x-o.x,a=i.y-o.y,r=(t.x+i.x)/2,l=(t.y+i.y)/2,c=(i.x+o.x)/2,d=(i.y+o.y)/2,u=Math.sqrt(s*s+n*n),v=Math.sqrt(h*h+a*a),m=v/(u+v),p=c+(r-c)*m,g=d+(l-d)*m,_=i.x-p,f=i.y-g;return{c1:new e(r+_,l+f),c2:new e(c+_,d+f)}}length(){let t,e,i=0;for(let o=0;o<=10;o+=1){const s=o/10,n=this.point(s,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),h=this.point(s,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(o>0){const o=n-t,s=h-e;i+=Math.sqrt(o*o+s*s)}t=n,e=h}return i}point(t,e,i,o,s){return e*(1-t)*(1-t)*(1-t)+3*i*(1-t)*(1-t)*t+3*o*(1-t)*t*t+s*t*t*t}}class o{constructor(t,e={}){this.canvas=t,this.options=e,this._handleMouseDown=t=>{1===t.which&&(this._mouseButtonDown=!0,this._strokeBegin(t))},this._handleMouseMove=t=>{this._mouseButtonDown&&this._strokeMoveUpdate(t)},this._handleMouseUp=t=>{1===t.which&&this._mouseButtonDown&&(this._mouseButtonDown=!1,this._strokeEnd(t))},this._handleTouchStart=t=>{if(t.preventDefault(),1===t.targetTouches.length){const e=t.changedTouches[0];this._strokeBegin(e)}},this._handleTouchMove=t=>{t.preventDefault();const e=t.targetTouches[0];this._strokeMoveUpdate(e)},this._handleTouchEnd=t=>{if(t.target===this.canvas){t.preventDefault();const e=t.changedTouches[0];this._strokeEnd(e)}},this.velocityFilterWeight=e.velocityFilterWeight||.7,this.minWidth=e.minWidth||.5,this.maxWidth=e.maxWidth||2.5,this.throttle="throttle"in e?e.throttle:16,this.minDistance="minDistance"in e?e.minDistance:5,this.dotSize=e.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=e.penColor||"black",this.backgroundColor=e.backgroundColor||"rgba(0,0,0,0)",this.onBegin=e.onBegin,this.onEnd=e.onEnd,this._strokeMoveUpdate=this.throttle?function(t,e=250){let i,o,s,n=0,h=null;const a=()=>{n=Date.now(),h=null,i=t.apply(o,s),h||(o=null,s=[])};return function(...r){const l=Date.now(),c=e-(l-n);return o=this,s=r,c<=0||c>e?(h&&(clearTimeout(h),h=null),n=l,i=t.apply(o,s),h||(o=null,s=[])):h||(h=window.setTimeout(a,c)),i}}(o.prototype._strokeUpdate,this.throttle):o.prototype._strokeUpdate,this._ctx=t.getContext("2d"),this.clear(),this.on()}clear(){const{_ctx:t,canvas:e}=this;t.fillStyle=this.backgroundColor,t.clearRect(0,0,e.width,e.height),t.fillRect(0,0,e.width,e.height),this._data=[],this._reset(),this._isEmpty=!0}fromDataURL(t,e={},i){const o=new Image,s=e.ratio||window.devicePixelRatio||1,n=e.width||this.canvas.width/s,h=e.height||this.canvas.height/s;this._reset(),o.onload=()=>{this._ctx.drawImage(o,0,0,n,h),i&&i()},o.onerror=t=>{i&&i(t)},o.src=t,this._isEmpty=!1}toDataURL(t="image/png",e){switch(t){case"image/svg+xml":return this._toSVG();default:return this.canvas.toDataURL(t,e)}}on(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",window.PointerEvent?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}off(){this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.removeEventListener("pointerdown",this._handleMouseDown),this.canvas.removeEventListener("pointermove",this._handleMouseMove),document.removeEventListener("pointerup",this._handleMouseUp),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this.canvas.removeEventListener("touchend",this._handleTouchEnd)}isEmpty(){return this._isEmpty}fromData(t){this.clear(),this._fromData(t,(({color:t,curve:e})=>this._drawCurve({color:t,curve:e})),(({color:t,point:e})=>this._drawDot({color:t,point:e}))),this._data=t}toData(){return this._data}_strokeBegin(t){const e={color:this.penColor,points:[]};"function"==typeof this.onBegin&&this.onBegin(t),this._data.push(e),this._reset(),this._strokeUpdate(t)}_strokeUpdate(t){if(0===this._data.length)return void this._strokeBegin(t);const e=t.clientX,i=t.clientY,o=this._createPoint(e,i),s=this._data[this._data.length-1],n=s.points,h=n.length>0&&n[n.length-1],a=!!h&&o.distanceTo(h)<=this.minDistance,r=s.color;if(!h||!h||!a){const t=this._addPoint(o);h?t&&this._drawCurve({color:r,curve:t}):this._drawDot({color:r,point:o}),n.push({time:o.time,x:o.x,y:o.y})}}_strokeEnd(t){this._strokeUpdate(t),"function"==typeof this.onEnd&&this.onEnd(t)}_handlePointerEvents(){this._mouseButtonDown=!1,this.canvas.addEventListener("pointerdown",this._handleMouseDown),this.canvas.addEventListener("pointermove",this._handleMouseMove),document.addEventListener("pointerup",this._handleMouseUp)}_handleMouseEvents(){this._mouseButtonDown=!1,this.canvas.addEventListener("mousedown",this._handleMouseDown),this.canvas.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)}_handleTouchEvents(){this.canvas.addEventListener("touchstart",this._handleTouchStart),this.canvas.addEventListener("touchmove",this._handleTouchMove),this.canvas.addEventListener("touchend",this._handleTouchEnd)}_reset(){this._lastPoints=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._ctx.fillStyle=this.penColor}_createPoint(t,i){const o=this.canvas.getBoundingClientRect();return new e(t-o.left,i-o.top,(new Date).getTime())}_addPoint(t){const{_lastPoints:e}=this;if(e.push(t),e.length>2){3===e.length&&e.unshift(e[0]);const t=this._calculateCurveWidths(e[1],e[2]),o=i.fromPoints(e,t);return e.shift(),o}return null}_calculateCurveWidths(t,e){const i=this.velocityFilterWeight*e.velocityFrom(t)+(1-this.velocityFilterWeight)*this._lastVelocity,o=this._strokeWidth(i),s={end:o,start:this._lastWidth};return this._lastVelocity=i,this._lastWidth=o,s}_strokeWidth(t){return Math.max(this.maxWidth/(t+1),this.minWidth)}_drawCurveSegment(t,e,i){const o=this._ctx;o.moveTo(t,e),o.arc(t,e,i,0,2*Math.PI,!1),this._isEmpty=!1}_drawCurve({color:t,curve:e}){const i=this._ctx,o=e.endWidth-e.startWidth,s=2*Math.floor(e.length());i.beginPath(),i.fillStyle=t;for(let n=0;n<s;n+=1){const t=n/s,i=t*t,h=i*t,a=1-t,r=a*a,l=r*a;let c=l*e.startPoint.x;c+=3*r*t*e.control1.x,c+=3*a*i*e.control2.x,c+=h*e.endPoint.x;let d=l*e.startPoint.y;d+=3*r*t*e.control1.y,d+=3*a*i*e.control2.y,d+=h*e.endPoint.y;const u=Math.min(e.startWidth+h*o,this.maxWidth);this._drawCurveSegment(c,d,u)}i.closePath(),i.fill()}_drawDot({color:t,point:e}){const i=this._ctx,o="function"==typeof this.dotSize?this.dotSize():this.dotSize;i.beginPath(),this._drawCurveSegment(e.x,e.y,o),i.closePath(),i.fillStyle=t,i.fill()}_fromData(t,i,o){for(const s of t){const{color:t,points:n}=s;if(n.length>1)for(let o=0;o<n.length;o+=1){const s=n[o],h=new e(s.x,s.y,s.time);this.penColor=t,0===o&&this._reset();const a=this._addPoint(h);a&&i({color:t,curve:a})}else this._reset(),o({color:t,point:n[0]})}}_toSVG(){const t=this._data,e=Math.max(window.devicePixelRatio||1,1),i=this.canvas.width/e,o=this.canvas.height/e,s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("width",this.canvas.width.toString()),s.setAttribute("height",this.canvas.height.toString()),this._fromData(t,(({color:t,curve:e})=>{const i=document.createElement("path");if(!(isNaN(e.control1.x)||isNaN(e.control1.y)||isNaN(e.control2.x)||isNaN(e.control2.y))){const o=`M ${e.startPoint.x.toFixed(3)},${e.startPoint.y.toFixed(3)} C ${e.control1.x.toFixed(3)},${e.control1.y.toFixed(3)} ${e.control2.x.toFixed(3)},${e.control2.y.toFixed(3)} ${e.endPoint.x.toFixed(3)},${e.endPoint.y.toFixed(3)}`;i.setAttribute("d",o),i.setAttribute("stroke-width",(2.25*e.endWidth).toFixed(3)),i.setAttribute("stroke",t),i.setAttribute("fill","none"),i.setAttribute("stroke-linecap","round"),s.appendChild(i)}}),(({color:t,point:e})=>{const i=document.createElement("circle"),o="function"==typeof this.dotSize?this.dotSize():this.dotSize;i.setAttribute("r",o.toString()),i.setAttribute("cx",e.x.toString()),i.setAttribute("cy",e.y.toString()),i.setAttribute("fill",t),s.appendChild(i)}));const n=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${i} ${o}" width="${i}" height="${o}">`;let h=s.innerHTML;if(void 0===h){const t=document.createElement("dummy"),e=s.childNodes;t.innerHTML="";for(let i=0;i<e.length;i+=1)t.appendChild(e[i].cloneNode(!0));h=t.innerHTML}return"data:image/svg+xml;base64,"+btoa(n+h+"</svg>")}}const s=["id","data-uid","disabled"],n={props:{sigOption:{type:Object,default:()=>({backgroundColor:"rgb(255,255,255)",penColor:"rgb(0, 0, 0)"})},w:{type:String,default:"100%"},h:{type:String,default:"100%"},clearOnResize:{type:Boolean,default:!1},waterMark:{type:Object,default:()=>({})},disabled:{type:Boolean,default:!1},defaultUrl:{type:String,default:""}},setup(e,{expose:i}){const n=e;let h=t.reactive({sig:()=>{},option:{backgroundColor:"rgb(255,255,255)",penColor:"rgb(0, 0, 0)"},uid:""});h.uid="canvas"+Math.random();let a=Object.keys(n.sigOption);for(let t of a)h.option[t]=n.sigOption[t];t.watch((()=>n.disabled),(t=>{t?h.sig.off():h.sig.on()}));const r=()=>{let t,e=document.getElementById(h.uid);u()||(t=c());let i=Math.max(window.devicePixelRatio||1,1);e.width=e.offsetWidth*i,e.height=e.offsetHeight*i,e.getContext("2d").scale(i,i),l(),!n.clearOnResize&&void 0!==t&&d(t),Object.keys(n.waterMark).length&&v(n.waterMark)},l=()=>{h.sig.clear()},c=t=>t?h.sig.toDataURL(t):h.sig.toDataURL(),d=t=>{h.sig.fromDataURL(t)},u=()=>h.sig.isEmpty(),v=t=>{if("[object Object]"!=Object.prototype.toString.call(t))throw new Error("Expected Object, got "+typeof t+".");{let e=document.getElementById(h.uid),i={text:t.text||"",x:t.x||20,y:t.y||20,sx:t.sx||40,sy:t.sy||40},o=e.getContext("2d");o.font=t.font||"20px sans-serif",o.fillStyle=t.fillStyle||"#333",o.strokeStyle=t.strokeStyle||"#333","all"==t.style?(o.fillText(i.text,i.x,i.y),o.strokeText(i.text,i.sx,i.sx)):"stroke"==t.style?o.strokeText(i.text,i.sx,i.sx):o.fillText(i.text,i.x,i.y),h.sig._isEmpty=!1}};return t.onMounted((()=>{(()=>{let t=document.getElementById(h.uid);h.sig=new o(t,h.option),r(),""!==n.defaultUrl&&d(n.defaultUrl),n.disabled?h.sig.off():h.sig.on()})(),window.addEventListener("resize",(()=>{r()}))})),i({save:c,clear:l,isEmpty:u,undo:()=>{let t=h.sig.toData();t&&(t.pop(),h.sig.fromData(t))},addWaterMark:v,fromDataURL:d}),(i,o)=>(t.openBlock(),t.createElementBlock("div",{style:t.normalizeStyle({width:e.w,height:e.h}),onTouchmove:o[0]||(o[0]=t.withModifiers((()=>{}),["prevent"]))},[t.createElementVNode("canvas",{id:t.unref(h).uid,class:"canvas","data-uid":t.unref(h).uid,disabled:t.unref(h).disabled},null,8,s)],36))}};return n.install=t=>{t.component("Vue3Signature",n)},n}));
