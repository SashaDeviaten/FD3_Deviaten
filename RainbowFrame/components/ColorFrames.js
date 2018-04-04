import React from 'react';
import PropTypes from 'prop-types';


export default class ColorFrames extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(
            PropTypes.string.isRequired),
    };
    state = {
        colors: this.props.colors.slice()
    };


    render() {
        let frame;
        if (this.state.colors.length) {
            frame = <div style={{border: "solid 2px " + this.state.colors.shift(), padding: "5px"}}>
                <ColorFrames colors={this.state.colors} content={this.props.content}/>
            </div>
        }
        else {
            frame = <div>
                {this.props.content}
            </div>

        }
        return (
            <div>
                {frame}
            </div>
        );
    }
}


