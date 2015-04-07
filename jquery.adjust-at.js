(function ($) {
    $.fn.adjustAt = function(options) {
        var elements = $(this);
        // Default settings merged with received options
        var settings = $.extend({
            width: 0,
            above: function(element) {},
            below: function(element) {},
            both: function(element) {},
            aboveRepeat: function(element) {},
            belowRepeat: function(element) {}
        }, options);
        // Executes above(), below(), aboveRepeat() and belowRepeat() if necessary
        function adjust(element, force) {
            if((element.data('last-width') < settings.width || typeof element.data('last-width') === "undefined" || force) && $('html').width() >= settings.width) {
                // if width of window is growing, and we passed the breakpoint, execute above()
                settings.both(element);
                settings.above(element);
            } else if((element.data('last-width') > settings.width || typeof element.data('last-width') === "undefined" || force) && $('html').width() <= settings.width) {
                // if width of window is shrinking, and we passed the breakpoint, execute below()
                settings.both(element);
                settings.below(element);
            }
            if($('html').width() >= settings.width) {
                settings.aboveRepeat(element);
            } else {
                settings.belowRepeat(element);
            }
        }
        return elements.each(function() {
            var element = $(this);
            // Adjust each element once on initiation (forced adjustment)
            adjust(element, true);
            $(window).resize(function() {
                // Adjust each element (if necessary)
                adjust(element);
                // Save window width for the next time (can not be saved in global scope, because of possible interference with other instances)
                element.data('last-width', $('html').width());
            });
        });
    };
}(jQuery));