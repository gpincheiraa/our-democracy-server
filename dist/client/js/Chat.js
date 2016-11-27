'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _util = require('../../shared/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
    function Chat(nick) {
        _classCallCheck(this, Chat);

        this.chatInput = document.getElementById('chatInput');
        this.chatList = document.getElementById('chatList');
        this.nick = nick;
        this.socket = (0, _socket2.default)({ query: "nick=" + nick });
        this.commands = {};

        this.setupSocket();
        this.setupChat();
        this.setupEvents();
    }

    _createClass(Chat, [{
        key: 'setupSocket',
        value: function setupSocket() {
            var _this = this;

            this.socket.on('dong', function () {
                _this.latency = Date.now() - _this.startPingTime;
                _this.addSystemLine('Ping: ' + _this.latency + 'ms');
            });

            this.socket.on('connect_failed', function () {
                _this.socket.close();
            });

            this.socket.on('disconnect', function () {
                _this.socket.close();
            });

            this.socket.on('userDisconnect', function (data) {
                _this.addSystemLine('<b>' + (data.nick.length < 1 ? 'Anon' : data.nick) + '</b> disconnected.');
            });

            this.socket.on('userJoin', function (data) {
                _this.addSystemLine('<b>' + (data.nick.length < 1 ? 'Anon' : data.nick) + '</b> joined.');
            });

            this.socket.on('serverSendUserChat', function (data) {
                _this.addChatLine(data.nick, data.message, false);
            });
        }
    }, {
        key: 'setupChat',
        value: function setupChat() {
            var _this2 = this;

            this.registerCommand('ping', 'Check your latency.', function () {
                _this2.checkLatency();
            });

            this.registerCommand('help', 'Information about the chat commands.', function () {
                _this2.printHelp();
            });

            this.addSystemLine('Connected to the chat!');
            this.addSystemLine('Type <b>/help</b> for a list of commands.');
        }
    }, {
        key: 'setupEvents',
        value: function setupEvents() {
            var _this3 = this;

            this.chatInput.addEventListener('keypress', function (key) {
                key = key.which || key.keyCode;
                if (key === 13) {
                    _this3.sendChat((0, _util.sanitizeString)(_this3.chatInput.value));
                    _this3.chatInput.value = '';
                }
            });

            this.chatInput.addEventListener('keyup', function (key) {
                key = key.which || key.keyCode;
                if (key === 27) {
                    _this3.chatInput.value = '';
                }
            });
        }
    }, {
        key: 'sendChat',
        value: function sendChat(text) {
            if (text) {
                if (text.indexOf('/') === 0) {
                    var args = text.substring(1).split(' ');

                    if (this.commands[args[0]]) {
                        this.commands[args[0]].callback(args.slice(1));
                    } else {
                        this.addSystemLine('Unrecognized Command: ' + text + ', type /help for more info.');
                    }
                } else {
                    this.socket.emit('userChat', { nick: this.nick, message: text });
                    this.addChatLine(this.nick, text, true);
                }
            }
        }
    }, {
        key: 'addChatLine',
        value: function addChatLine(name, message, me) {
            var newline = document.createElement('li');

            newline.className = me ? 'me' : 'friend';
            newline.innerHTML = '<b>' + (name.length < 1 ? 'Anon' : name) + '</b>: ' + message;

            this.appendMessage(newline);
        }
    }, {
        key: 'addSystemLine',
        value: function addSystemLine(message) {
            var newline = document.createElement('li');

            newline.className = 'system';
            newline.innerHTML = message;

            this.appendMessage(newline);
        }
    }, {
        key: 'appendMessage',
        value: function appendMessage(node) {
            if (this.chatList.childNodes.length > 10) {
                this.chatList.removeChild(this.chatList.childNodes[0]);
            }
            this.chatList.appendChild(node);
        }
    }, {
        key: 'registerCommand',
        value: function registerCommand(name, description, callback) {
            this.commands[name] = {
                description: description,
                callback: callback
            };
        }
    }, {
        key: 'printHelp',
        value: function printHelp() {
            for (var cmd in this.commands) {
                if (this.commands.hasOwnProperty(cmd)) {
                    this.addSystemLine('/' + cmd + ': ' + this.commands[cmd].description);
                }
            }
        }
    }, {
        key: 'checkLatency',
        value: function checkLatency() {
            this.startPingTime = Date.now();
            this.socket.emit('ding');
        }
    }]);

    return Chat;
}();

exports.default = Chat;
module.exports = exports['default'];
//# sourceMappingURL=Chat.js.map
