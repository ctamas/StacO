import * as React from 'react';
import '../App.css';
import Questions from './Questions';

function User(props) {
  return (
    <div id='user-container'>
      <div id='user-container-inner'>
        <button onClick={() => props.handleClickUser('')} className='question-meta-token question-user-token'>
          Back
        </button>
        <div id='user-content'>
          <img className='user-info-token' src={props.showUser.profile_image} width='160' high='160' alt='Profile' />
          <div id='user-info-container'>
            <span className='question-meta-token user-info-token'>
              {props.showUser.display_name}
            </span>
            <span className='question-meta-token user-info-token'>
              {'Reputation: ' + props.showUser.reputation}
            </span>
            <span className='question-meta-token user-info-token'>
              {'Registered: ' + props.showUser.creation_date}
            </span>
          </div>
        </div>
      </div>
      <div className='full-width'>
        {props.userTags && !!props.userTags.length && (
          <React.Fragment>
            <span className='user-title'>
              Top 6 tags
            </span>
            <div id='user-top-tags-container'>
              {props.userTags.map((tag, index) => {
                return (
                  <span key={index} className='question-meta-token user-tag-container'>
                    <div>
                      {tag.tag_name}
                    </div>
                    <div className='flex-center'>
                      <div className='user-info-token'>
                        Score: {tag.question_score + tag.answer_score}
                      </div>
                      <div>
                        Posts: {tag.question_count + tag.answer_count}
                      </div>
                    </div>
                  </span>
                )
              })}
            </div>
          </React.Fragment>
        )}
      </div>
      {props.userQuestions.items && !!props.userQuestions.items.length && (
        <React.Fragment>
          <span className='user-title'>
            Questions
          </span>
          <Questions questions={props.userQuestions} handleClickTitle={props.handleClickTitle} handleClickUser={props.handleClickUser}></Questions>
        </React.Fragment>
      )}
      {props.userAnswers.items && !!props.userAnswers.items.length && (
        <React.Fragment>
          <span className='user-title'>
            Answers
          </span>
          <Questions questions={props.userAnswers} handleClickTitle={props.handleClickTitle} handleClickUser={props.handleClickUser}></Questions>
        </React.Fragment>
      )}
    </div>
  )
}

export default User;
