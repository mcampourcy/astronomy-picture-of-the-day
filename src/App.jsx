import React, { Fragment, useContext } from 'react'
import { ApiContext } from './ApiProvider'
import { Card } from './Card'
import './App.css'

// Todo : add routes for modals
// Todo : add translation
// Todo : responsive

export function App() {
  const { loading, pictureOfTheDay, pictures } = useContext(ApiContext)

  return (
    <section className="container">
      <header>
        <h1>Astronomy Picture of the Day</h1>
      </header>
      {loading
        ? (
          <div className="loader-content">
            <div id="loader" />
          </div>
        )
        : (
          <Fragment>
            <article>
              <figure>
                <img src={pictureOfTheDay.url} alt="" />
              </figure>
              <span>
                <h2>{pictureOfTheDay.title}</h2>
                <p>{pictureOfTheDay.explanation}</p>
                <p>
                  <a href={pictureOfTheDay.hdurl} target="_blank">Télécharger l'image en haute définition</a>
                </p>
              </span>
            </article>
            <section className="grid">
              {pictures.length === 0
                ? <p>Aucune image n'a été trouvée.</p>
                : pictures.map(item => (
                  <Card key={item.url} item={item} />
                ))}
            </section>
          </Fragment>
        )}
    </section>
  )
}
