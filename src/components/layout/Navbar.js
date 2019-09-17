import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { connect} from 'react-redux';
import {products} from '../../Products'


async function getProducts() {
    const response = await fetch('http://localhost:8000/products')
      .then(response => response.json());
    return response;
}


class Popup extends React.Component {
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
        if (!this.state || !this.state.products || !this.props.products.length) return null;
        return(
            <div className = "popup" onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
            {
                this.props.products.map(product =>{
                    let productObject = this.findProduct(product.id)
                    return(
                        <div className = "popup__item" key={productObject.id}>
                            <img  className ="popup__img" src={productObject.img} />
                            <div className = "popup__description">
                                <Link className = "popup__product__name" to={`/product/${productObject.id}`}>
                                    {productObject.name}
                                </Link>
                                <div className = "popup__product__price">
                                    {productObject.price}
                                    <span className="popup__product__currency">₸</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

class Navbar extends React.Component {
    state = {
        hover: false,
        popupHover: false,
    };

    render() {
        const cartBubble = this.props.products.length ? (
            <div class="cartBubble">
                <div class="cartBubbleNumber">
                    {this.props.products.length}
                </div>
            </div>
        ) : null;

        // console.log(this.state);

        return (
            <nav className = "header">
                <Link to = "/" className = "brand-logo">SHOPSHOP</Link>
                <ul class="rightHeader">
                    <Link
                        className="cart"
                        to="/cart"
                        onMouseEnter={()=>{this.setState({hover: true})}}
                        onMouseLeave={()=>{this.setState({hover: false})}}
                    >
                        <div className="cartImageContainer">
                            <img className="cartImage" src="/shopping-cart.svg" />
                            {cartBubble}
                        </-div>  -+
                    </Link>
                    <SignedInLinks />
                    <SignedOutLinks />
                    {
                        this.state.hover || this.state.popupHover ?
                            <Popup
                                products = {this.props.products}
                                onMouseEnter = {() => this.setState({popupHover: true})}
                                onMouseLeave = {() => this.setState({popupHover: false})}
                            />
                        : null
                    }
                </ul>
            </nav>
        )
    }
}
function mapStateToProps(state) {
    return {
        products: state.cart.list
    }
}
export default connect(mapStateToProps)(Navbar);