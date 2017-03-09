/**
 * ApiCall class
 * @todo localStorage
 */
class ApiCall {

    /**
     * ApiCall constructor
     */
    constructor () {
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
        this.loader = document.getElementById('loader');
    }

    /**
     * Method to do a Ajax call (generic)
     * @param   {object}    options     Call's parameters (url, dataType...)
     * @returns {boolean}
     */
    ajaxCall (options) {

        let data = new Promise( (resolve, reject) => {
            $.ajax(options).done(resolve).fail(reject);
        });

        return data;

    }

}