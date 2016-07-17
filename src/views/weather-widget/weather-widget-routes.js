import template from './template.html';
import _ from 'lodash';
import moment from 'moment';

// Controller
class weatherWidgetCtrl {
    constructor(weatherDetails, $stateParams) {
        this.$stateParams = $stateParams;
        this.weatherDetails = weatherDetails;
        this.weatherAvg = []
        _.each(weatherDetails, (day) => {
            this.weatherAvg.push({
                min: _.minBy(day, 'main.temp').main.temp,
                max: _.maxBy(day, 'main.temp').main.temp,
                date: moment.unix(day[0].dt).format('dddd')
            });
        });
    }
}

// Inject dependencies into controller
weatherWidgetCtrl.$inject = ['weatherDetails', '$stateParams'];

// Inject dependencies into router
routes.$inject = ['$stateProvider'];

// Create states
export default function routes($stateProvider) {
    $stateProvider.state('app.weatherWidget', {
        url: '/:cityName',
        template: template,
        controller: weatherWidgetCtrl,
        controllerAs: 'vm',
        params: {
            cityName: 'london'
        },
        resolve: {
            weatherDetails: ['weatherResource', '$stateParams', function(weatherResource, $stateParams){
                return weatherResource.getFiveDayForcast($stateParams.cityName);
            }]
        }
    });
}
