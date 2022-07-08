import React, { useEffect, useState } from "react";
import CategorySlide from "./CategorySlide";
import  "../../css/categoryPost.css";
import profile from "../../assets/profile.png";
import bookmark from "../../assets/bookmark.png";
import share from "../../assets/share.png";
import heart from "../../assets/heart.png";
import test1 from "../../assets/test1.png";
import test2 from "../../assets/test2.png";

const CategoryPost = () => {
    
    const [image, setImage] = useState([test1, test2, test1, test2]);
    const [page, setPage] = useState(0);
    const [data, setDate] = useState();

    const loadLatestPost = () => {
        /*  instance.get(`api/posts/?keyword={keyword}&page={page}`).then(({response}) => {
             const newList = response.data;
             const image = response.data.imgUrl;
             setDate((prev) => [...prev, ...newList]);
             setImage((prev) => [...prev, ...image]);
         }); */
     };
 
     const handleScroll = (e) => {
         if (window.innerHeight +  e.target.documentElement.scrollTop +1 >  
             e.target.documentElement.scrollHeight
         ) {
             setPage(page + 1);
         }
     } 
 
     useEffect(() => {
        loadLatestPost();
        window.addEventListener('scroll', handleScroll);
     },[page])

    return (
      <div className="categorypost-container">   
        <div className="categorypost-content">
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={profile} alt="profile" />
                    <p>제목을 입력해주세요</p>
                </div>    
                <div className="categorypost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    <img src={bookmark} alt="bookmark" className="bookmark-icon"/>
                </div>
            </div>
            <CategorySlide image={image} />
            <div className="categorypost-category">
                <div className="categorypost-button">
                    <button className="area-button">서울</button>
                    <button className="theme-button">먹방</button>
                </div>    
                <div className="categorypost-heart">
                    <img src={heart} alt="heart" />
                    <p>777</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default CategoryPost;