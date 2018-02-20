import React  from 'react';
import { Maximize2 } from 'react-feather';
import './Image.scss';

const Image = ({ id, item, onClick }) => (
    <span>
        <img src={item.url} alt=""/>
        <a href={`#modal-${id}`} className='overlay' onClick={onClick}>
            <span className="overlay-txt">
                <h3>{item.title}</h3>
                <Maximize2/>
            </span>
        </a>
    </span>
);

export default Image;