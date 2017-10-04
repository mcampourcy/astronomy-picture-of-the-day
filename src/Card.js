import React, { Component } from 'react';
import Image from './Image';
import axios from 'axios';

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    componentDidMount() {
        const localPictures = localStorage.getItem('pictures');
        if(localPictures !== null) {
            const pictures = JSON.parse(localPictures);
            this.setState({ posts: pictures.data });
        } else {
            this.getInfo();
        }
    }

    getInfo() {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2017-09-05&end_date=2017-10-02`)
            .then(res => {
                localStorage.setItem('pictures', JSON.stringify(res));
            })
            .then(res => {
                this.setState({ posts: res.data });
            });
    }

    render() {
        const posts = this.state.posts.map((item, i) => (
            <div  className='item'  key={i}>
                <Image item={item} id={i}/>
            </div>
        ));
        return (
            <div className='masonry'>
                { posts }
            </div>
        );
    }
}

export default Card;
