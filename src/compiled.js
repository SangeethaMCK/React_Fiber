"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextUnitOfWork = exports["default"] = void 0;
var _createElement = require("./components/createElement");
var _customRender = require("./components/customRender");
var _useState = _interopRequireDefault(require("./components/useState"));
var _reRender = _interopRequireDefault(require("./components/reRender"));
var _update = _interopRequireDefault(require("./components/update"));
var _workLoop = _interopRequireDefault(require("./components/workLoop"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var myReact = {
  createElement: _createElement.createElement,
  customRender: _customRender.customRender,
  useState: _useState["default"],
  reRender: _reRender["default"],
  createResource: _createElement.createResource
};

// Example usage

var nextUnitOfWork = exports.nextUnitOfWork = null;
/** @jsx myReact.createElement */
function App() {
  ;
  var _myReact$useState = myReact.useState(""),
    _myReact$useState2 = _slicedToArray(_myReact$useState, 2),
    name = _myReact$useState2[0],
    setName = _myReact$useState2[1];
  var _myReact$useState3 = myReact.useState(0),
    _myReact$useState4 = _slicedToArray(_myReact$useState3, 2),
    count = _myReact$useState4[0],
    setCount = _myReact$useState4[1];
  return myReact.createElement("div", null, myReact.createElement("h1", null, "Hello ", name, "!"), myReact.createElement("p", null, "I am a paragraph"), myReact.createElement("input", {
    className: "name",
    type: "text",
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), myReact.createElement("h2", null, "Counter value: ", count), myReact.createElement("button", {
    onClick: function onClick() {
      return setCount(count + 1);
    }
  }, "+1"), myReact.createElement("button", {
    onClick: function onClick() {
      return setCount(count - 1);
    }
  }, "-1"));
}

// Initial render
document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  myReact.reRender.setOldNode(myReact.createElement(App));
  //  let data =  updateElement(root, myReact.createElement(App));
  var data = myReact.createElement(App);
  var wipRoot = {
    dom: root,
    props: {},
    children: [data]
  };
  console.log("wipRoot", wipRoot);
  exports.nextUnitOfWork = nextUnitOfWork = wipRoot;
  // requestIdleCallback(workLoop);
});
var _default = exports["default"] = App;
