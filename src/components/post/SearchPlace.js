import React from 'react'
import '../../css/post.scss'

const SearchPlace = (props) => {
  const {search, Places, onChange, handleSubmit, inputText,onClickHandler, setSelect, select, setImgUrl, list, setFocus} = props

  return(
        <div className='writeSearchNresult'>
          {/* 검색창 */}
          <form className="inputForm" onSubmit={handleSubmit}>
            <input
              placeholder="위치를 검색해주세요"
              onChange={onChange}
              value={inputText}
            />
            <button type="submit">
              <img src={search} alt="검색 아이콘"/>
            </button>
          </form>

          {/* 검색목록*/}
          <div className='searchList_wrap' id='searchList_wrap' style={Places&&Places.length ? {height:'220px'}: {height:'0px', border:'none'}}>
            <div id="result-list">
              {Places.map((item, i) => (
                <label htmlFor={item.id} key={i}>
                <div style={{ marginTop: '20px'}}>
                  <span>{i + 1}</span>
                  <div>
                    <h3>{item.place_name}</h3>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span><br/>
                        <span>{item.address_name}</span>
                      </div>
                    ) : (
                      <span>{item.address_name}</span>
                    )}
                    <span>{item.phone}</span>
                  </div>
                  <div className='select'>
                    <input type="checkbox" value={item.id} id={item.id}
                    onChange={(e)=>{ onClickHandler(item.place_name)
                      if(e.target.checked){
                        setSelect((pre)=>{
                          const selectList = [...pre]
                          const newData = {...Places[i], imgCount:""}
                          selectList.push(newData)
                          list(selectList)
                          return selectList
                        })
                        setImgUrl((pre)=>{
                          const imgUrlList = [...pre]
                          const newData = {place_name:item.place_name, imgUrl:[]}
                          imgUrlList.push(newData)
                          return imgUrlList
                        })

                      }
                      else{
                        setFocus(select[0].place_name)
                        setSelect((pre)=>{
                          const selectList = pre.filter((v,i)=>{
                            return item.place_name !== v.place_name
                          })
                          list(selectList)
                          return selectList
                        })
                        setImgUrl((pre)=>{
                          const imgUrlList = pre.filter((v,i)=>{
                            return item.place_name !== v.place_name
                          })
                          return imgUrlList
                        })
                      }
                    }} style={{display:'none'}}/>
                  </div>
                </div>
              </label>
              ))}
              <div id="pagination"></div>
            </div>
          </div>
        </div>
      )
    }
export default SearchPlace