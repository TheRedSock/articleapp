import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import './App.css';
import './template.css';

const API_URL = 'api/articleapi/getarticles';

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
      filterButton: false,
      error: 'Laster inn...',
      errorMsg: {},
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  // Runs as component is being rendered, but before render().
  componentWillMount() {
    this.getApiContent();
  }

  // Grabs the article data from the api and stores it to the state.
  getApiContent() {
    axios
      .get(API_URL)
      .then((response) => {
        const newArticles = response.data.map(c => ({
          id: c.articleid,
          title: c.articletitle,
          ingress: c.articleingress,
          date: c.articledate,
          url: c.articleurl,
          image: c.articleimage,
          tag: c.articletag,
        }));

        const newState = Object.assign({}, this.state, {
          articles: newArticles,
          articlesByTag: newArticles,
          apiCallFinished: true,
          error: '',
        });

        this.setState(newState);
      })
      .catch((error) => {
        this.setState({
          articles: [],
          articlesByTag: [],
          apiCallFinished: true,
          error: 'Klarte ikke hente artikler fra API.',
          errorMsg: error,
        });
      });
  }

  // Updates the state to store the inputs from the search field.
  updateSearch(e) {
    this.setState({
      search: e.target.value.substring(0, 100),
    });
  }

  /*
  / This filters the articles by the tag pressed on an article card,
  / and adds a button which resets the article list on click.
  */
  filterTags(e) {
    e.preventDefault();
    if (this.state.articles) {
      this.setState({
        articlesByTag: this.state.articles.filter(a =>
          a.tag.toLowerCase() === e.target.innerText.toLowerCase()),
        header: `Artikler fra infotjenester på emne: "${e.target.innerText}"`,
        filterButton: true,
        filterButtonText: 'Fjern emnefilter',
      });
    }
  }

  // Resets the article list to the full collection from the api, and removes the button.
  removeFilter(e) {
    e.preventDefault();
    this.setState({
      articlesByTag: this.state.articles,
      header: 'Artikler fra infotjenester',
      filterButton: false,
      filterButtonText: '',
    });
  }

  // Rendering function. Is called every time the state updates.
  render() {
    let filteredArticles = [];

    /*
    / This filters the articles to only contain letters matching strings found on article cards.
    / Also manually changes a tag property to be gramatically correct (hacky solution).
    / TODO: Use Promises instead of this state variable.
    */
    if (this.state.apiCallFinished) {
      filteredArticles = this.state.articlesByTag.filter(a =>
        (a.title.toLowerCase().indexOf(this.state.search) !== -1) ||
        (a.tag.toLowerCase().indexOf(this.state.search) !== -1) ||
        (a.ingress.toLowerCase().indexOf(this.state.search) !== -1));

      for (let i = 0; i < filteredArticles.length; i += 1) {
        if (filteredArticles[i].tag === 'lonn') {
          filteredArticles[i].tag = 'Lønn';
        }
      }
    }

    /*
     / This creates all the UI elements.
     / Capitalized tags are UI components described in other files.
     / values inside curly braces are properties or functions passed to the components.
    */
    return (
      <div>
        <Header search={this.state.search} updateSearch={this.updateSearch} />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" role="main">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <Title
                  title={this.state.header}
                  buttonClass={this.state.filterButton ? 'h2 col-sm-4 active-filter' : 'h2 col-sm-4 inactive-filter'}
                  filterButtonText={this.state.filterButtonText}
                  removeFilter={this.removeFilter}
                />
              </div>
              <ArticleList
                articles={filteredArticles}
                filterTags={this.filterTags}
                error={this.state.error}
              />
              <Footer />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
