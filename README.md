# vcc
View Component Creator : lightweight reactive view components

## What
A react-inspired way of using web standards to create reusable semantic components. 

## Why
React has some great ideas, but I don't like build steps or large runtimes.

## How 
Uses ES6 template literals to replace JSX, a virtual DOM for fast updates, and web component's custom elements for smart HTML tags.

## Where
Walk through [the demos](https://github.com/rndme/react-demos) for a quick introduction.


## Differences from React

*  no JSX, return a string of HTML from .render()
*	no built-in spreading props from JSX, but you can inject strings anywhere in HTML
*	omit the on prefix on HTML event attribs, don't use {} to mean ""
*	no .propTypes on def, use intrinsic validation if needed, which works on production to boot
*	no .statics available on definition (not that useful anyway)
* displayName on defs is REQUIRED, not optional, it defines the tagName here
*	no ref string support, only functions, which is recommended anyway
  
