import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Btn from "../../components/Btn";

class Saved extends Component {
    state = {
        books: [],
        target: "",
        empty: false
    };

    componentDidMount(){
        this.getSaved();
    }

    getSaved = () => {
        API.getSaved()
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    books: res.data,
                    target: "_blank"
                });
            } else {
                this.setState({
                    empty: true
                });
            }
        }).catch(err => console.log(err))
    }
    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.getSaved())
          .catch(err => console.log(err));
      };

      render() {
          if (this.state.empty){
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

                      </Container>
                  </div>
              )
          }
      }
}