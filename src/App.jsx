import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Title from './components/Title';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import './App.css';
import './animate.css';

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
      filteredTag: '',
      filterButton: false,
      dateReversed: false,
      error: 'Laster inn...',
      errorMsg: {},
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
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

  // Reverses the article array based on its date value.
  sortByDate(e) {
    e.preventDefault();

    const arr = this.state.articlesByTag;
    arr.sort((a, b) => {
      const c = new Date(a.date);
      const d = new Date(b.date);
      return this.state.dateReversed ? d - c : c - d;
    });

    this.setState({ articlesByTag: arr, dateReversed: !this.state.dateReversed });
  }

  // Updates the state to store the inputs from the search field.
  updateSearch(e) {
    e.target.value = e.target.value.toLowerCase();

    const newState = Object.assign({}, this.state, {
      search: e.target.value.substring(0, 50),
      header: 'Artikler fra infotjenester',
    });

    if (this.state.filterButton && e.target.value) {
      newState.header = `${newState.header} på emne: "${this.state.filteredTag}", med søk: "${e.target.value}"`;
    } else if (e.target.value === '' && this.state.filterButton) {
      newState.header = `${newState.header} på emne: "${this.state.filteredTag}"`;
    } else if (e.target.value && !this.state.filterButton) {
      newState.header = `${newState.header} med søk: "${e.target.value}"`;
    }
    this.setState(newState);
  }

  /*
  / This filters the articles by the tag pressed on an article card,
  / and adds a button which resets the article list on click.
  */
  filterTags(e) {
    e.preventDefault();

    if (this.state.articles) {
      const newState = Object.assign({}, this.state, {
        articlesByTag: this.state.articles.filter(a =>
          a.tag.toLowerCase() === e.target.innerText.toLowerCase()),
        filteredTag: e.target.innerText,
        header: 'Artikler fra infotjenester',
        filterButton: true,
      });

      if (this.state.search) {
        newState.header = `${newState.header} på emne: "${e.target.innerText}", med søk: "${this.state.search}"`;
      } else {
        newState.header = `${newState.header} på emne: "${e.target.innerText}"`;
      }
      this.setState(newState);
    }
  }

  // Resets the article list to the full collection from the api, and removes the button.
  removeFilter(e) {
    e.preventDefault();

    const newState = Object.assign({}, this.state, {
      articlesByTag: this.state.articles,
      filteredTag: '',
      header: 'Artikler fra infotjenester',
      filterButton: false,
    });

    if (this.state.search) {
      newState.header = `${newState.header} med søk: "${this.state.search}"`;
    }
    this.setState(newState);
  }

  // Rendering function. Is called every time the state updates.
  render() {
    let filteredArticles = [];

    /*
    / This filters the articles to only contain letters matching strings found on article cards.
    / Also manually changes a tag property to be gramatically correct (hacky solution).
    / TODO: Use Promises instead of state boolean to check for API callback completion.
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

    // The return function renders all of the UI.
    return (
      <div className="wrapper">
        <Header search={this.state.search} updateSearch={this.updateSearch} />
        <main role="main">
          <Title
            title={this.state.header}
            hasFilter={this.state.filterButton}
            buttonClass={this.state.filterButton ? 'animated fadeIn btn' : ' animated fadeOut btn inactive'}
            removeFilter={this.removeFilter}
          />
          <ArticleList
            articles={filteredArticles}
            filterTags={this.filterTags}
            error={this.state.error}
            sortDate={this.sortByDate}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
