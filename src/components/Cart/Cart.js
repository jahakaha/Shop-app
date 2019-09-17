import React, { Component, Text } from 'react';
import { connect } from 'react-redux';
import { removeProduct, decreaseAmount, changeAmount, addProduct } from '../store/actions/projectActions';
import { Link } from 'react-router-dom';

async function getProducts() {
    const response = await fetch('http://localhost:8000/products')
      .then(response => response.json());
    return response;
}

class Cart extends React.Component {
    async componentDidMount() {
        const products = await getProducts();
        this.setState({
            products
        });
    }
    findProduct(productId) {
        const product = this.state.products.find(function (el) {
            return el.id === productId;
        })
        return product;
    }
    render() {
        // console.log(this.props.list);
        if (!this.state || !this.state.products) return null;
        return (
                <div className = "cart__container">
                    <div>{this.props.list.map(product => {
                        const productObject = this.findProduct(product.id);
                        let productCounter = "";
                        if(product.amount > 1){
                            productCounter = ` x${product.amount}`;
                        }
                        
                        return(
                            <div className = "cart__item_container">
                                <div className = "left">
                                    <img className = "cart_item__image"  src = {productObject.img} />
                                    <div className = "cart_description">
                                        <Link className = "product__name" to={`/product/${productObject.id}`}>
                                            {productObject.name}
                                        </Link>
                                        <div className = "product__price">
                                            {productObject.price}
                                            <span className="product__currency">₸</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* <input className = "" type = "text" onChange = {(e) => {props.changeAmount(product.id, e.target.value)}} /> */}
                                <div className = "cart__buttons">
                                    <div className = "button__counter__container">
                                        <button className="button__decrease" onClick = {() => {this.props.decreaseAmount(product.id)}}>--</button>
                                        <div className ="cart__counter__space">
                                            {productCounter}
                                        </div>
                                        <button className = "button__increase" onClick = {() => {this.props.addProduct(product.id)}}>+</button>
                                    </div>
                                    <button className = "remove__button" onClick = {() => {this.props.removeProduct(product.id)}} >УДАЛИТЬ</button>
                                </div>
                            </div>
                        )
                    })}</div>
                </div>
            )
    }
}
function mapStateToProps(state) {
    return {
        list: state.cart.list
    }
}

export default connect (
    mapStateToProps,
    {   
        removeProduct,
        decreaseAmount,
        changeAmount,
        addProduct
    }
    )(Cart);    