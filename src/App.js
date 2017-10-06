import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';

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
