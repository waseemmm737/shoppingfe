import React, { Component } from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { Alert } from 'reactstrap';
import axios from 'axios'

export default class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      counter: 0,
      show:false
    };
    this.componentDidMount=this.componentDidMount.bind(this);
  }
  addInCart = product => {
    this.setState({show:true})
    let index = this.state.products.findIndex(p => p === product);
    let temp = this.state.products[index];
    let newProducts = [...this.state.products];
    newProducts[index] = { ...product, selected: true,count:temp.count+1 };
    this.setState({ products: newProducts ,counter:this.state.counter+1});
    setTimeout(()=>{
      this.setState({show:false})

    },1000)
  };
  componentDidMount(){
    axios.get('http://localhost:5000/prohub/getProducts')
    .then(response => {
      this.setState({products:response.data})
    });
  }

  render() {
    return (
      <div>
        {/* {this.state.counter} */}
        {this.state.show &&
                <Alert color="success">
                  Successfully Added
                </Alert>}
        <div style={{
          marginTop: '30px',
          }}
          className="row">
          {this.state.products.map(product => (
            (product.name.toLowerCase().includes(this.props.filter.toLowerCase()) || 
            this.props.filter.toLowerCase()==='') &&
            <div className="col-sm-6">
              <div class="card">
                <img
                  src={
                  product.pic}
                  class="card-img-top" alt="..." />
                  <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <button
                    href="#"
                    class="btn btn-primary"
                    onClick={() => this.addInCart(product)}>

                    Add To Cart < FaCartArrowDown/>
                  </button>

                  {product.selected && (
                    <button type="button" class="btn btn-secondary">
                      Added <span class="badge badge-light">{product.count}</span>
                    </button>
                  )}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
