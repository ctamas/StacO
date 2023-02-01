import * as React from 'react';
import '../App.css';

function Questions(props) {
  return (
    <div className='question-wrapper'>
      {props.questions.items && props.questions.items.map((question, index) => {
        return (
          <div key={index} className='question-container'>
            <div>
              <div>
                <span className='question-meta-token question-tag'>
                  {question.score + ' votes'}
                </span>
                {!question.answer_id && (
                  <span className={'question-meta-token question-tag' + (question.is_answered ? ' question-answered' : '')}>
                    {question.answer_count + ' answers '}
                    {question.is_answered && <span>&#10004;</span>}
                  </span>
                )}
                {(question.answer_id && question.is_accepted) && (
                  <span className={'question-meta-token question-tag' + (question.is_accepted ? ' question-answered' : '')}>
                    {question.is_accepted && 'Accepted '}
                    {question.is_accepted && <span>&#10004;</span>}
                  </span>
                )}
                <button onClick={() => props.handleClickUser(question.owner.user_id)} className='question-meta-token question-user-token question-tag'>
                  {question.owner.display_name}
                </button>
              </div>
              <div className='question-tag' dangerouslySetInnerHTML={{ __html: question.title}}>
              </div>
            </div>
            <div>
              {question.tags.map((tag, index) => {
                return (
                  <span key={index} className='question-meta-token question-tag'>
                    {tag}
                  </span>
                )
              })}
            </div>
            <span>
              {question.creation_date}
            </span>
          </div>
        )
      })} 
    </div>
  )
}

export default Questions;
