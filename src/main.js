'use strict';

// Import external dependencies
import angular from 'angular';
import uirouter from 'angular-ui-router';
import mainRoute from './main.route';

// Import routing configuration
// Would be used to pass in selected city, otherwise could have been dropped
import config from 'app.config';
import weatherWidget from 'VIEWS/weather-widget';

import weatherResrouce from 'RESOURCES/weather-resource';

// Run application
var dependencies = [
    uirouter,
    mainRoute,
    weatherWidget,
    weatherResrouce
];

angular.module('app', dependencies)
    .config(config)
    .run(['$rootScope', function($rootScope) {
        // Used to debug routing problems
        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        //   console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        // });

        // $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        //   console.log('$stateChangeError - fired when an error occurs during transition.');
        //   console.log(arguments);
        // });

        // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        //   console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
        // });

        // $rootScope.$on('$viewContentLoaded',function(event){
        //   console.log('$viewContentLoaded - fired after dom rendered',event);
        // });

        // $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        //   console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        //   console.log(unfoundState, fromState, fromParams);
        // });
    }])
