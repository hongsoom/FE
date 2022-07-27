import React from 'react'
import "../../css/post.scss"

const Title = (props) => {
  const {setTitle} = props

  // ---------------------------- 제목 가져오기
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  return(
    <div className='writeTitleWrap'>
      <input type="text" onChange={onTitleHandler} placeholder="제목을 입력해주세요"/>
    </div>
  )
}
export default Title