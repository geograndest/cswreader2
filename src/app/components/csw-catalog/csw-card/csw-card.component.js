import template from './csw-card.html';

const cswCardController = class CswCardController {
    constructor() {}

    $onInit() {}

    viewMd(mdFileIdentifier, mdHierarchyLevel, keywords) {
        // console.log(mdFileIdentifier, mdHierarchyLevel, keywords);
        this.onClickCard({
            mdFileIdentifier: mdFileIdentifier,
            mdHierarchyLevel: mdHierarchyLevel,
            keywords: keywords
        });
    }

    clickBadge(constraintType, constraint, filter) {
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

        this.onClickLabel({
            constraintType: constraintType,
            constraint: constraint,
            filter: this.filter
        });
    }

}

export const cswCardComponent = {
    bindings: {
        tpl: '@',
        filter: '@',
        md: '<',
        locales: '<',
        topicCategories: '<',
        onClickCard: '&',
        onClickLabel: '&'
    },
    template: template,
    controller: cswCardController,
};