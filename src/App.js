import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import axios from "axios";

const API_URL = "api/articleapi/getarticles"

class App extends Component {
  state = {
    articles: [],
    error: ""
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then(response => {

        const newArticles = response.data.map(c => {
          return {
            id: c.articleid,
            title: c.articletitle,
            ingress: c.articleingress,
            date: c.articledate,
            url: c.articleurl,
            image: c.articleimage,
            tag: c.articletag
          };
        });

        const newState = Object.assign({}, this.state, {
          articles: newArticles
        });

        this.setState(newState);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          articles: [],
          error: error
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default App;