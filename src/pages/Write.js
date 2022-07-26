import React from 'react';
import NewPost from '../components/post/NewPost';
import Edit from '../components/post/Edit';

// 라우터
import {useParams} from 'react-router-dom'


const Write = () => {
  const param = useParams().id;


  return (
    <div>
      {param ?
      <Edit/>
      :
      <NewPost/>
      }
      
    </div>
  )
}

export default Write;