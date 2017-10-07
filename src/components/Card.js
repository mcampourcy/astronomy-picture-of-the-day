import React, { Component } from 'react';
import Image from '../containers/Image';
import Modal from '../containers/Modal';
import ReactDOM from 'react-dom';
import './Card.css';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = { isActive: false };
    }

    handleClick = (e) => {
        e.preventDefault();
        let modal = document.getElementById(`modal-${this.props.id}`);

        // console.log(this.node, e.target);
        // if(!this.node.contains(e.target)) {
        //         modal.style.display = "none";
        //         this.setState({isActive: false});
        // }

        if(this.state.isActive) {
            modal.style.display = "none";
            this.setState({isActive: false});
        } else {
            modal.style.display = "block";
            this.setState({isActive: true});
        }

    };

    render() {

        return (
            <div className='card'>
                <Image id={this.props.id} item={this.props.item} onClick={this.handleClick}/>
                <Modal id={this.props.id} item={this.props.item} onClick={this.handleClick} />
            </div>
        );
    }
}
