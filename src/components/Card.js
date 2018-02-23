import React, { Component } from 'react';
import Modal from "./Modal";
import Image from '../containers/Image';
import ModalContent from "../containers/ModalContent";
import './Card.scss';

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = { isActive: false };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isActive: !this.state.isActive});
  };

  handleClickOutside(e, node) {
    if(e.target === node) {
      this.setState({isActive: false});
    }
  };

  render() {
    return (
      <div className='card'>
        <Image id={this.props.id} item={this.props.item} onClick={this.handleClick}/>
        {this.state.isActive &&
        <Modal event={this.handleClickOutside}>
          <ModalContent item={this.props.item} show={this.handleClick}/>
        </Modal>
        }
      </div>
    );
  }
}