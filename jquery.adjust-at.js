(function ($) {

    $.fn.adjustAt = function(options) {

        /**
         * Determine, whether $('html').width() passed the given breakpoint and execute adjustments
         *
         * @param {string} direction - Call closure only if $('html').width() passes the breakpoint in the right direction. Possible values: 'above', 'below' and 'both'.
         * @param {integer} breakpoint - The breakpoint in px.
         * @param {object} element - The element that needs adjustment.
         * @param {function} closure - The adjustments to be made.
         * @param {boolean} force - Skip checking last_width (useful on initial run)
         */
        function adjust(direction, breakpoint, element, closure, force) {
            var width = $('html').width(),
                last_width = element.data('last-width');
            if (direction != 'below' && (last_width < breakpoint || typeof last_width === "undefined" || force) && width >= breakpoint) {
                // above or both
                closure(element);
            } else if (direction != 'above' && (last_width > breakpoint || typeof last_width === "undefined" || force) && width <= breakpoint) {
                // below or both
                closure(element);
            } else if (direction === 'repeatAbove' && width >= breakpoint) {
                // above
                closure(element);
            } else if (direction === 'repeatBelow') {
                // below
                closure(element);
            }
        }

        /**
         * Extract direction and breakpoint from key/index
         *
         * @param {string} string - Contains direction and breakpoint, e.g. 'above1000'.
         * @returns {object} - 'direction' ('above', 'below', 'both', 'repeatAbove' or 'repeatBelow') and 'breakpoint'.
         */
        function getMeta(string) {
            var re = /(above|below|both|repeatAbove|repeatBelow)(\d*)/i,
                m;
            if ((m = re.exec(string)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                return {
                    direction: m[1],
                    breakpoint: m[2]
                };
            }
            return false;
        }

        /**
         * Check breakpoints for each element
         *
         * @param {object} elements - jQuery collection adjust-at is attached to
         * @param {boolean} initial - sets force = true when calling adjust()
         * @returns {object} - jQuery collection (chainable)
         */
        function checkBreakpoints(elements, initial)
        {
            return elements.each(function() {
                var element = $(this);
                $.each(breakpoints, function(index, closure) {
                    var meta = getMeta(index);
                    if(meta !== false) {
                        // Adjust each element (if necessary, or if forced)
                        adjust(meta['direction'], meta['breakpoint'], element, closure, initial);
                    }
                });
                element.data('last-width', $('html').width());
            });
        }

        // Initialization
        var elements = $(this);
        var breakpoints = $.extend({}, options);

        // on resize
        $(window).resize(function() {
            checkBreakpoints(elements, false);
        });

        // initial run
        return checkBreakpoints(elements, true);

    };

}(jQuery));