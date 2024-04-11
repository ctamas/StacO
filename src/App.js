import logo from './stackoverflow-icon.webp';
import glass from './magnifying-glass.png';
import * as React from 'react';
import './App.css';
import Questions from './components/Questions';
import Post from './components/Post';
import User from './components/User';

function App() {
  const API_KEY = 'HrvsqjzARWE0*0ZfoaXsLw((';
  const API_URL = 'https://api.stackexchange.com/2.3/';
  const [questions, setQuestions] = React.useState({ items: [] });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [showUser, setShowUser] = React.useState(false);
  const [userQuestions, setUserQuestions] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState(false);
  const [userTags, setUserTags] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageable, setPageable] = React.useState(false);

  const loadResults = (query, page = currentPage) => {
    fetch(API_URL + "search?key=" + API_KEY + "&order=desc&sort=activity&intitle=" + query + "&site=stackoverflow&page=" + page)
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
          // Close user and post views
          setCurrentPost(false);
          handleClickUser(false);
        }
      );
  };

  const loadPost = (query) => {
    fetch(API_URL + "questions/" + query + "?order=desc&sort=votes&site=stackoverflow&filter=!6Wfm_gSyiPy)i&key=" + API_KEY)
      .then(res => res.json())
      .then(
        result => {
          setCurrentPost(result.items[0]);
        }
      );
  };

  const loadUser = (query) => {
    fetch(API_URL + "users/" + query + "?key=" + API_KEY + "&site=stackoverflow")
      .then(res => res.json())
      .then(
        result => {
          result.items[0].creation_date = new Date(result.items[0].creation_date * 1000).toDateString();
          setShowUser(result.items[0]);
          loadUserAnswers(query);
          loadUserQuestions(query);
          loadUserTags(query);
          setCurrentPost(false);
        }
      );
  };

  const loadUserTags = (query) => {
    fetch(API_URL + "users/" + query + "/top-tags?site=stackoverflow&key=" + API_KEY)
      .then(res => res.json())
      .then(
        result => {
          setUserTags(result.items.slice(0, 6));
        }
      );
  };

  const loadUserAnswers = (query) => {
    fetch(API_URL + "users/" + query + "/answers?order=desc&sort=votes&site=stackoverflow&filter=!nOedRLjK5A&key=" + API_KEY)
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
    fetch(API_URL + "users/" + query + "/questions?order=desc&sort=votes&site=stackoverflow&key=" + API_KEY)
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
  React.useEffect(() => {
    loadResults('typescript');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleClickTitle = (post) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadPost(post);
  }

  return (
    <div className='app'>
      <div id="search-bar-container">
        <img id='app-logo' src={logo} width='64' high='64' alt='Stack logo' />
        <div id='title-container'>Search Stack Overflow</div>
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
        {currentPost && (
          <Post setCurrentPost={setCurrentPost} handleClickUser={handleClickUser} currentPost={currentPost}></Post>
        )}
        {!currentPost && !!showUser && (
          <User showUser={showUser} handleClickUser={handleClickUser} handleClickTitle={handleClickTitle} userQuestions={userQuestions} userAnswers={userAnswers} userTags={userTags}>
          </User>
        )}
        {!currentPost && !showUser && (
          <div>
            <div className='results-navigator flex-center'>
              <div className='results-text'>
                Results: {questions.items && questions.items.length}{pageable && ('+')}
              </div>
              <div id='results-page-text'>
                {pageable && ('Page ' + currentPage)}
              </div>
              <div className='flex-center'>
                {(currentPage > 1) && (
                  <button onClick={handlePrevious} className='button-style'>
                    Previous
                  </button>
                )}
                {pageable && (
                  <button onClick={handleNext} className='button-style'>
                    Next
                  </button>
                )}
              </div>
            </div>
            <Questions questions={questions} handleClickUser={handleClickUser} handleClickTitle={handleClickTitle}></Questions>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
