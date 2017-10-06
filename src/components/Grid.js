import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Grid.css';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
        this.serverRequest = '';
        this.today = new Date();
    }

    componentDidMount() {
        const localPictures = localStorage.getItem('pictures');
        if(localPictures !== null) {
            const pictures = JSON.parse(localPictures);
            this.setState({ posts: pictures });
        } else {
            let date = new Date();
            let tenDaysAgo = new Date(date.setDate(date.getDate() - 25));
            this.handleConnexion(tenDaysAgo, this.today);
        }
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    componentDidUpdate() {
        const lastStorageDay = new Date(this.state.posts.slice(-1)[0].date);
        if(this.today.toLocaleDateString() !== lastStorageDay.toLocaleDateString()) {
            const nextLastStorageDay = new Date(lastStorageDay.setDate(lastStorageDay.getDate() +1));
            this.handleConnexion(nextLastStorageDay, this.today);
        }
   }

    handleConnexion(firstDate, lastDate) {
        const startDate = firstDate.toISOString().substring(0, 10);
        const endDate = lastDate.toISOString().substring(0, 10);

        this.serverRequest = axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`)
            .then(res => {
                this.setState({ posts: res.data });
            })
            .then(() => {
                localStorage.setItem('pictures', JSON.stringify(this.state.posts));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const posts = this.state.posts.slice(0).reverse().map((item, i) => (
            <Card item={item} key={i} id={i} />
        ));
        return (
            <div className='grid'>
                { posts }
            </div>
        );
    }
}
