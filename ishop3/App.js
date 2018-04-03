'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ProductsBlock from './components/ProductsBlock';

let mobileTitle = 'Мобильные телефоны';
import mobilesArr from './mobiles.json'

ReactDOM.render(
    <ProductsBlock
        title={mobileTitle}
        products={mobilesArr}
    />
    , document.getElementById('container')
);
