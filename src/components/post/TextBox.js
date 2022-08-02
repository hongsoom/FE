import React from 'react'
import '../../css/post.scss'

const TextBox = (props) =>{
  const {editdata, setContent, param} = props

  // 적힌 콘텐트 텍스트 가져오기
  const onContentHandler = (e) => {
    setContent(e.target.value);
  };

  return(
    <div className='writeTxt'>
      {param&&param.length !== 0 ?
        <textarea
        placeholder="내용을 작성해주세요"
        defaultValue={editdata && editdata.content}
        onChange={onContentHandler}
      />
      :
      <textarea placeholder="내용을 작성해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
      }
    </div>
  )
}

export default TextBox