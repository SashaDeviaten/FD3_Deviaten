import React, {Fragment} from 'react';
import PropTypes from 'prop-types';


export default class Component_br2jsx extends React.PureComponent {

    static propTypes = {
        content: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = this.prepareContent({...props})
    }


                //firstVariant
    // prepareContent = (props) => {
    //     let breakTag = RegExp(/<br ?\/?>/);
    //     let strings = props.content.split(breakTag);
    //     props.content = strings.map((item, i) => {
    //         return <div key={i}>{item}</div>
    //     });
    //
    //     return props
    // };

                //secondVariant
    prepareContent = (props) => {
        props.content = props.content.split(/<br ?\/?>/);
        return props
    };

    render() {
        // console.log(this.props);

        return (
            <div>
                {this.state.content.map((str, i) => {
                    return <Fragment key={i}>{str}<br/></Fragment>
                })}
            </div>
        );
    }
}


