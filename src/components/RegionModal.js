import React, { useState }  from "react";
import '../css/regionModal.css'


const RegionModal = (props) => {

  const { region, selectedRegion, setRegion, showRegionModal, closeRegionModal, data, is_edit} = props;
  
  const isChecked = (e) =>{
    if (e.target.checked){
      setRegion(e.target.value)
      // setRegion(data&&data.regionCategry)
    }
  }
  console.log(selectedRegion)

  return (
    <div className={showRegionModal ? 'openModal regionWrap': 'regionWrap'}>
      {showRegionModal ?
      <div className='background' onClick={closeRegionModal}>
        <div className='wrap' onClick={e => e.stopPropagation()}>
        <section>
          <div style={{display:'flex', flexWrap: 'wrap'}}>
          {region.map((v,i)=>{
            return(
              <div key={i}>
              {is_edit ?
              <div className='regions' key={i}
              style={selectedRegion === v ? {background:'skyblue'}: {background:'#fff'}}>
                <input type="radio" name="region" defaultValue={data&&data.regionCategry} value={v} id={v} 
                onChange={isChecked}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
              :
              <div className='regions' key={i}
              style={selectedRegion === v ? {background:'skyblue'}: {background:'#fff'}}>
                <input type="radio" name="region" value={v} id={v} 
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
            <button className="close" onClick={closeRegionModal}>선택완료</button>
          </div>
        </section>
        </div>
      </div> : null}
      
    </div>
  )
}

export default RegionModal;