import React from "react";
import '../../css/priceModal.scss'

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
        <div className='price_wrap' onClick={e => e.stopPropagation()}>
          <section>
            <div className="modalTitle">비용을 선택해주세요</div>
            <div className="pricesWrap">
            {price.map((v,i)=>{
              return(
                <div className='_prices' key={i}
                style={selectedPrice === v ?
                  {background: '#8ACEFF', color:'#fff', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.12)'}
                  : {background: '#F5F9FF', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'}}>
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