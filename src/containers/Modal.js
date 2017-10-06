import React  from 'react';
import { X } from 'react-feather';

const Modal = () => (
    <div id={`modal-${this.props.id}`} onClick={this.props.onClose}>
        <div className="container">
            <div className="modal-icon">
                <X onClick={this.props.onClose} />
            </div>
            <div className="modal-img">
                <img src={this.props.item.url} alt={this.props.item.title}/>
            </div>
            <div className="modal-txt">
                <h2>{this.props.item.title}</h2>
                <p>{this.props.item.explanation}</p>
                <p className='text-right'>
                    <a href={this.props.item.hdurl}>Télécharger l'image en HD</a>
                </p>
            </div>
        </div>
    </div>
);

export default Modal;
