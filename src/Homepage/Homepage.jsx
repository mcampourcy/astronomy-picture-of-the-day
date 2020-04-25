import React, { Fragment, useContext } from 'react'
import { ApiContext } from '../ApiProvider'
import { Loader } from '../Loader'
import { GridItem } from './GridItem'
import './Homepage.css'

export function Homepage() {
  const { loading, pictureOfTheDay, pictures } = useContext(ApiContext)

  if (loading) return <Loader />

  return (
    <Fragment>
      <article>
        <figure>
          <img src={pictureOfTheDay.url} alt="" />
        </figure>
        <span>
          <h2>{pictureOfTheDay.title}</h2>
          <p>{pictureOfTheDay.explanation}</p>
          <p>
            <a href={pictureOfTheDay.hdurl} target="_blank">Download HD picture</a>
          </p>
        </span>
      </article>
      <section className="grid">
        {pictures.map(item => (
          <GridItem key={item.id} item={item} />
        ))}
      </section>
    </Fragment>
  )
}
