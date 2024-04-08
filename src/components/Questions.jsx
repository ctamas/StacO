import * as React from 'react';
import '../App.css';

function Questions(props) {
  return (
    <div className='question-wrapper'>
      {props.questions.items && props.questions.items.map((question, index) => {
        return (
          <div key={index} className='question-container'>
            <div>
              <span onClick={() => props.handleClickUser(question.owner.user_id)} className='question-user-token'>
                {question.owner.display_name}
              </span>
              <span>
                &nbsp;&nbsp;•&nbsp;&nbsp;{question.creation_date}
              </span>
            </div>
            <div className='question-tag hover-underline' dangerouslySetInnerHTML={{ __html: question.title }} onClick={() => props.handleClickTitle(question.question_id)} >
            </div>
            <div>
              {question.tags.map((tag, index) => {
                return (
                  <span key={index} className='question-meta-token'>
                    {tag}
                  </span>
                )
              })}
            </div>
            <div>
              <span className='question-meta-token question-counter-token'>
                {question.score + ' votes'}
              </span>
              {!question.answer_id && (
                <span className={'question-meta-token question-counter-token' + (question.is_answered ? ' question-answered' : '')}>
                  {question.answer_count + ' answers '}
                  {question.is_answered && <span>&#10004;</span>}
                </span>
              )}
              {(question.answer_id && question.is_accepted) && (
                <span className={'question-meta-token question-counter-token' + (question.is_accepted ? ' question-answered' : '')}>
                  {question.is_accepted && 'Accepted '}
                  {question.is_accepted && <span>&#10004;</span>}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Questions;
