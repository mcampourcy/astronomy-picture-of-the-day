class Image extends ApiCall {

    constructor (e) {
        super();
        this.dateYearMonthDay = e.getAttribute('data-id');
        this.urlWithDate = `${this.url}&date=${this.dateYearMonthDay}`;
        this.image = {};
    }

    getImage () {
        this.ajaxCall ({
            url: this.urlWithDate,
            type: 'GET',
            contentType: 'application/json; charset=utf-8'
        }).then(
            (data) => {
                this.image = data;
                this.showImage();
            },
            (jqXHR, textStatus) => {
                console.log(textStatus);
            }
        );
    }

    showImage () {

        let modal = document.getElementById('modal');
        modal.style.display = 'block';
        let modalImage = document.getElementById('modal-img');
        let modalText = document.getElementById('modal-txt');

        let img = document.createElement('img');
        let modalImgChild = modalImage.appendChild(img);
        modalImgChild.src = this.image.url;

        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        h2.innerHTML = this.image.title;
        p.innerHTML = this.image.explanation;

        modalText.appendChild(h2);
        modalText.appendChild(p);

    }

}