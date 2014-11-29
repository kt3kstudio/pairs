// List of boms
window.domain = window.domain || {};
domain.level = domain.level || {};
/**
 * @class
 * Map class represents the grid positioned queues of boms around the field.
 *
 *
 */
domain.level.Map = (function ($) {
    'use strict';

    var exports = function (metrics) {
        this.cells = [];

        this.$dom = $(document.body);

        this.top = metrics.top;
        this.left = metrics.left;
        this.unit = metrics.unit;
    };

    /**
     *
     *
     * @return {domain.level.Map}
     */
    exports.createFromBomList = function (bomList) {
        return new exports().loadFromBomList(bomList);
    };

    var mapPrototype = exports.prototype;

    /**
     *
     *
     * @return {domain.level.Wanderer}
     */
    mapPrototype.createCellFromBom = function (bom) {
        return new domain.level.Wanderer(bom.x, bom.y, bom.gender, this.left, this.top, this.unit);
    };

    mapPrototype.empty = function () {
        this.cells.forEach(function (cell) { cell.remove(); });

        this.cells = [];
    };

    mapPrototype.loadFromBomList = function (bomList) {
        bomList.forEach(function (bom) {
            this.loadOne(this.createCellFromBom(bom));
        }, this);

        return this;
    };

    mapPrototype.loadList = function (list) {
        list.forEach(function (cell) { this.loadOne(cell); }, this);

        return this;
    };

    mapPrototype.loadOne = function (cell) {
        this.cells.push(cell);

        cell.locate();

        return this;
    };

    mapPrototype.appear = function (dom) {

        var p = Promise.resolve();

        this.cells.forEach(function (cell) {
            p = p.then(function () {
                cell.appear(dom);

                return wait(40);
            });
        });

        return p;
    };

    mapPrototype.commandAll = function (command, args) {

        this.cells.forEach(function (cell) {
            cell[command](args);
        });

    };

    // help item ?
    mapPrototype.allUp = function () { this.commandAll('up'); };
    mapPrototype.allDown = function () { this.commandAll('down'); };
    mapPrototype.allRight = function () { this.commandAll('right'); };
    mapPrototype.allLeft = function () { this.commandAll('left'); };

    mapPrototype.select = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y === pos.y;
        });
    };

    mapPrototype.find = function (pos) {
        var cand = this.select(pos);

        if (cand.length === 0) {
            return null;
        }

        return cand[0];
    };

    mapPrototype.selectRange = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y > pos.y;
        });
    };

    mapPrototype.filter = function (cells) {
        this.cells = this.cells.filter(function (cell) {
            return cells.indexOf(cell) < 0;
        });
    };

    return exports;

}(window.jQuery));
