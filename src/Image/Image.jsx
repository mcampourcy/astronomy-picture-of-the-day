import React, { Fragment } from 'react'
import { Maximize2 } from 'react-feather'
import './Image.css'

export function Image({ item, onClick }) {
  return (
    <Fragment>
      <img src={item.url} alt="" />
      <a href={`#modal-${item.slug}`} className="overlay" onClick={onClick}>
        <span className="overlay-txt">
          <h3>{item.title}</h3>
          <Maximize2 />
        </span>
      </a>
    </Fragment>
  )
}
