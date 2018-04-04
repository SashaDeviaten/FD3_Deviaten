import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import './MobileCompany.css';

export default class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fio: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        name: this.props.name,
        clients: this.props.clients,
        showNewClientCard:false,
    };

    setName1 = () => {
        this.setState({name: 'МТС'});
    };

    setName2 = () => {
        this.setState({name: 'Velcom'});
    };


    addClient = () => {
        this.state.showNewClientCard=false;
        let newClients = [...this.state.clients];
        let newClient={};
        newClient.id=this.state.clients.length+1;
        newClient.fio=this.newClientFioRef.value;
        newClient.balance=parseInt(this.newClientBalanceRef.value);
        newClients.push(newClient);
        this.setState({clients: newClients});
    };

    showNewClientCard = () => {
        this.setState({showNewClientCard: true})
    };

    deleteClient = (clientId) => {
        let newClients = this.state.clients.filter((c) => {
            return (c.id !== clientId)
        });
        this.setState({clients: newClients});
    };
    changeClientFio = (clientId,newFio) => {
        let newClients = [...this.state.clients];
        newClients.forEach((c,i) => {
            if (c.id === clientId) {
                let newClient = {...c};
                newClient.fio = newFio;
                newClients[i] = newClient;
            }
        });
        this.setState({clients: newClients});
    };
    changeClientBalance = (clientId,newBalance) => {
        let newClients = [...this.state.clients];
        newClients.forEach((c,i) => {
            if (c.id === clientId) {
                let newClient = {...c};
                newClient.balance = parseInt(newBalance);
                newClients[i] = newClient;
            }
        });
        this.setState({clients: newClients});
    };

    setNewClientFioRef = (ref) => {
        this.newClientFioRef = ref;
    };

    setNewClientBalanceRef = (ref) => {
        this.newClientBalanceRef = ref;
    };

    filterByBalance = () => {
        let newClients = this.state.clients.sort((a,b) => {
            return (b.balance-a.balance)
        });
        this.setState({clients: newClients});
    };

    render() {
        console.log("MobileCompany render");

        let clientsCode = this.state.clients.map(client =>
            <MobileClient key={client.id}
                          info={client}
                          cbDeleteClient={this.deleteClient}
                          cbChangeClientFio={this.changeClientFio}
                          cbChangeClientBalance={this.changeClientBalance}/>
        );


        return (
            <div className='MobileCompany'>
                <input type="button" value="МТС" onClick={this.setName1}/>
                <input type="button" value="Velcom" onClick={this.setName2}/>
                <div className='MobileCompanyName'>Компания "{this.state.name}"</div>
                <div className='MobileCompanyClients'>
                    {clientsCode}
                </div>
                <input type="button" value="Добавить клиента" onClick={this.showNewClientCard}/>
                {
                    (this.state.showNewClientCard) && <div>
                        <input type='text' placeholder='ФИО' ref={this.setNewClientFioRef}/>
                        <input type='text' placeholder='Баланс' ref={this.setNewClientBalanceRef}/>
                        <input type='button' value='Сохранить клиента' onClick={this.addClient}/>
                    </div>
                }
                <input type="button" value="Отфильтровать по балансу" onClick={this.filterByBalance}/>
                <input type="button" value="Отфильтровать активных" onClick={this.showNewClientCard}/>
                <input type="button" value="Отфильтровать должников" onClick={this.showNewClientCard}/>
            </div>
        )
            ;

    }

}

