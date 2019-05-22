import uiRouter from '@uirouter/angularjs';
import {
    appComponent
} from './app.component';
import {
    appFooter
} from './app-footer/app-footer.module';
import {
    appHeader
} from './app-header/app-header.module';
import {
    appViews
} from './app-views/app-views.module';

export const app = angular
    .module('app', [
        uiRouter,
        appFooter,
        appHeader,
        appViews
    ])
    .component('app', appComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';

        const appState = {
            name: 'app',
            redirectTo: 'app.home',
            url: '/app?config&lang&header&footer&cswUrl&maxRecords&startPosition&constraintType&constraint&filter&md&back&displayCswBtn',
            params: {
                config: {
                    value: 'config/config.json',
                    squash: true,
                    inherit: true
                },
                lang: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                header: {
                    value: '1',
                    squash: true,
                    inherit: true
                },
                footer: {
                    value: '1',
                    squash: true,
                    inherit: true
                },
                cswUrl: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                maxRecords: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                startPosition: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                constraintType: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                constraint: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                filter: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                md: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                back: {
                    value: null,
                    squash: true,
                    inherit: true
                },
                displayCswBtn: {
                    value: null,
                    squash: true,
                    inherit: true
                }
            },
            resolve: {
                appConfig: ($transition$, UtilsService) => {
                    'ngInject';
                    var configDefault = 'config/config.json';
                    var config = $transition$.params().config;
                    if (!config) {
                        config = configDefault;
                    }
                    return UtilsService.getJsonFile(config);
                },
                lang: ($transition$) => {
                    'ngInject';
                    var lang = $transition$.params().lang;
                    if (!lang) {
                        if (navigator.language) {
                            lang = navigator.language.substring(0, 2);
                        } else {
                            lang = appConfig.app.lang;
                        }
                    }
                    return lang;
                },
                appLocales: (UtilsService, appConfig, lang) => {
                    'ngInject';
                    return UtilsService.getJsonFile(appConfig.app.locales[lang].locale);
                },
                pages: (UtilsService, appConfig, lang) => {
                    'ngInject';
                    return UtilsService.getJsonFile(appConfig.app.locales[lang].pages);
                },
                header: ($transition$) => {
                    'ngInject';
                    return $transition$.params().header;
                },
                footer: ($transition$) => {
                    'ngInject';
                    return $transition$.params().footer;
                },
                csw: ($transition$, appConfig) => {
                    'ngInject';
                    var csw = {};
                    csw.filters = appConfig.catalog.csw.filters;
                    csw.cswUrl = $transition$.params().cswUrl || appConfig.catalog.csw_list[0].url;
                    csw.maxRecords = $transition$.params().maxRecords || appConfig.catalog.csw.maxrecords;
                    csw.startPosition = $transition$.params().startPosition || appConfig.catalog.csw.startposition;
                    csw.constraintType = $transition$.params().constraintType || appConfig.catalog.csw.constraint_type;
                    csw.constraint = $transition$.params().constraint || appConfig.catalog.csw.constraint;
                    csw.filter = $transition$.params().filter || appConfig.catalog.csw.filter;
                    return csw;
                },
                md: ($transition$) => {
                    'ngInject';
                    return $transition$.params().md;
                },
                back: ($transition$) => {
                    'ngInject';
                    return $transition$.params().back;
                },
                displayCswBtn: ($transition$, appConfig) => {
                    'ngInject';
                    return $transition$.params().displayCswBtn || appConfig.app.displayCswBtn;
                },
            },
            component: 'app',
        };

        $stateProvider.state(appState);
        $urlRouterProvider.otherwise('/app');
    })
    .name;