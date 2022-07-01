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

    // 서버에서 주는 value값 사용!
    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
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