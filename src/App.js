import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./App.css";
import Avatar from "react-avatar";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaSearch,
  FaSignInAlt,
  FaShoppingCart,
  FaLinkedin,
  FaGooglePlus,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

import { Switch, Route, Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

import Card from "./components/Home";
import About from "./components/About";
import Cartproducts from "./components/Cartproducts";
import Tshirt from "./components/Tshirt";
import Checkshirt from "./components/Checkshirt";
import Bcard from "./components/Bcard";
import Order from "./components/Order";
import AddProduct from "./components/AddProduct";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchK: "",
      count: "0",
      total: "0",
      cp: [],
    };
  }

  setCounter = (e) => {
    this.setState({ count: e });
  };

  getProducts = (p) => {
    this.setState({ cp: p });
  };

  removeProduct = (p, c) => {
    this.setState({ cp: p, count: this.state.count - c });
  };

  addOrderProduct = (p) => {
    this.setState({ cp: p, count: this.state.count + 1 });
  };

  addProduct = (p) => {
    this.setState({ cp: p, count: this.state.count + 1 });
  };

  subProduct = (p) => {
    this.setState({ cp: p, count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Link to="/">
            <img
              style={{ margin: "10px" }}
              alt="prohub"
              src={"prohub_logo.png"}
            />
          </Link>
          <div
            style={{
              marginLeft: "20%",
              width: "100%",
            }}
          >
            <Form
              inline
              onSubmit={(e) => {
                e.preventDefault();
                this.setState({ searchK: this.state.search });
              }}
            >
              <FormControl
                style={{
                  margin: "2px",
                  width: "40%",
                }}
                type="text"
                placeholder="Search"
                className="my-sm-2"
                value={this.state.search}
                onChange={(v) => {
                  this.setState({ search: v.target.value });
                }}
              />

              <Button
                onClick={() => {
                  this.setState({ searchK: this.state.search });
                }}
              >
                <FaSearch />
              </Button>

              <Link
                to="/Cartproducts"
                style={{
                  color: "yellow",
                  paddingRight: "50px",
                  marginLeft: "22%",
                }}
              >
                <h2>
                  {" "}
                  <FaShoppingCart />
                </h2>
              </Link>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "30px",
                  marginLeft: "-50px",
                  marginRight: "40px",
                  background: "blue",
                  color: "white",
                  marginTop: "35px",
                }}
              >
                {this.state.count}
              </p>
            </Form>
          </div>
        </Navbar>
        <Navbar bg="light" expand="lg">
          <NavDropdown
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
            title="Categories"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>
              <Link to="/"> All Items </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/Tshirt"> T-Shirt </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/Bcard"> Business Cards </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/Checkshirt"> Check Shirts </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Navbar.Collapse id="basic-navbar-nav">
            <div class="nav-items">
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link to="/"> Home </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/about"> About </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/addProduct">Add Product</Link>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Switch>
            <Route path="/Cartproducts">
              <Cartproducts
                pro={this.state.cp}
                remove={this.removeProduct}
                add={this.addProduct}
                sub={this.subProduct}
              />
            </Route>

            <Route path="/Tshirt">
              <Tshirt
                filter={this.state.searchK}
                crt={this.setCounter}
                products={this.getProducts}
              />
            </Route>

            <Route path="/checkshirt">
              <Checkshirt
                filter={this.state.searchK}
                crt={this.setCounter}
                products={this.getProducts}
              />
            </Route>

            <Route path="/bcard">
              <Bcard
                filter={this.state.searchK}
                crt={this.setCounter}
                products={this.getProducts}
              />
            </Route>

            <Route path="/addProduct">
              <AddProduct />
            </Route>

            <Route path="/order">
              <Order pro={this.state.cp} add={this.addOrderProduct} />
            </Route>

            <Route exact path="/">
              <Card
                filter={this.state.searchK}
                crt={this.setCounter}
                products={this.getProducts}
              />
            </Route>

            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
        <div style={{ paddingTop: "3%" }}>
          <MDBFooter className="footer">
            <div className="footer-copyright text-center py-3">
              <MDBContainer>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a href="https://www.prohubdesigns.com"> ProhubDesigns.com </a>
              </MDBContainer>
            </div>
          </MDBFooter>
        </div>
      </div>
    );
  }
}
