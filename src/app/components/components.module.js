import { utils } from './utils/utils.module';
import { pageModal } from './page-modal/page-modal.module';
import { changeView } from './change-view/change-view.module';
import { changeLang } from './change-lang/change-lang.module';
import { cswCatalog } from './csw-catalog/csw-catalog.module';
import { xmlConverter } from './xml-converter/xml-converter.module';
import { lodash } from './lodash/lodash.module';

export const components = angular
    .module('components', [
        utils,
        lodash,
        xmlConverter,
        pageModal,
        changeView,
        changeLang,
        cswCatalog
    ])
    .name;