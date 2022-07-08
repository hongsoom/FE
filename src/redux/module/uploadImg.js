import instance from "../../shared/Request";
import apiform  from "../../shared/api"

const GET = "img/GET"
const ADD = "img/ADD"
const MODIFY = "img/MODIFY"
const DELETE = "img/DELETE"


const initialState ={}


// Action creator
export function getImg(img){
  return {type: GET, img}
}
export function addImg(img){
  console.log(img)
  return {type: ADD, img}
}
export function modifyImg(img){
  return {type: MODIFY, img}
}
export function deleteImg(imgID){
  return {type: DELETE, imgID}
}





//reducer

export default function reducer(state = initialState, action={}){
  switch(action.type){

    case "img/GET":{
      return {imgs: action.img}
    }
    
    case "img/ADD":{
      return {imgs: action.img}

    }
    case "img/MODIFY": {
      const modify_img = [ ...action.img ];
      console.log(modify_img)
      return { imgs: modify_img };
    }

    case "img/DELETE":{
      console.log(state.imgs)
      const new_img_list= state.imgs.filter((l,i)=>{
        console.log(action)
        // window.alert('보자')
        return action.imgID !== l.id
      })
      return {imgs: new_img_list}

    }

    default:
      return state;
  }
}