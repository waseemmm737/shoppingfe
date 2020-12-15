import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { IoMdRemove } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import {
  Link,
} from "react-router-dom";

export default class Cartproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    console.log(this.props.pro)
  }

  removePro = (p) => {
    let data = this.props.pro;
    let index = data.indexOf(p);
    let count = data[index].count
    if (index !== -1) data.splice(index, 1);
    console.log(data)
    this.props.remove(data, count);

    setTimeout(() => {
      this.setState({ show: false })

    }, 1000)
  }
  addPro = (p) => {
    let data = this.props.pro;
    var index = data.indexOf(p);
    data[index].count = data[index].count + 1;
    console.log(data)
    this.props.add(data);
  }

  subPro = (p) => {
    let data = this.props.pro;
    var index = data.indexOf(p);
    if (data[index].count > 1)
      data[index].count = data[index].count - 1;
    else
      this.removePro(p);
    console.log(data)
    this.props.sub(data);
  }

  render() {
    var total = 0;
    return (
      <div>
        <h1>Your Cart Items</h1>
        {this.state.show &&
          <Alert color="success">
            Order Successfully Placed
            </Alert>}
        <div className="row">
          <div className="col-sm-8">
            <div style={{
              marginTop: '30px',
            }}
              className="row">
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

                                  <Button onClick={() => this.subPro(product)}
                                    variant="outline-warning">
                                    <IoMdRemove />
                                  </Button>
                                  {product.selected && (
                                    <Button variant="secondary"
                                      style={{
                                        marginLeft: '5px',
                                        marginRight: '5px'
                                      }}>
                                      <span style={{
                                        fontSize: '16px'
                                      }}
                                        class="badge badge-light"> {product.count} </span>
                                    </Button>
                                  )}
                                  <Button disabled={product.stock === product.count}
                                    onClick={() => this.addPro(product)}
                                    variant="outline-success">
                                    <IoMdAdd />
                                  </Button>

                                  <p style={{
                                    fontSize: '14px',
                                    marginBottom: '-10px'
                                  }}> Items in stock: {product.stock} </p>
                                </div>
                                <div className="col-sm-3">
                                  <Link to="/order">
                                    <Button style={{ width: '100px' }}
                                      variant="success">
                                      <FaPaperPlane /> Order
                                      </Button>
                                  </Link>
                                  <Button style={{ width: '100px', marginTop: '5px' }}
                                    onClick={() => this.removePro(product)}
                                    variant="danger">
                                    <MdDelete /> Delete
                                    </Button>
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
          <div style={{ marginTop: '30px' }}
            className="col-sm-4">
            {this.props.pro && this.props.pro.map(product => (
              <div class="card">
                <div class="card-body">
                  <h3> Items:</h3>

                  <p> {product.name}  ----- x{product.count}  ----- ={product.count * product.price}</p>
                  <h5> Total Bill: {(product.bill = product.count * product.price),
                    (total = product.bill + total)} </h5>
                </div>
              </div>
            ))}
          </div>
          <div class="card-body">
            <Link to="/">
              {(total > 0) && (
                <button type="button" class="btn btn-outline-info">
                  Continue Shopping
                </button>)}
            </Link>

            <Link to="/">
              {(total === 0) && (
                <Button type="button" variant="btn btn-outline-info">
                  Cart is Empty! Go for Shopping
                </Button>)}
            </Link>
          </div>
        </div>
      </div>

    );
  }
}
