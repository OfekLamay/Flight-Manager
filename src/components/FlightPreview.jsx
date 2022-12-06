import React from 'react'

export default function FlightPreview(props) {
  return (
    <div className='previewFlight'>
        <br/>
        <div>{props.flightData.id}</div>
        <br/>
        <div>{props.flightData.company}</div>
        <br/>
        <div>{props.flightData.travelersNum}</div>
        <br/>
    </div>
  )
}
