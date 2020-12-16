import Axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
export default class AddProduct extends Component {
  state = { count: 0 };
  handler = (event) => {
    this.setState({ [event.target.name]: event.target.value.toLowerCase() });
  };
  render() {
    return (
      <>
        <h1>Add Product</h1>
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
            if (this.validURL(this.state.pic)) {
              Axios.post("http://localhost:5000/prohub/addProduct", this.state)
                .then((res) => alert("success"))
                .catch((err) => alert(err));
            } else {
              alert("Invalid Product Data")
            }
          }}
        >
          Add
        </Button>
      </>
    );
  }
  validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };
}
