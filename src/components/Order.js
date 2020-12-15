import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

export default class Order extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.pro)
  }

  render() {
    var total = 0;
    return (
      <Router>
        <div>
          <h1>Ordered Items</h1>
          <div className="row">
            <div className="col-sm-12">
              <div className="row"
              style={{
                  marginTop: '30px'
              }}>
                {this.props.pro && this.props.pro.map(product => (
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <div class="card">
                          <div className="row">
                            <div className="col-sm-3">
                              <Link to="/product">
                                <img style={{
                                  borderRadius: '6px',
                                  height: '120px'
                                }}
                                  src={
                                    product.pic}
                                  class="card-img-top" alt="..." />
                              </Link>
                            </div>
                            <div className="col-sm-9">
                              <div class="card-body">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h4>{product.name}</h4>
                                    <p> Rs. {product.price}/- </p>
                                  </div>
                                  <div className="col-sm-5">
                                    <h5 style={{
                                      paddingLeft: '30px'
                                    }}> Quantity </h5>

                                    {product.selected && (
                                      <button class="btn btn-secondary"
                                        style={{
                                          marginLeft: '5px',
                                          marginRight: '5px'
                                        }}>
                                        <span style={{
                                          fontSize: '16px'
                                        }}
                                          class="badge badge-light"> {product.count} items</span>
                                      </button>
                                    )}
                                  </div>
                                  <div className="col-sm-3">
                                    <button style={{ width: '100px' }}
                                      type="button" class="btn btn-outline-success">
                                          Placed
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <p> </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div class="card-body">
              <Link to="#">
                {(total > 0) && (
                  <button type="button" class="btn btn-outline-info">
                    Continue Shopping
                </button>
                )}
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="container">
        <Switch>
          <Route path="/">
            <Card />
          </Route>
        </Switch>
      </div> */}
      </Router>
    );
  }
}