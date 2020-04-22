import React, { useState } from 'react'
import { Card } from './Card'
import './App.css'

// Todo : add routes for modals
// Todo : add Redux
// Todo : add translation
// Todo : add effect on modal
// Todo : responsive

export function App() {
  const [loading, setLoading] = useState(true)
  const [pictures, setPictures] = useState([])

  // componentDidMount() {
  //     fetch('/api')
  //         .then(result => result.json())
  //         .then(data => {
  //             this.setState({
  //                 loading: false
  //             })
  //             if(data.pictures.length > 0) {
  //                 this.setState({
  //                     pictures: data.pictures,
  //                 })
  //             }
  //         })
  //         .catch(error => console.error('Error:', error))
  // }


  return (
    <section className="container">
      <header>
        <h1>Astronomy Picture of the Day</h1>
      </header>
      {loading
        ? (
          <div className="loader-content">
            <div id="loader"> </div>
          </div>
        )
        : (
          <div className="grid">
            {pictures.length === 0
              ? <p>Aucune image n'a été trouvée.</p>
              : pictures.map(item => (
                <Card key={item.slug} item={item} />
              ))}
          </div>
        )}
    </section>
  )
}
