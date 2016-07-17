'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

export default angular.module('app.main', [uirouter])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                template: '<ui-view></ui-view>'
            });
    }]).name;
