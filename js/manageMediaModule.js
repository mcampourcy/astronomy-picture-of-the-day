var manageMediaModule = ( (apiCallModule, localStorageModule) => {

    this._media = [];
    this._url = 'https://api.nasa.gov/planetary/apod?api_key=zkj9lIiEkVkyiLcQVgD3Yxw2mrMn8LT2DgfpnoRR';
    this._date = new Date();

    /**
     * Parse the local storage, put all the records in an array
     * @private
     */
    var _setAllMedia = () => {
        let localMedias = JSON.parse(localStorageModule.getAllItems());
        if(localMedias !== null) {
            localMedias.map((localMedia) => {
                this._media.push(localMedia);
            });
        } //endif
    };

    /**
     * Get the missing pictures in the last ten days, store them in local
     * @private
     */
    var _checkMedia = () => {

        setAllMedia();

        let findMedia = false;

        // Get the missing pictures in the last ten days
        for (let ii = 0; ii <= 10; ii++) {

            // Set the API url with a date among last 10 days
            let dateYearMonthDay = this._date.toISOString().substring(0, 10);

            if(this._media !== null) {
                // Check if there is a media that corresponds to the date
                findMedia = this._media.find(img => img.date === dateYearMonthDay);

            } //endif

            // If not, get it from the API and store it in the media array
            if(!findMedia) {

                let urlWithDate = `${this._url}&date=${dateYearMonthDay}`;

                apiCallModule.ajaxCall ({
                    url: urlWithDate,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8'
                }).then(
                    (data) => {
                        this._media.push(data);
                        if(ii == 10) {
                            // Send the array in the local storage
                            localStorageModule.addItem(this._media);
                        } //endif
                    },
                    (jqXHR, textStatus) => {
                        console.log(textStatus);
                    }
                );

            } //endif

            this._date.setDate(this._date.getDate()-1);

        } //endfor

        // Show the grid
        displayView();
    };

    var _displayView = () => {

        for (let media of this._media) {

            if (media.media_type != 'video') {

                var div = document.createElement('div');
                var img = document.createElement('img');
                div.classList.add('grid-item');
                img.src = media.url;
                img.classList.add('item');
                img.setAttribute('data-id', media.date);
                div.appendChild(img);

                //  Add elements to masonry grid
                var $el = $(div);
                $grid.append($el).imagesLoaded(function(){
                    $grid.masonry( 'appended', $el, true );
                });

            }//endif

        }//endfor
    };


    /** === PUBLIC FUNCTIONS === **/

    var setAllMedia = () => {
        _setAllMedia();
    };

    var checkMedia = () => {
        _checkMedia();
    };

    var displayView = () => {
        _displayView();
    };

    /** === RETURNS === **/

    return {
        setAllMedia: setAllMedia,
        checkMedia: checkMedia,
        displayView: displayView
    }

})(apiCallModule, localStorageModule);

manageMediaModule.checkMedia();