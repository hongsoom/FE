import React from "react";
import "../../css/mypage.scss";

const MyPosts = (props) => {
  const {toggle, setToggle, myPosts, talkwhite, heartwhite, myMarks, navigate } = props

  const onClickToPost = (postId) =>{
    navigate(`/detail/${postId}`)
  }
  const isChecked = (e) =>{
    if(e.target.checked){
      setToggle(e.target.value)
    }
  }
  console.log(myMarks)

  return (
    <div className="myprofilePosts">
      <div className="myprofilePostsTitle">
        <div
          className="myPostsTitle"
          style={
            toggle === "myPosts"
              ? { borderBottom: "2px solid #8ACEFF", fontWeight: "600" }
              : { borderBottom: "2px solid transparent" }
          }
          >
          <input
            type="radio"
            name="myPost"
            value="myPosts"
            id="myPosts"
            onChange={isChecked}
          />
          <label htmlFor="myPosts">내가 쓴 글</label>
        </div>

        <div
          className="myBookmarkTitle"
          style={
            toggle === "myBookmark"
              ? { borderBottom: "2px solid #8ACEFF", fontWeight: "600" }
              : { borderBottom: "2px solid transparent" }
          }
          >
          <input
            type="radio"
            name="myPost"
            value="myBookmark"
            id="myBookmark"
            onChange={isChecked}
          />
          <label htmlFor="myBookmark">즐겨찾기</label>
        </div>
      </div>
      


      <div className="postsNmarks">
        {toggle === "myPosts" ? (
          <div className="myPosts">
            <div className="postboxs">
              {myPosts &&
                myPosts.myposts.map((v, i) => {
                  return (
                    <div
                      className="postbox"
                      onClick={()=>{onClickToPost()}}
                      key={i}
                      style={{
                        backgroundImage: `url(${v.imgUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="txtArea">
                        <div className="postBoxTitle">{v.title}</div>
                        <div className="myPostDetail">
                          <div className="myPostTag">
                            <div>#{v.regionCategory}</div>
                            {v.themeCategory.map((v, i) => {
                              return <div key={i}>#{v.themeCategory}</div>;
                            })}
                          </div>
                          <div className="myPostIcons">
                            <img src={talkwhite} alt="댓글 갯수" />
                            {v.commentCount}
                            <img src={heartwhite} alt="댓글 갯수" />
                            {v.loveCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="myBookmarks" id="myBookmarks">
            <div className="postboxs">
              {myMarks &&
                myMarks.mybookmarks.content.map((v, i) => {
                  return (
                    <div
                      className="postbox"
                      onClick={()=>{onClickToPost(v.postId)}}
                      key={i}
                      style={{
                        backgroundImage: `url(${v.imgUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="txtArea">
                        <div className="postBoxTitle">{v.title}</div>
                        <div className="myPostDetail">
                          <div className="myPostTag">
                            <div>#{v.regionCategory}</div>
                            {v.themeCategory.map((v, i) => {
                              return <div key={i}>#{v.themeCategory}</div>;
                            })}
                          </div>
                          <div className="myPostIcons">
                            <img src={talkwhite} alt="댓글 갯수" />
                            {v.commentCount}
                            <img src={heartwhite} alt="댓글 갯수" />
                            {v.loveCount}
                          </div>
                        </div>
                      </div>
                    </div>

                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPosts