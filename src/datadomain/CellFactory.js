


/**
 * The factory for Cell.
 *
 * @class
 */
datadomain.CellFactory = subclass(function (pt) {
    'use strict';

    pt.createFromObject = function (obj) {
        return new datadomain.Cell(obj.gene);
    };

});
