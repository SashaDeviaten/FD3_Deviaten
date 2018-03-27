'use strict';


let MyFilter = React.createClass({

    displayName: 'MyFilter',

    propTypes: {
        strArr: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        )
    },

    getInitialState: function () {
        return {selectArr: this.props.strArr, isSort:false};
    },

    updateSelect: function (e) {
        let newStr = e.target.value;
        let newStrArr = this.props.strArr.filter(elem => {
            return (elem.indexOf(newStr.toLowerCase()) === 0)
        });
        if (this.state.isSort) {newStrArr=newStrArr.sort()}
        this.setState({selectArr: newStrArr});
    },

    sort: function (e) {
        this.setState({isSort: e.target.checked});

        if (e.target.checked === true) {
            let sortStrArr = this.state.selectArr.sort();
            this.setState({selectArr: sortStrArr});
        }
        else {
            let event = new Event("change");
            document.querySelector('.MyFilterSearch').dispatchEvent(event);
        }
    },

    render: function () {

        let strArrCode = this.state.selectArr.map(elem =>
            React.DOM.option({key: elem, className: 'MyFilterOption'}, elem));


        return React.DOM.div({className: 'MyFilterDiv'},
            React.DOM.input({type: 'checkbox', onChange: this.sort}),
            React.DOM.input({
                id:'search',
                className: 'MyFilterSearch',
                type: 'text',
                placeholder: 'Введите строку',
                onChange: this.updateSelect
            },),
            React.DOM.br(),
            React.DOM.select({className: 'MyFilterSelect', multiple: true}, strArrCode)
        );
    },

});