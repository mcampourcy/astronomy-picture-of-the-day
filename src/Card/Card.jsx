import React, { useState } from 'react'
import { Modal } from '../Modal'
import { Image } from '../Image'
import { ModalContent } from '../Modal/ModalContent'
import './Card.css'

export function Card({ item }) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleClickOutside = (e, node) => {
    if (e.target === node) {
      setIsActive(false)
    }
  }

  return (
    <div className="card">
      <Image item={item} onClick={handleClick} />
      {isActive && (
        <Modal event={handleClickOutside}>
          <ModalContent item={item} show={handleClick} />
        </Modal>
      )}
    </div>
  )
}
