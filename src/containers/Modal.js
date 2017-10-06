import React  from 'react';
import { X } from 'react-feather';
import './Modal.css';

const Modal = ({ id, item, onClose }) => (
    <div id={`modal-${id}`} onClick={onClose}>
        <div className="container">
            <div className="modal-icon">
                <X onClick={onClose} />
            </div>
            <div className="modal-img">
                <img src={item.url} alt={item.title}/>
            </div>
            <div className="modal-txt">
                <h2>{item.title}</h2>
                <p>{item.explanation}</p>
                <p className='text-right'>
                    <a href={item.hdurl}>Télécharger l'image en HD</a>
                </p>
            </div>
        </div>
    </div>
);

export default Modal;
