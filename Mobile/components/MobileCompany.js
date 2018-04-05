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
        showNewClientCard: false,
    };

    componentWillMount = () => {
        this.showAllClients();
    };

    setName1 = () => {
        this.setState({name: 'МТС'});
    };

    setName2 = () => {
        this.setState({name: 'Velcom'});
    };


    addClient = () => {
        this.setState({showFioWarning: false, showBalanceWarning: false});

        if (this.newClientFioRef.value === '') {
            this.setState({showFioWarning: true});
            return
        }

        let regexNum = new RegExp(/^-?\d+$/);
        if (!(this.newClientBalanceRef.value.match(regexNum))) {
            this.setState({showBalanceWarning: true});
            return
        }

        this.state.showNewClientCard = false;
        let newClients = [...this.state.clients];
        let newClient = {};
        let idArr = [];
        [...this.state.clients].forEach((c) => {
            idArr.push(c.id)
        });
        newClient.id = Math.max.apply(null, idArr) + 1;
        newClient.fio = this.newClientFioRef.value;
        newClient.balance = parseInt(this.newClientBalanceRef.value);
        newClient.notVisibility = false;
        newClients.push(newClient);
        this.setState({clients: newClients});
    };

    showNewClientCard = () => {
        this.setState({showNewClientCard: true, showFioWarning: false, showBalanceWarning: false})
    };

    deleteClient = (clientId) => {
        let newClients = this.state.clients.filter((c) => {
            return (c.id !== clientId)
        });
        this.setState({clients: newClients});
    };
    changeClientFio = (clientId, newFio) => {
        let newClients = [...this.state.clients];
        newClients.forEach((c, i) => {
            if (c.id === clientId) {
                let newClient = {...c};
                newClient.fio = newFio;
                newClients[i] = newClient;
            }
        });
        this.setState({clients: newClients});
    };
    changeClientBalance = (clientId, newBalance) => {
        let newClients = [...this.state.clients];
        newClients.forEach((c, i) => {
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
        let newClients = [...this.state.clients];
        newClients.sort((a, b) => {
            return (parseInt(b.balance) - parseInt(a.balance))
        });
        this.setState({clients: newClients});
    };
    showActiveClients = () => {
        if (this.state.clients.some((c) => (c.balance < 0 && c.notVisibility === false))) {
            let newClients = [...this.state.clients];
            newClients.forEach((c, i) => {
                if (c.balance >= 0 && c.notVisibility === false) return;
                if (c.balance < 0 && c.notVisibility === true) return;
                if (c.balance < 0) {
                    let newClient = {...c};
                    newClient.notVisibility = true;
                    newClients[i] = newClient;
                }
                else {
                    let newClient = {...c};
                    newClient.notVisibility = false;
                    newClients[i] = newClient;
                }
            });
            this.setState({clients: newClients});
        }
    };
    showDebtorClients = () => {
        if (this.state.clients.some((c) => (c.balance >= 0 && c.notVisibility === false))) {
            let newClients = [...this.state.clients];
            newClients.forEach((c, i) => {
                if (c.balance < 0 && c.notVisibility === false) return;
                if (c.balance >= 0 && c.notVisibility === true) return;
                if (c.balance >= 0) {
                    let newClient = {...c};
                    newClient.notVisibility = true;
                    newClients[i] = newClient;
                }
                else {
                    let newClient = {...c};
                    newClient.notVisibility = false;
                    newClients[i] = newClient;
                }
            });
            this.setState({clients: newClients});
        }
    };

    showAllClients = () => {
        let newClients = [...this.state.clients];
        newClients.forEach((c, i) => {
            if (c.notVisibility !== false) {
                let newClient = {...c};
                newClient.notVisibility = false;
                newClients[i] = newClient;
            }
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
                        {
                            (this.state.showFioWarning) && <span className='warning'>Введите фамилию!</span>
                        }
                        <input type='text' placeholder='Баланс' ref={this.setNewClientBalanceRef}/>
                        {
                            (this.state.showBalanceWarning) && <span className='warning'>Введите число!</span>
                        }
                        <input type='button' value='Сохранить клиента' onClick={this.addClient}/>
                    </div>
                }
                <input type="button" value="Отфильтровать по балансу" onClick={this.filterByBalance}/>
                <input type="button" value="Отфильтровать активных" onClick={this.showActiveClients}/>
                <input type="button" value="Отфильтровать должников" onClick={this.showDebtorClients}/>
                <input type="button" value="Показать всех клиентов" onClick={this.showAllClients}/>
            </div>
        )
            ;

    }

}

