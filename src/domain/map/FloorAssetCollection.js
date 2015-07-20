
/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * Collective Component
 *
 * @class
 * @extends domain.common.Being
 */
domain.map.FloorAssetCollection = subclass(domain.common.Being, function (pt) {
    'use strict';


    /**
     * Builds the floor assets.
     */
    pt.buildFloorAssets = function () {

        this.items = this.elem.find('.staircase, .door').map(function () {

            return $(this).getActor();

        }).toArray();


        this.items.forEach(function (floorAsset) {

            this.transformCoordinates(floorAsset);

        }, this);


        this.expandRightLimit(180);

    };


    /**
     * Calls the handler for each floor asset.
     *
     * @param {Function} callback The handler for each floor asset
     */
    pt.forEach = function (handler, thisArg) {

        this.items.forEach(handler, thisArg);

    };


    /**
     * Transforms the y coordinate to fit to the floor level.
     *
     * @private
     * @param {domain.map.FloorAsset} asset The target FloorAsset
     */
    pt.transformCoordinates = function (asset) {

        asset.y *= -1;
        asset.y += domain.map.Floorboard.groundLevel();

    };


    /**
     * Expands the right limit of the wall div.
     *
     * @private
     */
    pt.expandRightLimit = function (val) {

        var x = this.rightLimit() + val;

        this.elem.width(x);

    };

    pt.rightLimit = function () {

        return Math.max.apply(Math, this.items.map(function (item) { return item.rightLimit(); }));

    };

    /**
     * Shows the floor assets.
     *
     * @override
     */
    pt.willShow = function () {

        return this.foldByFunc(function (item) {

            item.appear();

            return wait(100);

        });

    };


    /**
     * Hides the floor assets.
     *
     * @override
     */
    pt.willHide = function () {

        return this.foldByFunc(function (item) {

            item.disappear();

            return wait(100);

        });

    };


    /**
     * Folds the items by the given function. This is the private utility method.
     *
     * @private
     * @param {Function} func The folding function of each item
     */
    pt.foldByFunc = function (func) {

        return this.items.reduce(function (p, item) {

            return p.then(function () {

                return func(item);

            });

        }, Promise.resolve());

    };


    /**
     * Find the floor asset of the given id.
     *
     * @param {String} id The id of the wall object
     * @returns {domain.map.Door}
     */
    pt.findById = function (id) {

        return this.items.filter(function (item) {

            return item.id === id;

        })[0];

    };

});



$.assignClassComponent('floor-asset-collection', domain.map.FloorAssetCollection);
