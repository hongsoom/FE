import React, { useState }  from "react";
import '../css/themeModal.css'


const ThemeModal = (props) => {

  const { theme, selectedTheme, setTheme, showThemeModal, closeThemeModal, data, is_edit} = props;
  
  const isChecked = (e) =>{
    if (data||e.target.checked){
      setTheme(e.target.value)
      setTheme(data&&data.themeCategry)
    }
  }
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
              <div key={i}>
              {is_edit ?
              <div className='themes' key={i}
              style={selectedTheme === v ? {background:'skyblue'}: {background:'#fff'}}>
                <input type="radio" name="theme" defaultValue={data&&data.themeCategry} value={v} id={v} 
                onChange={isChecked}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
              :
              <div className='themes' key={i}
              style={selectedTheme === v ? {background:'skyblue'}: {background:'#fff'}}>
                <input type="radio" name="theme" value={v} id={v} 
                onChange={isChecked}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
              }
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