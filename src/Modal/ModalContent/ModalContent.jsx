import React from 'react'
import { func } from 'prop-types'
import { X } from 'react-feather'
import './ModalContent.css'

export function ModalContent({ item, show }) {
  return (
    <div className="container">
      <div className="modal-icon">
        <X onClick={show} />
      </div>
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
    </div>
  )
}

ModalContent.propTypes = {
  show: func.isRequired,
}
