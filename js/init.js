//Todo : localStorage
class Init {

    constructor () {
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
        this.loader = document.getElementById('loader');
    }

    ajaxCall (options) {

        let data = new Promise( (resolve, reject) => {
            $.ajax(options).done(resolve).fail(reject);
        });

        return data;

    }

}