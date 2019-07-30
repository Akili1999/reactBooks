import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
    state = {
        title: "",
        pushResults: false,
        results: []
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title) {
            var title = this.state.title.trim()
          API.getBook(title)
            .then(res => {
                console.log(res.data.items);
                this.setState({
                    pushResults: true,
                    results: res.data.items
                })
            })
            .catch(err => console.log(err));
        }
      };

      render() {
          if (this.state.pushResults) {
              return <Redirect to={{
                  pathname: "/results",
                  data: { results: this.state.results }
              }} />
          }
          return (
            <div>
              <Jumbotron>
                <h1 className="display-4">Google Books Searcher</h1>
                <hr className="my-4" />
                <p className="lead">
                  <Link className="btn btn-default btn-lg" to="/" role="button">Search</Link>
                  <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved</Link>
                </p>
              </Jumbotron>
              <Container>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    label="Book Title"
                    placeholder="Search Book Title (required)"
                  />
                  <FormBtn         
                    onClick={this.handleFormSubmit}
                    className="btn btn-info"
                  >
                    Search
                  </FormBtn>
                </form>
              </Container>
            </div>
          );
      }

}

export default Books;