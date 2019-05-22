import template from './csw-catalog.html';
import {
    isArray
} from '@uirouter/core';

const cswCatalogController = class CswCatalogController {
    constructor($filter, CswCatalogServices) {
        'ngInject';
        this.CswCatalogServices = CswCatalogServices;
        this.$filter = $filter;
    }

    $onInit() {
        this.getMoreBusy = false;
        this.test = 1;
        this.records = {};
        this.visibleRecords = 0;
        this.matchedRecords = 0;

        this.CswCatalogServices.getCapabilities(this.csw.cswUrl, this.csw.proxy, 'CSW', '2.0.2', (data) => {
            this.capabilities = data;
            this.capabilities.constraintsValues = this.$filter('getValue')(this.capabilities, 'getCapabilities', 'operationsGetRecords.supportedConstraints.constraintsValues');
            this.getCapabilities({
                capabilities: this.capabilities
            });
        }).then(
            this.CswCatalogServices.getDomain('', this.csw.cswUrl, this.csw.proxy, (data) => {
                this.domainName = data;
            })
        ).then(
            // this.getMoreRecords(false)
            this.getMore(false)
        );
    }

    getMore(more) {
        if (more) {
            this.csw.startPosition = parseInt(this.csw.startPosition) + parseInt(this.csw.maxRecords);
        }
        this.CswCatalogServices.getRecords(this.csw, (data) => {
            var mdList = this.$filter('getValue')(data, 'getRecords', 'mdList');
            var filterList = [];
            if (this.csw.filter) {
                for (var r = 0; r < mdList.length; r++) {
                    var filters = this.csw.filter.split('|') || [];
                    filters = filters.filter(function (el) {
                        return el;
                    });
                    var check = 0;
                    for (var f = 0; f < filters.length; f++) {
                        var filter = this.csw.filters[filters[f]];
                        var filterValues = filter.filter.split('|');
                        var value = this.$filter('getValue')(mdList[r], 'getRecords', filterValues[0]);
                        if (this.$filter('arrayContains')(value, filterValues[1], 'contains')) {
                            check += 1;
                        }
                    }
                    if (check == filters.length) {
                        filterList.push(mdList[r]);
                    }
                }
            } else {
                filterList = mdList;
            }
            this.visibleRecords = parseInt(this.visibleRecords) + parseInt(filterList.length);
            this.matchedRecords = this.$filter('getValue')(data, 'getRecords', 'numberOfRecordsMatched')[0];

            if (more) {
                // TODO: remplacer par appel direct au service set de xmlConverter
                this.records['csw__GetRecordsResponse'][0]['csw__SearchResults'][0]['gmd__MD_Metadata'] = this.records['csw__GetRecordsResponse'][0]['csw__SearchResults'][0]['gmd__MD_Metadata'].concat(filterList);
            } else if (data) {
                data['csw__GetRecordsResponse'][0]['csw__SearchResults'][0]['gmd__MD_Metadata'] = filterList;
                this.records = data;
            }
            this.records.visibleRecords = this.visibleRecords || this.records.visibleRecords;
            this.records.matchedRecords = this.matchedRecords || this.records.matchedRecords;
            this.getRecords({
                records: this.records
            });
        });
    }

    onViewMd(mdFileIdentifier, mdHierarchyLevel, keywords) {
        // console.log(mdFileIdentifier, mdHierarchyLevel, keywords);
        this.getRecord({
            mdFileIdentifier: mdFileIdentifier,
            mdHierarchyLevel: mdHierarchyLevel,
            keywords: keywords
        });
    }

    onCswSearch(constraintType, constraint, filter) {
        this.cswSearch({
            constraintType: constraintType,
            constraint: constraint,
            filter: filter
        });
    }

}

export const cswCatalogComponent = {
    bindings: {
        tpl: '@',
        csw: '<',
        locales: '<',
        topicCategories: '<',
        getCapabilities: '&',
        getRecords: '&',
        getRecord: '&',
        cswSearch: '&'
    },
    template: template,
    controller: cswCatalogController,
};