# WP-JS-Hooks
A lightweight JavaScript event manager for WordPress

### Introduction
See core ticket [#21170](http://core.trac.wordpress.org/ticket/21170) and our [WordSesh talk](http://www.youtube.com/watch?v=oEF7EBjZ-kE).

### API Usage

```js
wp.hooks.addAction( 'tag', callback, priority );
wp.hooks.addFilter( 'tag', callback, priority );
wp.hooks.removeAction( 'tag', callback );
wp.hooks.removeFilter( 'tag', callback );
wp.hooks.doAction( 'tag', arg1, arg2, arg3 ); // any number of args can be included
wp.hooks.applyFilters( 'tag', content );
```

### Features
* Fast and lightweight, ~1.5kb
* Vanilla JS with no dependencies
* Hooks with lower integer priority are fired first.
* Uses native object hash lookup for finding hook callbacks.
* Utilizes insertion sort for keeping priorities correct. Best Case: O(n), worst case: O(n^2)
