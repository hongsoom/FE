import React from "react";
import '../css/priceModal.css'

const PriceModal = (props) => {

  const { price, selectedPrice, setPrice, showPriceModal, closePriceModal} = props;
  
  const isChecked = (e) =>{
    if (e.target.checked){
      setPrice(e.target.value)
    }
  }

  return (
    <div className={showPriceModal ? 'openModal priceWrap' : 'priceWrap'}>
      {showPriceModal ?
      <div className='background' onClick={closePriceModal}>
        <div className='wrap' onClick={e => e.stopPropagation()}>
        <section>
          <div style={{display:'flex', flexWrap: 'wrap'}}>
          {price.map((v,i)=>{
            return(
              <div className='prices' key={i}
              style={selectedPrice === v ? {background:'#B6DCFF'}: {background:'#fff'}}
              >
                <input type="radio" name="price" value={v} id={v}
                onChange={isChecked}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
        </div>
          <div className="doneButton">
            <button className="close" onClick={closePriceModal}>선택완료</button>
          </div>
        </section>
      </div>
      </div> : null}
    </div>

  )
}

export default PriceModal;