import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useNotification } from '../services/NotificationService';

export default function Loadable(props){
  const messsage = useNotification()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const getDt = async () =>{
      try{
        let dt = await props.getData()
        setData(dt);
        setLoading(false); 
      }
      catch (e) {
        setLoading(false);
        messsage.error(e.message)
        setError(e.message);
      }
    }
    getDt()
  }, [props.getData]);

  if (loading) {
    return  (
        <div style={{...props.style}}>
            <LoadingSpinner/>
        </div>
    )
  }

  if (error) {
    return (
        <div style={{backgroundColor:"#ff000080", border:"2px solid #ff0000", ...props.style}}>
            Error: {error}
        </div>)
  }

  return React.cloneElement(props.children, { data:data, ...props.children.props });
};
