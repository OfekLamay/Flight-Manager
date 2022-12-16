import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FlightPreview from './FlightPreview';
import PopUp from './PopUp';

export default function NewFlight(props) {

  const navigate = useNavigate()
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({
    name: "",
    content: <p>""</p>,
  })

  const doesFlightExist = (id) => {
    for (let i = 0; i < props.flights.length; i++)
    {
      if (id == props.flights[i].id)
        return true;
    }
    return false;
  }

  const areDetailsValid = () => {
    let flightid = document.getElementById("flightId").value
    let companyName = document.getElementById("companyName").value
    let travelersNumber = document.getElementById("travelersNumber").value

    if (doesFlightExist(flightid))
    {
      setPopUpInfo({
        name: "Error!",
        content: <p>There is already a flight with this id. 
          <br/> Please make sure that this is the right id</p>,
      })
      setShowPopUp(true);
      return;
    }
    else if (flightid > 99999 || flightid < 0)
    {
      setPopUpInfo({
        name: "Error!",
        content: <p>Flight id must be between 0 to 99999</p>,
      })
      setShowPopUp(true);
      return;
    }

    if (companyName.length < 1)
    {
      setPopUpInfo({
        name: "Error!",
        content: <p>Please enter the comany's name</p>,
      })
      setShowPopUp(true);
      return;
    }

    if (travelersNumber < 1 || travelersNumber > 450)
    {
      setPopUpInfo({
        name: "Error!",
        content: <p>The amount of travelers must be between 1 to 450</p>,
      })
      setShowPopUp(true);
      return;
    }

    props.addFlight({id: flightid, company: companyName, travelersNum: travelersNumber})
    setPopUpInfo({
      name: "Flight added!",
      content: <p>Flight added!
        <br/> Exit to navigate back to the control panel.</p>,
    })
    setShowSuccessPopUp(true);
  }

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

        <div>
            <div className='flexCol'>
              <br />
              <input type="number" min={0} max={99999} id='flightId' className='inputLabel' placeholder='Enter flight id' />
              <br />
              <input type="text" id='companyName' className='inputLabel' placeholder='Enter flight company' />
              <br />
              <input type="number" min={0} max={450} id='travelersNumber' className='inputLabel' placeholder='Enter travelers number' />
              <br />
              <button onClick={areDetailsValid} className='clickBtn'>Add</button>
              <br />
            </div>
        </div>

        {showPopUp ? <PopUp isTimed={false} close={()=>{setShowPopUp(!showPopUp)}} info={popUpInfo}/> : null}
        {showSuccessPopUp ? <PopUp isTimed={false} close={()=>{setShowSuccessPopUp(!showSuccessPopUp); navigate('/controlpanel');}} info={popUpInfo}/> : null}

    </div>
  )
}
