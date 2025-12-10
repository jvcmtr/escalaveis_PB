import React from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import InlineButton from './InlineButton';

export default function Breadcrumb(props){

  const location = useLocation();
  const navigate = useNavigate();

  const breadcrums = location.pathname.split('/').filter(i => i.length > 0)
  const items = []
  
  breadcrums.forEach((a, i) => {
    if (i > 0) items.push( <span style={{fontSize: "0.8rem"}}> / </span>)

    let url = "/" + breadcrums.slice(0, i + 1).join('/')
    items.push(<InlineButton onClick={()=>navigate(url)}> {a} </InlineButton>)
  })

  return ( 
    <div style={{display:"flex", justifyContent:"space-around", ...props.style }} >
        <span>
          {items}
        </span>
    </div> )
};
