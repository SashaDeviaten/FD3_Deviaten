'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './MobileBlock.css';

export default class MobileBlock extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cbProductActivated: PropTypes.func.isRequired,
        cbEditCard: PropTypes.func.isRequired,
    };
    state = {
    };
    mobileActivated = () => {
        this.props.cbProductActivated(this.props.name);

    };
    deleteMobile = (e) => {
        e.stopPropagation();
        let flag=confirm('Удалить элемент?');
        this.props.cbProductActivated(null);
        this.setState( {deletemobile:flag} );


    };
    editCard = (e) => {
        e.stopPropagation();
        this.props.cbEditCard(this.props.name);
    };

    render() {
        let img=`images/${this.props.img}`;
        if (this.props.name !== this.props.activeProduct) {
            return (

                (!this.state.deletemobile) && <tr key={this.props.name}
                    className='products'
                    onClick={this.mobileActivated}
                >

                    <td className='productsImg'>
                        <img src={img}></img>
                    </td>
                    <td className='productsName'>
                        {this.props.name}
                        <br/>
                        <input
                            type='button'
                            value='Редактировать'
                            onClick={this.editCard}
                        />
                        <input
                            type='button'
                            value='Удалить'
                            onClick={this.deleteMobile}/>
                    </td>
                    <td className='productsPrice'> {this.props.price} BYN</td>

                    <td className='productsCount'> осталось {this.props.count} шт.</td>
                </tr>
            )
        }
        else {
            return (
                (!this.state.deletemobile) &&  <tr key={this.props.name}
                    className='products'
                    onClick={this.mobileActivated}
                    style={{backgroundColor: 'grey'}}
                >

                    <td className='productsImg'>
                        <img src={img}></img>
                    </td>
                    <td className='productsName'>
                        {this.props.name}
                        <br/>
                        <input
                            type='button'
                            value='Редактировать'
                            onClick={this.editCard}
                        />
                        <input
                            type='button'
                            value='Удалить'
                            onClick={this.deleteMobile}/>
                    </td>
                    <td className='productsPrice'> {this.props.price} BYN</td>


                    <td className='productsCount'> осталось {this.props.count} шт.</td>
                </tr>


            )
        }
    }


}
