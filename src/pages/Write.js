import React from 'react';
import MapContainer from '../components/MapContainer';
import Edit from '../components/Edit';

// 라우터
import {useParams} from 'react-router-dom'


const Write = () => {
  const param = useParams().id;


  return (
    <div>
      {param ?
      <Edit/>
      :
      <MapContainer/>
      }
      
    </div>
  )
}

export default Write;