import {
    catalogGrid
} from './catalog-grid/catalog-grid.module';
import {
    catalogList
} from './catalog-list/catalog-list.module';
import {
    home
} from './home/home.module';
import {
    mdViewMap
} from './md-view-map/md-view-map.module';
import {
    mdViewData
} from './md-view-data/md-view-data.module';
import {
    mdViewService
} from './md-view-service/md-view-service.module';

export const appViews = angular
    .module('app.views', [
        catalogGrid,
        catalogList,
        home,
        mdViewData,
        mdViewService,
        mdViewMap
    ])
    .name;