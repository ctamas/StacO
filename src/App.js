import logo from './stackoverflow-icon.webp';
import glass from './magnifying-glass.png';
import * as React from 'react';
import './App.css';
import Questions from './components/Questions';
import User from './components/User';

function App() {
  const API_KEY = 'HrvsqjzARWE0*0ZfoaXsLw((';
  const [initialized, setInitialized] = React.useState(false);
  const [questions, setQuestions] = React.useState({ items: [] });
  const [searchQuery, setSearchQuery] = React.useState('blazor');
  const [searchInput, setSearchInput] = React.useState('blazor');
  const [showUser, setShowUser] = React.useState(false);
  const [userQuestions, setUserQuestions] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState(false);
  const [userTags, setUserTags] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageable, setPageable] = React.useState(false);

  const loadResults = (query, page = currentPage) => {
    fetch("https://api.stackexchange.com/2.3/search?key=" + API_KEY + "&order=desc&sort=activity&intitle=" + query + "&site=stackoverflow&page=" + page)
      .then(res => res.json())
      .then(
        result => { 
          // Create human readable time format from integer
          result.items.map((item) => {
            return item.creation_date = new Date(item.creation_date * 1000).toDateString();
          })
          setPageable(result.has_more);
          setQuestions(result);
          // searchQuery is the most recent search, while searchInput is the content of the search bar
          setSearchInput(query);
          setSearchQuery(query);
          setCurrentPage(page);
          handleClickUser(false);
        }
      );
  };

  const loadUser = (query) => {
    fetch("https://api.stackexchange.com/2.3/users/" + query + "?key=" + API_KEY + "&site=stackoverflow")
      .then(res => res.json())
      .then(
        result => {
          result.items[0].creation_date = new Date(result.items[0].creation_date * 1000).toDateString();
          setShowUser(result.items[0]);
          loadUserAnswers(query);
          loadUserQuestions(query);
          loadUserTags(query);
        }
      );
  };

  const loadUserTags = (query) => {
    fetch("https://api.stackexchange.com/2.3/users/" + query + "/top-tags?site=stackoverflow&key=" + API_KEY)
      .then(res => res.json())
      .then(
        result => {
          setUserTags(result.items.slice(0, 6));
        }
      );
  };

  const loadUserAnswers = (query) => {
    fetch("https://api.stackexchange.com/2.3/users/" + query + "/answers?order=desc&sort=votes&site=stackoverflow&filter=!nOedRLjK5A&key=" + API_KEY)
      .then(res => res.json())
      .then(
        result => {
          result.items.map((item) => {
            return item.creation_date = new Date(item.creation_date * 1000).toDateString();
          })
          setUserAnswers(result);
        }
      );
  };

  const loadUserQuestions = (query) => {
    fetch("https://api.stackexchange.com/2.3/users/" + query + "/questions?order=desc&sort=votes&site=stackoverflow&key=" + API_KEY)
      .then(res => res.json())
      .then(
        result => {
          result.items.map((item) => {
            return item.creation_date = new Date(item.creation_date * 1000).toDateString();
          })
          setUserQuestions(result);
        }
      );
  };

  // Run one time for the default search word
  if (!initialized) {
    setInitialized(true);
    loadResults(searchQuery);
  }

  const handleSubmit = (event, page = 1) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    // Go back to default page when submitting new search
    setCurrentPage(page);
    if (searchInput) {
      loadResults(searchInput, page);
    }
  }

  const handleSearch = (event) => {
    // Update the content of the input
    if (event.target.value !== setSearchInput) {
      setSearchInput(event.target.value)
    }
  }

  const handleNext = () => {
    loadResults(searchQuery, currentPage + 1)
  }

  const handlePrevious = () => {
    loadResults(searchQuery, currentPage - 1)
  }

  const handleClickUser = (user) => {
    if (user) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      loadUser(user);
    } else {
      // A falsy value will close the user profile view
      setShowUser(false);
    }
  }

  return (
    <div className='app'>
      <div id="search-bar-container">
        <img id='app-logo' src={logo} width='64' high='64' alt='Stack logo' />
        <form className='full-width' onSubmit={handleSubmit}>
          <div className='flex-center full-width'>
            <input type="text" id="search-bar" onChange={handleSearch} value={searchInput}></input>
            <button id='search-button' onClick={() => handleSubmit}>
              <img id='search-glass' src={glass} width='32' high='32' alt='Magnifying glass' />
            </button>
          </div>
        </form>
      </div>
      <div id='app-content'>
        {!!showUser && (
          <User showUser={showUser} handleClickUser={handleClickUser} userQuestions={userQuestions} userAnswers={userAnswers} userTags={userTags}>
          </User>
        )}
        {!showUser && (
          <div>
            <div className='results-navigator flex-center'>
              <div id='results-text'>
                Results: {questions.items && questions.items.length}{pageable && ('+')}
              </div>
              <div id='results-page-text'>
                {pageable && ('Page ' + currentPage)}
              </div>
              <div className='flex-center'>
                {(currentPage > 1) && (
                  <button onClick={handlePrevious} className='question-meta-token question-user-token'>
                    Previous
                  </button>
                )}
                {pageable && (
                  <button onClick={handleNext} className='question-meta-token question-user-token'>
                    Next
                  </button>
                )}
              </div>
            </div>
            <Questions questions={questions} handleClickUser={handleClickUser}></Questions>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
