"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companyName='Velcom';
let clientsArr=[ 
  {id:1, fio:"Иванов И.И.", balance:-200},
  {id:2, fio:"Сидоров С.С.", balance:250},
  {id:3, fio:"Петров П.П.", balance:-100},
  {id:4, fio:"Григорьев Г.Г.", balance:220},
];

ReactDOM.render(
  <MobileCompany 
    name={companyName}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

