export function getValue(XmlConverterService) {
    'ngInject';
    return (data, space, fieldPath) => {
        var result;
        var paths = fieldPath.split('|');
        for (var i = 0; i < paths.length; i++) {
            result = XmlConverterService.getValue(data, space, paths[i]);
            if (result[0]) {
                break;
            }
        }
        return result;
    };
};

export function truncate() {
    return (data, n, useWordBoundary) => {
        data = data || '';
        n = n || 100;
        useWordBoundary = useWordBoundary || false;
        if (data.length <= n) {
            return data;
        }
        var subString = data.substr(0, n - 1);
        if (useWordBoundary) {
            return subString.substr(0, subString.lastIndexOf(' ')) + "...";
        } else {
            return subString + "...";
        }
    }
};

export function toString() {
    return (data, sep) => {
        data = data || [];
        sep = sep || ', '
        if (typeof data === 'string' || data instanceof String) {
            return data;
        }
        return data.join(sep);
    }
};

export function translate() {
    return (data, listName) => {
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (data[0] && listName) {
            for (var i = 0; i < data.length; i++) {
                for (var option in listName) {
                    if (data[i].toLowerCase() == listName[option].id.toLowerCase()) {
                        data[i] = listName[option].value;
                    }
                }
            }
        }
        return data;
    }
};

export function arrayContains() {
    return (data, word, operator) => {
        operator = operator || 'contains';
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (data[0] && word) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]) {
                    if (operator == 'contains' && data[i].toLowerCase().includes(word.toLowerCase())) {
                        return true;
                    } else if (data[i].toLowerCase() == word.toLowerCase()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};

export default {
    getValue,
    truncate,
    toString,
    translate,
    arrayContains
};