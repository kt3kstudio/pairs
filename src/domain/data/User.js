


domain.data.User = $.defineRole(function (pt, parent) {
    'use strict';

    var ONE = {};

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.userRepository = new datadomain.UserRepository();

        this.elem.mapEventOne(this, ONE);

    };

    ONE['load-user'] = 1;
    pt['load-user'] = function () {

        this.load();

    };

    pt.load = function () {

        var that = this;

        return this.userRepository.get().then(function (user) {

            that.elem.trigger('user-loaded', user);

            that.user = user;

        });

    };


    /**
     * Saves the user.
     *
     * @return {Promise}
     */
    pt.save = function () {

        return this.userRepository.save(this.user).then(function (user) {

            return user;

        });

    };

});

$.assignClassComponent('user-repository', domain.data.User);
