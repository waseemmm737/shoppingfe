import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaCartArrowDown, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Product from "./Product";
import { serverURL } from "./constants";
import Axios from "axios";
import { Modal, ModalBody, Form, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Input } from "reactstrap";

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            counter: 0,
            total: 0,
            show: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    addInCart = (product, index) => {
        this.setState({ show: true });
        let temp = this.state.products[index];
        let newProducts = [...this.state.products];
        newProducts[index] = { ...product, selected: true, count: temp.count + 1 };
        this.setState(
            {
                products: newProducts,
                counter: this.state.counter + 1,
                total: this.state.total + product.price,
            },
            () => {
                this.props.crt(this.state.counter);
                let tt = [];
                for (let i = 0; i < this.state.products.length; i++)
                    if (this.state.products[i].count !== 0) {
                        tt.push(this.state.products[i]);
                    }
                this.props.products(tt);
            }
        );
        toast.success("Added to cart")
    };

    componentDidMount() {
        axios.get(serverURL + "/getProducts").then((response) => {
            this.setState({
                products: response.data,
            });
        });
    }
    handler = (event) => {
        this.setState({ [event.target.name]: event.target.value.toLowerCase() });
    };
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <Router>
                <div style={{ marginTop: "20px" }}>
                    <Slider {...settings}>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/DgjYvHS/vegitable.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/1KcttYP/food.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/YQgbCCB/sushi.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/DgjYvHS/vegitable.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/1KcttYP/food.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/YQgbCCB/sushi.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/DgjYvHS/vegitable.jpg"}
                            />
                        </div>
                        <div>
                            <img
                                style={{ borderRadius: "10px", width: "100%", height: "350px" }}
                                alt="slider-img"
                                src={"https://i.ibb.co/1KcttYP/food.jpg"}
                            />
                        </div>
                    </Slider>
                </div>
                <div style={{ marginTop: "6%" }}>
                    <div
                        className="row"
                        style={{
                            marginTop: "30px",
                        }}
                    >
                        {this.state.products.map(
                            (product, index) => {
                                product.count = product.count ? product.count : 0
                                return (product.name
                                    .toLowerCase()
                                    .includes(this.props.filter.toLowerCase()) ||
                                    this.props.filter.toLowerCase() === "") && (
                                        <div className="col-sm-3">
                                            <div class="card">
                                                <Link to="/product">
                                                    <img src={product.pic} class="card-img-top" alt="..." />
                                                </Link>

                                                <div class="card-body">
                                                    <h5 class="card-title">{product.name}</h5>
                                                    <h6> EUR. {product.price}/- </h6>
                                                    <p style={{ fontSize: "14px" }}> {product.desc} </p>

                                                    <button
                                                        disabled={product.count === 1}
                                                        class="btn btn-success"
                                                        onClick={() => {
                                                            this.addInCart(product, index);
                                                        }}
                                                    >
                                                        <FaCartArrowDown />
                                                    </button>
                                                    {" "}
                                                    <button
                                                        class="btn btn-danger"
                                                        onClick={() => {
                                                            Axios.delete(serverURL + "/deleteProduct/" + product._id)
                                                                .then((res) => { alert("success"); this.componentDidMount() })
                                                                .catch((err) => alert(err));
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                    {" "}
                                                    <button
                                                        class="btn btn-warning"
                                                        onClick={() => this.setState({ showModal: true,...product })}
                                                    >
                                                        
                                                        <FaEdit />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            })}
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
                        Update Product
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Input
                                type="text"
                                name="name"
                                onChange={this.handler}
                                value={this.state.name}
                                placeholder="Product Name"
                            />
                            <Input
                                type="number"
                                name="price"
                                onChange={this.handler}
                                value={this.state.price}
                                placeholder="price"
                            />
                            <Input
                                type="textarea"
                                name="desc"
                                onChange={this.handler}
                                value={this.state.desc}
                                placeholder="Description"
                            />
                            <Input
                                type="text"
                                name="pic"
                                onChange={this.handler}
                                value={this.state.pic}
                                placeholder="Image URL"
                            />
                        </Form>
                        <Button
                            onClick={() => {
                                Axios.post(serverURL + "/updateProduct/"+this.state._id, { ...this.state, products: null })
                                    .then((res) => { alert("success"); this.componentDidMount() })
                                    .catch((err) => alert(err));
                            }}
                        >
                            Update
        </Button>
                    </ModalBody>

                </Modal>

                <div className="container">
                    <Switch>
                        <Route path="/product">
                            <Product />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
