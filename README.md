# adjust-at, Version 0.2.0 (alpha)

jQuery-Plugin: Execute custom functions (e.g. layout adjustments, binding events, etc.) above or below a breakpoint – once, or repeatedly.

## Getting started

So, I know, this isn't best practice, but sometimes it is unavoidable: Let's say, you want to build a responsive website. For screens smaller than 1000px, you want your menu to appear more mobile-friendly, hide it, attach a menu icon, attach click events to it, etc. For screens bigger than 1000px, you need to detach some event handlers, make it visible, in case it's hidden, etc. Now, how can we do that: Well, one way, would be to check the screen size and do whatever needs to be done, every single time, the window.resize event fires. There are some scenarios where we need just that, but in many cases, we only need these tasks executed once, that is: whenever we pass the breakpoint.

This is a small jQuery-Plugin. Attach it to the element you want to adjust and provide the breakpoint, as well as functions to be executed once above and below the breakpoint, and repeatedly above and below.

Demonstration: So, we have this element, and we want it to be hidden above 1000px screen size. Also, we want to do this with javascript, because who needs CSS anyway, right? ;)

```javascript
$('.hidethissometimes').adjustAt({
    above1000: function(element) {
        element.hide();
    },
    below1000: function(element) {
        element.show();
    }
});
```

Great, this should be rather self-explanary. Both closures will only be fired once :) Performance, bitch!

## Documentation

### Methods

* `.adjustAt()` – attach plugin to a jQuery collection

### Parameters

* `aboveX` – `function(element)`, optional: to be executed once, whenever `window.width()` passes the breakpoint from left to right
* `belowX` – `function(element)`, optional: to be executed once, whenever `window.width()` passes the breakpoint from right to left
* `bothX` – `function(element)`, optional: to be executed once, whenever `window.width()` passes the breakpoint in either direction
* `repeatAboveX` – `function(element)`, optional: to be executed whenever `window.resize` fires and `window.width()` is above the breakpoint
* `repeatBelowX` – `function(element)`, optional: to be executed whenever `window.resize` fires and `window.width()` is below the breakpoint

`X`: Breakpoint width in pixel.
`element`: single element from the jQuery collection, adjust-at is attached to.

## Status

This project is under active development. I intend to eventually introduce testing, et cetera.
Please consider this code to be unstable.

Help and suggestions are highly appreciated!

## History

### 0.2.0

* Obsoleted `width`-Parameter. The Breakpoint is now part of the array key/parameter. E.g. `above1000`.
* Renamed: `aboveRepeat` -> `repeatAbove`
* Renamed: `belowRepeat` -> `repeatBelow`
* Added `both`-Parameter
* Added `bower.json` – this is now a bower_component: `adjust-at`

### 0.1.1

* Fixed bug #5 – `undefined` is not a keyword

## License

This plugin is available under the [GPL 2.0 license](https://www.gnu.org/licenses/gpl-2.0.html).