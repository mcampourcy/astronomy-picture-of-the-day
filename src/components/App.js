import React, { Component } from 'react';
import Card from "./Card";
import './App.scss';

// Todo : add routes for modals
// Todo : add Redux
// Todo : add translation
// Todo : add effect on modal
// Todo : responsive

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            pictures: []
        };
    }

    componentDidMount() {
        fetch('/api')
            .then(result => result.json())
            .then(data => {
                this.setState({
                    loading: false
                });
                if(data.pictures.length > 0) {
                    this.setState({
                        pictures: data.pictures,
                    });
                }
            })
            .catch(error => console.error('Error:', error))
    }


    render() {
        const { pictures } = this.state;

        return(
            <section className='container'>
                <header>
                    <h1>Astronomy Picture of the Day</h1>
                </header>
                {this.state.loading ?
                    <div className="loader-content">
                        <div id="loader"> </div>
                    </div>
                    :
                    <div className='grid'>
                        {pictures.length === 0 ?
                            <p>Aucune image n'a été trouvée.</p>
                            :
                            pictures.map(item => (
                                <Card key={item.slug} item={item} />
                            ))
                        }
                    </div>
                }
            </section>
        )
    }

}

export default App;