"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Timeline;

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _sjcl = require("../../external-lib/sjcl");

var _sjcl2 = _interopRequireDefault(_sjcl);

var _jsan = require("jsan");

var _jsan2 = _interopRequireDefault(_jsan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Timeline(perspective, thisHash) {
  var spies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var events = [];
  var subscriptionsToEvents = {};
  var subscriptions = [];
  var fnInfo = [];

  var save = function save(hash, payload) {
    return events.push({ hash: hash, payload: (0, _cloneDeep2.default)(payload), time: new Date() });
  };

  var subscribeToEvent = function subscribeToEvent(hash, when) {
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var returnHash = _sjcl2.default.hash.sha256(thisHash + _jsan2.default.stringify(when));
    (subscriptionsToEvents[hash] = subscriptionsToEvents[hash] || []).push({
      when: when,
      returnHash: returnHash,
      hash: hash
    });
    var info = {
      hash: hash,
      returnHash: returnHash,
      desc: description
    };
    fnInfo.push(info);
    spies.forEach(function (spy) {
      return spy({
        type: "fn subscription added",
        payload: info
      });
    });
  };

  var pushEvent = function pushEvent(hash, payload) {
    save(hash, payload);
    (subscriptionsToEvents[hash] || []).forEach(function (when) {
      return when.when(perspective, when.returnHash, (0, _cloneDeep2.default)(payload), pushEvent);
    });
    subscriptions.forEach(function (when) {
      return when(hash, payload);
    });
    spies.forEach(function (spy) {
      return spy({
        type: "event",
        payload: {
          hash: hash,
          payload: payload,
          eventsHistory: events
        }
      });
    });
  };

  var getHistory = function getHistory() {
    return (0, _cloneDeep2.default)(events);
  };

  var subscribe = function subscribe(when) {
    return subscriptions.push([hash, when]);
  };

  var getFnInfo = function getFnInfo() {
    return (0, _cloneDeep2.default)(fnInfo);
  };

  return {
    subscribeToEvent: subscribeToEvent,
    pushEvent: pushEvent,
    getHistory: getHistory,
    subscribe: subscribe,
    getFnInfo: getFnInfo
  };
}