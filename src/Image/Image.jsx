import React from 'react'
import { Maximize2 } from 'react-feather'
import { Link } from 'react-router-dom'
import './Image.css'

export function Image({ item }) {
  return (
    <div className="card">
      <img src={item.url} alt="" />
      <Link to={`/${item.date}/${item.id}`} className="overlay">
        <span className="overlay-txt">
          <h3>{item.title}</h3>
          <Maximize2 />
        </span>
      </Link>
    </div>
  )
}
