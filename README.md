# vcc
View Component Creator : lightweight reactive web components <br />
View the Unofficial [TodoMVC](http://todomvc.com/) [Todo Application Demo](http://danml.com/todo/) to kick the tires

## What
A react-inspired way of using web standards to create reusable semantic components. 

## Why
[React](https://github.com/facebook/react) has some great ideas, but needs [build tools](https://github.com/facebook/react/wiki/Complementary-Tools#build-tools) and a [large runtime](https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js).

## How 
[ES6 template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) replace [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) and a [Virtual DOM](https://github.com/rndme/intraHTML) provides fast updates.

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

## Differences from React

* no JSX, returns a string of HTML from `render()`
* no built-in spreading props from JSX, but you can inject strings anywhere in HTML
* no `react-id` or other unique IDs cluttering your clean HTML5 markup
* no built-in helpers for `propTypes` on definition, use any function to coerce/default/throw as needed
* no `.statics` available on definition (not that useful anyway, since it's instantiated via HTML)
* `displayName` on definition is REQUIRED to defines the tagName
* no `ref` _String_ support, but does accept _Functions_ (which are recommended)
* tag names MUST use a `vcc-` prefix and _no_ uppercase letters to conform with HTML5 Elements


## General Conversion Routine
It's easy to convert demos from React to VCC by making a few simple syntax adjustments to bring JSX in line with HTML5.

1. change the tag wrappers in `render()` return from ` ( ` and ` ) ` to <code>`</code> (both sides)
1. add <code>`</code> "quotes" around JSX literals used in any methods, so as to create legit Strings
1. change the JS delimiters from `{...}` to `${...}` so as to use native ES6 templating
1. change custom tags from CamelCase to lowercase, then prefix `vcc-` to enable it as a valid HTML5 element
1. change the CamelCase event attributes (like `onClick`) to lowercase with an `on-` prefix (like `on-click`)
1. change `React.createClass` to `VCC` and add/modify the `displayName` property to custom tag name


 
## Tips
* Paste component definitions into the [babel REPL](https://babeljs.io/repl/) to get code that runs in IE
* Use helpers like `VCC.classes({y:1, n:0})` and `VCC.checked(obj.isActive)` to cleanup templated attribs
* Create static components (no updates/DOM interaction) using `shouldComponentUpdate: Boolean.bind(null, false),`
* Don't deeply nest complex components, use `VCC.Store` to flatten updates instead
* Inside of VCC.Store reducers, returning nothing has the same effect as `return state;`
* `VCC.Store`'s `.dispatch('SOMETYPE)` is the same as `.dispatch({type: 'SOMETYPE'})`
* Inside of `on-event` handlers, `this` is the custom element and `event.target` raised the event
* The `this` value in template expressions is the nearest overhead custom element component
* `elm._renderer(true)` forces redraw and `elm._render()` triggers one (w/shouldComponentUpdate, debounce, etc)
* Catch many keys like `switch(VCC.keys['_'+(e.which||e.keyCode)]){ case 'RETURN': case 'SPACE': return false; }`
* Compare a single key with constants: `if(VCC.keys['ESCAPE']==(e.which||e.keyCode))`


## History
VCC originally used HTML5's Custom Elements proposal, which was only implemented by default in Chrome. Though a polyfill allowed other browsers to operate, the polyfill didn't work nearly as well. It was thus decided to drop WebComponents as a dependency, and re-implement the same 4 life-cycle events from scratch. Not only does this provide better compatibility and consistency and break free from the un-settled document.registerElement() debacle, it reduces the project footprint by over 20%.


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

## Demo01: Render HTML ([source](https://github.com/rndme/react-demos/blob/master/demo01/index.html)) ([live](http://danml.com/vcc/react-demos/demo01/))

The template syntax in VCC is called HTML, as in regular HTML5. Use ES6 template literals to contain pretty (un-escaped) multi-line HTML in JS files.
If you want backwards compatibility with non-ES6 browsers, use something like babel to transform your source into ES5.

note:  VCC.intraHTML is the entry way to the internal VDOM-based partial updater, used to render without defining a component.

```js
VCC.intraHTML(
  document.getElementById('example'),
  `<h1>Hello, world!</h1>`
);
```

## Demo02: Use JavaScript in HTML ([source](https://github.com/rndme/react-demos/blob/master/demo02/index.html)) ([live](http://danml.com/vcc/react-demos/demo02/))

You could also use JavaScript in HTML. It takes angle brackets (&lt;) as the beginning of HTML syntax, and money curly brackets (${) as the beginning of JavaScript syntax.

```js
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

## Demo03: Use array in HTML ([source](https://github.com/rndme/react-demos/blob/master/demo03/index.html))  ([live](http://danml.com/vcc/react-demos/demo03/))

If a JavaScript variable is array, VCC will NOT implicitly concat all members of the array, so use `join("")` to view arrays:

```js
var arr = [
  `<h1>Hello world!</h1>`,
  `<h2>VCC is awesome</h2>`,
];

VCC.intraHTML(
  document.getElementById('example'),
  `<div>${arr.join('')}</div>`
);
```

## Demo04: Define a component ([source](https://github.com/rndme/react-demos/blob/master/demo04/index.html))  ([live](http://danml.com/vcc/react-demos/demo04/))

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



## Demo05: this.props.children ([source](https://github.com/rndme/react-demos/blob/master/demo05/index.html))  ([live](http://danml.com/vcc/react-demos/demo05/))

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







## Demo06: PropTypes ([source](https://github.com/ruanyf/react-demos/blob/master/demo06/index.html)) ([live](http://danml.com/vcc/react-demos/demo06/))

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








## Demo07: Finding a DOM node ([source](https://github.com/rndme/react-demos/blob/master/demo07/index.html))  ([live](http://danml.com/vcc/react-demos/demo07/))

Sometimes you need to reference a DOM node in a component. VCC gives you the `ref` attribute to find it using a callback function.

```js
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



## Demo08: this.state ([source](https://github.com/rndme/react-demos/blob/master/demo08/index.html))  ([live](http://danml.com/vcc/react-demos/demo08/))

VCC thinks of component as state machines, and uses `this.state` to hold component's state, `getInitialState()` to initialize `this.state`(invoked before a component is mounted), `this.setState()` to update `this.state` and re-render the component.

```js
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



## Demo09: Form ([source](https://github.com/rndme/react-demos/blob/master/demo09/index.html))  ([live](http://danml.com/vcc/react-demos/demo09/))

According to VCC's design philosophy, `this.state` describes the state of component and is mutated via user interactions, and `this.props` describes the properties of component and is stable and immutable.

Since that, the `value` attribute of Form components, such as &lt;input&gt;, &lt;textarea&gt;, and &lt;option&gt;, is unaffected by any user input. 
If you wanted to access or update the value in response to user input, you could use the on-change event.

```js
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

## Demo10: Component Lifecycle ([source](https://github.com/rndme/react-demos/blob/master/demo10/index.html))  ([live](http://danml.com/vcc/react-demos/demo10/))

Components have three main parts of their lifecycle: Mounting(being inserted into the DOM), Updating(being re-rendered) and Unmounting(being removed from the DOM). 
VCC provides hooks into these lifecycle parts. `will` methods are called right before something happens, and `did` methods which are called right after something happens.

```js
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




## Demo11: Ajax ([source](https://github.com/rndme/react-demos/blob/master/demo11/index.html))  ([live](http://danml.com/vcc/react-demos/demo11/))

How to get the data of a component from a server or an API provider? The answer is using Ajax to fetch data in the event handler of `componentDidMount`. 
When the server response arrives, store the data with `this.setState()` to trigger a re-render of your UI.

```js
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



## Demo12: Display value from a Promise ([source](https://github.com/rndme/react-demos/tree/master/demo12/index.html))  ([live](http://danml.com/vcc/react-demos/demo12/))

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
