"use strict";

import React from 'react';
import {shallow, configure} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import MobileClient from '../components/MobileClient';

describe('MobileClient_test', () => {

    let wrapper;

    let client = {id: 1, fio: "Иванов И.И.", balance: -50};

    let deleteClientFlag = false;

    function funcDelete(id) {
        deleteClientFlag = id
    }

    beforeEach(() => {
        wrapper = shallow(<MobileClient info={client} cbDeleteClient={funcDelete}/>).instance();
    });


    it('showButtons', () => {
        wrapper.showButtons();
        expect(wrapper.state.showButtons).toBe(true);
        wrapper.showButtons();
        expect(wrapper.state.showButtons).toBeFalsy()
    });

    it('showFioInput', () => {
        wrapper.showFioInput();
        expect(wrapper.state.showFioInput).toBeTruthy()
    });

    it('deleteClient', () => {
        wrapper.deleteClient();
        expect(deleteClientFlag).toBe(client.id)
    });



});