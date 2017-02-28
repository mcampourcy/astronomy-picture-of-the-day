class Grid extends ApiCall {

    constructor () {
        super();
        this.date = new Date();
        this.dateYearMonthDay = '';
        this.item = document.getElementsByClassName('item');
        this.images = [];
    }

    buildGrid () {

        this.loader.style.display = 'inline-block';
        for (let ii = 0; ii <= 10; ii++) {

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

    addMedia (date) {

        for (let image of this.images) {

            if (image.media_type != 'video') {

                var div = document.createElement('div');
                var img = document.createElement('img');
                div.className = 'grid-item';
                img.setAttribute('src', image.url);
                img.className = 'item';
                img.setAttribute('data-id', image.date);
                div.appendChild(img);

                //add elements to masonry grid
                var $el = $(div);
                $grid.append($el).imagesLoaded(function(){
                    $grid.masonry( 'appended', $el, true );
                });

            }//endif

        }//endfor
    }
}