"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Golem = undefined;

var _Timeline = require("../util/Timeline");

var _Timeline2 = _interopRequireDefault(_Timeline);

var _sjcl = require("../../external-lib/sjcl");

var _sjcl2 = _interopRequireDefault(_sjcl);

var _jsan = require("jsan");

var _jsan2 = _interopRequireDefault(_jsan);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Golem(perspective, fns, topics) {
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var spies = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  var perspectiveClone = (0, _cloneDeep2.default)(perspective);
  var hashString = _sjcl2.default.hash.sha256(_jsan2.default.stringify([fns, topics]));
  var tl = new _Timeline2.default(perspectiveClone, hashString, spies);

  fns.forEach(tl.subscribeToEvent(fn.hash, fn.fn, fn.description ? fn.description : ""));

  topics.forEach(function (topic) {
    return topic.subscribe(tl.pushEvent);
  });

  spies.forEach(function (spy) {
    return spy({
      type: "new topic",
      payload: {
        hash: hashString,
        desc: description,
        subscriptions: {
          topics: topics.map(function (topic) {
            return topic.hash;
          }),
          fns: fns.map(function (fn) {
            return fn.hash;
          })
        },
        emittedEvents: tl.getFnInfo()
      }
    });
  });

  return {
    subscribe: tl.subscribe,
    hash: hashString,
    broadcast: tl.pushEvent
  };
}

exports.Golem = Golem;