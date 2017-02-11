(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = require('./character');
var CharacterPositionFactory = require('./character-position-factory');
var LevelKeyFactory = require('./level-key-factory');
var LevelHistoryFactory = require('./level-history-factory');
var LevelLockFactory = require('./level-lock-factory');
var LocationFactory = require('./location-factory');

/**
 * The factory of Character.
 */

var CharacterFactory = function () {
  function CharacterFactory() {
    _classCallCheck(this, CharacterFactory);
  }

  _createClass(CharacterFactory, [{
    key: 'createFromObject',

    /**
     * Creates a character from the object
     * @param {object} obj The object
     * @return {Character}
     */
    value: function createFromObject(obj) {
      return new Character(obj.id, obj.name, new CharacterPositionFactory().createFromObject(obj.position), new LevelKeyFactory().createFromArray(obj.keys), new LevelHistoryFactory().createCollectionFromArray([]), null, new LevelLockFactory().createCollectionFromObjectList([]), new LocationFactory().createFromObject(obj.location));
    }
  }]);

  return CharacterFactory;
}();

module.exports = CharacterFactory;

},{"./character":6,"./character-position-factory":3,"./level-history-factory":9,"./level-key-factory":13,"./level-lock-factory":16,"./location-factory":19}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var THE_FIRST_ASSET = '701';
var Location = require('./location');

/**
 * Responsibility: The initialization of the character.
 *
 * This service is used when the character data doesn't exist yet.
 */

var CharacterInitService = function () {
  function CharacterInitService() {
    _classCallCheck(this, CharacterInitService);
  }

  _createClass(CharacterInitService, [{
    key: 'initById',

    /**
     * @param {string} id The id of the character (one of ma, ellen and emma)
     * @return {Character}
     */
    value: function initById(id) {
      var character = void 0;
      var CharacterFactory = require('./character-factory');
      var factory = new CharacterFactory();

      // Gets the first location
      var location = this.initialLocationById(id);

      if (id === 'ma') {
        character = factory.createFromObject({ id: id, name: 'Ma', location: location });
      } else if (id === 'ellen') {
        character = factory.createFromObject({ id: id, name: 'Ellen', location: location });
      } else if (id === 'emma') {
        character = factory.createFromObject({ id: id, name: 'Emma', location: location });
      } else {
        throw new Error('unknown character: ' + id);
      }

      // The first asset is always unlocked.
      character.unlockById(THE_FIRST_ASSET);

      return character;
    }

    /**
     * Returns the initial location for the character.
     * @param {string} id The character id
     * @return {Location}
     */

  }, {
    key: 'initialLocationById',
    value: function initialLocationById(id) {
      if (id === 'ma') {
        return new Location({ place: Location.PLACE.ROOM });
      } else if (id === 'ellen') {
        return new Location({ place: Location.PLACE.ROOM });
      }

      return new Location({ place: Location.PLACE.ROOM });
    }

    /**
     * Gets the character data if exist, otherwise create it by the id.
     * @param {string} id The id
     * @return {Promise<Character>}
     */

  }, {
    key: 'getOrCreateById',
    value: function getOrCreateById(id) {
      var _this = this;

      var CharacterRepository = require('./character-repository');
      var repository = new CharacterRepository();

      return repository.getById(id).then(function (character) {
        if (character) {
          return character;
        }

        return _this.initById(id).saveAll();
      });
    }
  }]);

  return CharacterInitService;
}();

module.exports = CharacterInitService;

},{"./character-factory":1,"./character-repository":5,"./location":20}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterPosition = require('./character-position');

var START_FLOOR_ID = '7';
var START_FLOOR_OBJECT_ID = '701';

/**
 * CharacterPositionFactory is the factory class of CharacterPositions.
 */

var CharacterPositionFactory = function () {
  function CharacterPositionFactory() {
    _classCallCheck(this, CharacterPositionFactory);
  }

  _createClass(CharacterPositionFactory, [{
    key: 'createStartPosition',

    /**
     * Creates the start position.
     *
     * @return {CharacterPosition}
     */
    value: function createStartPosition() {
      return new CharacterPosition(START_FLOOR_ID, START_FLOOR_OBJECT_ID);
    }

    /**
     * Creates char position object from the object.
     * @param {Object} obj The object
     * @return {CharacterPosition}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      if (obj == null) {
        return this.createStartPosition();
      }

      return new CharacterPosition(obj.floorId, obj.floorObjectId);
    }
  }]);

  return CharacterPositionFactory;
}();

module.exports = CharacterPositionFactory;

},{"./character-position":4}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The position of the character.
 */
var CharacterPosition =
/**
 * @constructor
 * @param {string} floorId The id of the floor
 * @param {string} floorObjectId The id of the floor object
 */
function CharacterPosition(floorId, floorObjectId) {
  _classCallCheck(this, CharacterPosition);

  /**
   * @property {String} floorId The id of the floor
   */
  this.floorId = floorId;

  /**
   * @property {String} floorObjectId The id of the floor object
   */
  this.floorObjectId = floorObjectId;
};

module.exports = CharacterPosition;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterFactory = require('./character-factory');
var Location = require('./location');

var STORAGE_KEY = 'character-';

/**
 * The repository of Character.
 *
 */

var CharacterRepository = function () {
  function CharacterRepository() {
    _classCallCheck(this, CharacterRepository);
  }

  _createClass(CharacterRepository, [{
    key: 'save',

    /**
     * Saves the character.
     *
     * @param {Character} character The Character
     * @return {Promise}
     */
    value: function save(character) {
      var obj = this.toObject(character);

      return infrastructure.storage.set(STORAGE_KEY + character.id, obj).then(function () {
        return character;
      });
    }

    /**
     * Gets a character by the id.
     *
     * @param {String} id The id
     * @return {Promise<Character>} A promise of a character
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      return infrastructure.storage.get(STORAGE_KEY + id, null).then(function (obj) {
        if (obj == null) {
          return null;
        }

        var factory = new CharacterFactory();
        var character = factory.createFromObject(obj);

        return character.reloadAll().then(function () {
          return character;
        });
      });
    }

    /**
     * @private
     * Converts the Character object into js object.
     *
     * @param {Character} character The Character
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(character) {
      return {
        id: character.id,
        name: character.name,
        keys: this.keysToArray(character.keys),
        position: this.positionToObject(character.position),
        location: this.locationToObject(character.location)
      };
    }

    /**
     * Converts the level keys to objects.
     * @param {LevelKey[]}
     * @return {object[]}
     */

  }, {
    key: 'keysToArray',
    value: function keysToArray(keys) {
      var _this = this;

      if (keys == null) {
        return [];
      }

      return keys.keys.map(function (key) {
        return _this.keyToObject(key);
      });
    }

    /**
     * Converts the level key to an object.
     * @param {LevelKey} key The level key
     * @return {object}
     */

  }, {
    key: 'keyToObject',
    value: function keyToObject(key) {
      if (key == null) {
        return null;
      }

      return {
        levelId: key.levelId
      };
    }

    /**
     * Converts the CharacterPosition object into js object.
     * @private
     * @param {CharacterPosition} position The position
     * @return {Object}
     */

  }, {
    key: 'positionToObject',
    value: function positionToObject(position) {
      if (position == null) {
        return null;
      }

      return {
        floorId: position.floorId,
        floorObjectId: position.floorObjectId
      };
    }

    /**
     * Converts the location object to plain object.
     * @param {Location} location
     * @return {Object}
     */

  }, {
    key: 'locationToObject',
    value: function locationToObject(location) {
      if (location == null) {
        return null;
      }

      return {
        place: location.place,
        detail: this.locationDetailToObject(location.detail)
      };
    }

    /**
     * Converts the location detail to plain object.
     * @param {LocationDetail} detail The detail
     * @return {Object}
     */

  }, {
    key: 'locationDetailToObject',
    value: function locationDetailToObject(detail) {
      if (detail == null) {
        return null;
      }

      if (detail instanceof Location.RoadLocationDetail) {
        return {
          place: detail.place
        };
      } else {
        return {
          floorId: detail.floorId,
          assetId: detail.assetId
        };
      }
    }
  }]);

  return CharacterRepository;
}();

module.exports = CharacterRepository;

},{"./character-factory":1,"./location":20}],6:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayingStateRepository = require('./playing-state-repository');
var LevelHistoryRepository = require('./level-history-repository');
var LevelLockRepository = require('./level-lock-repository');
var LevelKey = require('./level-key');

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharacterPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */

var Character = function () {
  _createClass(Character, null, [{
    key: 'Repository',

    /**
     * @return {Class<CharacterRepository>}
     */
    get: function get() {
      return require('./character-repository');
    }

    /**
     * @return {Class<CharacterFactory>}
     */

  }, {
    key: 'Factory',
    get: function get() {
      return require('./character-factory');
    }
  }, {
    key: 'InitService',
    get: function get() {
      return require('./character-init-service');
    }

    /**
     * @constructor
     * @param {string} id The id of the character
     * @param {string} name The name of the character
     * @param {CharacterPosition} position The position of the character
     * @param {LevelKeyCollection} keys The keys of the levels
     * @param {LevelHistoryCollection} histories The histories of the current floor
     * @param {PlayingState} playingState The state of playing at the current level
     * @param {LevelLockCollection} locks The collection of the level locks
     * @param {Location} location The location of the character
     */

  }]);

  function Character(id, name, position, keys, histories, playingState, locks, location) {
    _classCallCheck(this, Character);

    /**
     * @property {String} id The id of the character
     */
    this.id = id;

    /**
     * @property {String} name The name of the character
     */
    this.name = name;

    /**
     * @deprecated
     * @property {CharacterPosition} position The position of the character
     */
    this.position = position;

    /**
     * @property {LevelKeyCollection} keys The asset keys
     */
    this.keys = keys;

    /**
     * @property {LevelHistoryCollection} histories The histories of the current floor
     */
    this.histories = histories;

    /**
     * @property {PlayingState} playingState The state of playing at the current level
     */
    this.playingState = playingState;

    /**
     * @property {LevelLockCollection} collection The collection of the locks
     */
    this.locks = locks;

    /**
     * @property {Location} location The locatioin
     */
    this.location = location;
  }

  /**
   * Sets the position of character.
   *
   * @param {CharacterPosition} position The position of the character
   */


  _createClass(Character, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this.position = position;
    }

    /**
     * Saves itself. This does not saves the histories, locks and keys because they belong to the different storages.
     * @return {Promise}
     */

  }, {
    key: 'save',
    value: function save() {
      var CharacterRepository = require('./character-repository');
      var repository = new CharacterRepository();

      return repository.save(this);
    }

    /**
     * Saves itself and child models.
     * @return {Promise}
     */

  }, {
    key: 'saveAll',
    value: function saveAll() {
      return Promise.all([this.save(), this.saveHistories(), this.savePlayingState(), this.saveLocks()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            character = _ref2[0];

        return character;
      });
    }

    /**
     * Reloads all the submodels it has. (for now histories, locks and playing-state)
     * @return {Promise}
     */

  }, {
    key: 'reloadAll',
    value: function reloadAll() {
      return Promise.all([this.reloadHistories(), this.reloadLocks(), this.reloadPlayingState()]);
    }

    /**
     * Reloads the levelHistories according to the current position.
     *
     * @return {Promise} resolves with updated character
     */

  }, {
    key: 'reloadHistories',
    value: function reloadHistories() {
      var _this = this;

      if (this.position == null) {
        return Promise.resolve(this);
      }

      return new LevelHistoryRepository(this.id).getByFloorId(this.position.floorId).then(function (histories) {
        _this.histories = histories;

        return _this;
      });
    }

    /**
     * Saves the LevelHistories.
     *
     * @return {Promise}
     */

  }, {
    key: 'saveHistories',
    value: function saveHistories() {
      var _this2 = this;

      return new LevelHistoryRepository(this.id).saveForFloorId(this.position.floorId, this.histories).then(function () {
        return _this2;
      });
    }

    /**
     * Reloads the level locks.
     */

  }, {
    key: 'reloadLocks',
    value: function reloadLocks() {
      var _this3 = this;

      if (this.position == null) {
        return Promise.resolve(this);
      }

      return new LevelLockRepository(this.id).getByFloorId(this.position.floorId).then(function (locks) {
        _this3.locks = locks;

        return _this3;
      });
    }

    /**
     * Saves the current level locks.
     */

  }, {
    key: 'saveLocks',
    value: function saveLocks() {
      var _this4 = this;

      console.log('save locks');
      return new LevelLockRepository(this.id).saveByFloorId(this.position.floorId, this.locks).then(function () {
        return _this4;
      });
    }

    /**
     * Reloads the playingState
     *
     * @return {Promise}
     */

  }, {
    key: 'reloadPlayingState',
    value: function reloadPlayingState() {
      var _this5 = this;

      return new PlayingStateRepository().getByCharIdLevelId(this.id, this.position.floorObjectId).then(function (playingState) {
        _this5.playingState = playingState;

        return _this5;
      });
    }

    /**
     * Saves the playing state.
     *
     * @return {Promise}
     */

  }, {
    key: 'savePlayingState',
    value: function savePlayingState() {
      var _this6 = this;

      return new PlayingStateRepository().save(this.playingState).then(function () {
        return _this6;
      });
    }

    /**
     * Clears the playing state.
     *
     * @return {Promise}
     */

  }, {
    key: 'clearPlayingState',
    value: function clearPlayingState() {
      return new PlayingStateRepository().clearByCharId(this.id);
    }

    /**
     * Gets the floow object id.
     * @return {string}
     */

  }, {
    key: 'getFloorObjectId',
    value: function getFloorObjectId() {
      return this.position.floorObjectId;
    }

    /**
     * Adds the level key of the given id.
     * @param {string} levelId The level id
     */

  }, {
    key: 'addKeyOf',
    value: function addKeyOf(levelId) {
      this.keys.add(new LevelKey(levelId));
    }

    /**
     * Removes the key of the given id.
     * @param {string} levelId The level id
     */

  }, {
    key: 'removeKeyOf',
    value: function removeKeyOf(levelId) {
      this.keys.deleteByLevelId(levelId);
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'hasAnyKey',
    value: function hasAnyKey() {
      return this.keys.hasAny();
    }

    /**
     * Unlocks the asset of the id.
     * @param {string} id The asset id
     */

  }, {
    key: 'unlockById',
    value: function unlockById(id) {
      this.locks.unlock(id);
    }
  }]);

  return Character;
}();

module.exports = Character;

},{"./character-factory":1,"./character-init-service":2,"./character-repository":5,"./level-history-repository":10,"./level-key":14,"./level-lock-repository":17,"./playing-state-repository":21}],7:[function(require,module,exports){
'use strict';

exports.Location = require('./location');
exports.User = require('./user');
exports.Character = require('./character');

},{"./character":6,"./location":20,"./user":26}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of LevelHistory.
 */
var LevelHistoryCollection = function () {
  /**
   * @param {Array} list The array of the LevelHistories
   */
  function LevelHistoryCollection(list) {
    var _this = this;

    _classCallCheck(this, LevelHistoryCollection);

    this.list = list || [];

    this.dict = {};

    this.list.forEach(function (history, i) {
      _this.dict[history.levelId] = history;
    });
  }

  /**
   * Gets a LevelHistory by the id.
   * @param {string} levelId The level id
   * @return {LevelHistory}
   */


  _createClass(LevelHistoryCollection, [{
    key: "getById",
    value: function getById(levelId) {
      return this.dict[levelId];
    }

    /**
     * Returns the length of the collection.
     */

  }, {
    key: "length",
    value: function length() {
      return this.list.length;
    }
  }]);

  return LevelHistoryCollection;
}();

module.exports = LevelHistoryCollection;

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelHistoryCollection = require('./level-history-collection');
var LevelHistory = require('./level-history');

/**
 * The factory class for LevelHistory.
 */

var LevelHistoryFactory = function () {
  function LevelHistoryFactory() {
    _classCallCheck(this, LevelHistoryFactory);
  }

  _createClass(LevelHistoryFactory, [{
    key: 'createCollectionFromArray',

    /**
     * Creates a LevelHistoryCollection from the array.
     * @param {Array} array The array of the LevelHistories
     * @return {LevelHistoryCollection}
     */
    value: function createCollectionFromArray(array) {
      var _this = this;

      if (!(array instanceof Array)) {
        array = [];
      }

      return new LevelHistoryCollection(array.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }

    /**
     * Creates a LevelHistory from the object.
     * @param {Object} obj The object
     * @return {LevelHistory}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      return new LevelHistory(obj.levelId, obj.score, obj.cleared, obj.clearedAt);
    }
  }]);

  return LevelHistoryFactory;
}();

module.exports = LevelHistoryFactory;

},{"./level-history":11,"./level-history-collection":8}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelHistoryFactory = require('./level-history-factory');

/**
 * LevelHistoryRepository is the repository class of LevelHistory.
 *
 * This repository saves and restores the LevelHistorys using infrastructure.storage persistence interface.
 *
 * The key of the storage is as follows:
 *
 * level-history-[charId]-[floorId]
 *
 * e.g. level-history-ma-7
 */

var LevelHistoryRepository = function () {
  /**
   * @param {string} charId The character id
   */
  function LevelHistoryRepository(charId) {
    _classCallCheck(this, LevelHistoryRepository);

    this.charId = charId;
    this.factory = new LevelHistoryFactory();
  }

  /**
   * Gets the level histories (LevelHistoryCollection) by the floor id.
   * @param {string} floorId The floor id
   * @return {Promise}
   */


  _createClass(LevelHistoryRepository, [{
    key: 'getByFloorId',
    value: function getByFloorId(floorId) {
      var _this = this;

      return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (array) {
        return _this.factory.createCollectionFromArray(array);
      });
    }

    /**
     * Saves the level histories for the floor id.
     * @param {string} floorId The floor id
     * @param {LevelHistoryCollection} histories The history collection
     * @return {Promise}
     */

  }, {
    key: 'saveForFloorId',
    value: function saveForFloorId(floorId, histories) {
      return infrastructure.storage.set(this.createStorageKey(floorId), this.collectionToArray(histories));
    }

    /**
     * Converts the collection to an array.
     * @param {LevelHistoryCollection}
     * @return {object[]}
     */

  }, {
    key: 'collectionToArray',
    value: function collectionToArray(collection) {
      var _this2 = this;

      return collection.list.map(function (history) {
        return _this2.toObject(history);
      });
    }

    /**
     * Converts the history to an object.
     * @param {LevelHistory} levelHistory
     * @return {object}
     */

  }, {
    key: 'toObject',
    value: function toObject(history) {
      return {
        levelId: history.levelId,
        score: history.score,
        cleared: history.cleared,
        clearedAt: history.clearedAt
      };
    }

    /**
     * Creates storage key name for the floor.
     * @private
     * @param {string} floorId The floor id
     * @return {Promise}
     */

  }, {
    key: 'createStorageKey',
    value: function createStorageKey(floorId) {
      return 'level-history-' + this.charId + '-' + floorId;
    }
  }]);

  return LevelHistoryRepository;
}();

module.exports = LevelHistoryRepository;

},{"./level-history-factory":9}],11:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LevelHistory is model class which represents the history of the level clearance.
 */
var LevelHistory =
/**
 * @constructor
 * @param {string} levelId The id of the level
 * @param {number} score The score
 * @param {boolean} cleared If cleared or not
 * @param {Date} clearedAt The datetime of the clear
 */
function LevelHistory(levelId, score, cleared, clearedAt) {
  _classCallCheck(this, LevelHistory);

  /**
   * @property {String} levelId The id of the level
   */
  this.levelId = levelId;

  /**
   * @property {Number} score The score
   */
  this.score = score;

  /**
   * @property {Boolean} cleared If cleared or not
   */
  this.cleared = cleared;

  /**
   * @property {Date} clearedAt The datetime of the clear
   */
  this.clearedAt = clearedAt;
};

module.exports = LevelHistory;

},{}],12:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of the level key.
 */
var LevelKeyCollection = function () {
  /**
   * @param {LevelKey[]} keys The keys
   */
  function LevelKeyCollection() {
    var _this = this;

    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, LevelKeyCollection);

    this.keys = [];
    this.dict = [];

    keys.forEach(function (key) {
      return _this.add(key);
    });
  }

  /**
   * Adds the key. If the key of the same levelId already exists, does nothing.
   * @param {LevelKey} key The key
   */


  _createClass(LevelKeyCollection, [{
    key: "add",
    value: function add(key) {
      if (this.has(key)) {
        return;
      }

      this.keys.push(key);
      this.dict[key.levelId] = key;
    }

    /**
     * Returns true iff it has the key.
     * @param {LevelKey} key The key
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(key) {
      return this.dict[key.levelId] != null;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: "hasAny",
    value: function hasAny() {
      return this.keys.length > 0;
    }

    /**
     * Reduces the level keys by the given 2-arity function starting with the given value.
     * @param {Function} func The reducer
     * @param {any} [init] The initial value
     */

  }, {
    key: "reduce",
    value: function reduce(func, init) {
      return this.keys.slice(0).reduce(func, init);
    }

    /**
     * Deletes the key by the given level id.
     * @param {string} levelId The level id
     */

  }, {
    key: "deleteByLevelId",
    value: function deleteByLevelId(levelId) {
      if (!this.dict[levelId]) {
        return;
      }

      this.keys = this.keys.filter(function (key) {
        return key.levelId !== levelId;
      });
      delete this.dict[levelId];
    }
  }]);

  return LevelKeyCollection;
}();

module.exports = LevelKeyCollection;

},{}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelKey = require('./level-key');
var LevelKeyCollection = require('./level-key-collection');

/**
 * The factory class of LevelKey.
 */

var LevelKeyFactory = function () {
  function LevelKeyFactory() {
    _classCallCheck(this, LevelKeyFactory);
  }

  _createClass(LevelKeyFactory, [{
    key: 'createFromArray',

    /**
     * @param {object[]} array The array
     * @return {LevelKey[]}
     */
    value: function createFromArray(array) {
      var _this = this;

      if (array == null) {
        return new LevelKeyCollection();
      }

      return new LevelKeyCollection(array.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }

    /**
     * @param {object} obj The object
     * @return {LevelKey}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      if (obj == null) {
        return null;
      }

      return new LevelKey(obj.levelId);
    }
  }]);

  return LevelKeyFactory;
}();

module.exports = LevelKeyFactory;

},{"./level-key":14,"./level-key-collection":12}],14:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LevelKey is domain model which unlocks the corresponding level.
 */
var LevelKey =
/**
 * @param {string} levelId The id of the level
 */
function LevelKey(levelId) {
  _classCallCheck(this, LevelKey);

  this.levelId = levelId;
};

module.exports = LevelKey;

},{}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of LevelLocks.
 */
var LevelLockCollection = function () {
  /**
   * @param {Array} locks
   */
  function LevelLockCollection(locks) {
    _classCallCheck(this, LevelLockCollection);

    this.locks = locks || [];

    var LevelLockFactory = require('./level-lock-factory');
    this.factory = new LevelLockFactory();
  }

  /**
   * Finds the level of the given level id, or returns null when the level not found.
   * @private
   * @param {String} levelId The id of the level
   * @return {LevelLock}
   */


  _createClass(LevelLockCollection, [{
    key: 'find',
    value: function find(levelId) {
      var locks = this.locks.filter(function (lock) {
        return lock.levelId === levelId;
      });

      if (locks.length === 0) {
        return null;
      }

      return locks[0];
    }

    /**
     * Unlocks the level of the given id.
     * @param {String} levelId The id of the level
     */

  }, {
    key: 'unlock',
    value: function unlock(levelId) {
      var lock = this.find(levelId);

      if (lock != null) {
        lock.unlock();

        return;
      }

      // Create a new lock object if it doesn't exist
      lock = this.factory.createFromObject({
        levelId: levelId,
        locked: false
      });

      this.locks.push(lock);
    }

    /**
     * Checks if the lock of the given level id is locked.
     * @param {String} levelId The id of the level
     * @return {Boolean}
     */

  }, {
    key: 'isLocked',
    value: function isLocked(levelId) {
      var lock = this.find(levelId);

      if (!lock) {
        // If lock object doesn't exist, then it means the level is locked.
        return true;
      }

      return lock.isLocked();
    }
  }]);

  return LevelLockCollection;
}();

module.exports = LevelLockCollection;

},{"./level-lock-factory":16}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelLock = require('./level-lock');
var LevelLockCollection = require('./level-lock-collection');

/**
 * The factory class of LevelLocks.
 */

var LevelLockFactory = function () {
  function LevelLockFactory() {
    _classCallCheck(this, LevelLockFactory);
  }

  _createClass(LevelLockFactory, [{
    key: 'createFromObject',

    /**
     * Creates a LevelLock from the object.
     *
     * @param {Object} obj The object
     * @return {LevelLock}
     */
    value: function createFromObject(obj) {
      if (obj == null) {
        return null;
      }

      return new LevelLock(obj.levelId, obj.locked);
    }

    /**
     * Creates a LevelLockCollection from the list of the object.
     * @param {Array} objList The list of objects
     * @return {Array}
     */

  }, {
    key: 'createCollectionFromObjectList',
    value: function createCollectionFromObjectList(objList) {
      var _this = this;

      objList = objList || [];

      return new LevelLockCollection(objList.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }
  }]);

  return LevelLockFactory;
}();

module.exports = LevelLockFactory;

},{"./level-lock":18,"./level-lock-collection":15}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelLockFactory = require('./level-lock-factory');

/**
 * The repository class of the LevelLock.
 *
 * This repository saves and restores the LevelLocks in JSON format using the infrastructure.storage persistent interface.
 *
 * The storage key of the collection of the level locks is as follows:
 *
 * level-lock-[charId]-[floorId]
 *
 * e.g. if charId is 'ma' and floorId is '7', then the storage key is 'level-lock-ma-7'
 */

var LevelLockRepository = function () {
  /**
   * @param {string} charId The character id
   */
  function LevelLockRepository(charId) {
    _classCallCheck(this, LevelLockRepository);

    this.charId = charId;
  }

  /**
   * Gets the collection of the level locks by the floor id and char id.
   * @param {string} floorId The floor id
   * @param {string} charId The floor id
   * @return {Promise} which resolves with the collection of the locks of the given floor id
   */


  _createClass(LevelLockRepository, [{
    key: 'getByFloorId',
    value: function getByFloorId(floorId) {
      var factory = new LevelLockFactory();
      return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (objList) {
        return factory.createCollectionFromObjectList(objList);
      });
    }

    /**
     * Saves the collection of the locks by the floor id and char id.
     * @param {String} floorId The floor id
     * @param {LevelLockCollection} collection The level lock collection
     */

  }, {
    key: 'saveByFloorId',
    value: function saveByFloorId(floorId, collection) {
      return infrastructure.storage.set(this.createStorageKey(floorId), this.toObjectList(collection));
    }

    /**
     * Converts the collection of the locks to an object list.
     * @private
     * @param {LevelLockCollection} collection The level lock collection
     * @return {Array} the array of the objects
     */

  }, {
    key: 'toObjectList',
    value: function toObjectList(collection) {
      var _this = this;

      return collection.locks.map(function (lock) {
        return _this.toObject(lock);
      });
    }

    /**
     * Converts the lock to an object.
     * @private
     * @param {LevelLock} lock The lock
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(lock) {
      return {
        levelId: lock.levelId,
        locked: lock.locked
      };
    }

    /**
     * Creates the storage key of the given floor id and char id.
     *
     * @private
     * @param {String} floorId The floor id
     * @param {String} charId The char id
     * @return {String}
     */

  }, {
    key: 'createStorageKey',
    value: function createStorageKey(floorId) {
      return 'level-lock-' + this.charId + '-' + floorId;
    }
  }]);

  return LevelLockRepository;
}();

module.exports = LevelLockRepository;

},{"./level-lock-factory":16}],18:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The level lock model
 */
var LevelLock = function () {
  /**
   * @param {string} levelId The level id
   * @param {boolean} locked True iff the level is locked
   */
  function LevelLock(levelId, locked) {
    _classCallCheck(this, LevelLock);

    this.levelId = levelId;
    this.locked = locked;
  }

  /**
   * Returns if the level is locked.
   * @return {boolean}
   */


  _createClass(LevelLock, [{
    key: "isLocked",
    value: function isLocked() {
      return this.locked;
    }

    /**
     * Unlocks the level.
     */

  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
    }
  }]);

  return LevelLock;
}();

module.exports = LevelLock;

},{}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = require('./location');
var PLACE = Location.PLACE,
    RoadLocationDetail = Location.RoadLocationDetail,
    TowerLocationDetail = Location.TowerLocationDetail;

/**
 * The factory class of the location
 */

var LocationFactory = function () {
  function LocationFactory() {
    _classCallCheck(this, LocationFactory);
  }

  _createClass(LocationFactory, [{
    key: 'createFromObject',

    /**
     * Creates the location object from the given plain object.
     */
    value: function createFromObject(obj) {
      if (!obj) {
        return null;
      }

      var detail = obj.detail;

      switch (obj.place) {
        case PLACE.ROOM:
          return new Location({ place: PLACE.ROOM });
        case PLACE.ROAD:
          if (!detail || !detail.place) break;

          return new Location({ place: PLACE.ROAD, detail: new RoadLocationDetail(detail) });
        case PLACE.TOWER:
          if (!detail || !detail.floorId || !detail.assetId) break;

          return new Location({ place: PLACE.TOWER, detail: new TowerLocationDetail(detail) });
        default:
          break;
      }

      console.warn('invalid PLACE: ' + obj.place + ', detail: ' + obj.detail);
      return null;
    }
  }]);

  return LocationFactory;
}();

module.exports = LocationFactory;

},{"./location":20}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The location model. VO.
 */
var Location = function () {
  _createClass(Location, null, [{
    key: 'Factory',
    get: function get() {
      return require('./location-factory');
    }

    /**
     * @param {string} place The place
     * @param {LocationDetail} detail The detail of the location
     */

  }]);

  function Location(_ref) {
    var place = _ref.place,
        detail = _ref.detail;

    _classCallCheck(this, Location);

    this.place = place;
    this.detail = detail;
  }

  _createClass(Location, [{
    key: 'goToRoom',
    value: function goToRoom() {
      this.detail = null;
      this.place = PLACE.ROOM;
    }
  }, {
    key: 'goToRoad',
    value: function goToRoad() {
      this.detail = new RoadLocationDetail({ place: this.place });
      this.place = PLACE.ROAD;
    }
  }, {
    key: 'goToTower',
    value: function goToTower() {
      this.place = PLACE.TOWER;
      this.detail = new TowerLocationDetail({ assetId: 'entrance', floorId: '1' });
    }
  }]);

  return Location;
}();

var LocationDetail = function LocationDetail() {
  _classCallCheck(this, LocationDetail);
};

var TowerLocationDetail = function (_LocationDetail) {
  _inherits(TowerLocationDetail, _LocationDetail);

  /**
   * @param {string} floorId The floor id
   * @param {string} assetId The asset id
   */
  function TowerLocationDetail(_ref2) {
    var floorId = _ref2.floorId,
        assetId = _ref2.assetId;

    _classCallCheck(this, TowerLocationDetail);

    var _this = _possibleConstructorReturn(this, (TowerLocationDetail.__proto__ || Object.getPrototypeOf(TowerLocationDetail)).call(this));

    _this.floorId = floorId;
    _this.assetId = assetId;
    return _this;
  }

  return TowerLocationDetail;
}(LocationDetail);

var RoadLocationDetail = function (_LocationDetail2) {
  _inherits(RoadLocationDetail, _LocationDetail2);

  /**
   * @param {string} place The place in the road scene
   */
  function RoadLocationDetail(_ref3) {
    var place = _ref3.place;

    _classCallCheck(this, RoadLocationDetail);

    var _this2 = _possibleConstructorReturn(this, (RoadLocationDetail.__proto__ || Object.getPrototypeOf(RoadLocationDetail)).call(this));

    _this2.place = place;
    return _this2;
  }

  return RoadLocationDetail;
}(LocationDetail);

var PLACE = {
  ROOM: 'ROOM',
  ROAD: 'ROAD',
  TOWER: 'TOWER'
};

module.exports = Location;
module.exports.PLACE = PLACE;
module.exports.LocationDetail = LocationDetail;
module.exports.RoadLocationDetail = RoadLocationDetail;
module.exports.TowerLocationDetail = TowerLocationDetail;

},{"./location-factory":19}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayingState = require('./playing-state');

var PLAYING_DATA_KEY = 'playing-state-';

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */

var PlayingStateRepository = function () {
  function PlayingStateRepository() {
    _classCallCheck(this, PlayingStateRepository);
  }

  _createClass(PlayingStateRepository, [{
    key: 'getByCharIdLevelId',

    /**
     * Gets a playing state by the character id.
     *
     * @param {String} chadId The character id
     * @param {String} levelId The level id
     * @return {Promise}
     */
    value: function getByCharIdLevelId(charId, levelId) {
      return infrastructure.storage.get(PLAYING_DATA_KEY + charId, null).then(function (data) {
        if (data == null) {
          return new PlayingState(charId, levelId, [[]]);
        }

        if (data.levelId !== levelId) {
          return new PlayingState(charId, levelId, [[]]);
        }

        return new PlayingState(data.charId, data.levelId, data.rounds);
      });
    }

    /**
     * Saves the playingState
     * @return {Promise}
     */

  }, {
    key: 'save',
    value: function save(playingState) {
      if (playingState == null) {
        return Promise.resolve(null);
      }

      return infrastructure.storage.set(PLAYING_DATA_KEY + playingState.charId, this.toObject(playingState)).then(function () {
        return playingState;
      });
    }

    /**
     * Clears the data by the character id
     * @param {String} id The character id
     * @return {Promise}
     */

  }, {
    key: 'clearByCharId',
    value: function clearByCharId(id) {
      return infrastructure.storage.set(PLAYING_DATA_KEY + id, null);
    }

    /**
     * Converts to the object
     * @private
     * @param {PlayingState} playingState The playing state
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(playingState) {
      return {
        charId: playingState.charId,
        levelId: playingState.levelId,
        rounds: playingState.rounds
      };
    }
  }]);

  return PlayingStateRepository;
}();

module.exports = PlayingStateRepository;

},{"./playing-state":22}],22:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PlayingState model represents the current playing state of the level.
 *
 * [Entity]
 */
var PlayingState = function () {
  /**
   * @constructor
   * @param {String} charId The character id
   * @param {String} levelId The level id
   * @param {Array} [rounds] The directions
   */
  function PlayingState(charId, levelId, rounds) {
    _classCallCheck(this, PlayingState);

    this.charId = charId;
    this.levelId = levelId;
    this.rounds = rounds || [[]];
  }

  /**
   * Moves to the next round.
   */


  _createClass(PlayingState, [{
    key: "bump",
    value: function bump() {
      this.rounds.unshift([]);
    }

    /**
     * Releases the round data and init the obj state.
     * @return {Array} The array of round data
     */

  }, {
    key: "release",
    value: function release() {
      var rounds = this.rounds.splice(0).reverse();

      this.bump();

      return rounds;
    }

    /**
     * Adds a direction.
     * @param {String} dir The direction
     */

  }, {
    key: "add",
    value: function add(dir) {
      this.rounds[0].push(dir);
    }
  }]);

  return PlayingState;
}();

module.exports = PlayingState;

},{}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = require('./user');
var UserStatistics = require('./user-statistics');

var DEFAULT_CHAR_ID = 'ma';

/**
 * Factory class of User
 */

var UserFactory = function () {
  function UserFactory() {
    _classCallCheck(this, UserFactory);
  }

  _createClass(UserFactory, [{
    key: 'createFromObject',
    value: function createFromObject() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.charId == null) {
        obj.charId = DEFAULT_CHAR_ID;
      }

      var stat = obj.stat || {};

      return new User(obj.charId, new UserStatistics(stat));
    }
  }]);

  return UserFactory;
}();

module.exports = UserFactory;

},{"./user":26,"./user-statistics":25}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserFactory = require('./user-factory');

var _infrastructure = infrastructure,
    storage = _infrastructure.storage;

var KEY = 'LD-user-key';

/**
 * The repository class for the user model.
 */

var UserRepository = function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
  }

  _createClass(UserRepository, [{
    key: 'save',

    /**
     * Saves the user.
     */
    value: function save(user) {
      return storage.set(KEY, user).then(function () {
        return user;
      });
    }

    /**
     * Gets the user.
     */

  }, {
    key: 'get',
    value: function get() {
      return storage.get(KEY, {}).then(function (data) {
        return new UserFactory().createFromObject(data);
      });
    }

    /**
     * Coverts the user to an object.
     * @private
     * @param {User}
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(user) {
      return user; // TODO: create an object.
    }
  }]);

  return UserRepository;
}();

module.exports = UserRepository;

},{"./user-factory":23}],25:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UserStatistics is the collection class of user statistics info.
 */
var UserStatistics =
/**
 * @param {object} opts The options
 * @param {number} [opts.launchTimes] The number of the launches of the app
 */
function UserStatistics(opts) {
  _classCallCheck(this, UserStatistics);

  /**
   * @property {number} launchTimes The number of the launches of the app
   */
  this.launchTimes = opts.launchTimes;
};

module.exports = UserStatistics;

},{}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of user.
 */
var User = function () {
  _createClass(User, null, [{
    key: 'Repository',
    get: function get() {
      return require('./user-repository');
    }
  }, {
    key: 'Statistics',
    get: function get() {
      return require('./user-statistics');
    }

    /**
     * @param {string} charId The id of the character currently chosen
     * @param {UserStatistics} stat The statisctics of the user activity
     */

  }]);

  function User(charId, stat) {
    _classCallCheck(this, User);

    /**
     * @property {String} charId The id of the character currently chosen
     */
    this.charId = charId;

    /**
     * @property {UserStatistics} stat The statisctics of the user activity
     */
    this.stat = stat;
  }

  return User;
}();

module.exports = User;

},{"./user-repository":24,"./user-statistics":25}]},{},[7]);
