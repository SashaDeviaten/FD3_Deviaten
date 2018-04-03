'use strict';

import React from 'react';
import './MobileCard.css';

export default class MobileCard extends React.Component {

    static propTypes = {};
    state = {};
    saveEdit = () => {
        let flag = true;
        let name = document.querySelector('input.nameInput').value;
        let price = document.querySelector('input.priceInput').value;
        let regexNum = new RegExp(/^\d+$/);
        if (!(price.match(regexNum))) {
            this.setState(({priceError: true}));
            flag = false;
        }
        else {
            price = parseInt(price);
            this.setState(({priceError: false}));
        }
        let img = document.querySelector('input.imgInput').value;
        let regexImg = new RegExp(/\.jpeg$/);
        if (!(img.match(regexImg))) {
            this.setState(({imgError: true}));
            flag = false;
        }
        else this.setState(({imgError: false}));
        let count = document.querySelector('input.countInput').value;
        if (!(count.match(regexNum))) {
            this.setState(({countError: true}));
            flag = false;
        }
        else {
            count = parseInt(count);
            this.setState(({countError: false}));
        }
        if (flag) {
            if (!this.props.createCard) {
                this.props.cbChangeProduct(this.props.name, name, price, img, count);
            }
            else this.props.cbSaveProduct(name, price, img, count);
        }

    };

    render() {
        let card = <div>
            <h2>Карточка {this.props.name}</h2>
            <p> Название: {this.props.name}</p>
            <p>Цена: {this.props.price}</p>
            <p>Изображение: {this.props.img}</p>
            <p>Колличество: {this.props.count}</p>
        </div>;

        let editCard = <div>
            <h2>Карточка {this.props.name}</h2>
            <label> Название:</label><input className='nameInput' type='text'
                                            {...(this.props.createCard
                                                    ? {placeholder: 'Введите название товара'}
                                                    : {defaultValue: this.props.name}
                                            )}
        /><br/>
            <label> Цена:</label><input className='priceInput' type='text'
                                        {...(this.props.createCard
                                                ? {placeholder: 'Введите цену товара'}
                                                : {defaultValue: this.props.price}
                                        )}/>
            {
                (this.state.priceError) &&
                <span className='validError'>  Введите число!</span>

            }<br/>
            <label> Изображение:</label><input className='imgInput' type='text'
                                               {...(this.props.createCard
                                                       ? {placeholder: 'Введите изображение товара'}
                                                       : {defaultValue: this.props.img}
                                               )}/>
            {
                (this.state.imgError) &&
                <span className='validError'> Необходимо JPEG изображение! </span>

            }<br/>
            <label> Колличество:</label><input className='countInput' type='text'
                                               {...(this.props.createCard
                                                       ? {placeholder: 'Введите колличество товара'}
                                                       : {defaultValue: this.props.count}
                                               )}/>

            {
                (this.state.countError) &&
                <span className='validError'>  Введите число!</span>

            }<br/>
            <input type='button' value='Сохранить' onClick={this.saveEdit}/>
            <input type='button' value='Отменить' onClick={this.props.cbProductActivated}/>
        </div>;


        return (
            <div>
                {
                    (this.props.ableKey === this.props.name) && card
                }
                {
                    (this.props.editCard === this.props.name) && editCard
                }
                {
                    (this.props.createCard) && editCard
                }
            </div>
        )

    }


}
