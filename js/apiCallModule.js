var apiCallModule = ( () => {

    /**
    * Method to do a Ajax call (generic)
    * @param   {object}    options     Call's parameters (url, dataType...)
    * @param   {object}    resolve     Call's OK
    * @param   {object}    reject      Call's error
    * @returns {boolean}
    */
    var _ajaxCall = (options, resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url);

        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(Error(xhr.statusText));
            }
        };

        xhr.onerror = () => {
            reject(Error("Network Error"));
        };

        xhr.setRequestHeader("Content-type", options.contentType);
        xhr.send();
    };

    var ajaxCall = (options) => {
        return new Promise( (resolve, reject) => {
            _ajaxCall(options, resolve, reject);
        });
    };

    return {
        ajaxCall: ajaxCall
    };

})();