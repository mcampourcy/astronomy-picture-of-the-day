import React, { Component } from 'react';
import { Maximize2 } from 'react-feather';


class Image extends Component {
    render() {
        return (
            <div>
                <a href="" className="overlay">
                    <span className="overlay-txt">
                        {this.props.item.title} <br/>
                        <Maximize2/>
                    </span>
                </a>
                <img src={this.props.item.url} className="item" alt=""/>
            </div>
        );
    }
}

export default Image;
