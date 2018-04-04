import React from 'react';
import PropTypes from 'prop-types';


export default class ColorFrames extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(
            PropTypes.string.isRequired),
    };
    state = {
        colors: this.props.colors.slice(),
        content: this.props.children
    };


    render() {
        let frame;

        (this.state.colors.length
                ? frame = <div style={{border: "solid 2px " + this.state.colors.shift(), padding: "5px"}}>
                    <ColorFrames colors={this.state.colors}>
                        {this.state.content}
                    </ColorFrames>
                </div>
                : frame = <div style={{border: "solid 2px " + this.state.colors.shift(), padding: "5px"}}>
                    {this.state.content}
                </div>
        );

        return (
            <div>
                {frame}
            </div>

        );
    }
}


