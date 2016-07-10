"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _clamp = require("../util/clamp");

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}
var getDocument = function getDocument(element) {
  return element.ownerDocument;
};

var DraggableMixin = {

  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired,
    max: _react2.default.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: noop,
      max: 1
    };
  },
  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.document = getDocument(_reactDom2.default.findDOMNode(this));
    var window = this.window = this.document.defaultView;

    window.addEventListener("resize", this.updateBoundingRect);
    window.addEventListener("scroll", this.updateBoundingRect);

    this.updateBoundingRect();
  },
  componentWillUnmount: function componentWillUnmount() {
    var window = this.window;

    window.removeEventListener("resize", this.updateBoundingRect);
    window.removeEventListener("scroll", this.updateBoundingRect);
  },
  startUpdates: function startUpdates(e) {
    var document = this.document;


    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);

    e.preventDefault();

    var _getPosition = this.getPosition(e);

    var x = _getPosition.x;
    var y = _getPosition.y;

    this.setState({ active: true });
    this.updatePosition(x, y);
  },
  handleUpdate: function handleUpdate(e) {
    if (this.state.active) {
      e.preventDefault();

      var _getPosition2 = this.getPosition(e);

      var x = _getPosition2.x;
      var y = _getPosition2.y;

      this.updatePosition(x, y);
    }
  },
  stopUpdates: function stopUpdates() {
    if (this.state.active) {
      var document = this.document;


      document.removeEventListener("mousemove", this.handleUpdate);
      document.removeEventListener("touchmove", this.handleUpdate);
      document.removeEventListener("mouseup", this.stopUpdates);
      document.removeEventListener("touchend", this.stopUpdates);

      this.setState({ active: false });
    }
  },
  getPosition: function getPosition(e) {
    if (e.touches) {
      e = e.touches[0];
    }

    return {
      x: e.clientX,
      y: e.clientY
    };
  },
  getPercentageValue: function getPercentageValue(value) {
    return value / this.props.max * 100 + "%";
  },
  getScaledValue: function getScaledValue(value) {
    return (0, _clamp2.default)(value, 0, 1) * this.props.max;
  },
  updateBoundingRect: function updateBoundingRect() {
    var rect = _reactDom2.default.findDOMNode(this).getBoundingClientRect();
    this.setState({ rect: rect });
  }
};

exports.default = DraggableMixin;