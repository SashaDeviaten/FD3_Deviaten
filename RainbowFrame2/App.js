"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ColorFrames from './components/ColorFrames';

let something = 'Что-нибудь';

let colors = ['red', 'blue', 'green'];

ReactDOM.render(
    <ColorFrames colors={colors}>
        {something}
    </ColorFrames>
    , document.getElementById('container')
);

