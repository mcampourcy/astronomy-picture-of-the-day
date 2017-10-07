import React, { Component }  from 'react';
import { X } from 'react-feather';
import './Modal.css';

export default class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div id={`modal-${this.props.id}`} ref={node => { this.node = node; }}>
                <div className="container">
                    <div className="modal-icon">
                        <X onClick={this.props.onClick} />
                    </div>
                    <div className="modal-img">
                        <img src={this.props.item.url} alt={this.props.item.title}/>
                    </div>
                    <div className="modal-txt">
                        <h2>{this.props.item.title}</h2>
                        <p>{this.props.item.explanation}</p>
                        <p className='text-right'>
                            <a href={this.props.item.hdurl} target='_blank'>Télécharger l'image en HD</a>
                        </p>
                    </div>
                </div>
            </div>
        )

    }

}
