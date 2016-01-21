import Being from '../common/Being'

/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * Collective Component
 */
domain.map.FloorAssetCollection = subclass(Being, function (pt) {
    'use strict'

    /**
     * Loads assets from the given string html data.
     *
     * @param {String} data The data
     */
    pt.loadAssetsFromData = function (data) {

        // prepend loaded (string) data to the elem
        $(data).prependTo(this.elem)

        // set y coordinate to doors and staircases
        this.elem.find('.door, .staircase').attr('y', domain.map.Floorboard.groundLevel())

        // init floor assets
        $.cc.init('door staircase', this.elem)

        // collect floor assets in the property
        this.items = this.elem.find('.staircase, .door').map(function () {

            return $(this).cc.getActor()

        }).toArray()

        // set floor width
        this.elem.width(this.elem.find('.floor-data').data('floor-width'))

    }

    /**
     * Update the floor assets by the level locks and level histories.
     *
     * @param {datadomain.LevelLockCollection} locks The level locks
     */
    pt.updateAssetsByLocksAndHistories = function (locks, histories) {

        this.items.forEach(function (asset) {

            asset.locked = locks.isLocked(asset.id)

            var history = histories.getById(asset.id)

            if (history) {

                asset.score = history.score

            }

        })

    }

    /**
     * Shows the floor assets.
     *
     * @override
     */
    pt.willShow = function () {

        return this.foldByFunc(function (item) {

            item.show()

            return wait(100)

        })

    }

    /**
     * Hides the floor assets.
     *
     * @override
     */
    pt.willHide = function () {

        return this.foldByFunc(function (item) {

            item.disappear()

            return wait(100)

        })

    }

    /**
     * Folds the items by the given function. This is the private utility method.
     *
     * @private
     * @param {Function} func The folding function of each item
     */
    pt.foldByFunc = function (func) {

        return this.items.reduce(function (p, item) {

            return p.then(function () {

                return func(item)

            })

        }, Promise.resolve())

    }

    /**
     * Find the floor asset of the given id.
     *
     * @param {String} id The id of the wall object
     * @returns {domain.map.Door}
     */
    pt.findById = function (id) {

        return this.items.filter(function (item) {

            return item.id === id

        })[0]

    }

})

$.cc.assign('floor-asset-collection', domain.map.FloorAssetCollection)
