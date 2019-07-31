import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";

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
                      <h2>Saved Books</h2>
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <div className="date-div">
                  <a
                    key={book._id + "link"}
                    href={book.link}
                    target={this.state.target}
                  >
                    {book.title}
                  </a>
                  <p>Written By {book.author}</p>
                  <p>
                  <img align="left" style={{paddingRight:10}}
                    src={book.image} alt="new"
                  />
                    {book.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <DeleteBtn
                    key={book._id + "btn"}
                    btntype="info"
                    id={book._id}
                    disabled={book.link === "/"}
                    onClick={() => this.deleteBook(book._id)}
                  >
                    ✗
                </DeleteBtn>
                </div>
              </ListItem>
            ))}
          </List>
                      </Container>
                  </div>
              );
          }
      }
}

export default Saved;
