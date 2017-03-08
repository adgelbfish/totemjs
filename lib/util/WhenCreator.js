"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhenCreator = WhenCreator;
function WhenCreator(syncDataManipulator) {
  return function (perspective, returnHash, payload, pushEvent) {
    pushEvent(returnHash, syncDataManipulator(perspective, payload));
  };
}