export class UtilsService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.promises = [];
    }

    sayHello(name = 'World') {
        var message = 'Hello ' + name + ' !';
        console.log(message);
        return message;
    }

    getJsonFile(file, cache) {
        if ((cache && !promises[cache]) || (!cache)) {
            console.log('Get file: UtilsService.getJsonFile(' + file + ', ' + cache + ').');
            return this.$http.get(file)
                .then((response) => {
                    response.data.file = file;
                    return response.data;
                })
                .catch((reason) => {
                    console.log("Error in UtilsService.getJsonFile() service : can't get '" + file + "' JSON file.");
                });
        } else {
            return promises[cache];
        }
    }

    testRequest(url) {
        console.log('Get file: UtilsService.testRequest(' + url + ').');
        return this.$http.head(url)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((reason) => {
                console.log("Error in UtilsService.getJsonFile() service : can't get '" + url + "' JSON file.");
            });
    }

    getProxyUrl(url, proxy) {
        proxy = proxy || false;
        if (proxy) {
            return proxy + encodeURIComponent(url);
        }
        return url;
    }

    getBaseUrl(url) {
        return url.split('?')[0];
    }

    getUrlParameter(paramName, defaultValue) {
        defaultValue = defaultValue || 0;
        var response = defaultValue;
        var value = $location.search()[paramName];
        if (typeof value != 'undefined') {
            response = value;
            if (typeof value != 'boolean' && ['0', 'false'].indexOf(value.toLowerCase()) > -1) {
                response = 0;
            }
        }
        return response;
    }
}