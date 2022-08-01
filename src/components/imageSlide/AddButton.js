import React from "react";
import '../../css/imageSlide.scss';

const AddButton = (props) =>{
  const {j, l, loadImg} = props

  return(
      <label className='addButton' htmlFor={`place_name_${j}`}>
        <div>{l.place_name} 사진 추가하기 📸</div>
      <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
      onChange={(e)=>{loadImg(e, j)}}
      />
    </label>
  )
}

export default AddButton