import React, { Component } from 'react';
import { Maximize2 } from 'react-feather';
import Modal from './Modal';

class Image extends Component {

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
        console.log(this.state.isActive);

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
            <div>
                <img src={this.props.item.url} alt=""/>
                <a href={`#modal-${this.props.id}`} className='overlay' onClick={this.handleClick}>
                    <span className="overlay-txt">
                        <h3>{this.props.item.title}</h3>
                        <Maximize2/>
                    </span>
                </a>
                <Modal onClose={this.handleClick} id={this.props.id} item={this.props.item}/>
            </div>
        );
    }
}

export default Image;
