import template from './csw-search.html';

const cswSearchController = class CswSearchController {
    constructor() {}

    $onInit() {
        this.isFilter = {};
        this.isFilter.opendata = this.filter.split('|').includes('opendata');
        this.isFilter.wms = this.filter.split('|').includes('wms');
        this.isFilter.wfs = this.filter.split('|').includes('wfs');
    }

    onSearch(constraintType, constraint, filter) {
        this.constraintType = constraintType;
        this.constraint = constraint;
        this.filter = filter;
        this.onCswSearch({
            constraintType: this.constraintType,
            constraintSearch: this.constraint,
            filter: this.filter
        });
    }

    clearSearch(type) {
        if (type == 'filter') {
            this.filter = '';
        } else if (type == 'constraint') {
            this.constraintType = 'AnyText';
            this.constraint = '';
        } else {
            this.filter = '';
            this.constraintType = 'AnyText';
            this.constraint = '';
        }
        var data = {
            constraintType: this.constraintType,
            constraintSearch: this.constraint,
            filter: this.filter
        };
        this.onCswSearch(data);
    }

    changeFilter(filter) {
        var filters = this.filter.split('|');
        if (filters.includes(filter)) {
            var index = filters.indexOf(filter);
            if (index !== -1) {
                filters.splice(index, 1);
            } 
            this.filter = filters.join('|');
        } else {
            if (!filters.includes(filter)) {
                filters.push(filter);
            }
            filters = filters.filter(function (el) {
                return el;
            });
            this.filter = filters.join('|');
        }
        // this.isFilter[filter] = !this.isFilter[filter];
        this.onSearch(this.constraintType, this.constraint, this.filter);
    }

}

export const cswSearchComponent = {
    bindings: {
        constraintsCapabilitiesValues: '<',
        constraintsValues: '<',
        placeholderSearch: '@',
        clearFilter: '@',
        constraintType: '<',
        constraint: '<',
        filters: '<',
        filter: '<',
        onCswSearch: '&'
    },
    template: template,
    controller: cswSearchController
};