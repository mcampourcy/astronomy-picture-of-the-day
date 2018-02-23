import React, { Component } from 'react';
import Modal from './Modal';
import Image from '../containers/Image';
import ModalContent from "../containers/ModalContent";
import './Card.scss';

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isActive: !this.state.isActive
        });
    };

    handleClickOutside(e, node) {
        if(e.target === node) {
            this.setState({isActive: false});
        }
    };

    render() {
        const { item } = this.props;
        return (
            <div className='card'>
                <Image item={item} onClick={this.handleClick}/>
                {this.state.isActive &&
                <Modal event={this.handleClickOutside}>
                    <ModalContent item={item} show={this.handleClick}/>
                </Modal>
                }
            </div>
        );
    }
}

export default Card;