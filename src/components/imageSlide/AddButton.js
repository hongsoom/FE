import React from "react";
import '../../css/imageSlide.scss';

const AddButton = (props) =>{
  const {j, l, loadImg} = props

  return(
    <div className='addButton' key={j}>
      <label htmlFor={`place_name_${j}`}>
        <div><b>{l.place_name}</b> 사진 추가하기</div>
      </label>
      <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
      onChange={(e)=>{loadImg(e, j)}}
      />
    </div> 
  )
}

export default AddButton