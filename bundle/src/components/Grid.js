import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Grid.scss';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: []
        };
        this.today = new Date();
    }

    componentDidMount() {
        const localPictures = localStorage.getItem('pictures');
        if(localPictures !== null) {
            const pictures = JSON.parse(localPictures);
            this.setState({
                posts: pictures,
                loading: false
            });
        } else {
            let date = new Date();
            let tenDaysAgo = new Date(date.setDate(date.getDate() - 25));
            this.handleConnexion(tenDaysAgo, this.today);
        }
    }

    componentDidUpdate() {
        const lastStorageDay = new Date(this.state.posts.slice(-1)[0].date);
        if(this.today.toLocaleDateString() !== lastStorageDay.toLocaleDateString()) {
            const nextLastStorageDay = new Date(lastStorageDay.setDate(lastStorageDay.getDate()) +1);
            this.handleConnexion(nextLastStorageDay, this.today);
        }
   }

    handleConnexion(firstDate, lastDate) {
        const startDate = firstDate.toISOString().substring(0, 10);
        const endDate = lastDate.toISOString().substring(0, 10);

        if(startDate !== endDate) {
            // axios.get(`https://api.nasa.gov/planetary/apod?api_key=zkj9lIiEkVkyiLcQVgD3Yxw2mrMn8LT2DgfpnoRR&start_date=${startDate}&end_date=${endDate}`)
            //     .then(res => {
            //         let data = [];
            //         if(this.state.posts.length > 0) data.push(this.state.posts);
            //         data.push(res.data);
            //         this.setState({ posts: data[0] });
            //     })
            //     .then(() => {
            //         localStorage.setItem('pictures', JSON.stringify(this.state.posts));
            //         this.setState({loading: false})
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }

    }

    render() {
        if(this.state.loading) {
            return (
                <div className="loader-content">
                    <div id="loader"> </div>
                </div>
            )
        } else {
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
}
