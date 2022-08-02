import React from 'react'
import "../../css/post.scss"

const Title = (props) => {
  const {setTitle, param, editdata} = props

  // ---------------------------- 제목 가져오기
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  return(
    <div className='writeTitleWrap'>
      {param&&param.length !== 0 ?
        <input
        type="text"
        onChange={onTitleHandler}
        maxLength='18'
        defaultValue={editdata && editdata.title}
        placeholder="제목을 입력해주세요"
      />
      :
      <input type="text" onChange={onTitleHandler} maxLength='18' placeholder="제목을 입력해주세요"/>
      }
      
      
    
    </div>
  )
}
export default Title