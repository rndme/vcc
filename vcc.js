	 //vcc.js by dandavis. a simple View Component Creator.  [CCBY4]
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory({});
	} else {
		// Browser globals (root is window)
		root.VCC = factory(root);
  }
}(this, function (pub) {

  
function assign(o, x){
	for (var k in x) if (assign.hasOwnProperty.call(x, k)) o[k] = x[k];
	return o;
}

//util for perf:
function forEach(r,f){var m=r.length, i=0;for(; i<m; i++)f(r[i],i,r);};

	
// Virtual DOM:
// intraHTML: a better innerHTML (partial/non-destructive updates) for faster and simpler view rendering. (c)2015:dandavis, 
VCC.intraHTML=VCC.intraHTML=function(E){function F(a,d,p){if(!(2>arguments.length))for(var c=a.length,n=0;n<c;n++)d(a[n],n,a)}function z(a,d){for(var p=a.length,c=[],n=0;n<p;n++)d(a[n],n,a)&&c.push(a[n]);return c}function D(a,d){function p(a){var d=[],q=0,g=0;a=a.childNodes;var v,r,k=a.length;for(q;q<k;q++)if(v=a[q],r=v.tagName){r={$:r.toLowerCase()};for(var t=0,e=v.attributes,f,b=e.length;t<b;t++)f=e[t],r[f.name]=f.value;r._=p(v),d[g++]=r}else d[g++]=v.nodeValue;return d}return"string"==typeof a?p(B(a,d))[0]:p({tagName:d||"div",attributes:[],childNodes:[a]})[0]}function G(a,d){var p=[],c=0,n=a.length,q=d,g;for(c;c<n&&(g=a[c],"_"===g&&(g="childNodes"),p.push(q),q=q[g],void 0!==q);c++);return{node:q,parents:p}}function J(a,d){var p=[],c=0,n=a.length,q=d;for(c;c<n&&(p.push(q),q=q[a[c]],void 0!==q);c++);return{node:q,parents:p}}function C(a){var d="",p=[],c,n,q=0,g,v=0,q=p.hasOwnProperty;if(void 0===a)return"";c=a.$;for(n in a)"$"!==n&&"_"!==n&&q.call(a,n)&&(d+=" "+n+(""===a[n]?"":"="+JSON.stringify(a[n])));if(K[c])return"<"+c+d+" />";(a=a._||[],!Array.isArray(a))&&(a=[a]),q=0,g;for(v=a.length;q<v;q++)g=a[q],p[q]="object"==typeof g?C(g):g;return"<"+c+d+">"+p.join("")+"</"+c+">"}function L(a,d,p,c){function n(b,a,c){return b.textContent!==b.fsdhjklghdklg}var q=(p=c.timing)?performance.now():0,g=c.debug,v=z(a.path.concat(a.index||a.key),function(b,a,c){return b!=a.xsdgdfg}),r=v.slice,k=z(v,function(b,a,c){return b!=c.xsdgdfg}).slice(-1)[0],t=G(v,c.dest),e=J(v,c.vdom),f=z(t.parents,Boolean),b={type:a.type,index:d,path:v,key:k,elm:t.node||t.parents.slice(-1)[0],elmParents:f,elmParent:f.slice(-1)[0],dest:c.dest,parents:e,parent:e.parents.slice(-1)[0],isAttrib:!(k-.1)&&"_"!=k&&"$"!=k,change:a},y,A,h,m,x;c=b.elm;var l,w;"function"==typeof b.elm&&(b.elm=b.elmParent),g&&console.info("CHANGE: "+d,b);switch(a.type){case"set":if(!b.isAttrib&&("string"==typeof a.val||Array.isArray(a.val))){b.elmParent.childNodes||(b.elmParent=b.elmParent[b.key]),b.elm||(b.elm=b.elmParent),c=b.elm,r=a.val,Array.isArray(r)||(r=[r]),l=0;for(v=r.length;l<v;l++){d=r[l];if("string"==typeof d)if(b.elm instanceof NodeList&&(b.elm=c=z(b.elmParents,n).pop()),c.childNodes)if(g&&console.log("set: non attrib, string, elm: ",b.key,[d],c.outerHTML),m=document.createTextNode(d),"_"===b.key)c.textContent=d;else{if("$"===b.key){f=document.createElement(a.val),g&&console.warn("changing tag name!",a),b.elm.parentNode.insertBefore(f,c),y=c.attributes,e=0;for(t=y.length;e<t;e++)A=y[e],f.setAttribute(A.name,A.value);y=c.childNodes,w=c.parentNode,e=0;for(t=y.length;e<t;e++)f.appendChild(y[0])}else w=c.parentNode,w.insertBefore(m,c);w.removeChild(c)}else g&&console.log("set: non attrib, string, not elm",d),c.textContent=d;else w=c.parentNode,m="string"==typeof d?document.createTextNode(d):B(C(d),b.elmParent[0]&&b.elmParent[0].parentNode.tagName).firstChild,c.parentNode||(b.elm=c=b.elmParent),(t=c.childNodes[+k+l])?(g&&console.log("set: non attrib, not string, has old",d),c.insertBefore(m,t),c.removeChild(b.elm)):(g&&console.log("set: non attrib, not string, no old, appending",[d,m,m.outerHTML||m.textContent]),c.appendChild(m));"_"==k&&(k=0,b.parent.length||(b.parent=b.parent._||(b.parent._=[]))),g&&console.info("attempting key change",+k+l,!!(1.1-k),k,l,d,b.parent[+k+l],[b.parent])}break}if(b.isAttrib){if("$"==k&&String(v)==k)throw new TypeError("You cannot change the root element of an update-bound element: "+c.outerHTML);if("$"==k){f=document.createElement(a.val),w=c.parentNode,g&&console.warn("changing tag name!",a),w.insertBefore(f,c),y=c.attributes,e=0;for(t=y.length;e<t;e++)A=y[e],f.setAttribute(A.name,A.value);y=c.childNodes,e=0;for(t=y.length;e<t;e++)f.appendChild(y[0]);w.removeChild(c)}else!c.setAttribute&&c.parentNode&&c.parentNode.setAttribute&&(b.elm=c=b.elm.parentNode),!c.setAttribute&&(l=z(b.elmParents,function(b,a,c){return b.setAttribute}).slice(-1)[0]).setAttribute&&(b.elm=c=l),a.val===a.dgfjkdfl34534fd?(c.removeAttribute(k),"checked"===k&&"checkbox"===c.type&&(c.checked=!1)):(c.setAttribute(k,a.val),"checked"===k&&"checkbox"===c.type&&""===a.val&&(c.checked=!0),"value"===k&&c.select&&(c.value=a.val));break}if(c.length&&a.val===a.sdgfdf)for(w=c[0].parentNode,g=0,k=c.length;g<k;g++)w.removeChild(c[0]);else c instanceof NodeList&&(b.elm=c=z(b.elmParents,function(b,a,c){return b.textContent!==b.fsdhjklghdklg}).pop()),f=B(C(a.val),b.parent.$).firstChild,g&&console.log("element replacing",[b.elm.outerHTML||b.elm.textContent]," with ",[f.outerHTML]),w=c.parentNode,w.insertBefore(f,c),w.removeChild(c);break;case"add":b.isAttrib||("_"==b.key&&(b.elm=c=c[a.index],b.key=a.index,b.parent=b.parent._,b.elmParent=b.elmParent.childNodes),F(a.vals,function(a,c,k){b.elmParent.length||(b.elmParent=b.elmParents.slice(-1)[0].childNodes),b.elmParent||(b.elmParent=b.elmParents.slice(-2)[0].childNodes),m="string"==typeof a?document.createTextNode(a):B(C(a),b.elmParent[0]&&b.elmParent[0].parentNode.tagName).firstChild,(x=b.elmParent[b.key+c])?x.parentNode.insertBefore(m,x):b.elmParent[b.key+c]?b.elmParent[b.key+c]=m:(h=b.elmParents.slice(-1)[0],h[0]&&(h=h[h.length-1]),b.elm&&b.elm.length>=b.key&&(h=b.elm[0].parentNode),h instanceof NodeList&&(h=z(b.elmParents,function(b,a,c){return b.textContent!==b.fsdhjklghdklg}).pop()),h!==m&&(3!=h.nodeType?h.appendChild(m):(w=h.parentNode,w.insertBefore(m,h),w.insertBefore(h,m))))}));break;case"rm":if(b.elmParent.childNodes&&(b.elmParent=b.elmParent.childNodes),0===b.elmParent.length&&(b.elmParent=b.elmParents.slice(-3)[0]),b.elmParent.childNodes&&(b.elmParent=b.elmParent.childNodes),b.parent._&&(b.parent=b.parent._),k=r.call(b.elmParent,a.index-a.num+1,a.index+1),0===a.index)for(g&&console.log("removing many from zero",r.call(b.parent),b.elmParent,"|||",b.parent[0],a.index,a.num),e=a.index,t=e+a.num;e<t;e++)b.elmParent[a.index].remove();else-1<a.index-a.num?1===a.num?(k=[b.elmParent[a.index]],g&&console.log("removing one",b.elmParent,k[0].outerHTML,a.index,r.call(b.elmParent).map(function(b){return b.outerHTML||b.nodeValue}),b.parent)):a.index+a.num<b.elmParent.length+1?(k=a.index,1<k&&"Z"===a.mode&&(k-=a.num-1),g&&console.log("removing many up",a.mode,b.elmParent,k,k+a.num),k=r.call(b.elmParent,k,k+a.num)):(g&&console.log("removing many down",r.call(b.elmParent),a.index-a.num,a.index),k=r.call(b.elmParent,a.index-a.num+1,a.index+1)):(g&&console.log("removing many negative",b.elmParent,a.index,a.index+a.num),k=r.call(b.elmParent,a.index,a.index+a.num)),g&&console.log("removing:",k,a,b.parent.slice(a.index-a.num+1,a.index+1)),F(k,function(b,a,c){b.parentNode.removeChild(b)})}p&&(a.runtime=performance.now()-q)}function H(a,d,p){var c=d;"string"==typeof a&&(a=document.querySelector(a)),d=u.blnTiming?performance.now():0;var n=a.tagName.toLowerCase(),q="<"+n+">",g;a.childNodes.length||(a.innerHTML=" "),c||(c=a);if(c instanceof Element){c=c.innerHTML.replace(/<\!\-\-[\s\S]+?\-\->/g,"");if(p===c)return{update:Boolean};c=D(q+c+"</"+n+">",n)}return"string"==typeof c&&(c=D(c,n)),p=u.blnTiming?performance.now():0,g={dest:a,vdom:c,debug:u.blnDebug,timing:u.blnTiming,initTime:p-d,update:function(a){var c=u.blnTiming,k,t=0,e;c&&(k=performance.now()),"string"==typeof a&&(a=D(q+a+"</"+n+">",n)),c&&(g.parseTime=performance.now()-k),g.vdom2=a,c&&(k=performance.now()),g.changes=I(g.vdom,a),c&&(g.diffTime=performance.now()-k,k=performance.now());for(e=g.changes.length;t<e;t++)L(g.changes[t],t,g.changes,g);return c&&(g.applyTime=performance.now()-k),g.vdom=a,g}}}function u(a,d){return u._last=H(a,a,d),u._last.update(d)}Number.isNaN||(Number.isNaN=function(a){return"number"==typeof a&&isNaN(a)}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});var I=function(a,d){function p(a,c,e,f,b,d,g){for(var h=f-d,m=b-g,n=Math.max(h,m),l=1;l<=n;l++){var q=c[f-l],p=e[b-l];if(l<=m&&l<=h&&a(q,p))return{a:f-l,b:b-l};for(var r=0;r<l;r++){var v=c[f-r],u=e[b-r];if(l<=m&&a(v,p))return{a:f-r,b:b-l};if(l<=h&&a(q,u))return{a:f-l,b:b-r}}}return{a:d-1,b:g-1}}function c(a,c){if(a===c)return!0;if(Array.isArray(a)){if(!Array.isArray(c))return!1;for(var e=a.length/15,f=Math.abs(a.length-c.length),b=0,d=a.length;b<d;b++)if(n(a[b],c[b])){if(2<=f&&f>e||f===a.length)return!1;f++}return!0}if("object"==typeof a){if("object"!=typeof c)return!1;var b=g(q(Object.keys(a)),q(Object.keys(c))),d=Object.keys(b).length,e=d/15,f=0,p;for(p in b)if(!n(a[p],c[p])){if(2<=f&&f>e||f+1===d)return!1;f++}return!0}return Number.isNaN(a)&&Number.isNaN(c)}function n(a,c){if(a===c)return!0;if(Array.isArray(a)){if(Array.isArray(c)&&a.length===c.length&&a[0]===c[0]&&String(a)===String(c)){for(var e=0,f=a.length;e<f;e++)if(!n(a[e],c[e]))return!1;return!0}return!1}if("object"==typeof a){if("object"!=typeof c)return!1;var b=Object.keys(a),e=Object.keys(c);if(b.length!==e.length||String(b)!==String(e))return!1;e=0;for(f=b.length;e<f;e++)if(!n(a[b[e]],c[b[e]]))return!1;return!0}return Number.isNaN(a)&&Number.isNaN(c)}function q(a){var c=0,e=a.length,f={};for(c;c<e;c++)f[a[c]]=!0;return f}function g(a,c){for(var e in c)a[e]=c[e];return a}var v=function(a,d,e,f){function b(a,b,c){a.push({type:"set",path:b,val:c})}function r(a,b,c,d,e){a.push({type:"rm",path:b,index:c,num:d,mode:e})}function u(a,b,c,d){a.push({type:"add",path:b,index:c,vals:d})}if(!(a===d||Number.isNaN(a)&&Number.isNaN(d)))if(Array.isArray(a)&&Array.isArray(d)){for(var h=a.length-1,m=d.length-1;0<=h&&0<=m;)if(n(a[h],d[m]))h--,m--;else{for(var x=p(n,a,d,h,m,0,0),l=h;l>x.a&&m>x.b;)if(c(a[l],d[m]))v(a[l],d[m],e,f.concat([l])),l--,m--;else{var h=p(c,a,d,l,m,x.a+1,x.b+1),l=l-h.a,w=m-h.b;1===l&&1===w?b(e,f.concat(h.a+1),d[h.b+1]):1===l&&2===w?(u(e,f,h.a+2,d.slice(h.b+2,m+1)),b(e,f.concat(h.a+1),d[h.b+1])):2===l&&1===w?(r(e,f,h.a+2,1,"I"),b(e,f.concat(h.a+1),d[h.b+1])):2===l&&2===w?(b(e,f.concat(h.a+2),d[h.b+2]),b(e,f.concat(h.a+1),d[h.b+1])):(0<l&&r(e,f,h.a+1,l,"X"),0<w&&u(e,f,h.a+1,d.slice(h.b+1,m+1))),l=h.a,m=h.b}l>x.a?r(e,f,l,l-x.a,"Z"):m>x.b&&u(e,f,l+1,d.slice(x.b+1,m+1)),h=x.a,m=x.b}0<=h?r(e,f,0,h+1):0<=m&&u(e,f,0,d.slice(0,m+1))}else if("object"==typeof a&&"object"==typeof d)for(m in x=g(q(Object.keys(a)),q(Object.keys(d))),x)v(a[m],d[m],e,f.concat([m]));else b(e,f,d)},r=[];return v(a,d,r,[]),r},B=function(a,d){var p=document.createElement(d&&-1===d.indexOf("-")?d:"div");return p._intraDirty=!0,p.innerHTML=a,p},K={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1};return u.elementFromString=B,u.fromHTML=D,u.toHTML=C,u.odiff=I,u.updater=H,u.resolvePath=G,u.blnTiming=!1,u.blnDebug=!1,E.jQuery&&(E.jQuery.fn.intraHTML=function(a){return this.each(function(d,p){u(p,a)}),this}),u}(pub);



// web components (document.registerElement) polyfill
//https://github.com/WebReflection/document-register-element/blob/master/build/document-register-element.js
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)vt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(vt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(n--,F.splice(t--,1),vt(e,o))}function dt(e){throw new Error("A "+e+" type is already registered")}function vt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function mt(e){return e?(mt.prototype=e,new mt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){c=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=s.getAttribute(i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t}),-2<S.call(y,v+c)+S.call(y,d+c)&&dt(n);if(!m.test(c)||-1<S.call(g,c))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,c):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():c,c,p;return f&&-1<S.call(y,d+l)&&dt(l),p=y.push((f?v:d)+c)-1,w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[p]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");


function VCC(def) {
	// guard input object and displayName property:
	if(typeof def !== "object") throw new TypeError("VCC Expects a definition object");
	if(typeof def.displayName !== "string") throw new TypeError("VCC Definition needs a String displayName property");
	if(def._static===true || def._static==="content") return VCCstatic(def); // use slimmer micro core for statics, good for simple sub-components
  	function call(fn, that, a, b){
		if(!fn || typeof fn !== "function") return; 
	  	return arguments.length===4 ? fn.call(that, a, b) : fn.call(that, a);
	}

 	var EVENTS="reset,invalid,focus,blur,select,keydown,keypress,keyup,mousedown,mouseup,click,dblclick,change,submit,input,paste,update".split(","),
   	fnCache={}, 
   	tagName = "vcc-" + def.displayName;

	if(VCC[tagName]) return; // don't define a component twice
	VCC[tagName] = def; // add this def to the collective

	//allow "inheritance from array of mixins left to right:  
	if(def.mixins) forEach( (Array.isArray(def.mixins) ? def.mixins : [def.mixins]), function(mixin) {
		forEach(Object.keys(mixin), function(k){	
			var old = def[k];
			if(typeof old==="function"){
				def[k]= function(a){
					mixin[k].call(this, a);
					return old.call(this, a);
				};
			}else{
				if(typeof old==="undefined") def[k]= mixin[k];
			} 
		});
	});

	proto = Object.create(def.proto || HTMLElement.prototype);
	proto.detachedCallback = def.componentWillUnmount || Boolean;
	proto.attachedCallback = function(){
		this._attached=true;
	  [].forEach.call(this.querySelectorAll("[ref]"), function(elm){
		  	var ref=elm.getAttribute("ref"),
			ref2=eval("0||"+ref);
		  	if(ref2.call) ref2.call(this, elm);
		}, this);
	  
		call(def.componentDidMount, this, VCC);
		VCC.trigger(this, "update");
	};
	proto.createdCallback = function _init(e) {
		if(this.parentNode && this.parentNode._intraDirty) return;
		var that = this, oldState, oldProps;
		assign(this, VCC.prototype); // implement inheritance  (since VCC is a function instead of object, it can't be auto)
		this.VCC=VCC; // allow pure render functions when using utilities like VCC.classes(), VCC.show(), etc
		this.state = assign({}, (typeof def.getInitialState === "object" ? def.getInitialState : call(def.getInitialState, this, VCC)) || {});
		this._def = def;
		this.props =  assign({}, (typeof def.getDefaultProps === "object" ? def.getDefaultProps : call(def.getDefaultProps, this, VCC)) || {});
	  	
	  	
		//allow "inheritance from array of mixouts left to right:  
		if(def.mixouts) forEach(Array.isArray(def.mixouts) ? def.mixouts : [typeof def.mixouts ==="function"?def.mixouts.call(that):def.mixouts], function(mixout) {
			forEach(Object.keys(mixout), function(k){	
				that[k]= mixout[k];
			});
		}); // mixins apply to def, mixouts apply to elm isntance itself

	  	[].forEach.call(this.attributes, function(attr, index){
		  	if(EVENTS.indexOf(attr.name.replace(/^on\-/,""))!==-1) return;
			//console.log("attr", this, attr, attr.name, attr.value);
		  	var val=attr.value;
		  	try{ val=Function("return "+ val).call(that); }catch(y){}
		  	this.props[attr.name]=val;
		}, this);

		var noBubbles=",focus,blur,select,keydown,keyup,mousedown,mouseup,submit,input,paste,update,";
		
		// bind any events to the actual tag:
		EVENTS.forEach(function(evt) {
			this.addEventListener(evt, function(e) {

				var elm = e.target,
				cmd = elm.getAttribute("on-"+evt),
				blnDelegate = this._def._delegate && noBubbles.indexOf(","+e.type+",")===-1;
				
				while(blnDelegate && elm != this && elm){
					cmd = elm.getAttribute("on-"+evt);
					if(cmd) break;
					elm=elm.parentNode;
				}
				
				if(!cmd) return;
				
			  	var fn=(fnCache[cmd] || (fnCache[cmd]=Function("event", "var $0=event.target;return " + cmd))).call(that,e);
			  	if(typeof fn==="function") setTimeout(fn.bind(that, e), 0);
			}, true);
		}, this);

		// bind all methods:
		Object.keys(def).forEach(function(method, _, __) {
			if(typeof def[method] !== "function" || {render: 1}[method] ) return;
			if(!this[method]) this[method] = def[method].bind(this);
		}, this);

		  // bind any specified events to the actual tag and sub-tags using delegation:
		  if(typeof def.events==="function") def.events = def.events.call(this);
		  if(typeof def.events==="object"){
			var m=that.matches||that.webkitMatchesSelector||that.mozMatchesSelector||that.msMatchesSelector;
			Object.keys(def.events).forEach(function(evt){		  
				var r=evt.trim().split(/\s+/), 
					name=r.shift(),
					sel=r.join(" "),
					val=def.events[evt];
		  
		  			if(that[val] || val.call) that.addEventListener(name, function(e){
						if(sel && !m.call(e.target, sel)) return;
				  		return (that[val]||val).call(that, e);				  	
					});
			}, this);		
	  	}//end if events?

		// add css (if any)
		if(def.css) VCC.css(def.css);
	  
		function renderer(blnNow) {
		  	function _render() {
			  	var temp = def.render.call(that, VCC)||"";
			  	if(_render.unD3f1n3d==temp) temp = "";
			  	if(Array.isArray(temp)) temp = temp.join("");
			  	temp=""+temp;
			  	forEach(Object.keys(VCC.statics), function(k){
					temp = VCC.statics[k](temp);
				});
				if(renderer.oldView != temp )	VCC.intraHTML(that, renderer.oldView = ""+temp);
				if( that._attached) call(def.componentDidUpdate, that, that.props, oldState);
			}
		  	if(blnNow === true) return _render();
			clearTimeout(renderer.timer);
			renderer.timer = setTimeout(_render, 25);
		}

		this.setState = function(state, blnReplaceState) {
			if(def.shouldComponentUpdate) {
				if(call(def.shouldComponentUpdate, this, this.props, state)) {
					renderer();
				}
			} else {
				renderer();
			}
		  	oldState = assign({}, that.state);
			if(blnReplaceState === true){
				that.state = state;
			}else{
				assign(that.state, state);
			}
			call(def.componentWillUpdate, this, this.props, state);
			VCC.trigger(that, "update");
		};
	  
	  	this.replaceState=function(state){
	  		return this.setState(state, true);
	  	};

		this._orig = this.innerHTML;
		if(typeof def.render !== "function") def.render = function(){return this._orig;};
		
		
	  	//make render optional by subbin in Boolean if missing:
		//if(typeof def.render !== "function") def.render = this._revert;

	  	this._renderer=	renderer;
		this._render= this.setState.bind(this, {});
		call(def.componentWillMount, this, VCC, def);
	  	renderer(true);
		if(typeof def.renderTrigger === "function") def.renderTrigger(this._renderer.bind(this));
	}; //end create callBack


	// watch attribs for changes to sync attribs + defined props
	proto.attributeChangedCallback= function _change(e,old,v){	
		if(e=="class"){return; } // class is too noisy to make a useable prop
		var newProps = assign({}, this.props); // shallow copy of props
		if(def.propTypes && def.propTypes[e])try{ v=def.propTypes[e](v);}catch(y){} //coerce if needed
		newProps[e]=v; 
		call(def.componentWillReceiveProps, this, newProps);
		assign(this.props, newProps); // copy new props into current
		if(def.shouldComponentUpdate){
			if(call(def.shouldComponentUpdate, this, newProps, this.state)){
				call(def.componentWillUpdate, this, newProps, this.state);
				VCC.trigger(this, "update");
				this._renderer(true);	  	
			}
		}else{
			call(def.componentWillUpdate, this, newProps, this.state);
			VCC.trigger(this, "update");
			this._renderer(true);		  
		}
	};
		
  	// use registerElement() to make the new tag name recognized by the browser
	return proto._spawn = def._spawn = document.registerElement(tagName, {prototype: proto});
}; //end VCC()
  
  
// returns a function that transforms a string, turning inline bare tags into a innerHTML-populated form  
function VCCstatic(def) { 

	function build(o, k, val) {
		if (typeof o[k] === "object") o[k] = Object.bind(this, o[k]);
		o[k] = o[k] || Object.bind(this, val);
	}

	build(def, "getInitialState", {});
	build(def, "getDefaultProps", {});
  
	function htmlDecode(input) {
		return input.indexOf("&") === -1 ? input : input.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	}

	// setup mixins:
	if (typeof def.mixins === "object") {
		forEach(Array.isArray(def.mixins) ? def.mixins : [def.mixins], function(mixin) {
			forEach(Object.keys(mixin), function(k) {
				def[k] = mixin[k];
			}); //end forEach
		}); //end forEach
	} //end if mixins?

	var tagRx = RegExp("<vcc-" + def.displayName + "(\s?[^>]+\s?)?>([\\w\\W]+?)?<\/vcc-" + def.displayName + ">", "ig"),
		rxs = [/([\w\-]+)="([^"]*)"/g, /([\w\-]+)='([^']*)'/g, /([\w\-]+)=([^\s>\/]+)/g, /([\w\-]+)()/g];
	function fnReppr(j, k, v, x, y) {
		v = htmlDecode(v);
		this[k] = v === '0' ? 0 : (+v || v || true); //may have to de-encode (html) this value since its never been parsed
		return "";
	}

	return VCC.statics[def.displayName] = function transformer(str) {
		return str.replace(tagRx, function(whole, attribs, kids) {
			var sa = (attribs||"").trim(),
				content = (kids||"").trim(),
				props = {},
				that = {
					displayName: def.displayName,
					VCC: VCC
				},
				tag = {};
			//populate object tag with html-set attribs to over-ride default props
			if (sa !== "") for (b = 0; b < 4; b++) sa = sa && sa.replace(rxs[b], fnReppr.bind(tag));
			//setup props+state:
			that.props = assign(assign({}, def.getDefaultProps()), tag);
			that.state = assign({}, def.getInitialState());
			// bu/pub orig tag contents
			if (content) that.content = content;
			// call cWM:
			if (typeof def.componentWillMount === "function") def.componentWillMount.call(that, VCC);
			// build "innerHTML": 
			content = def.render.call(that, VCC) || kids;
			
			// return string representing component
			if(def._static==="content") return content;
			return "<vcc-" + def.displayName + attribs + ">" + content + "<\/vcc-" + def.displayName + ">";
		});
	};
}

VCC.attrs=function(o){
	return Object.keys(o).map(function(k){
		var v=o[k];
	  	if(v===false) return " ";
	  	if(v===true) return k+" ";
	  	return k+"="+JSON.stringify(v);
	}).join("");
};

VCC._=function(r){
	return [].slice.call(r);
};

VCC.$=function(selector, base){
	base = base || document.documentElement;
	return VCC._(base.querySelectorAll(selector));
};

VCC.elm=function ht(ob){
	if(!ob) ob= "div";
	if(typeof ob==="string") return document.createElement(ob);
	return VCC.intraHTML.elementFromString(VCC.intraHTML.toHTML(ob)).firstChild;
};

VCC.ht = VCC.intraHTML.toHTML;

VCC.assign = assign;

VCC.hasRoute=function(route, fillIn ){ 
	return location.hash ? (location.hash.search(route)!=-1) : fillIn; 
};

VCC.getRoute=function(route){
	if(typeof route === "string") route = RegExp(route+"=([^&]+)");
	return location.hash.split(route).slice(1).shift();
};

VCC.classes = function(a){  
	return Object.keys(a).filter(function(k){return a[k];}).join(" "); 
};

VCC.checked=function(v){
	return v ? ' checked="" ' : '';
};

VCC.show= VCC.if= function(v){
	return v ? '' : ' hidden ' ;
};
	
VCC.hidden= VCC.else= function(v){
	return v ? ' hidden ' : ' ';
};

VCC.data = function _(elm, obj) {
	if(!obj) return JSON.parse(JSON.stringify(elm.dataset));
	Object.keys(obj).map(function(k) {
		if(obj[k] === false) {
			elm.removeAttribute("data-" + k);
		} else {
			elm.dataset[k] = obj[k] === true ? "" : obj[k];
		}
	});
	return _(elm);
};

VCC.trigger = function(elm, strEvent) {
	var event = document.createEvent('Event');
	event.initEvent(strEvent, true, true);
	return elm.dispatchEvent(event);
};

VCC.css = function css(strCSS, blnRemove) {
	var text, doc = document;
	css.cache = css.cache || {};
	css.heap = css.heap || [];
	if(!VCC._style){
		VCC._style = VCC._style || doc.head.appendChild(doc.createElement("style"));
		VCC._style.id = "VCC_style";
	}
	if (blnRemove === true) {
		var old = css.cache[strCSS];
		if (!old) return false;
		if (old.parentNode) {
			VCC._style.removeChild(old);
		} else {
			var ind = css.heap.indexOf(old);
			if (ind !== -1) css.heap.splice(ind, 1);
		}
		delete css.cache[strCSS];
		return true;
	}

	if (!css.cache[strCSS]) {
		clearTimeout(css.timer);
		css.timer = setTimeout(function() {
			css.heap.forEach(function(a) {
				VCC._style.appendChild(a);
			});
			css.heap.length = 0;
		}, 15);
		text = doc.createTextNode(strCSS);
		css.heap.push(text);
		return css.cache[strCSS] = text;
	}
	return false;
};

VCC.statics={};
VCC.keys={};

forEach(( 
 "||||||||BACK_SPACE|TAB|||CLEAR|RETURN|ENTER||SHIFT|CONTROL|ALT|PAUSE|CAPS_LOCK|||||||ESCAPE|CONVERT|NONCONVERT|ACCEPT|MODECHANGE|SPACE|PAGE_UP|PAGE_DOWN|END|HOME|LEFT|UP|RIGHT|DOWN|SELECT|PRINT||PRINTSCREEN|INSERT|DELETE||0|1|2|3|4|5|6|7|8|9|COLON|SEMICOLON|LESS_THAN|EQUALS|GREATER_THAN|QUESTION_MARK|AT|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|WIN||CONTEXT_MENU||SLEEP|0|1|2|3|4|5|6|7|8|9|MULTIPLY|ADD|SEPARATOR|SUBTRACT|DECIMAL|"+
 "DIVIDE|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|||||||||NUM_LOCK|SCROLL_LOCK|||||||||||||||CIRCUMFLEX|EXCLAMATION|DOUBLE_QUOTE|HASH|DOLLAR|PERCENT|AMPERSAND|UNDERSCORE|OPEN_PAREN|CLOSE_PAREN|ASTERISK|PLUS|PIPE|HYPHEN_MINUS|OPEN_CURLY_BRACKET|CLOSE_CURLY_BRACKET|TILDE|||||VOLUME_MUTE|VOLUME_DOWN|VOLUME_UP|||||COMMA||PERIOD|SLASH|BACK_QUOTE|||||||||||||||||||||||||||OPEN_BRACKET|BACK_SLASH|CLOSE_BRACKET|QUOTE||META|ALTGR"
).split("|"), function(a,i){VCC.keys["DOM_VK_"+a]=VCC.keys[a]=i;VCC.keys["_"+i]=a;});

// Tiny evented state store inspired by https://github.com/rackt/redux/blob/master/src/createStore.js
// changes: uses an object of methods instead of switch(e.type), no error checking, can pass a string action name ("TEST") instead of ({type:"TEST"})
VCC.Store = Store;

function Store(reductions, state, pool) {
	if(typeof reductions  != "object") throw "Missing reduction definitions Object";
	state = state || {};
	pool = pool || [];
	var ret={
		history: [],
		getState: function(){ 
			return assign({}, state);
		},
		unsubscribe: function(fnReducer){  
			return pool = pool.filter(function(fn){return fn !== fnReducer;});
		},
		subscribe: function(fnReducer) {
			pool.push(fnReducer);
			return this.unsubscribe.bind(this, fnReducer);
		},
		dispatch: function(action){   // allows reducer return values to be fed to handlers via this:
			action = action.type ? action : {type: action};

			if(!reductions[action.type] && action.type!="_INIT_" ) throw new ReferenceError("Unknown reducer group: "+action.type);
			this.history.push(action);

			pool.forEach(function(fn){fn.call(this, state)} , 
				 action.type === "_INIT_" ? state : reductions[action.type](
					state, 
					action
			));
		}
	};
	setTimeout( ret.dispatch.bind(ret, "_INIT_"), 0);
	return ret;
}; // end Store()

// default plugins:
VCC.LinkedStateMixin={
  componentDidMount: function(){
		var hits=[].slice.call(this.querySelectorAll("[link-state]"));
		if(!hits.length) return;
		hits.forEach(function(inp){
			var prop=inp.getAttribute("link-state");
		  	this["_handle_"+prop]=  function(value){
			  	var ob={};
			  	ob[prop]= value;
				this.setState(ob);
 			};
		  	inp.setAttribute("on-change", "this._handle_"+prop+"($0.value)");
		  	inp.value=this.state[prop];
		}, this);
  },

  componentWillUpdate: function(){
		var hits=[].slice.call(this.querySelectorAll("[link-state]"));
		if(!hits.length) return;
		hits.forEach(function(inp){
			var prop=inp.getAttribute("link-state");
		  	inp.value=this.state[prop];
		}, this);
  }
};

VCC.shallowCompare = function shallowCompare(ob, p, s){
	var p2=ob.props, s2=ob.state;
	return Object.keys(p2).some(function(k, i){
		return p2[k]!==p[k];
	}) || Object.keys(s2).some(function(k, i){
		return s2[k]!==s[k];
	});
};

VCC.PureRenderMixin = {
   shouldComponentUpdate: function(nextProps, nextState) {
    return VCC.shallowCompare(this, nextProps, nextState);
  }
};


   return VCC;

}));
