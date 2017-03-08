"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SimpleWhenCreator;
function SimpleWhenCreator(syncDataManipulator, subscription) {
  var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var fn = function fn(perspective, returnHash, payload, pushEvent) {
    pushEvent(returnHash, syncDataManipulator(perspective, payload));
  };
  return {
    fn: fn,
    hash: subscription,
    description: description
  };
}