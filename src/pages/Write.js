import React from 'react';
import NewPost from '../components/post/NewPost';
import Edit from '../components/post/Edit';

// 라우터
import {useParams} from 'react-router-dom'


const Write = (props) => {
  const param = useParams().id;
  const {myInfo} = props

  return (
    <div>
      {param ?
      <Edit myInfo={myInfo}/>
      :
      <NewPost myInfo={myInfo}/>
      }      
    </div>
  )
}

export default Write;