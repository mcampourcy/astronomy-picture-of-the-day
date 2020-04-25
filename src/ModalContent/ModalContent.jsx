import React, { Fragment, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../ApiProvider'
import './ModalContent.css'

export function ModalContent() {
  const { date } = useParams()
  const { loading, getPictureByDate } = useContext(ApiContext)
  const item = getPictureByDate(date)
  if (!loading) console.log(item)

  return (
    <Fragment>
      {loading
        ? (
          <div className="loader-content">
            <div id="loader" />
          </div>
        )
        : (
          <section className="container">
            <div className="modal-img">
              <img src={item.url} alt={item.title} />
            </div>
            <div className="modal-txt">
              <h2>{item.title}</h2>
              <p>{item.explanation}</p>
              <p className="text-right">
                <a href={item.hdurl} target="_blank">Télécharger l'image en HD</a>
              </p>
            </div>
          </section>
        )}
    </Fragment>
  )
}
