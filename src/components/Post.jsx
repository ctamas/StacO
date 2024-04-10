import * as React from 'react';
import '../App.css';
import { decodeToUTF, createReadableDate } from '../utils';

function Post(props) {
  const decodedUserName = decodeToUTF(props.currentPost.owner.display_name);
  const readableCreationDate = createReadableDate(props.currentPost.creation_date);

  return (
    <div>
      <button onClick={() => props.setCurrentPost(false)} className='button-style post-margin'>
        Back
      </button>
      <div className='post-container'>
        <div>
          <span onClick={() => props.handleClickUser(props.currentPost.owner.user_id)} className='question-user-token'>
            {decodedUserName}
          </span>
          <span>
            &nbsp;&nbsp;•&nbsp;&nbsp;{readableCreationDate}
          </span>
        </div>
        <h2 id='post-title-style' dangerouslySetInnerHTML={{ __html: props.currentPost.title }}></h2>
        <span dangerouslySetInnerHTML={{ __html: props.currentPost.body }}></span>
      </div>
      <h4 className='post-margin'>Answers: {props.currentPost.answers ? props.currentPost.answers.length : 'No answers yet'}</h4>
      {props.currentPost.answers && props.currentPost.answers.map((answer, index) => {
        return (
          <div className='post-container' key={index}>
            <div>
              <span onClick={() => props.handleClickUser(answer.owner.user_id)} className='question-user-token'>
                {answer.owner.display_name}
              </span>
              <span>
                &nbsp;&nbsp;•&nbsp;&nbsp;{createReadableDate(answer.creation_date)}
              </span>
              {(answer.is_accepted) && (
                <span className={'results-text question-meta-token no-margin' + (answer.is_accepted ? ' question-answered' : '')}>
                  {answer.is_accepted && 'Accepted '}
                  {answer.is_accepted && <span>&#10004;</span>}
                </span>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: answer.body }} key={index}>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Post;
