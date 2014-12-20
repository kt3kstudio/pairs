
/**
 * @class
 * Floor class is the domain model which represents each floor structure.
 */
datadomain.Floor = (function () {

    'use strict';

    var exports = function (name, woList) {
        this.name = name;
        this.woList = woList;
    };

    //var floorPt = exports.prototype;

    return exports;

}());
