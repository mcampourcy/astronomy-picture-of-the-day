import React, { Component } from 'react';
import Card from './Card';
import './Grid.scss';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pictures: []
        };
        this.today = new Date();
    }

    componentDidMount() {
        fetch('/api')
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                const pictures = response.pictures;
                if(pictures.length > 0) {
                    this.setState({
                        pictures,
                        loading: false
                    });
                } else {
                    let date = new Date();
                    let tenDaysAgo = new Date(date.setDate(date.getDate() - 25));
                    this.handleConnexion(tenDaysAgo, this.today);
                }
            })
    }

    // componentDidUpdate() {
    //     const lastStorageDay = new Date(this.state.posts.slice(-1)[0].date);
    //     if(this.today.toLocaleDateString() !== lastStorageDay.toLocaleDateString()) {
    //         const nextLastStorageDay = new Date(lastStorageDay.setDate(lastStorageDay.getDate()) +1);
    //         this.handleConnexion(nextLastStorageDay, this.today);
    //     }
    // }

    postPictures(pictures) {
        pictures.map(picture => {
            fetch('/api/post/all', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(picture),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {console.log(response)})
        })
    }

    handleConnexion(firstDate, lastDate) {
        const startDate = firstDate.toISOString().substring(0, 10);
        const endDate = lastDate.toISOString().substring(0, 10);

        if(startDate !== endDate) {
            fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.PORT}&start_date=${startDate}&end_date=${endDate}`)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    let { pictures } = this.state;
                    if(pictures.length > 0) {
                        for(let p of response.pictures) {
                            pictures.push(pictures.find(picture => picture.date !== p.date));
                        }
                    } else {
                        pictures = response;
                    }
                    this.setState({pictures});
                    return pictures;
                })
                .then((res) => {
                    this.postPictures(res);
                    this.setState({loading: false})
                })
        }

    }

    render() {
        const { pictures } = this.state;
        return(
            <div>
                {this.state.loading &&
                    <div className="loader-content">
                        <div id="loader"> </div>
                    </div>
                }
                <div className='grid'>
                    {pictures.map((item, i) => (
                        <Card item={item} key={i} id={i} />
                    ))}
                </div>
            </div>
        )
    }
}
