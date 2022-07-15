import React, { useState, useEffect }  from "react";
import '../css/themeModal.css'


const ThemeModal = (props) => {

  const { theme, selectedTheme, setTheme, showThemeModal, closeThemeModal, editdata, is_edit} = props;
  
  // const isChecked = (e) =>{
  //   if (data||e.target.checked){
  //     setTheme(e.target.value)
  //     setTheme(data&&data.themeCategry)
  //   }
  // }

  // useEffect(()=>{
  //   setTheme(editdata&&editdata.themeCategory)
  // },editdata)

  console.log(selectedTheme)

  return (
    <div className={showThemeModal ? 'openModal themeWrap': 'themeWrap'}>
      {showThemeModal ?
      <div className='background' onClick={closeThemeModal}>
        <div className='wrap' onClick={e => e.stopPropagation()}>
        <section>
          <div style={{display:'flex', flexWrap: 'wrap'}}>
          {theme.map((v,i)=>{
            return(
              <div className='themes' key={i}
              style={selectedTheme.includes(v) ? {background:'skyblue', border:'1px solid #ccc'}: {border:'1px solid #ccc'}}>
                <input type="checkbox" name="theme" value={v} id={v}
                onChange={(e)=>{
                  if (e.target.checked){
                  setTheme((pre)=>{
                    const newData=[...pre];
                    newData.push(v)
                    return newData
                  })
                   }else{
                    setTheme((pre)=>{
                      const newData = pre.filter((l,i)=>{
                        return l !== v
                        })
                        return newData
                    })
                   }
                  }}
                />
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
          </div>
          <div className="doneButton">
            <button className="close" onClick={closeThemeModal}>선택완료</button>
          </div>
        </section>
        </div>
      </div> : null}
      
    </div>
  )
}

export default ThemeModal;