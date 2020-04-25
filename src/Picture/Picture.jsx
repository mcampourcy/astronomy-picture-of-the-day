import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../ApiProvider'
import { Loader } from '../Loader'
import './Picture.css'

export function Picture() {
  const { date } = useParams()
  const { loading, getPictureByDate } = useContext(ApiContext)
  const item = getPictureByDate(date)

  if (loading) return <Loader />

  return (
    <section className="picture">
      <img src={item.url} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.explanation}</p>
      <a href={item.hdurl} target="_blank">Download HD picture</a>
    </section>
  )
}
