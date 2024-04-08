import * as React from 'react';
import '../App.css';

function Post(props) {
  return (
    <div id='post-containter'>
      <button onClick={() => props.setCurrentPost(false)} className='button-style'>
        Back
      </button>
      <h2 id='post-title-style' dangerouslySetInnerHTML={{ __html: props.currentPost.title }}></h2>
      <span dangerouslySetInnerHTML={{ __html: props.currentPost.body }}></span>
      <hr />
      <h4>Answers: {props.currentPost.answers ? props.currentPost.answers.length : 'No answers yet'}</h4>
      {props.currentPost.answers && props.currentPost.answers.map((answer, index) => {
        return (
          <div key={index}>
            <div className='post-answer' dangerouslySetInnerHTML={{ __html: answer.body }} key={index}>
            </div>
            {(index !== props.currentPost.answers.length -1) && <hr />}
          </div>
        )
      })}
    </div>
  )
}

export default Post;
