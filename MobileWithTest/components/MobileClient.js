import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

export default class MobileClient extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fio: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        }),
        cbDeleteClient: PropTypes.func.isRequired,
        cbChangeClientFio: PropTypes.func.isRequired,
        cbChangeClientBalance: PropTypes.func.isRequired
    };

    state = {
        info: this.props.info,
        showButtons: false,
        showFioInput: false,
        showBalanceInput: false,
    };

    componentWillReceiveProps = (newProps) => {
        this.setState({info: newProps.info});
    };

    showButtons = () => {
        this.setState({showButtons: !this.state.showButtons})
    };

    deleteClient = () => {
        this.props.cbDeleteClient(this.state.info.id)
    };

    changeFio = () => {
        this.setState({showFioWarning: false});
        if (this.newFioRef.value === '') {
            this.setState({showFioWarning: true});
            return
        }
        this.setState({showFioInput: false});
        let newFio = this.newFioRef.value;
        this.props.cbChangeClientFio(this.state.info.id, newFio)
    };

    changeBalance = () => {
        this.setState({showBalanceWarning: false});
        let regexNum = new RegExp(/^-?\d+$/);
        if (!(this.newBalanceRef.value.match(regexNum))) {
            this.setState({showBalanceWarning: true});
            return
        }
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
            (!this.state.info.notVisibility) &&
            <div className='MobileClient'>

                <div>
                    <span className='MobileClientFIO' onClick={this.showButtons}>{this.state.info.fio}</span>
                    <span className='MobileClientBalance'>{this.state.info.balance}</span>
                </div>

                {
                    (this.state.showButtons) && <div>
                        <input type='button' value='Удалить' onClick={this.deleteClient}/>
                        <input type='button' value='Изменить фамилию' onClick={this.showFioInput}/>
                        <input type='button' value='Изменить баланс' onClick={this.showBalanceInput}/>
                        <input type='button' value='Скрыть кнопки изменений' onClick={this.showButtons}/>
                    </div>
                }
                {
                    (this.state.showFioInput) && <div>
                        <input type='text' placeholder='Измененные ФИО' ref={this.setNewFioRef}/>
                        {
                            (this.state.showFioWarning) && <span className='warning'>Введите фамилию!</span>
                        }
                        <input type='button' value='Сохранить изменение' onClick={this.changeFio}/>
                    </div>
                }
                {
                    (this.state.showBalanceInput) && <div>
                        <input type='text' placeholder='Измененный баланс' ref={this.setNewBalanceRef}/>
                        {
                            (this.state.showBalanceWarning) && <span className='warning'>Введите число!</span>
                        }
                        <input type='button' value='Сохранить изменение' onClick={this.changeBalance}/>

                    </div>
                }
            </div>
        );

    }

}

