// displaying current point
debug.PointBox = {
    getCount: function (gender0, gender1) {
        'use strict';

        return parseInt(this.getTarget(gender0, gender1).text());
    },
    setCount: function (gender0, gender1, count) {
        'use strict';

        this.getTarget(gender0, gender1).text(count);
    },
    countUp: function (gender0, gender1) {
        'use strict';

        this.setCount(gender0, gender1, this.getCount(gender0, gender1) + 1);
    },
    reset: function () {
        'use strict';

        this.setCount('f', 'f', 0);
        this.setCount('m', 'f', 0);
        this.setCount('f', 'm', 0);
        this.setCount('m', 'm', 0);
    },
    getTarget: function (gender0, gender1) {
        'use strict';

        var genderPair = gender0 + gender1;
        return $('.point .' + genderPair);
    }
};
