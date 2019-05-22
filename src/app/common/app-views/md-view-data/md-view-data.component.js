import template from './md-view-data.html';

const mdViewDataController = class MdViewDataController {
    constructor() {}

    $onInit() {
        this.codelists = this.appLocales.codelists;
        this.viewerUrl = this.appConfig.app.viewer;
    }

}

export const mdViewDataComponent = {
    bindings: {
        appConfig: '<',
        appLocales: '<',
        mdViewLocales: '<',
        md: '@',
        csw: '<',
        mdView: '<'
    },
    template: template,
    controller: mdViewDataController,
};