import instance from "../../shared/Request";
import apiform  from "../../shared/api"

const GET = "post/GET"
const ADD = "post/ADD"
const MODIFY = "post/MODIFY"
const DELETE = "post/DELETE"


const initialState ={
  title : 'title',
  content : '게시글 내용 입니다',
  regionCategory : '지역별',
  themeCategory : ['힐링','맛집'],
  priceCategory : '10만원대',
  place: [
    {
     addressName:'',
     categoryGroupCode:'',
     categoryGroupName:'',
     categoryName: '',
     distance:'',
     files: [],
     id:'',
     phone: '',
     placeName: '',
     placeUrl: '',
     roadAddressName: '',
     x: '',
     y: '',
    }
  ],
  restroom: '',
  }

// Action creator
export function getPost(post){
  return {type: GET, post}
}
export function addPost(post){
  return {type: ADD, post}
}
export function modifyPost(post){
  return {type: MODIFY, post}
}
export function deletePost(postID){
  return {type: DELETE, postID}
}

// middleWare
export const getPostDB = (postId) => async (dispatch) => {
  try {
    const data = await instance.post(`api/post/${postId}`);
    dispatch(getPost(data.data));
    console.log(data.data);
  } catch (error) {
    // alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

export const addPostDB = (Data) => {
  // console.log(data)
  return async function (dispatch, getState) {
    await apiform
      .post("api/post", Data,
       {
        headers: {
          "Authorization": localStorage.getItem("token") 
        },
      })
      .then((res) => {
        console.log(res);
        // window.location.assign(`/`);
        window.alert('작성 성공')
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePostDB = (Id) => {
  
  return function (dispatch) {
    instance
      .delete(`hotel/${Id}`,
      {
      }
      )
      .then((res) => {
        dispatch(deletePost(Id));
        window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//reducer

export default function reducer(state = initialState, action={}){
  switch(action.type){

    case "post/GET":{
      return {posts: action.post}
    }
    
    case "post/ADD":{
      const new_post_list = [ action.post_list, ...state.posts];
      return {posts: new_post_list}

    }
    case "post/MODIFY": {
      
      const modify_post = [ ...action.post ];
      console.log(modify_post)
      return { posts: modify_post };
    }

    case "post/DELETE":{
      console.log(state.posts)
      const new_post_list= state.posts.filter((l,i)=>{
        console.log(action)
        // window.alert('보자')
        return action.postID !== l.id
      })
      return {posts: new_post_list}

    }

    default:
      return state;
  }
}