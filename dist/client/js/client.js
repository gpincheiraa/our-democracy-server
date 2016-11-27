"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Chat = require('./Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _util = require('../../shared/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
    function Client() {
        var _this = this;

        _classCallCheck(this, Client);

        var btn = document.getElementById('startButton'),
            userNameInput = document.getElementById('userNameInput');

        btn.onclick = function () {
            _this.startChat(userNameInput.value);
        };

        userNameInput.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;

            if (key === 13) {
                _this.startChat(userNameInput.value);
            }
        });
    }

    _createClass(Client, [{
        key: 'startChat',
        value: function startChat(nick) {
            var nickErrorText = document.querySelector('#startMenu .input-error');

            if ((0, _util.validNick)(nick)) {
                nickErrorText.style.opacity = 0;
                this.nick = nick;
            } else {
                nickErrorText.style.opacity = 1;
                return false;
            }

            this.chat = new _Chat2.default(this.nick);

            document.getElementById('startMenu').style.display = 'none';
            document.getElementById('chatbox').style.display = 'block';
        }
    }]);

    return Client;
}();

window.onload = function () {
    new Client();
};
//# sourceMappingURL=client.js.map
