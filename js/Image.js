/**
 * Image class
 * Set up the modal with one image and his description
 * @extends ApiCall
 */
class Image extends ApiCall {

    /**
     * Image constructor
     * @param   image   HTML element for image
     */
    constructor (image) {
        super();
        this.dateYearMonthDay = image.getAttribute('data-id');
        this.urlWithDate = `${this.url}&date=${this.dateYearMonthDay}`;
        this.image = {};
    }

    /**
     * API call to get the image data
     */
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

    /**
     * Build the HTML for the modal
     */
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
        let pLink = document.createElement('p');
        let a = document.createElement('a');
        h2.innerHTML = this.image.title;
        p.innerHTML = this.image.explanation;
        pLink.className = 'text-right';
        a.setAttribute('href', this.image.hdurl);
        a.innerHTML = "Télécharger l'image en HD";

        modalText.appendChild(h2);
        modalText.appendChild(p);
        modalText.appendChild(pLink);
        pLink.appendChild(a);

    }

}