import React, { Component } from 'react';
import Image from '../containers/Image';
import Modal from '../containers/Modal';
import './Card.scss';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = { isActive: false };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let modal = document.getElementById(`modal-${this.props.id}`);

        if(this.state.isActive) {
            modal.style.display = "none";
            this.setState({isActive: false});
        } else {
            modal.style.display = "block";
            this.setState({isActive: true});
        }
    };

    handleClickOutside(e) {
        e.preventDefault();
        let modal = document.getElementById(`modal-${this.props.id}`);
        if(this.node === e.target) {
            modal.style.display = "none";
            this.setState({isActive: false});
        }
    };

    render() {

        return (
            <div className='card'>
                <Image id={this.props.id} item={this.props.item} onClick={this.handleClick}/>
                <div id={`modal-${this.props.id}`} ref={node => { this.node = node; }} onClick={this.handleClickOutside}>
                    <Modal item={this.props.item} show={this.handleClick} />
                </div>
            </div>
        );
    }
}
