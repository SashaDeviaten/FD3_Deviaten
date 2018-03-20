'use strict';

let MobileBlock = React.createClass({

    displayName: 'MobileBlock',

    propTypes: {
        title: React.PropTypes.string.isRequired,
        products: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                img: React.PropTypes.string.isRequired,
                count: React.PropTypes.number.isRequired,
            })
        )
    },

    render: function () {

        let productsCode = this.props.products.map(elem =>
            React.DOM.tr({key: elem.name, className: 'products'},
                React.DOM.td({className: 'productsImg'},
                    React.DOM.img({src:`images/${elem.img}`},)
                ),
                React.DOM.td({className: 'productsName'}, elem.name),
                React.DOM.td({className: 'productsPrice'}, `${elem.price} BYN`),

                React.DOM.td({className: 'productsCount'}, `осталось ${elem.count} шт.`),
            )
        );
        return React.DOM.div({className: 'MobileBlock'},
            React.DOM.h1({className: 'productTitle'}, this.props.title),
            React.DOM.table({className: 'productTable'}, productsCode),
        );
    },

});