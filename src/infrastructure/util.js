/* global $ */

window.dice = function (n) {
    'use strict';

    return Math.floor(Math.random() * n);
};

window.sample = function () {
    'use strict';

    return arguments[window.dice(arguments.length)];
};

var _console = {log: function () {
    'use strict';

    //console.log.apply(console, arguments);
}};

window.swipe$dom;

window.bindEvents = function (up, down, left, right, reset) {
    'use strict';

    window.swipe$dom = $('.wrapper')
        .swipeCross()
        .on('swipeup', function () { _console.log('swipeup'); up();})
        .on('swiperight', function () { _console.log('swiperight'); right(); })
        .on('swipeleft', function () { _console.log('swipeleft'); left(); })
        .on('swipedown', function () { _console.log('swipedown'); down(); })
        .on('swipecancel', function () { _console.log('swipecancel'); });

    $(document)
        .arrowkeys()
        .on('upkey', function () { _console.log('upkey'); up();})
        .on('rightkey', function () { _console.log('rightkey'); right(); })
        .on('leftkey', function () { _console.log('leftkey'); left(); })
        .on('downkey', function () { _console.log('downkey'); down(); });

    $('.reset')
        .on('click', function () { console.log('=== reset ==='); unbindEvents(); reset(); });

};

window.unbindEvents = function () {
    'use strict';

    window.swipe$dom
        .swipeCrossUnbind()
        .off('swipeup')
        .off('swipedown')
        .off('swipeleft')
        .off('swiperight')
        .off('swipecancel');

    $(document)
        .arrowkeysUnbind()
        .off('upkey')
        .off('rightkey')
        .off('leftkey')
        .off('downkey');

    $('.reset')
        .off('click');
};

window.wait = function (n, result) {
    'use strict';

    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, result), n);
    });
};


window.loadImage = function (path, cls, dom) {
    'use strict';

    return new Promise(function (resolve) {
        var $img = $('<img />')
            .attr('src', path)
            .addClass(cls)
            .appendTo(dom)
            .on('load', function () {
                resolve($img);
            });
    });
};

(function ($) {
    'use strict';

    $.fn.animation = function (animation) {
        this.css('-webkit-animation', '').reflow().css('-webkit-animation', animation);

        return this;
    };

    $.fn.reflow = function () {
        this[0].offsetWidth = this[0].offsetWidth;

        return this;
    };

    $.fn.anim = function (animation, dur) {
        this.animation(animation + ' ' + dur + 'ms');

        return wait(dur, this);
    };

}(window.jQuery));
