import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getCommentDB, addCommentDB, deleteCommentDB } from "../redux/module/comment";
import "../css/comment.css";
import profile from "../assets/profile.png";

const Comment = ({postId}) => {

    const dispatch = useDispatch();

    const [comment, setComment] = React.useState("");

    const data = useSelector((state) => state.comment.comments);

    React.useEffect (() => {
        dispatch(getCommentDB(postId));
      }, []);

    const addcomment = () => {
        dispatch(addCommentDB(
            postId, comment));
            setComment("")
    }
    
    return (
        <div className="comment-container">
            <div className="comment-content">
                <div className="comment-add">
                    <input type="text" placeholder="댓글을 입력하세요" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                    <button onClick={addcomment}>등록</button>
                </div> 
                {data.map((list, index) => {
                    return (
                        <div className="comment-list" key={index}>
                            <>
                            <div className="comment-user">
                                <img src={profile} alt='profile'/>
                                <p>{list.nickname}닉네임</p>
                            </div>
                            <div className="comment">
                                <p>{list.comment}댓글을 입력하세요</p>
                            </div>
                            <div className="comment-info">
                                <span>2시간 전</span>
                                <span onClick={() => dispatch(deleteCommentDB(list.commentId))}>삭제</span>
                            </div>
                            </>
                        </div>
                    )})}
                </div>
            </div>
        )
    }

export default Comment;