'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GapiResources = function () {
  function GapiResources() {
    _classCallCheck(this, GapiResources);

    this.resource = null;
  }

  _createClass(GapiResources, [{
    key: 'countries',
    get: function get() {
      this.resource = 'countries';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'places',
    get: function get() {
      this.resource = 'places';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'dossiers',
    get: function get() {
      this.resource = 'dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'country_dossiers',
    get: function get() {
      this.resource = 'country_dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'place_dossiers',
    get: function get() {
      this.resource = 'place_dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'transport_dossiers',
    get: function get() {
      this.resource = 'transport_dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'activity_dossiers',
    get: function get() {
      this.resource = 'activity_dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'accommodation_dossiers',
    get: function get() {
      this.resource = 'accommodation_dossiers';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'features',
    get: function get() {
      this.resource = 'features';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'dossier_features',
    get: function get() {
      this.resource = 'dossier_features';return this;
    },
    set: function set(value) {
      return this;
    }
  }, {
    key: 'dossier_segments',
    get: function get() {
      this.resource = 'dossier_segments';return this;
    },
    set: function set(value) {
      return this;
    }
  }]);

  return GapiResources;
}();

exports.default = GapiResources;