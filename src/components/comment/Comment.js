import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { addCommentDB, deleteCommentDB } from "../../redux/module/comment";
import "../../css/comment.css";
import profile from "../../assets/profile.png";
import instance from "../../shared/Request";

const Comment = ({postId}) => {

    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [page, setPage] = useState(0);

    const list = useSelector((state) => state.comment.comments);

    const [data, setDate] = useState(list);

    const loadCommnet = () => {
       /*  instance.get(`api/post/${postId}`).then(({response}) => {
            const newList = response.data.comments;
            setDate((prev) => [...prev, ...newList]);
        }); */
        const newList = data;
        setDate((prev) => [...prev, ...newList]);
    };

    const handleScroll = (e) => {
        if (window.innerHeight +  e.target.documentElement.scrollTop +1 >  
            e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1);
        }
    } 

    useEffect(() => {
        loadCommnet();
        window.addEventListener('scroll', handleScroll);
    },[dispatch, page])


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
                                <p>{list.nickname}</p>
                            </div>
                            <div className="comment">
                                <p>{list.comment}</p>
                            </div>
                            <div className="comment-info">
                                <span>2시간 전</span>
                                <span className="commentdelete"onClick={() => dispatch(deleteCommentDB(list.commentId))}>삭제</span>
                            </div>
                            </>
                        </div>
                    )})}
                </div>
            </div>
        )
    }

export default Comment;