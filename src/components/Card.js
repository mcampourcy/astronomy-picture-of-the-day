import React, { Component } from 'react';
import Image from './containers/Image';
import Modal from './containers/Modal';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
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
    }

    render() {

        return (
            <div className='item'>
                <Image id={this.props.id} item={this.props.item} onClick={this.handleClick}/>
                <Modal id={this.props.id} item={this.props.item} onClose={this.handleClick} />
            </div>
        );
    }
}
