import React, { Component } from 'react';
import Card from "./Card";
import './App.scss';

// Todo : add Fragments
// Todo : add routes for modals
// Todo : add HOC
// Todo : add Redux
// Todo : add translation
// Todo : add effect on modal
// Todo : responsive
// Todo : refatoring

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            pictures: []
        };
        this.today = new Date();
        this.date = new Date();
        this.oneMonthAgo = new Date(this.date.setDate(this.date.getDate() - 25));
    }

    componentDidMount() {

        fetch('/api')
            .then(result => result.json())
            .then(data => {
                if(data.pictures.length > 0) {
                    this.setState({
                        pictures: data.pictures,
                        loading: false
                    });
                } else {
                    this.getPictures(this.oneMonthAgo, this.today);
                }
            })
            .catch(error => console.error('Error:', error))

    }

    componentDidUpdate() {
        const lastStorageDay = new Date(this.state.pictures.slice(-1)[0].date);
        if(this.today.toLocaleDateString() !== lastStorageDay.toLocaleDateString()) {
            const nextLastStorageDay = new Date(lastStorageDay.setDate(lastStorageDay.getDate()) +1);
            this.handleConnexion(nextLastStorageDay, this.today);
        }
    }

    getPictures(start, end) {
        const startDate     = start.toISOString().substring(0, 10);
        const endDate       = end.toISOString().substring(0, 10);
        const source        = `https://api.nasa.gov/planetary/apod?api_key=zkj9lIiEkVkyiLcQVgD3Yxw2mrMn8LT2DgfpnoRR&start_date=${startDate}&end_date=${endDate}`;
        let { pictures }    = this.state;

        if(startDate !== endDate) {

            fetch(source)
                .then(result => result.json())
                .then(data => {
                    if(pictures.length > 0) {
                        for(let d of data.pictures) {
                            pictures.push(pictures.find(picture => picture.date !== d.date));
                        }
                    } else {
                        pictures = data;
                    }
                    this.setState({pictures});
                    return pictures;
                })
                .then((res) => {
                    this.postPictures(res);
                    this.setState({loading: false})
                })
                .catch(error => console.error('Error:', error))

        }

    }

    postPictures(pictures) {
        pictures.map(picture => {
            fetch('/api/post/all', {
                method: 'POST',
                body: JSON.stringify(picture),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
        });
    }



    render() {
        const { pictures } = this.state;

        return(
            <section className='container'>
                <header>
                    <h1>Astronomy Picture of the Day</h1>
                </header>
                {this.state.loading &&
                <div className="loader-content">
                    <div id="loader"> </div>
                </div>
                }
                <div className='grid'>
                    {pictures.map(item => (
                        <Card key={item.slug} item={item} />
                    ))}
                </div>
            </section>
        )
    }

}

export default App;