"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Component_br2jsx from './components/Component_br2jsx';

let text = 'Что-нибудь<br />Что-нибудь ещё<br>И ещё<br/>И с текстом <br & br> <br/>И ещё с текстом <brand>  <br/>И ещё<br/>И ещё<br/>И ещё<br/>Конец';

ReactDOM.render(
    <Component_br2jsx content={text}/>
    , document.getElementById('container')
);

