'use strict';

import angular from 'angular';
import _ from 'lodash';
import moment from 'moment';
const APIKEY = '21efdd909f0b05598a24d1b995fe7236';

class weatherResource {
    constructor($http) {
        this.$http = $http;
    }

    getFiveDayForcast(cityName) {
        return this.$http
            .get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&units=metric`)
            .then(function(response) {
                // I'm not doing any data validation for this example - just assume that the api works
                let groupedDays = _.groupBy(response.data.list, function (date) {
                    return moment.unix(date.dt).startOf('day').format();
                });

                return _.toArray(groupedDays);
            })
    }
}

weatherResource.$inject = ['$http'];

export default angular.module('weatherResourceModule', [])
    .service('weatherResource', weatherResource).name;
