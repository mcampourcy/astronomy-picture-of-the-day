import React  from 'react';
import { Maximize2 } from 'react-feather';

const Image = () => (
    <span>
        <img src={this.props.item.url} alt=""/>
        <a href={`#modal-${this.props.id}`} className='overlay' onClick={this.props.onClick}>
            <span className="overlay-txt">
                <h3>{this.props.item.title}</h3>
                <Maximize2/>
            </span>
        </a>
    </span>
);

export default Image;