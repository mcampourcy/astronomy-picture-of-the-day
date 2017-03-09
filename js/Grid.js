/**
 * Grid Class
 * Construct the masonry grid with images
 * @extends ApiCall
 */
class Grid extends ApiCall {

    /**
     * Grid constructor
     */
    constructor () {
        super();
        this.date = new Date();
        this.dateYearMonthDay = '';
        this.item = document.getElementsByClassName('item');
        this.images = [];
    }

    /**
     * For each last 10 days, make an call to the API and add an image to the grid
     */
    buildGrid () {

        this.loader.style.display = 'inline-block';

        for (let ii = 0; ii <= 10; ii++) {

            // Set the API url with a date among last 10 days
            this.dateYearMonthDay = this.date.toISOString().substring(0, 10);
            let urlWithDate = `${this.url}&date=${this.dateYearMonthDay}`;

            this.ajaxCall ({
                url: urlWithDate,
                type: 'GET',
                contentType: 'application/json; charset=utf-8'
            }).then(
                (data) => {
                    this.images.push(data);
                    if(ii == 10){
                        this.loader.style.display = 'none';
                        this.addMedia();
                    }
                },
                (jqXHR, textStatus) => {
                    console.log(textStatus);
                }
            );

            this.date.setDate(this.date.getDate()-1);

        } //endfor

    }

    /**
     * Add an image to the masonry grid
     */
    addMedia () {

        for (let image of this.images) {

            if (image.media_type != 'video') {

                var div = document.createElement('div');
                var img = document.createElement('img');
                div.className = 'grid-item';
                img.setAttribute('src', image.url);
                img.className = 'item';
                img.setAttribute('data-id', image.date);
                div.appendChild(img);

                //  Add elements to masonry grid
                var $el = $(div);
                $grid.append($el).imagesLoaded(function(){
                    $grid.masonry( 'appended', $el, true );
                });

            }//endif

        }//endfor
    }
}