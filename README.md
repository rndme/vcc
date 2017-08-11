# VCC
View Component Creator : lightweight reactive web components <br />
View an Unofficial [TodoMVC](http://todomvc.com/) [Todo Application Demo](http://danml.com/todo/) to kick the tires.<br>


View fancier [online docs](http://danml.com/vcc/docs.html)

## About
A light-weight API to create [W3 custom elements](http://w3c.github.io/webcomponents/spec/custom/) using a [React](https://facebook.github.io/react/)-like syntax instead of [polymer](https://www.polymer-project.org/1.0/) or [x-tags](http://x-tag.github.io/). VCC has a one-way data flow into components via attributes, and each component has a private internal state. Built for simplicity (no building, no transpiling, no pre-compilation) on well-tested tools and concepts ([registerElement](https://github.com/WebReflection/document-register-element), [VDOM](https://github.com/rndme/intraHTML/), [odiff](https://github.com/Tixit/odiff)), there are no current plans for major new features, but PRs are welcome.


### Setup
Use `npm install vcc` or `bower install vcc` or just download and include [the script file](https://raw.githubusercontent.com/rndme/vcc/master/vcc.js) in your page or application. There's no other steps, build processes or large bundles required. With custom html in your document/app and VCC in a script, you're good to go.



### Advantages

#### HTML Elements
Components expose custom methods and events to non-VCC actors. This makes it easy to set props by changing an attribute, and external props can be hit using  CSS2 `[attribute]` selectors. You can also easily inspect the full properties of the component in devtools without any browser add-ons. Isomorphic apps are easy becuase you just need to generate HTML on the server, which all servers can do (php included). Lastly, serializing the component using ex. `elm.outerHTML` will define non-default prop values for later use. All we know and love about html, now available in components.



#### No build process
Changes can be made on the fly to one part without needing to re-bundle the whole application, allowing better caching, on-the-fly patching, and more contextualized error messages.
The source of the component is the same code that runs, removing a layer of abstraction while allowing better debugging with simpler tools. More than anything, it's just simpler and more in the spirit of the web where code runs in the open.



#### Lightweight Runtime
A cat will beat a horse in a race that lasts one second. At about 25kb pre-gzip, VCC doesn't make mobile users wait around to get going. Components arrive in the actual HTML, allowing pre-mounting CSS targeting and accelerated layout. Despite the diminutive size, VCC provides a great API for creating re-usable UI components while embracing web standards.


### How it's made
Define custom web components using an intuitive declaration object with pre-defiend properties to configure lifecycle events, state management, and contents. [ES6 template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) (or a custom template tool of your choice) replace [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), a [Virtual DOM](https://github.com/rndme/intraHTML) provides fast updates, and [HTML5 Custom Elements](https://www.w3.org/TR/custom-elements/) enables _real-life_ HTML tags. This combination delivers custom element components using a slim but powerful delarative API.

## Components

### Component Properties
These properties control almost eveything about the component using a decalrative literal-friendly interface:

|Property|Type|Description |
|-------:|:------:|-----|
|`displayName`|String| **REQUIRED** - the tagName of the custom element (without the `vcc-` prefix) |
|`componentDidMount()`| Function |_Event_: After initial `.render()`, now in DOM and populated |
|`componentDidUpdate (prevProps, prevState)`|Function|_Event_: new props/state, good for DOM work |
|`componentWillMount`|Function|_Event_: Before `.render()` no DOM children, but has state |
|`componentWillReceiveProps (newProps)`|Function|_Event_: Atrrib changed. Good for setState() |
|`componentWillUnmount()`|Function|_Event_: Invoked _after_ DOM node removal |
|`componentWillUpdate (newProps, newState)`|Function|_Event_: about to re-render, too late for `.setState()` |
|`shouldComponentUpdate (newProps, newState)`|Function| Skip `.render()` by returning `false` |
|`getDefaultProps()`|Function|object or object-returning function of initial properties (attribs) |
|`getInitialState()`|Function|object or object-returning function of default state config (internal)  |
|`propTypes`|Object|an object of methods used to coerce or validate matching-name `props` |
|`render()`|Function| string-returning method that defines component's .innerHTML |
|`events`|Object| Specifies DOM events to be bound to methods on the component |
|`mixins`|Object| Object or Array of Objects used to extend the component definition |
|`mixouts`|Object|Object or Array of Objects used to extend the component's _instance_ properties |
|`proto`|Object|Specifies Custom Element prototype, defaults to `HTMLElement.prototype` |
|`renderTrigger`|Function|a shortcut to bind to something like redux or CIA's `.subscribe` method, eg. `renderTrigger:store.subscribe,` will re-render each time the store updates |
|`_delegate`|Boolean|event delegation option: eg. `<ul on-click=...` to catch `<li>` clicks |

### Instance Methods
Each component is an Element with a few extra methods added on be default.

#### setState
A function accepting a single object to be merged into the state of the component. Passing `true` as the 2nrd argument replaces the state instead of augmenting the state.

#### _render
Calls the internal `render()` method to update the view with data that not did go through `component.setState` or `component.setAttribute`, such as a timer or global variable.

#### VCC
A shortcut to VCC itself, mainly to allow using the static helper methods inside of render() and events as `this.VCC.methodName()`.


### Instance Properties

#### props
An object of component properties. Attributes matching a prop name will update the prop with the attrib value upon changing. The initial props come from `def.getDefaultProps()`.

#### state
The state of the component, exposed so that render() and events can read the state. Do not directly modify this object, use `component.setState()` instead. The default state comes from `def.getInitialState()`.

#### _attached
A simple boolean flag set once the component element is attached to the dom.

#### _def
A shortcut to the component definition, rarely needed, but allows run-time reading of config as well as sub-classing and cloning.


### State and Props
Setting the _state_ of a component should be done through `this.setState({key: value})`, which triggers the update lifecycle process and (potentially) re-renders the component. 
If you need to change and/or remember something during the usage of your app, it probably belongs in the state. 
Partial state objects you pass to `setState` extend the current state while whole states replace it.

_Props_ are primarily a mechanism by which parents communicate chunks of data to children, via templating inside of `.render()`. However, since the component tag is inside the DOM, you might also find a need to modify it's attributes. 
Updating `props` does **not** update attributes, but you can use `this.setAttribute("key", "testing")` to change the attribute `key` and update `props.key` to `"testing"` in one command.




### Tips and Tricks
* Paste component definitions into the [babel REPL](https://babeljs.io/repl/) to get code that runs in IE
* Use helpers like `VCC.classes({y:1, n:0})` and `VCC.checked(obj.isActive)` to cleanup templated attribs
* Create static components (no updates/DOM interaction) using `shouldComponentUpdate: Boolean.bind(null, false),`
* Don't deeply nest complex components, use `VCC.Store` to flatten updates instead
* Inside of VCC.Store reducers, returning nothing has the same effect as `return state;`
* `VCC.Store`'s `.dispatch('SOMETYPE)` is the same as `.dispatch({type: 'SOMETYPE'})`
* Inside of `on-event` handlers, `this` is the custom element and `event.target` raised the event
* The `this` value in template expressions is the nearest overhead custom element component
* `elm._renderer(true)` forces redraw and `elm._render()` triggers one (w/shouldComponentUpdate, debounce, etc)
* Catch many keycodes: `switch(VCC.keys['_'+(e.which||e.keyCode)]){case 'RETURN':case 'SPACE': return false;}`
* Compare a single keycode with constants: `if(VCC.keys['ESCAPE']==(e.which||e.keyCode))`
* `VCC` is passed to render to allow pure use (DI) of the [Static Utilities](static-utilities): `render: function(VCC)`
* The [Static Utilities](static-utilities) can be reached inside of render as `this.VCC`
* All `mixouts` can be reached inside of render and events as `this._name_`: `mixouts:{double:x=>x*x},` ... `${this.double(this.state.cost)}`
* You _can_ use objects instead of functions with `getInitialState:{a:1},` and `getDefaultProps:{b:2},`
 


## Component Lifecycle
(These descriptions taken from https://facebook.github.io/react/docs/component-specs.html)

Various methods are executed at specific points in a component's lifecycle.


### componentWillMount

```javascript
void componentWillMount()
```

Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call `setState` within this method, `render()` will see the updated state and will be executed only once despite the state change.


### componentDidMount

```javascript
void componentDidMount()
```

Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation). The `componentDidMount()` method of child components is invoked before that of parent components.

If you want to integrate with other JavaScript frameworks, set timers using `setTimeout` or `setInterval`, or send AJAX requests, perform those operations in this method.


### componentWillReceiveProps

```javascript
void componentWillReceiveProps(
  object nextProps
)
```

Invoked when a component is receiving new props. This method is not called for the initial render.

Use this as an opportunity to react to a prop transition before `render()` is called by updating the state using `this.setState()`. The old props can be accessed via `this.props`. Calling `this.setState()` within this function will not trigger an additional render.

```javascript
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

> Note:
> There is no analogous method `componentWillReceiveState`. An incoming prop transition may cause a state change, but the opposite is not true. If you need to perform operations in response to a state change, use `componentWillUpdate`.


### shouldComponentUpdate

```javascript
boolean shouldComponentUpdate(
  object nextProps, object nextState
)
```

Invoked before rendering when new props or state are being received. This method is not called for the initial render or when `forceUpdate` is used.

Use this as an opportunity to `return false` when you're certain that the transition to the new props and state will not require a component update.

```javascript
shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```

If `shouldComponentUpdate` returns false, then `render()` will be completely skipped until the next state change. In addition, `componentWillUpdate` and `componentDidUpdate` will not be called.

By default, `shouldComponentUpdate` always returns `true` to prevent subtle bugs when `state` is mutated in place, but if you are careful to always treat `state` as immutable and to read only from `props` and `state` in `render()` then you can override `shouldComponentUpdate` with an implementation that compares the old props and state to their replacements.

If performance is a bottleneck, especially with dozens or hundreds of components, use `shouldComponentUpdate` to speed up your app.


### componentWillUpdate

```javascript
void componentWillUpdate(
  object nextProps, object nextState
)
```

Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.

Use this as an opportunity to perform preparation before an update occurs.

> Note:
>
> You *cannot* use `this.setState()` in this method. If you need to update state in response to a prop change, use `componentWillReceiveProps` instead.


### componentDidUpdate

```javascript
void componentDidUpdate(
  object prevProps, object prevState
)
```

Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated.


### componentWillUnmount

```javascript
void componentWillUnmount()
```

Invoked immediately before a component is unmounted from the DOM.

Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in `componentDidMount`.


## Component Events
In addition to the lifecyle events, DOM and custom events may be used.

### Pre-defined DOM events
The `events` definition property object (or method) specifies DOM events to be bound to methods on the component. VCC automatically binds these events at element creation time. Events are written in the format {"event selector": "callback"}. The value must be the name of a method or a function. Omitting the selector binds to the component itself.

[live demo](http://pagedemos.com/y3c9q6f39e3e/)
```js
VCC({
	displayName: "test",

	makeRed:   function() { this.style.color = "red";	},
  	makeBlue:  function() { this.style.color = "blue";	},
  	makeGreen: function() { this.style.color = "green";	},

	events: {
		"dblclick":	"makeRed",
		"click b": 	"makeBlue",
		"contextmenu .blue": "makeGreen"
	},

	render: function() {
		return `Double-click for Red. <b class=blue > Click here for blue, right click for green.</b>.`;
	}
});
```

### on-click vs onclick
`on-event`-type events are synthetic and delegated. One event on the component watches all sub-tags for such events. Synthetic events vary from DOM events in that the `this` value is always the _component_, not the sub-tag that triggered the event. You can also use the word `event` inline in such atribs to refer to the event object, so `event.target` is the sub-tag that triggered the event. Lastly, there is a shortcut to `event.target` called `$1`, named after the console placeholder. [Live Event Demo](http://pagedemos.com/98b5wt5dbhs3/)

	
### Custom Events
Since DOM events, including custom events, bubble up to `<html>`, custom events are a great way to talk to parent components and containers. `VCC.trigger(elm, strEvent)` will dispatch an event of type `strEvent` on the `elm` Element, which will also fire on all parent elements. [Custom Event Live Demo](http://pagedemos.com/dftgryy5e32w/)

## Add-Ons
VCC currently ships with a few common addons statically defined: 

* `VCC.PureRenderMixin`: defines shouldComponentUpdate() with a shallow compare on the state and props
* `VCC.shallowCompare(this, newProps, newState) `: checks shallow equality on props/nextProps and state/nextState
* `VCC.LinkedStateMixin`: Declaritvely 2-way binds value changes to component state `<input link-state=myprop  />` 




## Static Utilities
Handy app and ES6 template helpers to reduce the boilerplate of pure JS logic
* `VCC.$(css, root)` - gets `Array` of tags matching _selectors_ under _root_ (opt) or `<html>`<br>
* `VCC._(arrLike)` - returns a true array froma  collection, string, etc <br>
* `VCC.attrs(obj)` - serializes an object into a string of HTML attributes <br>
* `VCC.checked(val)` - if `v` is `==true`, outputs ` checked ` else outputs and empty string <br>
* `VCC.classes(obj)` - returns space-separated list of object key names whose values `==true` <br>
* `VCC.css(strCSS)` - unique inject CSS with a buffered heap. Pass same CSS + `, true` to remove<br>
* `VCC.data(elm, obj)` -  gets or sets one or more `data-` attribs as an object <br>
* `VCC.elm(obj)`- returns an Element from a lossless JS object defining the markups as follows:      
      
    `$:"tagName"` and `_:[children]` are special, all other properties define attributes.    
```js
VCC.elm({ $: "div", class: "main", _: [
	"Hello ", {$: "b",_: [
		"World"
	]}
]});
```    
	turns into:  (whitespace exagerated)
```html 
<div class=main>
	Hello 
	<b>World</b>
</div>
```
* `VCC.ht(obj)` - same as VCC.elm but returns a string instead of an Element.
* `VCC.hasRoute(route, strIfFalse)` - uses `location.hash` to match a String or RegExp route name
* `VCC.getRoute(route)` - match `location.hash` w/ String/RX name of a `key=value` pair to get value
* `VCC.show(val)` - if not `==true`, then returns " hidden ", else returns an empty string
* `VCC.if(val)` - if not `==true`, then returns " hidden ", else returns an empty string
* `VCC.hide(val)` - if not `==false`, then returns " hidden ", else returns an empty string
* `VCC.else(val)` - if not `==false`, then returns " hidden ", else returns an empty string
* `VCC.trigger(elm, evt)` - given Element and String event name, raise that event on the element.
* `VCC.json([val])` - unified JSON helper turns non-strings into strings, or strings and fetch responses into objects
* `VCC.orderBy(key)` - returns a sort() callback function targeting a root key by name. `arr.sort(VCC.orderBy("lastName"))`

## Static Components
Activated by setting `_static: true,` in a component definition, static components render extremely fast by running on a lightweight subset of the full VCC API. 
This partially solves [the drawbacks](#caveats) associated with the polyfill version of `document.registerElement` VCC uses in some browsers, 
and allows all browsers to render fast and simple sub-components. Only the options listed below will be applied to the component. 

Static components do not update once rendered (instead, they are cheap to render) so they don't need methods like `shouldComponentUpdate` or `setState`. You cannot update the state of an instance, but you can modify the value returned by initialState to activate component-wide changes on the next render, a major advantage of not having a build requirement. If a parent component changes an attrib given to the static component, that new value will show up in the render, making attributes the primary method for customizing static components.

### Static Component Definition Members

|Property|Description| 
|--------|----------|
|displayName		|String tag name of the component|
|getDefaultProps()	|Object or object-returning function of initial properties (attribs)|
|getInitialState()	|Object or object-returning function of default state config (internal)|
|componentWillMount	|Event: Before .render() (no DOM children)|
|mixins			|Object or Array of Objects used to extend the component _definition_|
|render()		|String-returning method that defines component's .innerHTML|




### Static Component Instance Members

|Property|Desription|
|--------|----------|
|this |	the lightweight instance object with {props, state, displayName, content} members |
|props|	object of properties, typically for late-specified data |
|state|	object of view state |
|displayName| the tag name of the component (inherited from def) |


### Example Static Component:
```javascript
VCC({
	_static: 	true,
	displayName: 	"date",
	render: 	function() { 
		return new Date( +this.content || this.content ).toLocaleDateString(); 
	}
});
```
This component formats a Date instance into a human-readable date (no time). [Live Demo](http://pagedemos.com/rf6j9zab6g5v/)







## Comparison
[React](https://github.com/facebook/react) has some great ideas, but needs [build tools](https://github.com/facebook/react/wiki/Complementary-Tools#build-tools) and a [large runtime](https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js), and web components don't. <br />
Web Components also use existing, standardized syntax like `<li class=item>` instead of `<li className=item>`, reduing the re-learning needed to use it. VCC is made of lifecycle events, a VDOM-based differ, and a few helpers; all your work is done in JS, with the  syntax, style, and libraries of your choice riding along as needed.

If you're not familiar with react or the VDOM concept, check it out. The main advantage is that you can write simple full-page templates like we did with PHP 10 years ago, but that those templates can update w/o UX side-effects as views are instantly merged with the user's screen. This keeps all the moving parts updated with simple logic instead of an untenable heap of DOM calls.


### Differences from React

* no JSX, returns a string of HTML from `render()`
* `render:` is optional since not all tags need to template content.
* component tags themselves appears in the DOM as a real tag (via Custom Element)
* no built-in spreading props from JSX, but you can inject strings anywhere in HTML
* no `react-id` or other unique IDs cluttering your clean HTML5 markup
* no built-in helpers for `propTypes` on definition, use any function to coerce/default/throw as needed
* no `.statics` available on definition (not that useful anyway, since it's instantiated via HTML)
* `displayName` on definition is REQUIRED to defines the tagName
* no `ref` _String_ support, but does accept _Functions_ (which are recommended)
* tag names must use a `vcc-` prefix and _no_ uppercase letters to conform with HTML5 Custom Elements
* since it appears in the DOM, setting a component's attributes at run-time is ok, and updates `props`


### General Conversion Routine
It's easy to convert demos from React to VCC by making a few simple syntax adjustments to bring JSX in line with HTML5.

* change the tag wrappers in `render()` return from ` ( ` and ` ) ` to <code>`</code> (both sides)
* add <code>`</code> "quotes" around JSX literals used in any methods, so as to create legit Strings
* change the JS delimiters from `{...}` to `${...}` so as to use native ES6 templating
* change custom tags from CamelCase to lowercase, then prefix `vcc-` to enable it as a custom element
* change the CamelCase event attributes (like `onClick`) to lowercase with an `on-` prefix (like `on-click`)
* change `React.createClass` to `VCC` and add/modify the `displayName` property to custom tag name


 
### W3 to React Life Cycle Events
Web component events provide enough unerpinning to provide customary component lifecycle events:
	
| Web Component Event      | VCC Event(s)              | 
|-------------------------:|---------------------------| 
| createdCallback          | componentWillMount        | 
|                          | componentDidUpdate        | 
|                          |                           | 
| attachedCallback         | componentDidMount         | 
|                          |                           | 
| detachedCallback         | componentWillUnmount      | 
|                          |                           | 
| attributeChangedCallback | componentWillReceiveProps | 
|                          | shouldComponentUpdate     | 
|                          | componentWillUpdate       | 
|                          | componentDidUpdate        | 

  
### Caveats
*So this all looks really neat, but what's the catch from not having a build step?*

To run at max power `document.registerElement()` must be supported by the browser. The included polyfill is not perfect and has one important behavior difference compared to native support: the polyfill doesn't immediately (sync) populate the contents of nested components (child html mods made during `componentWillMount`). 

This causes the VDOM's DIFF to compare un-initialized tags. While it still works because `props` will persist and the sub-components will self-init when they hit the DOM, it causes over-rendering compared to a browser with native web components support. Simple nested components like date formatters or pluralizers should run fast enough in all browsers, but don't wrap an extra container tag around a huge grid component. This is the main drawback and is an area of intense research to find a cure.

TLDR; if you need to run something complex at top-speed in non-webkit, don't nest complex components. <br />
You don't need to nest VCC components at all if you use VCC.store or something like [redux](https://github.com/reactjs/redux) or [CIA](https://github.com/rndme/cia) to talk between all the pieces of your app.


	
	
 
## Examples

### Hello World Example
```javascript
VCC({
  displayName: "hello",
  render: function() {
    return `<h1>Hello ${this.props.name}</h1>`;
  }
});
```
+`<vcc-hello name="World"></vcc-hello>` =
```html
<vcc-hello name="World"><h1>Hello World</h1></vcc-hello>
```

### Pausable Clock Example  
This example uses a click event and state management to show a pausable clock to the user:  [Live Demo of clock example](http://pagedemos.com/9nmj42uu2beu/)
```javascript
VCC({
	displayName: 'clock',
	componentWillMount: function(){
		this.onclick();
	},
	getInitialState: function() {
		return {
			interval: 0
		};
	},
	render: function() {
		return new Date()
		  .toLocaleTimeString()
		  .fontcolor(
		  	this.state.interval ? 
		  		"black" : 
			  	"gray"
		  );
	},
	onclick: function(e) {
		var me = this.state;
		if (me.interval) this.setState({
			interval: clearInterval(me.interval)
		});
		else this.setState({
			interval: setInterval(this.setState, 1000)
		});
	}
});
```

### Store Example
This example uses VCC.Store to connect many comonent states in a non-conflicting manner:  [Live Demo of Store example](hhttp://pagedemos.com/v86mfutwxn5v/)
```html
<h1>VCC Store Demo</h1>

a <vcc-setnum name=a></vcc-setnum> <br> +<br>
b <vcc-setnum name=b></vcc-setnum> <br> =<br> 
c <vcc-setnum name=c></vcc-setnum>  

<script src=http://danml.com/bundle/rndme.vcc_.js></script>
<script>

var store=VCC.Store({
	SET_A: (state,e)=> state.c=state.b+(state.a=e.n),
  	SET_B: (state,e)=> state.c=state.a+(state.b=e.n),
  	SET_C: (state,e)=>{  state.a=e.n-state.b; state.c=e.n;  },
},{
	a: 0,
  	b: 0,
  	c: 0
});

VCC({  
	displayName: "setnum",
  	renderTrigger: store.subscribe.bind(store),
  	setIt: function(e){
		store.dispatch({type: "SET_"+this.props.name.toUpperCase(), n: +e.target.value});
	},
	render: function(){ var s=store.getState();
	  	return "<input type=number on-input=this.setIt value="+s[this.props.name]+">";
	}
});

</script>
```
You might recognize the pattern as [redux](https://github.com/reactjs/redux), which VCC.Store _is_ a very basic implimentation of.


### Mustache Example
VCC doesn't have to use ES6 templating, you can use any or even no template engine. The only requirement of `.render()` is that it returns a String. This example replicates [the rating widget](http://pagedemos.com/r3dpfu9djrw5/) using the popular [mustache.js](https://github.com/janl/mustache.js/) templater instead of ES6.

[Live Demo of Mustache Templates](http://pagedemos.com/vj6pt75mn6z6/)

```html
<vcc-rate value=2></vcc-rate>  
<script type=template id=tmpStars>
  <span class=star title=1>★</span>
  <span class=star title=2>★</span>
  <span class=star title=3>★</span>
  <span class=star title=4>★</span>
  <span class=star title=5>★</span>
  <small>( {{props.value}} )</small>
</script>  
<script src="http://danml.com/bundle/rndme.vcc.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min.js"></script>  
<script>

VCC({
	displayName: 'rate',
  	mixouts:{	  
		template: Mustache.to_html.bind(Mustache), 
	 	contents: document.getElementById("tmpStars").textContent
	},
	render: function(){
		return this.template(this.contents, this);
	},
	onclick: function(e) {
		 this.attributes.value.nodeValue= e.target.title;
	},
  	css:`vcc-rate .star {
			color:#444;
			padding:0.2em;
			cursor:pointer;
			transition:500ms 50ms color;
		}
		vcc-rate small { font-size: 65%; position: relative; top: -0.2em; }
		vcc-rate[value]:hover>.star[title] {color:#111;}
		html body vcc-rate[value]:hover>.star[title]:hover ~ span[title] {color:#ccc;}

		vcc-rate[value='1'] .star:first-child ~ span, 
		vcc-rate[value='2'] .star[title='2'] ~ span, 
		vcc-rate[value='3'] .star[title='3'] ~ span, 
		vcc-rate[value='4'] .star[title='4'] ~ span {
			color:#ccc;
		}`
});
</script>
```


### Isomorphic Example
This example uses php file to pre-populate the data for SEO and better percieved performance:  [Live Demo of isomprphic example](http://danml.com/vcc/isomorphic.php)
```php
<?php

$zip = 1 * $_GET['zip']; // validate input to be a number to stop XSS
if(!$zip) $zip = 90210;
$data = json_decode(file_get_contents('http://api.zippopotam.us/us/' . $zip ));

?><!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Isomorphic VCC Application Demo</title>
	<link rel=stylesheet href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/superhero/bootstrap.min.css" >	
</head><body class=container>
<h1>Isomorphic <a href="https://github.com/rndme/vcc/">VCC</a> Application Demo</h1>
<h2> App Input </h2>  
	<label> 
		Zip Code: <input onchange="card.setAttribute('zip', value)" value="<? echo $zip;?>" list=zips >
	</label> 
	<button  class=btn-success>Change</button>
    <!-- pre-populate some zip codes to tryout: -->
	<datalist id=zips>
		<option>33133</option>
		<option>61801</option>
		<option>90210</option>
		<option>10001</option>
		<option>96817</option>
	</datalist>
  
<h2> App Output</h2>
	<vcc-zip id=card zip="<? echo $zip; ?>"> 
		The zip code <? echo $zip;?> is in the state of  <? echo $data->places[0]->state;?>
	</vcc-zip>
  
<hr>

This page is pre-populated with data from <a href=isomorphic.php.txt>a php file</a>, then the client takes over state management.   
A <a href=http://mustache.github.io/>mustache template</a> can be used to share a template between <a href=https://github.com/bobthecow/mustache.php>PHP</a> and <a href=https://github.com/janl/mustache.js/>JS</a>, but the pay-off for a simple example like this is minimal.
  
<script src=http://danml.com/bundle/rndme.vcc_.js></script>
<script>
  
VCC({  
	displayName: "zip",
  	getInitialState: function(){
		return {
			data: <? echo json_encode($data->places[0]);?>		  	
		}
  	},
	componentWillReceiveProps: function(newProps){
		history.replaceState(null, null, "?zip=" + newProps.zip);
		fetch("http://api.zippopotam.us/us/" + newProps.zip)	
		 .then(function(a){return a.json()})	
		 .then(function(a){this.setState({ data: a.places[0] });}.bind(this));		  
	},
	render: function(){ 
	  	return  " The zip code " + this.props.zip + " is in the state of  " + this.state.data.state;
	}
});

</script>
</body>
</html>
```
 

## Instructional Demos
 ( [adapted from a series of informative react demos](https://github.com/ruanyf/react-demos) ) by [ruanyf](https://github.com/ruanyf)
 
 You can also run/tweak/destroy demo04 in an [editable online pagedemo](http://pagedemos.com/vccbasicdemo/)

1. [Render HTML](#demo01-render-html-source-live)
1. [Use JavaScript in HTML](#demo02-use-javascript-in-html-source-live)
1. [Use array in HTML](#demo03-use-array-in-html-source--live)
1. [Define a component](#demo04-define-a-component-source--live)
1. [this.props.innerHTML](#demo05-thispropschildren-source--live)
1. [PropTypes](#demo06-proptypes-source-live)
1. [Finding a DOM node](#demo07-finding-a-dom-node-source--live)
1. [this.state](#demo08-thisstate-source--live)
1. [Form](#demo09-form-source--live)
1. [Component Lifecycle](#demo10-component-lifecycle-source--live)
1. [Ajax](#demo11-ajax-source--live)
1. [Display value from a Promise](#demo12-display-value-from-a-promise-source--live)

---

### Demo01: Render HTML ([source](https://github.com/rndme/react-demos/blob/master/demo01/index.html)) ([live](http://danml.com/vcc/react-demos/demo01/))

The template syntax in VCC is called HTML, as in regular HTML5. Use ES6 template literals to contain pretty (un-escaped) multi-line HTML in JS files.
If you want backwards compatibility with non-ES6 browsers, use something like babel to transform your source into ES5.

note:  VCC.intraHTML is the entry way to the internal VDOM-based partial updater, used to render without defining a component.

```javascript
VCC.intraHTML(
  document.getElementById('example'),
  `<h1>Hello, world!</h1>`
);
```

### Demo02: Use JavaScript in HTML ([source](https://github.com/rndme/react-demos/blob/master/demo02/index.html)) ([live](http://danml.com/vcc/react-demos/demo02/))

You could also use JavaScript in HTML. It takes angle brackets (&lt;) as the beginning of HTML syntax, and money curly brackets (${) as the beginning of JavaScript syntax.

```javascript
var names = ['Alice', 'Emily', 'Kate'];

VCC.intraHTML(
  document.getElementById('example'),
  `<div>
  ${
    names.map(function (name) {
      return `<div>Hello, ${name}!</div>`
    }).join('')
  }
  </div>`
);
```

### Demo03: Use array in HTML ([source](https://github.com/rndme/react-demos/blob/master/demo03/index.html))  ([live](http://danml.com/vcc/react-demos/demo03/))

If a JavaScript variable is array, VCC will NOT implicitly concat all members of the array, so use `join("")` to view arrays:

```javascript
var arr = [
  `<h1>Hello world!</h1>`,
  `<h2>VCC is awesome</h2>`,
];

VCC.intraHTML(
  document.getElementById('example'),
  `<div>${arr.join('')}</div>`
);
```

### Demo04: Define a component ([source](https://github.com/rndme/react-demos/blob/master/demo04/index.html))  ([live](http://danml.com/vcc/react-demos/demo04/))

`VCC()` creates a component class, which implements a render method to return an component instance of the class. You don't need to call `new` on the class in order to get an instance, just use it to define behavior of a custom HTML element.

```javascript
var HelloMessage = VCC({
  displayName: "hellomessage",
  render: function() {
    return `<h1>Hello ${this.props.name}</h1>`
  }
});

```

```html
  <vcc-hellomessage name="John"></vcc-hellomessage>
```



Components could have attributes, and you can use `this.props.[attribute]` to access them, just like `this.props.name` of `<vcc-hellomessage name="John">` is John.



### Demo05: this.props.children ([source](https://github.com/rndme/react-demos/blob/master/demo05/index.html))  ([live](http://danml.com/vcc/react-demos/demo05/))

VCC uses `this.children to access a component's content.

```javascript
var NotesList = VCC({
  displayName: "noteslist",
  render: function() {
    return `
      <ol>
      ${
        [].map.call(this.children, function (child) {
          return `<li>${child.textContent}</li>`;
        }).join('')
      }
      </ol>
    `;
  }
});
```

```html
  <vcc-noteslist>
    <span>hello</span>
    <span>world</span>
  </vcc-noteslist>
```


Please be minded that the value of `this.children` has two possibilities. If the component has no children node, the value is null; If single children or multiple children nodes, an nodelist. You should be careful to handle it.







### Demo06: PropTypes ([source](https://github.com/rndme/react-demos/blob/master/demo06/index.html)) ([live](http://danml.com/vcc/react-demos/demo06/))

Components have many specific attributes which are called ”props” in VCC and can be of any type, the default is `String`, which is how incoming prop updates from HTML5 attributes arrive.

Sometimes you need a way to control and convert these props. You don't want users have the freedom to input anything into your components.

VCC has a solution for this and it's called `propTypes`.

```javascript

      var MyTitle = VCC({
	displayName: "mytitle",
	
        propTypes: {
          title:String,
        },

        render: function() {
          return `<h1> ${this.props.title} </h1>`;
        }
      });

```

The above component of `mytitle` has a props of `title`. `propTypes` tells VCC that the title should be _cast_ into a String. This is unlike React where `propTypes` serves to issue development-mode warnings, VCC actually applies the function to the incoming attribute value, reacting accordingly.To allow more than one type, use a simple custom function to handle as little or as much as needed.


Now we give `Title` a number value.

```javascript
      var data = 123;
	// needs to defined in JS to use template expressions on the outer tag:
     main.innerHTML= `<vcc-mytitle title="${data}" ></vcc-mytitle>`;
```

This means the new property value is converted to a `String` _before_ updating `this.props`. Attributes in HTML5 arrive as Strings, so handle accordingly. if you want to pass objects that don't easily stringify, use `this.state` instead.








### Demo07: Finding a DOM node ([source](https://github.com/rndme/react-demos/blob/master/demo07/index.html))  ([live](http://danml.com/vcc/react-demos/demo07/))

Sometimes you need to reference a DOM node in a component. VCC gives you the `ref` attribute to find it using a callback function.

```javascript
  var MyComponent = VCC({
	displayName: "mycomponent",
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.myTextInput != null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
    // The ref attribute is a callback that saves a reference to the
    // component to this.myTextInput when the component is mounted.
    return `
      <div>
        <input type="text" ref="function(ref){this.myTextInput = ref}" />
        <input
          type="button"
          value="Focus the text input"
          on-click="this.handleClick"
        />
      </div>
    `;
  }
});
```

```html
<vcc-mycomponent></vcc-mycomponent>
```

VCC supports a special attribute that you can attach to any component. The ref attribute can be a callback function, and this callback will be executed immediately after the component is mounted. 
The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).



### Demo08: this.state ([source](https://github.com/rndme/react-demos/blob/master/demo08/index.html))  ([live](http://danml.com/vcc/react-demos/demo08/))

VCC thinks of component as state machines, and uses `this.state` to hold component's state, `getInitialState()` to initialize `this.state`(invoked before a component is mounted), `this.setState()` to update `this.state` and re-render the component.

```javascript
var LikeButton = VCC({
 displayName: "likebutton",
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return `
      <p on-click=this.handleClick>
        You ${text} this. Click to toggle.
      </p>
    `;
  }
});
```

```html
  <vcc-likebutton ></vcc-likebutton>
```

You could use component attributes to register event handlers, just like `on-click`, `on-keydown`, `on-copy`, etc.



### Demo09: Form ([source](https://github.com/rndme/react-demos/blob/master/demo09/index.html))  ([live](http://danml.com/vcc/react-demos/demo09/))

According to VCC's design philosophy, `this.state` describes the state of component and is mutated via user interactions, and `this.props` describes the properties of component and is stable and immutable.

Since that, the `value` attribute of Form components, such as &lt;input&gt;, textarea, and &lt;option&gt;, is unaffected by any user input. 
If you wanted to access or update the value in response to user input, you could use the on-change event.

```javascript
var Input = VCC({
  displayName: "input",
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return `
      <div>
        <input type="text" value=${value} on-change=this.handleChange />
        <p>${value}</p>
      </div>
    `;
  }
});
```

```html
<vcc-input></vcc-input>
```

### Demo10: Component Lifecycle ([source](https://github.com/rndme/react-demos/blob/master/demo10/index.html))  ([live](http://danml.com/vcc/react-demos/demo10/))

Components have three main parts of their lifecycle: Mounting(being inserted into the DOM), Updating(being re-rendered) and Unmounting(being removed from the DOM). 
VCC provides hooks into these lifecycle parts. `will` methods are called right before something happens, and `did` methods which are called right after something happens.

```javascript
   var Hello = VCC({
      displayName: "hello",
      getInitialState: function () {
        return {
          opacity: 1.0
        };
      },
       componentDidMount: function () {
        this.timer = setInterval(function () {
          var opacity = this.state.opacity;
          opacity -= 0.05;
          if (opacity < 0.1) {
            opacity = 1.0;
          }
          this.setState({
            opacity: opacity
          });
        }.bind(this), 100);
      },
       render: function () {
        return `
          <div style="opacity: ${this.state.opacity}">
            Hello ${this.props.name}
          </div>
        `;
      }
  });
```

```html
  <vcc-hello name="world"></vcc-hello>
```


The following is a list of lifecycle methods.

- **componentWillMount()**: Fired once, before initial rendering occurs. Good place to wire-up message listeners. `this.setState` doesn't work here.
- **componentDidMount()**: Fired once, after initial rendering occurs. Can use `this.getDOMNode()`.
- **componentWillUpdate(object nextProps, object nextState)**: Fired after the component's updates are made to the DOM. Can use `this.getDOMNode()` for updates.
- **componentDidUpdate(object prevProps, object prevState)**: Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render. Use this as an opportunity to operate on the DOM when the component has been updated.
- **componentWillUnmount()**: Fired immediately before a component is unmounted from the DOM. Good place to remove message listeners or general clean up.
- **componentWillReceiveProps(object nextProps)**:  !NA! (for now)  Fired when a component is receiving new props. You might want to `this.setState` depending on the props.
- **shouldComponentUpdate(object nextProps, object nextState)**: Fired before rendering when new props or state are received. `return false` if you know an update isn't needed.




### Demo11: Ajax ([source](https://github.com/rndme/react-demos/blob/master/demo11/index.html))  ([live](http://danml.com/vcc/react-demos/demo11/))

How to get the data of a component from a server or an API provider? The answer is using Ajax to fetch data in the event handler of `componentDidMount`. 
When the server response arrives, store the data with `this.setState()` to trigger a re-render of your UI.

```javascript
var UserGist = VCC({
  displayName: "usergist",
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return `
      <div>
        ${this.state.username}'s last gist is
        <a href=${this.state.lastGistUrl}>here</a>.
      </div>
    `;
  }
});
```

```html
  <vcc-usergist source="https://api.github.com/users/octocat/gists" ></vcc-usergist>
```



### Demo12: Display value from a Promise ([source](https://github.com/rndme/react-demos/tree/master/demo12/index.html))  ([live](http://danml.com/vcc/react-demos/demo12/))

This demo is inspired by Nat Pryce's article ["Higher Order React Components"](http://natpryce.com/articles/000814.html).

If a VCC component's data is received asynchronously, we can use a Promise object as the component's property.


The above code takes data from Github's API, and the `RepoList` component gets a Promise object as its property.

Now, while the promise is pending, the component displays a loading indicator. When the promise is resolved successfully, the component displays a list of repository information. If the promise is rejected, the component displays an error message.

```javascript
  var RepoList = VCC({
  displayName: "repolist",
  getInitialState: function() {
    return {
      loading: true,
      error: null,
      data: null
    };
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error}));
  },

  render: function() {
    if (this.state.loading) {
      return `<span>Loading...</span>`;
    }
    else if (this.state.error !== null) {
      return `<span>Error: ${this.state.error.message}</span>`;
    }
    else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return `
          <li><a href=${repo.html_url}>${repo.name}</a> (${repo.stargazers_count} stars) <br/> ${repo.description}</li>
        `;
      }).join('');
      return `
        <div>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>${repoList}</ol>
        </div>
      `;
    }
  }
});
```

```html
   <vcc-repolist promise="$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')" ></vcc-repolist>
```
  
