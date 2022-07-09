import React,{useState} from 'react';
import {Link} from 'react-router-dom'

import '../css/detailHeader.css'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'

const DetailHeader = () => {

    


  return (
    <>
    {/* 헤더 */}
    <div className='writeHeader'>
      <div className='preIcon'>
        <Link to ='/'><FontAwesomeIcon icon={faAngleLeft}/></Link>
      </div>
      
      {/* <div className='writeHeart'>
        <FontAwesomeIcon icon={faHeart} style={{marginRight:'5px'}}/>
        777
      </div>
      <div className='bookmark'>
        <FontAwesomeIcon icon={faBookmark}/>
      </div> */}
    </div>
      </>
  )
}

export default DetailHeader