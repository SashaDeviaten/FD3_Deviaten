import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

export default class MobileClient extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fio: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
        cbDeleteClient: PropTypes.func.isRequired,
        cbChangeClientFio: PropTypes.func.isRequired,
        cbChangeClientBalance: PropTypes.func.isRequired

    };

    state = {
        info: {...this.props.info},
        showButtons: false,
        showFioInput: false,
        showBalanceInput: false,
    };

    showButtons = () => {
        this.setState({showButtons: !this.state.showButtons})
    };

    deleteClient = () => {
        this.props.cbDeleteClient(this.state.info.id)
    };

    changeFio = () => {
        this.setState({showFioInput: false});
        if (this.newFioRef) {
            let newFio = this.newFioRef.value;
            this.props.cbChangeClientFio(this.state.info.id, newFio)
        }
    };

    changeBalance = () => {
        this.setState({showBalanceInput: false});
        if (this.newBalanceRef) {
            let newBalance = this.newBalanceRef.value;
            this.props.cbChangeClientBalance(this.state.info.id, newBalance)
        }
    };

    showFioInput = () => {
        this.showButtons();
        this.setState({showFioInput: true})
    };

    showBalanceInput = () => {
        this.showButtons();
        this.setState({showBalanceInput: true})
    };

    setNewFioRef = (ref) => {
        this.newFioRef = ref;
    };

    setNewBalanceRef = (ref) => {
        this.newBalanceRef = ref;
    };

    render() {

        console.log("MobileClient id=" + this.state.info.id + " render");

        return (
            <div className='MobileClient'>
                <div>
                    <span className='MobileClientFIO' onClick={this.showButtons}>{this.props.info.fio}</span>
                    <span className='MobileClientBalance'>{this.props.info.balance}</span>
                </div>
                {
                    (this.state.showButtons) && <div>
                        <input type='button' value='Удалить' onClick={this.deleteClient}/>
                        <input type='button' value='Изменить фамилию' onClick={this.showFioInput}/>
                        <input type='button' value='Изменить баланс' onClick={this.showBalanceInput}/>
                        <input type='button' value='Скрыть панель изменений' onClick={this.showButtons}/>
                    </div>
                }
                {
                    (this.state.showFioInput) && <div>
                        <input type='text' placeholder='Измененные ФИО' ref={this.setNewFioRef}/>
                        <input type='button' value='Сохранить изменение' onClick={this.changeFio}/>
                    </div>
                }
                {
                    (this.state.showBalanceInput) && <div>
                        <input type='text' placeholder='Измененный баланс' ref={this.setNewBalanceRef}/>
                        <input type='button' value='Сохранить изменение' onClick={this.changeBalance}/>
                    </div>
                }
            </div>
        );

    }

}

