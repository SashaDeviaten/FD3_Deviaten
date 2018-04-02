'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import MobileBlock from './MobileBlock'
import MobileCard from "./MobileCard";

export default class ProductsBlock extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                img: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        products: this.props.products.slice(),
        activeProduct: null,
        editCard: null,
        createCard: false
    };

    productActivated = (key) => {
        this.setState({activeProduct: key});
        this.setState({editCard: null});
    };
    editCard = (key) => {
        this.setState({activeProduct: null});
        this.setState({editCard: key});
    };
    changeProduct = (key, name, price, img, count) => {
        let newProducts = this.state.products.map(function (elem) {
            if (elem.name !== key) {
                return elem
            }
            else {
                elem.name = name;
                elem.price = price;
                elem.img = img;
                elem.count = count;
                return elem
            }
        });
        this.setState({products: newProducts});
        this.setState({activeProduct: null});
        this.setState({editCard: null});

    };
    saveProduct = (name, price, img, count) => {
        let newProduct={};

        newProduct.name = name;
        newProduct.price = price;
        newProduct.img = img;
        newProduct.count = count;
        this.setState({products: this.state.products.push(newProduct)});
        this.setState({activeProduct: null});
        this.setState({editCard: null});

    };
    createProduct = () => {
        this.setState({activeProduct: null});
        this.setState({editCard: null});
        this.setState({createCard: true});
    };


    render() {
        let productsCode = this.state.products.map(elem =>
            <MobileBlock key={elem.name}
                         name={elem.name}
                         price={elem.price}
                         img={elem.img}
                         count={elem.count}
                         cbProductActivated={this.productActivated}
                         cbEditCard={this.editCard}
                         activeProduct={this.state.activeProduct}
            />
        );
        let mobileCardCode = this.state.products.map(elem =>
            <MobileCard key={elem.name}
                        name={elem.name}
                        price={elem.price}
                        img={elem.img}
                        count={elem.count}
                        ableKey={this.state.activeProduct}
                        editCard={this.state.editCard}
                        cbProductActivated={this.productActivated}
                        cbSaveProduct={this.saveProduct}

            />
        );
        let newMobileCardCode = <MobileCard
                cbProductActivated={this.productActivated}
                cbSaveProduct={this.saveProduct}

            />
        ;

        return (
            <div className='ProductsBlock'>
                <h1 className='productTitle'>{this.props.title}</h1>
                <table className='productTable'>
                    <tbody>{productsCode}</tbody>
                </table>
                <br/>
                <input type='button' value='Новый' onClick={this.createProduct}/>
                {
                    (this.state.activeProduct) && mobileCardCode
                }
                {
                    (this.state.editCard) && mobileCardCode
                }
                {
                    (this.state.createCard) && newMobileCardCode
                }

            </div>
        );
    }

}

