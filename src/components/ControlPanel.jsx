import React from 'react'
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import AllFlights from './AllFlights';
import FlightPreview from './FlightPreview';

export default function ControlPanel(props) {
    const navigate = useNavigate()

  return (
    <div>
        <h1>Control Panel</h1>
        <br></br>
        <div className='flexboxContainerLine'>
            <div className='flexboxContainerButtons'>
                <div className='optionDiv' onClick={()=>{navigate('/controlpanel')}}>Show all flights</div>
                <br />
                <div className='optionDiv' onClick={()=>{navigate('/controlpanel/sort')}}>Sort flights</div>
                <br />
                <div className='optionDiv' onClick={()=>{navigate('/controlpanel/add')}}>New flight</div>
                <br />
                <div className='optionDiv' onClick={()=>{navigate('/controlpanel/delete')}}>Delete flight</div>
            </div>

            <div className='flexboxContainerFlights'>
            {props.flights.map((flight) => {
                return <FlightPreview key={`activeFlight${flight.id}`} flightData = {flight} /> })}
            </div>
        </div>
    </div>
  )
}
