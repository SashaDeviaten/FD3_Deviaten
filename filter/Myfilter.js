'use strict';


let MyFilter = React.createClass({

    displayName: 'MyFilter',

    propTypes: {
        strArr: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        )
    },

    getInitialState: function () {
        return {selectArr: this.props.strArr,searchValue:'', isSort:false };
    },

    updateSelect: function () {
        let newStr = this.state.searchValue;
        let newStrArr = this.props.strArr.filter(elem => {
            return (elem.indexOf(newStr.toLowerCase()) === 0)
        });

        if (this.state.isSort) {
            newStrArr = newStrArr.sort()
        }
        this.setState({selectArr: newStrArr});
    },

    getSearchValue: function (e) {
        this.setState({searchValue: e.target.value},this.updateSelect());

    },

    sort: function (e) {

        this.setState( {isSort: e.target.checked},this.updateSelect());

    },

    render: function () {
        let strArrCode = this.state.selectArr.map(elem =>
            React.DOM.option({key: elem, className: 'MyFilterOption'}, elem));


        return React.DOM.div({className: 'MyFilterDiv'},
            React.DOM.input({type: 'checkbox', onChange: this.sort}),
            React.DOM.input({
                id: 'search',
                className: 'MyFilterSearch',
                type: 'text',
                placeholder: 'Введите строку',
                onChange: this.getSearchValue
            },),
            React.DOM.br(),
            React.DOM.select({className: 'MyFilterSelect', multiple: true}, strArrCode)
        );
    },

});