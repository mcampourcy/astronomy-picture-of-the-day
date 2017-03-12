var manageMediaModule = ( (apiCallModule, localStorageModule) => {

    this._mediaList = [];
    this._media = {}; // When one media is select
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
                this._mediaList.push(localMedia);
            });
        } //endif
    };

    /**
     * Get one media in the local storage
     * @private
     */
    var _getOneMedia = (media) => {
        this.dateYearMonthDay = media.getAttribute('data-id');
        let urlWithDate = `${this._url}&date=${dateYearMonthDay}`;

        apiCallModule.ajaxCall ({
            url: urlWithDate,
            type: 'GET',
            contentType: 'application/json; charset=utf-8'
        }).then(
            (data) => {
                this._media = data;
                displayOneView();
            },
            (jqXHR, textStatus) => {
                console.log(textStatus);
            }
        );
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

            if(this._mediaList !== null) {
                // Check if there is a media that corresponds to the date
                findMedia = this._mediaList.find(img => img.date === dateYearMonthDay);
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
                        this._mediaList.push(data);
                        if(ii == 10) {
                            // Send the array in the local storage
                            localStorageModule.addItem(this._mediaList);
                        } //endif
                    },
                    (jqXHR, textStatus) => {
                        console.log(textStatus);
                    }
                );

            } //endif
            this._date.setDate(this._date.getDate()-1);
        } //endfor

    };

    /**
     * Bind view events to methods
     * @private
     */
    var _bindListeners = () => {

        let items = document.getElementsByClassName('item');
        let body = document.getElementById('page-body');
        let modal = document.getElementById('modal');
        let modalCloseIcon = document.getElementById('modal-icon');
        let modalImg = document.getElementById('modal-img');
        let modalTxt = document.getElementById('modal-txt');

        for (let item of items) {
            item.addEventListener('click', (e) => {
                getOneMedia(e.currentTarget);
                body.classList.add('noscroll');
            });
        }

        modalCloseIcon.addEventListener('click', () => {
            modal.style.display = 'none';
            modalImg.innerHTML = '';
            modalTxt.innerHTML = '';
            body.classList.remove('noscroll');
        });
    };

    /**
     * Build the media grid on homepage
     * @private
     */
    var _displayView = () => {

        for (let media of this._mediaList) {

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

    /**
     * Display the modal when one media is select
     * @private
     */
    var _displayOneView = () => {

        let modal = document.getElementById('modal');
        modal.style.display = 'block';
        let modalImage = document.getElementById('modal-img');
        let modalText = document.getElementById('modal-txt');

        let img = document.createElement('img');
        let modalImgChild = modalImage.appendChild(img);
        modalImgChild.src = this._media.url;

        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let pLink = document.createElement('p');
        let a = document.createElement('a');
        h2.innerHTML = this._media.title;
        p.innerHTML = this._media.explanation;
        pLink.classList.add('text-right');
        a.setAttribute('href', this._media.hdurl);
        a.innerHTML = "Télécharger l'image en HD";

        modalText.appendChild(h2);
        modalText.appendChild(p);
        modalText.appendChild(pLink);
        pLink.appendChild(a);

    };


    /** === PUBLIC FUNCTIONS === **/

    var setAllMedia = () => {
        _setAllMedia();
    };

    var getOneMedia= (media) => {
        _getOneMedia(media);
    };

    var checkMedia = () => {
        _checkMedia();
    };

    var bindListeners = () => {
        _bindListeners();
    };

    var displayView = () => {
        _displayView();
    };

    var displayOneView = () => {
        _displayOneView();
    };

    /** === RETURNS === **/

    return {
        setAllMedia: setAllMedia,
        getOneMedia: getOneMedia,
        checkMedia: checkMedia,
        bindListeners: bindListeners,
        displayView: displayView,
        displayOneView: displayOneView
    }

})(apiCallModule, localStorageModule);

manageMediaModule.checkMedia();
manageMediaModule.displayView();
manageMediaModule.bindListeners();