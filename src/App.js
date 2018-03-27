import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import axios from "axios";
import './App.css';
import './template.css';

const API_URL = "api/articleapi/getarticles";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      error: ""
    }
  }

  getApiContent() {
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

  componentDidMount() {
    this.getApiContent();
  }

  render() {

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" role="main">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Artikler fra Infotjenester</h1>
              </div>
              <ArticleList articles={this.state.articles} />
              <Footer />
            </main>
          </div>
        </div>
              
              
              
      </div>
    );
  }
}

export default App;