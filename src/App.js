import React, { Component } from 'react';
import './App.css';
import Card from './Card';

class App extends Component {
  render() {
    return (
      <section className='container'>
          <header>
              <h1>Welcome</h1>
          </header>
          <Card />
      </section>
    );
  }
}

export default App;
