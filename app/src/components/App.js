import React, { Component } from 'react';
import Grid from './Grid';

// Todo : connect with MongoDB
// Todo : add Fragments
// Todo : add routes for modals
// Todo : add HOC
// Todo : add Redux
// Todo : add translation
// Todo : add effect on modal
// Todo : responsive
// Todo : refatoring

export default class App extends Component {
  render() {
    return (
      <section className='container'>
          <header>
              <h1>Astronomy Picture of the Day</h1>
          </header>
          <Grid />
      </section>
    );
  }
}
