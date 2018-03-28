import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
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
      articlesByTag: [],
      header: 'Artikler fra Infotjenester',
      apiCallFinished: false,
      search: '',
      filterButtonText: '',
      buttonClass: 'h2 col-sm-2 inactive',
      error: 'Laster inn...'
    }

    this.updateSearch = this.updateSearch.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
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
          articles: newArticles,
          articlesByTag: newArticles,
          apiCallFinished: true,
          error: ''
        });

        this.setState(newState);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          articles: [],
          articlesByTag: [],
          apiCallFinished: true,
          error: "Klarte ikke hente artikler fra API."
        });
      });
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value.substring(0,100)
    });
  }

  filterTags(e) {
    if (this.state.articles) {
      this.setState({
        articlesByTag: this.state.articles.filter ( (a) => {
          return a.tag.toLowerCase() === e.target.innerText.toLowerCase();
        }),
        header: "Artikler fra infotjenester på emne: " + e.target.innerText,
        buttonClass: 'h2 col-sm-4 active-filter',
        filterButtonText: 'Fjern emnefilter'
      });
    }
  }

  removeFilter() {
    this.setState({
      articlesByTag: this.state.articles,
      header: 'Artikler fra infotjenester',
      buttonClass: 'h2 col-sm-4 inactive-filter',
      filterButtonText: ''
    })
  }

  componentWillMount() {
    this.getApiContent();
  }

  render() {
    let filteredArticles = [];
    if (this.state.apiCallFinished) {
      filteredArticles = this.state.articlesByTag.filter( (a) => {
        return (a.title.toLowerCase().indexOf(this.state.search) !== -1) || 
          (a.tag.toLowerCase().indexOf(this.state.search) !== -1) ||
          (a.ingress.toLowerCase().indexOf(this.state.search) !== -1);
      });
    }

    return (
      <div>
        <Header search={this.state.search} updateSearch={this.updateSearch}/>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" role="main">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <Title title={this.state.header} buttonClass={this.state.buttonClass} filterButtonText={this.state.filterButtonText} removeFilter={this.removeFilter}/>
              </div>
              <ArticleList articles={filteredArticles} filterTags={this.filterTags} error={this.state.error}/>
              <Footer />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;