import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/actions/projectActions'
import { Link } from 'react-router-dom';
import "../../All.css";
import { MdClear } from 'react-icons/md';


async function getProducts() {
    const response = await fetch('http://localhost:8000/products')
    .then(response => response.json());
    return response;
}

class CreateProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            article: "",
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
        await this.props.createProduct(
            this.state.name,
            this.state.price,
            this.state.article,
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
                    <input className="button" type="submit" value="Создать" />
                </form>
            </div>
        );
    }
}


function Button (props){
    for(let i=0; i<props.products.length; i++){
        if(props.product === props.products[i].id){
            return (
                <Link className="button product__button" to ="/cart">КОРЗИНА</Link>
            )
        }
    }
    return (
        <button className="button product__button" onClick = {() => {console.log('ook'); props.addProduct(props.product)}} >КУПИТЬ</button>
    )
}

class Dashboard extends React.Component {
    state = {
        showModal: false,
        productID: null,
    };
    constructor(props) {
        super(props);
        this.createProduct = this.createProduct.bind(this);
    } 
    async updateProducts() {
        const products = await getProducts();
        this.setState({
            products
        });
    }

    async componentDidMount() {
        console.log('componentDidMount');
        const products = await getProducts();
        console.log(`products: ${products}`);
        this.setState({
            products
        });
    }

    async createProduct(name, price, article) {
        await fetch(`http://localhost:8000/products`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                article,
                reviews: [],
                img: "/productsImage/0.jpg",
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
        await this.updateProducts();
    }

    render() {
        // console.log('render');
        if (!this.state || !this.state.products) return null;
        // console.log(this.state);    
        
        return(
            <div className="dashboard__page">
                <div className = "dashboard__container">
                    {
                        this.state.products.map(product =>{
                            return(
                            <div className = "product__container" key={product.id}>
                                    <img  className ="product__img" src={product.img} />
                                    <div className = "product__description">
                                        <Link className = "product__name" to={`/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                        <div className = "product__price">
                                            {product.price}
                                            <span className="product__currency">₸</span>
                                        </div>
                                        <Button addProduct = {this.props.addProduct} product={product.id} products={this.props.products} />
                                    </div>
                                </div> 
                            )
                        })
                    }
                </div>
                <button 
                    className = "product__create__button"
                    onClick = {
                        () => {
                            this.setState({
                                showModal: true,
                            })
                        }
                    }>
                        СОЗДАТЬ
                </button >   
                <CreateProductModal
                    showModal = {this.state.showModal}
                    closeModal = {() => {
                        this.setState({
                            showModal: false,
                        })
                    }}
                    createProduct = {this.createProduct}
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

export default connect(mapStateToProps, {addProduct})(Dashboard);