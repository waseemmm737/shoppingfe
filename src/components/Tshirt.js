import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { Alert } from 'reactstrap';
import axios from 'axios'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Product from './Product';
import { serverURL } from './constants';

export default class Tshirt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      show: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  addInCart = product => {
    this.setState({ show: true })
    let index = this.state.products.findIndex(p => p === product);
    let temp = this.state.products[index];
    let newProducts = [...this.state.products];
    newProducts[index] = { ...product, selected: true, count: temp.count + 1 };
    this.setState({
      products: newProducts,
      counter: this.state.counter + 1,
      total: this.state.total + product.price
    }, () => {
      this.props.crt(this.state.counter)
      let tt = []
      for (let i = 0; i < this.state.products.length; i++)
        if (this.state.products[i].count !== 0) {
          tt.push(this.state.products[i])
        }
      this.props.products(tt);
    });
  };

  componentDidMount() {
    axios.get(serverURL+'/getProducts')
      .then(response => {
        this.setState({ products: response.data })
      });
  }

  render() {
    return (
      <Router>
        <div>
          <div style={{ marginTop: "30px" }} className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <h2 style={{ textAlign: 'center' }}>T-Shirts</h2>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            {this.state.products.map(product => (
              (product.cat === 'a') &&
              <div className="col-sm-3">
                <div class="card">

                  <Link to="/product">
                    <img
                      src={
                        product.pic}
                      class="card-img-top" alt="..." />
                  </Link>

                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <h6> EUR. {product.price}/- </h6>
                    <button disabled={product.count === 1}
                      class="btn btn-primary"
                      onClick={() => {
                        this.addInCart(product)
                      }}>
                      Add To Cart < FaCartArrowDown />
                    </button>
                    {product.selected && (
                      <Alert color="success">
                        Successfully Added
                      </Alert>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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