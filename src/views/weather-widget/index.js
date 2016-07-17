// Import external dependencies
import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import routing
import routing from './weather-widget-routes';

export default angular
    .module('app.weather-widget', [
        uirouter
    ])
    .config(routing).name;

