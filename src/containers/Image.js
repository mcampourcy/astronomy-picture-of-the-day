import React, { Fragment }  from 'react';
import PropTypes from 'prop-types';
import { Maximize2 } from 'react-feather';
import './Image.scss';

const Image = ({ item, onClick }) => (
    <Fragment>
        <img src={item.url} alt=""/>
        <a href={`#modal-${item.slug}`} className='overlay' onClick={onClick}>
            <span className="overlay-txt">
                <h3>{item.title}</h3>
                <Maximize2 />
            </span>
        </a>
    </Fragment>
);

Image.propTypes = {
    item: PropTypes.object.isRequired
};

export default Image;