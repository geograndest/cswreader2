import template from './csw-md-data.html';

const cswMdDataController = class CswMdDataController {
    constructor($window, CswCatalogServices) {
        'ngInject';
        this.$window = $window;
        this.CswCatalogServices = CswCatalogServices;
    }

    $onInit() {
        this.csw.md = this.md;
        this.CswCatalogServices.getRecord(this.csw, (data) => {
            this.record = data;
        });
    }

    onPrint() {
        this.$window.print();
    }

    onClose() {
        this.goBack();
    }

}

export const cswMdDataComponent = {
    bindings: {
        tpl: '@',
        csw: '<',
        md: '@',
        locales: '<',
        codelists: '<',
        goBack: '&'
    },
    template: template,
    controller: cswMdDataController,
};