import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct } from '../store/actions/projectActions';
import { MdClear } from 'react-icons/md';

function Button (props){
    for(let i=0; i<props.products.length; i++){
        if(props.product === props.products[i].id){
            return (
                <Link className="button product__button" to ="/cart">КОРЗИНА</Link>
            )
        }
    }
    return (
        <button className="button product__button" onClick = {() => {props.addProduct(props.product)}} >КУПИТЬ</button>
    )
}

    async function getProducts() {
        const response = await fetch('http://localhost:8000/products')
        .then(response => response.json());
        return response;
    }

class UpdateProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.product.name,
          price: this.props.product.price,
          article: this.props.product.article,
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.props.updateProduct(
            this.props.product.id,
            this.state.name,
            this.state.price,
            this.state.article,
            this.props.product.reviews,
            this.props.product.img,
        );
    }

    render() {
        if (!this.props.showModal) return null;
        return (
            <div className="modal">
                <button
                    className="close_modal__button"
                    onClick={this.props.closeModal}>
                        <MdClear />
                </button>
                <form 
                    className="update__form"
                    onSubmit={this.handleSubmit}
                    >
                    <div className="update__fields">
                        <div className="update_field__item">
                            <div className="update_field__name">
                                Название
                            </div>
                            <input
                                className="input__field"
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="update_field__item">
                            <div className="update_field__name">
                                Цена
                            </div>
                            <input
                                className="input__field"
                                name="price"
                                type="number"
                                value={this.state.price}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="update_field__item">
                            <div className="update_field__name">
                                Описание
                            </div>
                            <textarea
                                className="input__field input_textarea__field"
                                name="article"
                                type="text"
                                value={this.state.article}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <input className="button" type="submit" value="Изменить" />
                </form>
            </div>
        );
    }
}

class Product extends React.Component {
    state = {
        showModal: false,
        productID: null,
    };
    constructor(props) {
        super(props);
        this.updateProduct = this.updateProduct.bind(this);
    } 

        async updateProducts() {
            const products = await getProducts();
            this.setState({
                products
            });
        }

    async removeProduct(productId) {
        await fetch(`http://localhost:8000/products/${productId}`, {
            method: 'DELETE'
        })
        await this.updateProducts();
    }

    async updateProduct(id, name, price, article, reviews, img) {
        console.log('updateProduct');
        console.log(this.props);
        await fetch(`http://localhost:8000/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                name,
                price,
                article,
                reviews,
                img,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        // console.log(this.props.match);
        .then(() => {
            // this.props.history.push(this.props.match.url)
            // window.location.reload();
            this.setState({showModal: false});
            this.updateProducts();
            
        });
    }
    
    async componentDidMount() {
        this.setState({
            productID: parseInt(this.props.match.params.id)
        });
        await this.updateProducts();
    }
    render() {
        if (!this.state || !this.state.products) return null;
        console.log(this.props);
        let product = null;
        const productID = this.state.productID;
        for(let i=0; i<this.state.products.length; i++){
            if(productID === this.state.products[i].id){
                product = this.state.products[i];
            }
        }
        console.log(productID);
        console.log(this.state.products);
        console.log(product);
        if (!product) return null;
        return(
            <div className="product__page">
                <div className = "product__page__container" key={productID}>
                    <img  className ="product__page__img" src={product.img} />
                    <div className = "product__page__description">
                        <div className = "product__name">
                            {product.name}
                        </div>
                        <div className = "product__price">
                            {product.price}
                            <span className="product__currency">₸</span>
                        </div>
                        <div className = "product__artice">
                            {product.article}
                        </div>
                        <Button addProduct = {this.props.addProduct} product={product.id} products={this.props.products} />
                    </div>
                    <div className="reviews">
                        {product.reviews.map(review => (
                            <div className="review__item">
                                {review.text}
                                {review.rating}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="button product_delete__button"
                    onClick={
                        () => {
                            this.removeProduct(product.id);
                            this.props.history.push('/');
                        }
                    }>
                    DELETE
                </button>
                <button
                    className="button product__edit__button"
                    onClick={
                        () => {
                            this.setState({
                                showModal: true
                            });
                        }
                        }>
                    EDIT
                </button>
                <UpdateProductModal
                    showModal={this.state.showModal}
                    product={product}
                    closeModal={() => {
                        this.setState({
                            showModal: false
                        })
                    }}
                    updateProduct={this.updateProduct}
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        products: state.cart.list
    }
}

export default connect(mapStateToProps, {addProduct})(Product);