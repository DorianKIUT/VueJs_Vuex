import Vue from 'vue'
require('./bus');

// Create a global Event Bus
var bus = new Vue();

// Add to Vue properties by exposing a getter for $bus
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return bus;
        }
    }
});