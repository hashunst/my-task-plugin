/*!
* rete-my-task-plugin v0.1.0 
* (c) 2021  
* Released under the ISC license.
*/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var Task = /*#__PURE__*/function () {
  function Task(inputs, component, worker) {
    var _this = this;

    _classCallCheck(this, Task);

    this.inputs = inputs;
    this.component = component;
    this.worker = worker;
    this.next = [];
    this.outputData = null;
    this.closed = [];
    this.getInputs('option').forEach(function (key) {
      _this.inputs[key].forEach(function (con) {
        con.task.next.push({
          key: con.key,
          task: _this
        });
      });
    });
  }

  _createClass(Task, [{
    key: "getInputs",
    value: function getInputs(type) {
      var _this2 = this;

      return Object.keys(this.inputs).filter(function (key) {
        return _this2.inputs[key][0];
      }).filter(function (key) {
        return _this2.inputs[key][0].type === type;
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.outputData = null;
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
        var _this3 = this;

        var needReset,
            garbage,
            propagate,
            inputs,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                needReset = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : true;
                garbage = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : [];
                propagate = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : true;
                if (needReset) garbage.push(this);

                if (this.outputData) {
                  _context4.next = 14;
                  break;
                }

                inputs = {};
                _context4.next = 8;
                return Promise.all(this.getInputs('output').map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return Promise.all(_this3.inputs[key].map( /*#__PURE__*/function () {
                              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(con) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        if (!con) {
                                          _context.next = 4;
                                          break;
                                        }

                                        _context.next = 3;
                                        return con.task.run(data, false, garbage, false);

                                      case 3:
                                        return _context.abrupt("return", con.task.outputData[con.key]);

                                      case 4:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              return function (_x3) {
                                return _ref2.apply(this, arguments);
                              };
                            }()));

                          case 2:
                            inputs[key] = _context2.sent;

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 8:
                _context4.next = 10;
                return this.worker(this, inputs, data);

              case 10:
                this.outputData = _context4.sent;

                if (!propagate) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 14;
                return Promise.all(this.next.filter(function (f) {
                  return !_this3.closed.includes(f.key);
                }).map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(f) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return f.task.run(data, false, garbage);

                          case 2:
                            return _context3.abrupt("return", _context3.sent);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 14:
                if (needReset) garbage.map(function (t) {
                  return t.reset();
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "clone",
    value: function clone() {
      var _this4 = this;

      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var oldTask = arguments.length > 1 ? arguments[1] : undefined;
      var newTask = arguments.length > 2 ? arguments[2] : undefined;
      var inputs = Object.assign({}, this.inputs);
      if (root) // prevent of adding this task to `next` property of predecessor
        this.getInputs('option').map(function (key) {
          return delete inputs[key];
        });else // replace old tasks with new copies
        Object.keys(inputs).map(function (key) {
          inputs[key] = inputs[key].map(function (con) {
            return _objectSpread({}, con, {
              task: con.task === oldTask ? newTask : con.task
            });
          });
        });
      var task = new Task(inputs, this.component, this.worker); // manually add a copies of follow tasks

      task.next = this.next.map(function (n) {
        return {
          key: n.key,
          task: n.task.clone(false, _this4, task)
        };
      });
      return task;
    }
  }]);

  return Task;
}();

function install(editor) {
  editor.on('componentregister', function (component) {
    if (!component.task) throw 'Task plugin requires a task property in component';
    if (component.task.outputs.constructor !== Object) throw 'The "outputs" field must be an object whose keys correspond to the Output\'s keys';
    var taskWorker = component.worker;
    var taskOptions = component.task;

    component.worker = function (node, inputs, outputs) {
      var task = new Task(inputs, component, function (ctx, inps, data) {
        return taskWorker.call(ctx, node, inps, data);
      });
      if (taskOptions.init) taskOptions.init(task, node);
      Object.keys(taskOptions.outputs).map(function (key) {
        outputs[key] = {
          type: taskOptions.outputs[key],
          key: key,
          task: task
        };
      });
    };
  });
}
var index = {
  name: 'task',
  install: install
};

export { Task, index as default };
//# sourceMappingURL=my-task-plugin.esm.js.map
