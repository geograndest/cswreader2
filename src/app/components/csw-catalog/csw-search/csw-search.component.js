import template from './csw-search.html';

const cswSearchController = class CswSearchController {
    constructor() {}

    $onInit() {}

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

}

export const cswSearchComponent = {
    bindings: {
        constraintsCapabilitiesValues: '<',
        constraintsValues: '<',
        placeholderSearch: '@',
        clearFilter: '@',
        constraintType: '<',
        constraint: '<',
        filter: '<',
        onCswSearch: '&'
    },
    template: template,
    controller: cswSearchController
};