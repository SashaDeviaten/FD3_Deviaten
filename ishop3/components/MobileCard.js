'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class MobileCard extends React.Component {

    static propTypes = {

    };
    saveEdit = () => {
        let name=document.querySelector('input.nameInput').value;
        let price=parseInt(document.querySelector('input.priceInput').value);
        let img=document.querySelector('input.imgInput').value;
        let count=parseInt(document.querySelector('input.countInput').value);
        this.props.cbChangeProduct(this.props.name,name,price,img,count);

    };
    saveProduct = () => {
        let name=document.querySelector('input.nameInput').value;
        let price=parseInt(document.querySelector('input.priceInput').value);
        let img=document.querySelector('input.imgInput').value;
        let count=parseInt(document.querySelector('input.countInput').value);
        this.props.cbSaveProduct(name,price,img,count);

    };

    render() {

        return (
            <div>
                {
                    (this.props.ableKey === this.props.name) &&
                    <div>
                        <h2>Карточка {this.props.name}</h2>
                        <p> Название: {this.props.name}</p>
                        <p>Цена: {this.props.price}</p>
                        <p>Изображение: {this.props.img}</p>
                        <p>Колличество: {this.props.count}</p>
                    </div>
                }

                {
                    (this.props.editCard === this.props.name) &&
                    <div>
                        <h2>Карточка {this.props.name}</h2>
                        <label> Название:</label><input className='nameInput' type='text' defaultValue={this.props.name}/><br/>
                        <label> Цена:</label><input className='priceInput' type='text' defaultValue={this.props.price}/><br/>
                        <label> Изображение:</label><input className='imgInput' type='text' defaultValue={this.props.img}/><br/>
                        <label> Колличество:</label><input className='countInput' type='text' defaultValue={this.props.count}/><br/>
                        <input type='button' value='Сохранить' onClick={this.saveEdit}/>
                        <input type='button' value='Отменить' onClick={this.props.cbProductActivated}/>
                    </div>

                }
                {
                    (this.props.createCard) &&
                    <div>
                        <h2>Карточка нового товара</h2>
                        <label> Название:</label><input className='nameInput' type='text' placeholder='Введите название товара'/><br/>
                        <label> Цена:</label><input className='priceInput' type='text' placeholder='Введите цену товара'/><br/>
                        <label> Изображение:</label><input className='imgInput' type='text' placeholder='Введите изображение товара'/><br/>
                        <label> Колличество:</label><input className='countInput' type='text' placeholder='Введите колличество товара'/><br/>
                        <input type='button' value='Добавить' onClick={this.saveProduct}/>
                        <input type='button' value='Отменить' onClick={this.props.cbProductActivated}/>
                    </div>

                }
            </div>
        )

    }


}
