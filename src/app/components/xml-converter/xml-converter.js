var renameKeys = require('deep-rename-keys');
var jsonPath = require('jsonpath');
import convert from 'xml-js';
import * as lodash from 'lodash';
import {
    mdFields
} from './xml-converter.mdFields';
import {
    getRecordFields
} from './xml-converter.getRecordFields';
import {
    getRecordsFields
} from './xml-converter.getRecordsFields';
import {
    getCapabilitiesFields
} from './xml-converter.getCapabilitiesFields';
import {
    getCapabilitiesWfsFields
} from './xml-converter.getCapabilitiesWfsFields';
import {
    getDomainsFields
} from './xml-converter.getDomainsFields';

export class XmlConverter {
    constructor() {
        'ngInject';
        this.mdjs = {};
        this.mdxml = '';
    }

    xml2js(xml, options) {
        this.mdjs = convert.xml2js(xml, options);
        this.mdjs = renameKeys(this.mdjs, function (key, val) {
            return key.replace(':', '__');
        });
        return this.mdjs;
    }

    js2xml(js, options) {
        js = renameKeys(js, function (key, val) {
            return key.replace('__', ':');
        });
        this.mdxml = convert.js2xml(js, options);
        return this.mdxml;
    }

    getFields(nameSpace) {
        if (nameSpace == 'md') {
            return mdFields;
        } else if (nameSpace == 'getRecord') {
            return getRecordFields;
        } else if (nameSpace == 'getRecords') {
            return getRecordsFields;
        } else if (nameSpace == 'getCapabilities') {
            return getCapabilitiesFields;
        } else if (nameSpace == 'getCapabilitiesWfs') {
            return getCapabilitiesWfsFields;
        } else if (nameSpace == 'getDomains') {
            return getDomainsFields;
        }
    }

    getValue(obj, space, field) {
        result = [];
        if (obj) {
            var fields = this.getFields(space);
            var fieldNames = field.split('.');
            var result = obj;
            for (var i = 0; i < fieldNames.length; i++) {
                var xpath = fields[fieldNames[i]].xpath;
                if (Array.isArray(xpath)) {
                    xpath = xpath[0];
                }
                if (Array.isArray(result)) {
                    var values = [];
                    for (var j = 0; j < result.length; j++) {
                        values = values.concat(jsonPath.query(result[j], xpath));
                    }
                    result = values;
                } else {
                    result = jsonPath.query(result, xpath);
                }

                if (fields[fieldNames[i]].hasOwnProperty('filter')) {
                    result = this.filterArray(result, fields[fieldNames[i]].filter[0], fields[fieldNames[i]].filter[1]);
                }
            }
            if (!Array.isArray(result)) {
                result = [result];
            }
        }
        return result;
    }

    filterArray(arr, path, filter) {
        var result = [];
        filter = filter || '';
        var fieldNames = path.split('.');
        for (var a = 0; a < arr.length; a++) {
            var item = arr[a];
            for (var f = 0; f < fieldNames.length; f++) {
                item = item[fieldNames[f]];
                if (f == fieldNames.length - 1 && item == filter) {
                    result.push(arr[a]);
                }
            }
        }
        return result;
    }

    setValue(obj, space, field, value, separator) {
        var fields = this.getFields(space);
        var result = obj;
        if (Array.isArray(fields[field].xpath)) {
            for (var i = 0; i < fields[field].xpath.length; i++) {
                result = lodash.set(obj, fields[field].xpath[i], value);
            }
        } else {
            if (fields[field].hasOwnProperty('children')) {
                var values = value.split(separator)
                var children = [];
                for (var i = 0; i < values.length; i++) {
                    children.push(lodash.set({}, fields[field].children[0].xpath, values[i]));
                }
                result = lodash.set(obj, fields[field].xpath, children);
                result = lodash.set(obj, this.getXpath(fields[field].xpath), children);
            } else {
                result = lodash.set(obj, fields[field].xpath, value);
            }
        }
        return result;
    }

};