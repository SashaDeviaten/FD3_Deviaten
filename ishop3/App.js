'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ProductsBlock from './components/ProductsBlock';

import './components//i_shop3.css';

let mobileTitle = 'Мобильные телефоны';
import mobilesArr from './mobiles.json'

ReactDOM.render(
    <ProductsBlock
        title={mobileTitle}
        products={mobilesArr}
    />
    , document.getElementById('container')
);
