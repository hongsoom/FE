import React from "react";
import '../../css/imageSlide.scss';
import {useParams} from 'react-router-dom'

const AddButton = (props) =>{
  const {j, l, loadImg, editLoadImg} = props
  const param = useParams().id;

  return(
      <label className='addButton' htmlFor={`place_name_${j}`}>
        <div>{l.place_name} 사진 추가하기 📸</div>
        {param&&param ?
        <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
        onChange={(e)=>{editLoadImg(e, j)}}
        />
        :
        <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
        onChange={(e)=>{loadImg(e, j)}}
        />
        }
      
    </label>
  )
}

export default AddButton