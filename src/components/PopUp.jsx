import React from 'react'
import { useRef, useEffect } from 'react';

export default function PopUp(props) {

    // close = {f()}
    // isTimed = {bool}
    // info ={
    // name: string
    // content: <p>ACTUAL CONTENT</p>
    // }

    const intervalRef = useRef(); 

    useEffect(()=>{
        if (props.isTimed)
            performTimedClose();
    }, [])

    const performTimedClose = () => {

        intervalRef.current = setTimeout(() => {
            closePopUp();
            console.log("time passed");
        }, 5000);
    }

    const closePopUp = () => {
        clearTimeout(intervalRef);
        console.log("entered close")
        props.close();
    }

  return (
    <div id='infoPopup' className='overlay' onClick={closePopUp}>
        <div className='popUpInfo'>
            <br />
            <div className='popUpNameLabel' onClick={(e) => {e.stopPropagation()}}>{props.info.name}</div>
            <br /> 
            <div className='popUpContentLabel' onClick={(e) => {e.stopPropagation()}}>
            <div className='popUpCloseLabel' onClick={closePopUp}>X</div>
                {props.info.content}
            </div>
        </div>
    </div>
  )
  
}
