"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allSpyData = exports.genericSpy = undefined;

var _Golem = require("../golem/Golem");

var _SimpleWhenCreator = require("../util/SimpleWhenCreator");

var _SimpleWhenCreator2 = _interopRequireDefault(_SimpleWhenCreator);

var _sjcl = require("../../external-lib/sjcl");

var _sjcl2 = _interopRequireDefault(_sjcl);

var _jsan = require("jsan");

var _jsan2 = _interopRequireDefault(_jsan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genericSpy = exports.genericSpy = function genericSpy(data) {
  return allSpyData.broadcast(genericSpyHash, data);
};

var genericSpyDescription = "generic spy, catches all data";

var genericSpyHash = _sjcl2.default.hash.sha256(_jsan2.default.stringify(genericSpy) + genericSpyDescription);

var needsSeparationBuilderAndPrinter = function needsSeparationBuilderAndPrinter(perspective, data) {
  var newPerspective = perspective.concat(data);
  console.log(perspective);
  return newPerspective;
};

var builderAndPrinterDescription = "helps build the perspective and prints the perspective";

var fns = [new _SimpleWhenCreator2.default(builder, genericSpyHash, builderAndPrinterDescription)];

var allSpyData = exports.allSpyData = new _Golem.Golem([], fns, [], "all spy data");