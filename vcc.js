	
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
	
// Virtual DOM:
// intraHTML: a better innerHTML (partial/non-destructive updates) for faster and simpler view rendering. (c)2015:dandavis, 
  VCC.intraHTML=function(G){function H(a,c,n){if(!(2>arguments.length))for(var b=a.length,m=0;m<b;m++)c(a[m],m,a)}function B(a,c){for(var n=a.length,b=[],m=0;m<n;m++)c(a[m],m,a)&&b.push(a[m]);return b}function F(a,c){function n(a){var c=[],q=0,d=0;a=a.childNodes;var x,r,f=a.length;for(q;q<f;q++)if(x=a[q],r=x.tagName){r={$:r.toLowerCase()};for(var v=0,t=x.attributes,g,l=t.length;v<l;v++)g=t[v],r[g.name]=g.value;r._=n(x),c[d++]=r}else c[d++]=x.nodeValue;return c}return"string"==typeof a?n(D(a,c))[0]:n({tagName:c||"div",attributes:[],childNodes:[a]})[0]}function I(a,c){var n=[],b=0,m=a.length,q=c,d;for(b;b<m&&(d=a[b],"_"===d&&(d="childNodes"),n.push(q),q=q[d],void 0!==q);b++);return{node:q,parents:n}}function L(a,c){var n=[],b=0,m=a.length,q=c;for(b;b<m&&(n.push(q),q=q[a[b]],void 0!==q);b++);return{node:q,parents:n}}function E(a){var c="",n=[],b,m,q=0,d,x=0,q=n.hasOwnProperty;if(void 0===a)return"";b=a.$;for(m in a)"$"!==m&&"_"!==m&&q.call(a,m)&&(c+=" "+m+(""===a[m]?"":"="+JSON.stringify(a[m])));if(M[b])return"<"+b+c+" />";(a=a._||[],!Array.isArray(a))&&(a=[a]),q=0,d;for(x=a.length;q<x;q++)d=a[q],n[q]="object"==typeof d?E(d):d;return"<"+b+c+">"+n.join("")+"</"+b+">"}function N(a,c,n,b){function m(a,b,f){return a.textContent!==a.fsdhjklghdklg}var q=(n=b.timing)?performance.now():0,d=b.debug,x=B(a.path.concat(a.index||a.key),function(a,b,f){return a!=b.xsdgdfg}),r=x.slice,f=B(x,function(a,b,f){return a!=f.xsdgdfg}).slice(-1)[0],v=I(x,b.dest);c=L(x,b.vdom);var t=B(v.parents,Boolean),g=f,l=v.node||v.parents.slice(-1)[0],A=t,h=t.slice(-1)[0],k=c.parents.slice(-1)[0];c=!(f-.1)&&"_"!=f&&"$"!=f;var p,w,e,y,u;b=l;var C,z;"function"==typeof l&&(l=h),d&&1;switch(a.type){case"set":if(!c&&("string"==typeof a.val||Array.isArray(a.val))){h.childNodes||(h=h[g]),l||(l=h),b=l,r=a.val,Array.isArray(r)||(r=[r]),C=0;for(x=r.length;C<x;C++){c=r[C];if("string"==typeof c)if(l instanceof NodeList&&(l=b=B(A,m).pop()),b.childNodes)if(d&&1,y=document.createTextNode(c),"_"===g)b.textContent=c;else{if("$"===g){t=document.createElement(a.val),d&&1,l.parentNode.insertBefore(t,b),p=b.attributes,c=0;for(v=p.length;c<v;c++)w=p[c],t.setAttribute(w.name,w.value);p=b.childNodes,z=b.parentNode,c=0;for(v=p.length;c<v;c++)t.appendChild(p[0])}else z=b.parentNode,z.insertBefore(y,b);z.removeChild(b)}else d&&console.log("set: non attrib, string, not elm",c),b.textContent=c;else z=b.parentNode,y="string"==typeof c?document.createTextNode(c):D(E(c),h[0]&&h[0].parentNode.tagName).firstChild,b.parentNode||(l=b=h),(v=b.childNodes[+f+C])?(d&&1,b.insertBefore(y,v),b.removeChild(l)):(d&&1,b.appendChild(y));"_"==f&&(f=0,k.length||(k=k._||(k._=[]))),d&&1}break}if(c){if("$"==f&&String(x)==f)throw new TypeError("You cannot change the root element of an update-bound element: "+b.outerHTML);if("$"==f){t=document.createElement(a.val),z=b.parentNode,d&&1,z.insertBefore(t,b),p=b.attributes,c=0;for(v=p.length;c<v;c++)w=p[c],t.setAttribute(w.name,w.value);p=b.childNodes,c=0;for(v=p.length;c<v;c++)t.appendChild(p[0]);z.removeChild(b)}else!b.setAttribute&&b.parentNode&&b.parentNode.setAttribute&&(l=b=l.parentNode),!b.setAttribute&&(C=B(A,function(a,b,f){return a.setAttribute}).slice(-1)[0]).setAttribute&&(l=b=C),a.val===a.dgfjkdfl34534fd?(b.removeAttribute(f),"checked"===f&&"checkbox"===b.type&&(b.checked=!1)):(b.setAttribute(f,a.val),"checked"===f&&"checkbox"===b.type&&""===a.val&&(b.checked=!0),"value"===f&&b.select&&(b.value=a.val));break}if(b.length&&a.val===a.sdgfdf)for(z=b[0].parentNode,d=0,f=b.length;d<f;d++)z.removeChild(b[0]);else b instanceof NodeList&&(l=b=B(A,function(a,b,f){return a.textContent!==a.fsdhjklghdklg}).pop()),t=D(E(a.val),k.$).firstChild,d&&1,z=b.parentNode,z.insertBefore(t,b),z.removeChild(b);break;case"add":c||("_"==g&&(l=b=b[a.index],g=a.index,k=k._,h=h.childNodes),H(a.vals,function(a,b,f){h.length||(h=A.slice(-1)[0].childNodes),h||(h=A.slice(-2)[0].childNodes),y="string"==typeof a?document.createTextNode(a):D(E(a),h[0]&&h[0].parentNode.tagName).firstChild,(u=h[g+b])?u.parentNode.insertBefore(y,u):h[g+b]?h[g+b]=y:(e=A.slice(-1)[0],e[0]&&(e=e[e.length-1]),l&&l.length>=g&&(e=l[0].parentNode),e instanceof NodeList&&(e=B(A,function(a,b,f){return a.textContent!==a.fsdhjklghdklg}).pop()),e!==y&&(3!=e.nodeType?e.appendChild(y):(z=e.parentNode,z.insertBefore(y,e),z.insertBefore(e,y))))}));break;case"rm":if(h.childNodes&&(h=h.childNodes),0===h.length&&(h=A.slice(-3)[0]),h.childNodes&&(h=h.childNodes),k._&&(k=k._),f=r.call(h,a.index-a.num+1,a.index+1),0===a.index)for(d&&1,c=a.index,v=c+a.num;c<v;c++)h[a.index].remove();else-1<a.index-a.num?1===a.num?(f=[h[a.index]],d&&1):a.index+a.num<h.length+1?(f=a.index,1<f&&"Z"===a.mode&&(f-=a.num-1),d&&1,f=r.call(h,f,f+a.num)):(d&&1,f=r.call(h,a.index-a.num+1,a.index+1)):(d&&1,f=r.call(h,a.index,a.index+a.num)),d&&1,H(f,function(a,b,f){a.parentNode.removeChild(a)})}n&&(a.runtime=performance.now()-q)}function J(a,c,n){var b=c;"string"==typeof a&&(a=document.querySelector(a)),c=u.blnTiming?performance.now():0;var m=a.tagName.toLowerCase(),q="<"+m+">",d;a.childNodes.length||(a.innerHTML=" "),b||(b=a);if(b instanceof Element){b=b.innerHTML.replace(/<\!\-\-[\s\S]+?\-\->/g,"");if(n===b)return{update:Boolean};b=F(q+b+"</"+m+">",m)}return"string"==typeof b&&(b=F(b,m)),n=u.blnTiming?performance.now():0,d={dest:a,vdom:b,debug:u.blnDebug,timing:u.blnTiming,initTime:n-c,update:function(a){var b=u.blnTiming,f,v=0,c;b&&(f=performance.now()),"string"==typeof a&&(a=F(q+a+"</"+m+">",m)),b&&(d.parseTime=performance.now()-f),d.vdom2=a,b&&(f=performance.now()),d.changes=K(d.vdom,a),b&&(d.diffTime=performance.now()-f,f=performance.now());for(c=d.changes.length;v<c;v++)N(d.changes[v],v,d.changes,d);return b&&(d.applyTime=performance.now()-f),d.vdom=a,d}}}function u(a,c){return u._last=J(a,a,c),u._last.update(c)}Number.isNaN||(Number.isNaN=function(a){return"number"==typeof a&&isNaN(a)}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});var K=function(a,c){function n(a,b,c,g,d,m,h){for(var k=g-m,p=d-h,q=Math.max(k,p),e=1;e<=q;e++){var n=b[g-e],u=c[d-e];if(e<=p&&e<=k&&a(n,u))return{a:g-e,b:d-e};for(var r=0;r<e;r++){var z=b[g-r],x=c[d-r];if(e<=p&&a(z,u))return{a:g-r,b:d-e};if(e<=k&&a(n,x))return{a:g-e,b:d-r}}}return{a:m-1,b:h-1}}function b(a,b){if(a===b)return!0;if(Array.isArray(a)){if(!Array.isArray(b))return!1;for(var c=a.length/15,g=Math.abs(a.length-b.length),l=0,n=a.length;l<n;l++)if(m(a[l],b[l])){if(2<=g&&g>c||g===a.length)return!1;g++}return!0}if("object"==typeof a){if("object"!=typeof b)return!1;var l=d(q(Object.keys(a)),q(Object.keys(b))),n=Object.keys(l).length,c=n/15,g=0,h;for(h in l)if(!m(a[h],b[h])){if(2<=g&&g>c||g+1===n)return!1;g++}return!0}return Number.isNaN(a)&&Number.isNaN(b)}function m(a,b){if(a===b)return!0;if(Array.isArray(a)){if(Array.isArray(b)&&a.length===b.length&&a[0]===b[0]&&String(a)===String(b)){for(var c=0,d=a.length;c<d;c++)if(!m(a[c],b[c]))return!1;return!0}return!1}if("object"==typeof a){if("object"!=typeof b)return!1;var l=Object.keys(a),c=Object.keys(b);if(l.length!==c.length||String(l)!==String(c))return!1;c=0;for(d=l.length;c<d;c++)if(!m(a[l[c]],b[l[c]]))return!1;return!0}return Number.isNaN(a)&&Number.isNaN(b)}function q(a){var b=0,c=a.length,d={};for(b;b<c;b++)d[a[b]]=!0;return d}function d(a,b){for(var c in b)a[c]=b[c];return a}var u=function(a,c,t,g){function l(a,b,c){a.push({type:"set",path:b,val:c})}function r(a,b,c,d,e){a.push({type:"rm",path:b,index:c,num:d,mode:e})}function h(a,b,c,d){a.push({type:"add",path:b,index:c,vals:d})}if(!(a===c||Number.isNaN(a)&&Number.isNaN(c)))if(Array.isArray(a)&&Array.isArray(c)){for(var k=a.length-1,p=c.length-1;0<=k&&0<=p;)if(m(a[k],c[p]))k--,p--;else{for(var w=n(m,a,c,k,p,0,0),e=k;e>w.a&&p>w.b;)if(b(a[e],c[p]))u(a[e],c[p],t,g.concat([e])),e--,p--;else{var k=n(b,a,c,e,p,w.a+1,w.b+1),e=e-k.a,y=p-k.b;1===e&&1===y?l(t,g.concat(k.a+1),c[k.b+1]):1===e&&2===y?(h(t,g,k.a+2,c.slice(k.b+2,p+1)),l(t,g.concat(k.a+1),c[k.b+1])):2===e&&1===y?(r(t,g,k.a+2,1,"I"),l(t,g.concat(k.a+1),c[k.b+1])):2===e&&2===y?(l(t,g.concat(k.a+2),c[k.b+2]),l(t,g.concat(k.a+1),c[k.b+1])):(0<e&&r(t,g,k.a+1,e,"X"),0<y&&h(t,g,k.a+1,c.slice(k.b+1,p+1))),e=k.a,p=k.b}e>w.a?r(t,g,e,e-w.a,"Z"):p>w.b&&h(t,g,e+1,c.slice(w.b+1,p+1)),k=w.a,p=w.b}0<=k?r(t,g,0,k+1):0<=p&&h(t,g,0,c.slice(0,p+1))}else if("object"==typeof a&&"object"==typeof c)for(p in w=d(q(Object.keys(a)),q(Object.keys(c))),w)u(a[p],c[p],t,g.concat([p]));else l(t,g,c)},r=[];return u(a,c,r,[]),r},D=function(a,c){var n=document.createElement("div");return n._intraDirty=!0,n.innerHTML=a,n},M={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1};return u.elementFromString=D,u.fromHTML=F,u.toHTML=E,u.odiff=K,u.updater=J,u.resolvePath=I,u.blnTiming=!1,u.blnDebug=!1,G.jQuery&&(G.jQuery.fn.intraHTML=function(a){return this.each(function(c,n){u(n,a)}),this}),u}(pub)
  ;

  
  
  
var DEFS={};

  

function VCC(def) {
	// guard input object and displayName property:
	if(typeof def !== "object") throw new TypeError("VCC Expects a definition object");
	if(typeof def.displayName !== "string") throw new TypeError("VCC Definition needs a String displayName property");
  
  	function call(fn, that, a, b){
		if(!fn || typeof fn !== "function") return; 
	  	return arguments.length===4 ? fn.call(that, a, b) : fn.call(that, a);
	}

 	var EVENTS="reset,invalid,focus,blur,select,keydown,keypress,keyup,mousedown,mouseup,click,dblclick,change,submit,input,paste".split(","),
   	fnCache={}, 
   	tagName = "vcc-" + def.displayName;

	if(VCC[tagName]) return; // don't define a component twice
	VCC[tagName] = def; // add this def to the collective

	//allow "inheritance from array of mixins left to right:  
	if(def.mixins) (Array.isArray(def.mixins) ? def.mixins : [def.mixins]).forEach(function(mixin) {
		Object.keys(mixin).forEach(function(k){	def[k] = mixin[k]; });
	});

	//make render optional by subbin in Boolean if missing:
	if(typeof def.render !== "function") def.render = Boolean.bind(true, true);

	var proto = DEFS[tagName] = Object.create(def.proto || {});
	  
	proto.remove = def.componentWillUnmount || Boolean;
	proto.insert = function(){
	
	  [].forEach.call(this.querySelectorAll("[ref]"), function(elm){
		  	var ref=elm.getAttribute("ref"),
			ref2=eval("0||"+ref);
		  	if(ref2.call) ref2.call(this, elm);
		}, this);
	  
		call(def.componentDidMount, this);
	};
	proto.create = function _init(e) {
		if(this.parentNode && this.parentNode._intraDirty) return;
	  	if(this._def) return;
	  
	  	
		var that = this, oldState, oldProps;
		this.state = assign({}, call(def.getInitialState, this) || {});
		this._def = def;
		this.props =  assign({}, call(def.getDefaultProps, this) || {});
	  	this._proto=proto;
	  
	  	[].forEach.call(this.attributes, function(attr, index){
		  	if(EVENTS.indexOf(attr.name.replace(/^on\-/,""))!==-1) return;
		  	var val=attr.value;
		  	try{ val=Function("return "+ val).call(that); }catch(y){}
		  	this.props[attr.name]=val;
		}, this);

		// bind any events to the actual tag:
		EVENTS.forEach(function(evt) {
			this.addEventListener(evt, function(e) {
				var elm = e.target,
					cmd = elm.getAttribute("on-"+evt);
				if(!cmd) return;
			  	var fn=(fnCache[cmd] || (fnCache[cmd]=Function("event", "return " + cmd))).call(that,e);
			  	if(typeof fn==="function") setTimeout(fn.bind(that, e), 0);
			}, true);
		}, this);

		// bind all methods:
		Object.keys(def).forEach(function(method, _, __) {
			if(typeof def[method] !== "function" || {render: 1}[method] ) return;
			if(!this[method]) this[method] = def[method].bind(this);
		}, this);

	  
		function renderer(blnNow) {
		  	function _render() {
			  	var temp = def.render.call(that);
				if(renderer.oldView != temp ) VCC.intraHTML(that, renderer.oldView = temp);
				call(def.componentDidUpdate, that, that.props, oldState);
			}
		  	if(blnNow === true) return _render();
			clearTimeout(renderer.timer);
			renderer.timer = setTimeout(_render, 15);
		}

		this.setState = function(state) {
			if(def.shouldComponentUpdate) {
				if(call(def.shouldComponentUpdate, this, this.props, state)) {
				  	call(def.componentWillUpdate, this, this.props, state);
					renderer();
				}
			} else {
				call(def.componentWillUpdate, this, this.props, state);
				renderer();
			}
		  	oldState = assign({}, that.state);
			assign(that.state, state);
		};
	  
	  	this._renderer=	renderer;
		this._render= this.setState.bind(this, {});

		call(def.componentWillMount, this, def);
	  	renderer(true);

	}; //end create callBack


	// watch attribs for changes to sync attribs + defined props
	proto.update= function _change(){
	  	var e=this._e.attributeName, v=this.getAttribute(e);
	  
		if(e=="class"){return; } // class is too noisy to make a useable prop
		var newProps = assign({}, this.props); // shallow copy of props
		if(def.propTypes && def.propTypes[e])try{ v=def.propTypes[e](v);}catch(y){} //coerce if needed
		newProps[e]=v; 
		call(def.componentWillReceiveProps, this, newProps);
		assign(this.props, newProps); // copy new props into current
		if(def.shouldComponentUpdate){
			if(call(def.shouldComponentUpdate, this, newProps, this.state)){
				call(def.componentWillUpdate, this, newProps, this.state);
				this._renderer(true);	  	
			}
		}else{
			call(def.componentWillUpdate, this, newProps, this.state);
			this._renderer(true);		  
		}
	};

}; //end VCC()
  
  VCC.attrs=function(o){
  	return Object.keys(o).map(function(k){
		var v=o[k];
	  	if(v===false) return " ";
	  	if(v===true) return k+" ";
	  	return k+"="+JSON.stringify(v);
	}).join("");
  };


VCC.hasRoute=function(route, fillIn ){ 
	return location.hash ? (location.hash.search(route)!=-1) : fillIn; 
};

VCC.classes = function(a){  
	return Object.keys(a).filter(function(k){return a[k];}).join(" "); 
};

VCC.checked=function(v){
	return v ? ' checked="" ' : '';
};

VCC.show=function(v){
	return v ? '' : ' hidden ' ;
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

VCC.keys={};
( 
 "||||||||BACK_SPACE|TAB|||CLEAR|RETURN|ENTER||SHIFT|CONTROL|ALT|PAUSE|CAPS_LOCK|||||||ESCAPE|CONVERT|NONCONVERT|ACCEPT|MODECHANGE|SPACE|PAGE_UP|PAGE_DOWN|END|HOME|LEFT|UP|RIGHT|DOWN|SELECT|PRINT||PRINTSCREEN|INSERT|DELETE||0|1|2|3|4|5|6|7|8|9|COLON|SEMICOLON|LESS_THAN|EQUALS|GREATER_THAN|QUESTION_MARK|AT|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|WIN||CONTEXT_MENU||SLEEP|0|1|2|3|4|5|6|7|8|9|MULTIPLY|ADD|SEPARATOR|SUBTRACT|DECIMAL|"+
 "DIVIDE|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|||||||||NUM_LOCK|SCROLL_LOCK|||||||||||||||CIRCUMFLEX|EXCLAMATION|DOUBLE_QUOTE|HASH|DOLLAR|PERCENT|AMPERSAND|UNDERSCORE|OPEN_PAREN|CLOSE_PAREN|ASTERISK|PLUS|PIPE|HYPHEN_MINUS|OPEN_CURLY_BRACKET|CLOSE_CURLY_BRACKET|TILDE|||||VOLUME_MUTE|VOLUME_DOWN|VOLUME_UP|||||COMMA||PERIOD|SLASH|BACK_QUOTE|||||||||||||||||||||||||||OPEN_BRACKET|BACK_SLASH|CLOSE_BRACKET|QUOTE||META|ALTGR"
).split("|").forEach(function(a,i){VCC.keys["DOM_VK_"+a]=VCC.keys[a]=i;VCC.keys["_"+i]=a;});

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

  
  
///////////////////////////////////////////////////////  
  
  
  
  
  
  
  
// given a string of html, returns a document fragment of that content:
fragmentFromString.temp = document.createElement('template');
function fragmentFromString(strHTML) {
	var temp = fragmentFromString.temp;
	temp.innerHTML = strHTML;
	return temp.content;
}


// given a string of html, returns a document fragment of that content:

function runEvent(type, callback, condition, node){
  	if(!node) return;
  
    var nodes= node.childElementCount ? [].concat.apply([node], node.children || [] ) : [node];
  
  	for(var i=0, mx=nodes.length;i<mx;i++){
	  var node=nodes[i];
		if( node.tagName && 
		    node.tagName.indexOf("-") !== -1 && 
		    (def=DEFS[node.tagName.toLowerCase()])
		  ){
			if(condition && !condition.call(node, def)) continue;
			if(def[type]){
			  	def[type].call(node);
			}
		  	if(callback) callback(node);
		}
	  	if(node.childElementCount){
			//runEvent(type, callback, node, condition);
		  	[].forEach.call(node.children, runEvent.bind(null, type, callback, condition));
		}
	}
}   
  
  
  
  
  
  
  
new MutationObserver(function(mutations) {
  	var fnAdder = runEvent.bind(null, "insert", null, null);
  	for(var ii=0,mx=mutations.length;ii<mx;ii++){
		
	  	var x=mutations[ii], bonus={}, nodes, def, attr;
	  
		switch(x.type){
		  case "childList":  
			if(nodes=x.addedNodes) [].forEach.call(nodes, fnAdder);
			break;
		  
		  case "attributes": 
			runEvent("update", null, function(def){
				 var ok= x.target.props && x.target.props[x.attributeName];	
			  if(ok){
				x.target._e=x;
				return true;
			  }
			}, x.target );
			
			break;
			
		  default: return;
		}//end switch
	}//next
  
}).observe(document.body,  {
	attributes: true,
	childList: true,
	subtree: true,
});

  
  
VCC.render= function render(html, elm){
  var node=fragmentFromString(html.trim()).firstChild;
  runEvent("create", function(node, index){
  		if(index && node.children.length) render(html, node);
  }, null, node);
  
  //node.innerHTML=template(data, node.innerHTML);
  var def=DEFS[node.tagName.toLowerCase()];
  
  if(def && def.render )  node.innerHTML= def.render.call(node);
  
  VCC.findAndInit();
  return elm.appendChild(node);
};
  
  VCC.findAndInit=function fan(){
  	clearTimeout(fan.timer);
	fan.timer=setTimeout(function(){
		 [].filter.call(document.querySelectorAll(Object.keys(DEFS)), function(a){return !a._def;})
		  .forEach(function(a,b,c){
			  var temp=document.createElement("div");
			  a.parentNode.insertBefore(temp, a);
			  a.parentNode.removeChild(a);
			  VCC.render(a.outerHTML, temp);
			  temp.parentNode.insertBefore(temp.children[0], temp);
			  temp.remove();		  	
		  });
	}, 10);  
  
  };
  
   return VCC;

}));	
	
	
