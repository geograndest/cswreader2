import template from './csw-md-map.html';

const cswMdMapController = class CswMdMapController {
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
        this.viewerUrl = this.viewerUrl.split('?')[0]; // Remove '?' and parameters if exists
    }

    onPrint() {
        this.$window.print();
    }

    onClose() {
        this.goBack();
    }

}

export const cswMdMapComponent = {
    bindings: {
        tpl: '@',
        md: '@',
        viewerUrl: '@',
        csw: '<',
        locales: '<',
        codelists: '<',
        goBack: '&'
    },
    template: template,
    controller: cswMdMapController,
};