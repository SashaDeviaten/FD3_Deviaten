"use strict";

import React from 'react';
import {shallow, configure} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import MobileCompany from '../components/MobileCompany';

describe('MobileCompany_test', () => {

    let wrapper;
    let companyName = 'Velcom';
    let clientsArr = [
        {id: 1, fio: "Иванов И.И.", balance: -50},
        {id: 2, fio: "Сидоров С.С.", balance: 250},
        {id: 3, fio: "Петров П.П.", balance: -100},
        {id: 4, fio: "Григорьев Г.Г.", balance: 220},
    ];

    beforeEach(() => {
        wrapper = shallow(<MobileCompany name={companyName} clients={clientsArr}/>).instance();
    });


    it('Set name1', () => {
        wrapper.setName1();
        expect(wrapper.state.name).toBe('МТС')
    });

    it('Set name2', () => {
        wrapper.setName2();
        expect(wrapper.state.name).toBe('Velcom')
    });

    it('showNewClientCard', () => {
        wrapper.showNewClientCard();
        expect(wrapper.state.showNewClientCard).toBe(true)
    });


    clientsArr.forEach((client) => {
        it('Delete client', () => {
            wrapper.deleteClient(client.id);
            expect(wrapper.state.clients).not.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: client.id
                    })
                ])
            )
        });
    });

    clientsArr.forEach((client) => {
        it('changeClientFio', () => {
            wrapper.changeClientFio(client.id, 'Новый клиент');
            expect(wrapper.state.clients).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: client.id,
                        fio: 'Новый клиент'
                    })
                ])
            )
        });
    });

    it('showAllClients', () => {
        wrapper.showAllClients();
        expect(wrapper.state.clients).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    notVisibility: true,
                })
            ])
        )
    });

    it('showDebtorClients', () => {
        wrapper.showDebtorClients();
        wrapper.state.clients.forEach((client) => {
            if (client.balance < 0) expect(client.notVisibility).toBe(false);
            else expect(client.notVisibility).toBe(true)
        })

    });

    it('addClient', () => {

        let newFio = {value: 'Новая фамилия'};

        let newBalance = {value: '1000'};

        wrapper.setNewClientFioRef(newFio);
        wrapper.setNewClientBalanceRef(newBalance);

        wrapper.addClient();
        expect(wrapper.state.clients).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fio: 'Новая фамилия',
                    balance: 1000
                })
            ])
        )
    });

    it('addInvalidClient', () => {

        let newFio = {value: 'Новая фамилия'};

        let newBalance = {value: 'тыща'};

        wrapper.setNewClientFioRef(newFio);
        wrapper.setNewClientBalanceRef(newBalance);

        wrapper.addClient();
        expect(wrapper.state.showBalanceWarning).toBe(true);
        expect(wrapper.state.showFioWarning).toBeFalsy()

    });
});


