# adjust-at, Version 0.1.0 (alpha)

jQuery-Plugin: Execute custom functions (e.g. layout adjustments, binding events, etc.) above or below a breakpoint – once, or repeatedly.

## Getting started

So, I know, this isn't best practice, but sometimes it is unavoidable: Let's say, you want to build a responsive website. For screens smaller than 1000px, you want your menu to appear more mobile-friendly, hide it, attach a menu icon, attach click events to it, etc. For screens bigger than 1000px, you need to detach some event handlers, make it visible, in case it's hidden, etc. Now, how can we do that: Well, one way, would be to check the screen size and do whatever needs to be done, every single time, the window.resize event fires. There are some scenarios where we need just that, but in many cases, we only need these tasks executed once, that is: whenever we pass the breakpoint.

This is a small jQuery-Plugin. Attach it to the element you want to adjust and provide the breakpoint, as well as functions to be executed once above and below the breakpoint, and repeatedly above and below.

Demonstration: So, we have this element, and we want it to be hidden above 1000px screen size. Also, we want to do this with javascript, because who needs CSS anyway, right? ;)

```javascript
$('.hidethissometimes').adjustAt({
    width: 1000,
    above: function(element) {
        element.hide();
    },
    below: function(element) {
        element.show();
    }
});
```

Great, this should be rather self-explanary. Both closures (above and below) will only be fired once :) Performance, bitch!

## Documentation

### Methods

* `.adjustAt()` – attach plugin to a jQuery collection

### Parameters

* `width` – `int`: the breakpoint in px
* `above` – `function(element)`, optional: to be executed once, whenever `window.width()` passes the breakpoint from left to right
* `below` – `function(element)`, optional: to be executed once, whenever `window.width()` passes the breakpoint from right to left
* `aboveRepeat` – `function(element)`, optional: to be executed whenever `window.resize` fires and `window.width()` is above the breakpoint
* `belowRepeat` – `function(element)`, optional: to be executed whenever `window.resize` fires and `window.width()` is below the breakpoint

`element`: single element from the jQuery collection, adjust-at is attached to.

## Status

This project is under active development. I intend to eventually introduce testing, bower, et cetera.
Please consider this code to be unstable.

Help and suggestions are highly appreciated!

## License

This plugin is available under the [GPL 2.0 license](https://www.gnu.org/licenses/gpl-2.0.html).