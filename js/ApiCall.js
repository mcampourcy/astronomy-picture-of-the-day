/**
 * ApiCall class
 * @todo localStorage
 */
class ApiCall {

    /**
     * ApiCall constructor
     */
    constructor () {
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=zkj9lIiEkVkyiLcQVgD3Yxw2mrMn8LT2DgfpnoRR';
        this.loader = document.getElementById('loader');
    }

    /**
     * Method to do a Ajax call (generic)
     * @param   {object}    options     Call's parameters (url, dataType...)
     * @returns {boolean}
     */
    ajaxCall (options) {

        return new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open(options.type, options.url);

            xhr.onload = function() {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(Error(xhr.statusText));
                }
            };

            xhr.onerror = function() {
                reject(Error("Network Error"));
            };

            xhr.setRequestHeader("Content-type", options.contentType);
            xhr.send();
        });

    }

}
