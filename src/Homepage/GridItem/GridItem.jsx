import React from 'react'
import { Link } from 'react-router-dom'
import { shape, string } from 'prop-types'
import './GridItem.css'

export function GridItem({ item }) {
  return (
    <div className="card">
      <img src={item.url} alt="" />
      <Link to={`/${item.date}/${item.id}`} className="overlay">
        <span className="overlay-txt">
          <h3>{item.title}</h3>
        </span>
      </Link>
    </div>
  )
}

GridItem.propTypes = {
  item: shape({
    id: string,
    date: string,
    title: string,
    url: string,
  }),
}
