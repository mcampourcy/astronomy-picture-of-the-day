import React from 'react'
import { createPortal } from 'react-dom'
import { func } from 'prop-types'
import './Modal.css'

const modalRoot = document.querySelector('[is="modal-content"]')

export function Modal({ children, event }) {
    const handleClick = (e) => {
        event(e, this.node)
    }

    return createPortal(
        <div className="modal" ref={node => { this.node = node }} onClick={handleClick}>
            {children}
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    onClick: func.isRequired
}
