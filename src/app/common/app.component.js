import template from './app.html';

const AppComponentController = class AppComponentController {
    constructor($state, $stateParams, $window) {
        'ngInject';
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$window = $window;
    }

    getMdViews(views) {
        var mdViews = {};
        for (var v in views) {
            if (views[v].hasOwnProperty('type') && views[v].type == 'mdView') {
                mdViews[v] = views[v];
            }
        }
        return mdViews;
    }

    getChangeViews(views, changeViewList) {
        var changeViews = {};
        for (var v = 0; v < changeViewList.length; v++) {
            changeViews[changeViewList[v]] = views[changeViewList[v]];
        }
        return changeViews;
    }

    $onInit() {
        this.mdViews = this.getMdViews(this.appConfig.views);
        this.isHome = (this.$state.current.name === 'app.home');
        this.isMdView = (Object.keys(this.mdViews).includes(this.$state.current.name.split('.')[1]));
        this.csw.proxy = this.appConfig.app.proxy;
        this.capabilities = {};

        this.cswCatalogView = {
            cswSearch: (constraintType, constraint, filter) => {
                if (constraint != undefined) {
                    this.csw.constraint = constraint;
                }
                if (constraintType != undefined) {
                    this.csw.constraintType = constraintType;
                }
                if (filter != undefined) {
                    this.csw.filter = filter;
                }
                this.$state.transitionTo(this.$state.current, {
                    constraint: this.csw.constraint,
                    constraintType: this.csw.constraintType,
                    filter: this.csw.filter
                }, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            },
            getCapabilities: (capabilities) => {
                this.capabilities = capabilities;
                this.cswSearchButton.constraintsValues = this.capabilities.constraintsValues;
                this.cswInfos.capabilities = this.capabilities;
            },
            getRecords: (records) => {
                this.records = records;
                this.cswStats.visibleRecords = records.visibleRecords;
                this.cswStats.matchedRecords = records.matchedRecords;
            },
            getRecord: (mdFileIdentifier, mdHierarchyLevel, keywords) => {
                // console.log(mdFileIdentifier, mdHierarchyLevel, keywords);
                var view_default_url;
                var view_url;
                var count = 0;
                for (var v in this.mdViews) {
                    var checkHierarchyLevel = false;
                    var checkKeyword = false;
                    var viewCount = 0;
                    if (this.appConfig.views[v].hasOwnProperty('default') && this.appConfig.views[v].default) {
                        view_default_url = this.appConfig.views[v].url;
                    }
                    if (this.appConfig.views[v].hasOwnProperty('hierarchyLevels') && this.appConfig.views[v].hierarchyLevels.includes(mdHierarchyLevel)) {
                        checkHierarchyLevel = true;
                        viewCount = 2;
                    }
                    var viewKeywords = [];
                    if (this.appConfig.views[v].hasOwnProperty('keywords') && this.appConfig.views[v].keywords[this.lang].length) {
                        var viewKeywords = this.appConfig.views[v].keywords[this.lang];
                    }
                    if (checkHierarchyLevel && viewKeywords.length) {
                        for (var kw = 0; kw < keywords.length; kw++) {
                            checkKeyword = viewKeywords.findIndex((item, key) => keywords[kw].toLowerCase() === item.toLowerCase()) > -1;
                            if (checkKeyword) {
                                viewCount += 1;
                            }
                        }
                    }
                    if (viewCount > count) {
                        count = viewCount;
                        view_url = this.appConfig.views[v].url;
                    }
                }
                if (!view_url) {
                    view_url = view_default_url;
                }
                console.log(view_url);
                this.$state.transitionTo(view_url, {
                    md: mdFileIdentifier,
                    back: this.$state.current.name
                }, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            }
        };

        this.mdView = {
            goBack: () => {
                if (this.back) {
                    this.$state.transitionTo(this.back, {
                        md: null,
                        back: null
                    }, {
                        reload: true,
                        inherit: true,
                        notify: true
                    });
                } else {
                    this.$window.history.back();
                }
            }
        };

        this.helpButton = {
            icon: 'fas fa-info-circle',
            tooltip: this.appLocales.ui.bt_help,
            format: 'button',
            text: this.appLocales.ui.bt_help,
            title: this.appLocales.ui.bt_help,
            contentUrl: this.pages['help']
        };

        this.mentionsButton = {
            tooltip: this.appLocales.ui.bt_mentions,
            format: 'text',
            text: this.appLocales.ui.bt_mentions,
            title: this.appLocales.ui.bt_mentions,
            contentUrl: this.pages['mentions']
        };

        this.copyrights = {
            text: this.appConfig.app.copyrights,
            url: this.appConfig.app.copyrights_url
        };

        if (!this.appConfig.app.view) {
            this.appConfig.app.view = this.$state.current.name.split('.').pop();
        }

        this.changeViewButton = {
            hide: this.isHome || this.isMdView,
            tooltip: this.appLocales.ui.tooltip_changeview,
            views: this.getChangeViews(this.appConfig.views, this.appConfig.app.changeview_list),
            view: this.appConfig.app.view,
            format: this.appConfig.app.changeview_format,
            onChangeView: (view) => {
                this.$state.transitionTo(this.appConfig.views[view].url, this.$stateParams, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            }
        };

        this.homeButton = {
            hide: this.isHome,
            tooltip: this.appLocales.ui.tooltip_home,
            views: {
                home: this.appConfig.views['home']
            },
            view: 'home',
            format: 'icon',
            onChangeView: (view) => {
                this.$state.transitionTo(this.appConfig.views[view].url, false, {
                    reload: true,
                    inherit: false,
                    notify: false
                });
            }
        };

        this.changeLangButton = {
            tooltip: this.appLocales.ui.tooltip_changelang,
            lang: this.lang,
            locales: this.appConfig.app.locales,
            onChangeLang: (lang) => {
                this.lang = lang;
                this.$state.transitionTo(this.$state.current, {
                    lang: this.lang
                }, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            }
        };

        this.changeCswButton = {
            hide: this.isHome || this.isMdView || !this.displayCswBtn,
            tooltip: {
                text: this.appLocales.ui.changecsw_tooltip,
                placement: 'left',
                trigger: 'mouseenter'
            },
            icon: this.appConfig.catalog.icon,
            text: this.appLocales.ui.changecsw_text,
            placeholder: this.appLocales.ui.changecsw_placeholder,
            cswList: this.appConfig.catalog.csw_list,
            cswUrl: this.csw.cswUrl,
            onChangeCsw: (cswUrl) => {
                this.csw.cswUrl = cswUrl;
                this.$state.transitionTo(this.$state.current, {
                    cswUrl: this.csw.cswUrl
                }, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            }
        };

        this.cswInfos = {
            hide: this.isHome || this.isMdView,
            tooltip: this.appLocales.ui.cswinfos_tooltip,
            cswUrl: this.csw.cswUrl,
            capabilities: this.capabilities,
        };

        this.cswStats = {
            hide: this.isHome || this.isMdView,
            tooltip: this.appLocales.ui.cswstats_tooltip,
            visibleRecords: this.visibleRecords,
            matchedRecords: this.matchedRecords,
        };

        this.cswSearchButton = {
            hide: this.isHome || this.isMdView,
            tooltip: this.appLocales.ui.tooltip_search,
            search: this.search,
            constraintsValues: this.capabilities.constraintsValues,
            constraintType: this.csw.constraintType,
            constraint: this.csw.constraint,
            constraintsType: this.appLocales.constraints_type,
            filters: this.csw.filters,
            filter: this.csw.filter,
            // csw: this.csw,
            placeholder: this.appLocales.ui.cswsearch_placeholder,
            clearfilter: this.appLocales.ui.bt_clearfilter,
            onCswSearch: (constraintType, constraintSearch, filter) => {
                if (constraintSearch != undefined) {
                    this.csw.constraint = constraintSearch;
                }
                if (constraintType != undefined) {
                    this.csw.constraintType = constraintType;
                }
                if (filter != undefined) {
                    this.csw.filter = filter;
                }
                this.$state.transitionTo(this.$state.current, {
                    constraint: this.csw.constraint,
                    constraintType: this.csw.constraintType,
                    filter: this.csw.filter
                }, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            }
        };

    }
}

export const appComponent = {
    bindings: {
        appConfig: '<',
        lang: '<',
        appLocales: '<',
        pages: '<',
        header: '<',
        footer: '<',
        csw: '<',
        md: '@',
        back: '@',
        displayCswBtn: '<'
    },
    template: template,
    controller: AppComponentController
};