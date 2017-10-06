import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Grid.css';

export default class Grid extends Component {

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
            <Card item={item} key={i} id={i} />
        ));
        return (
            <div className='grid'>
                { posts }
            </div>
        );
    }
}
