import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";
import FlightPreview from './FlightPreview';
import PopUp from './PopUp';

export default function DeleteFlight(props) {

  const navigate = useNavigate()

  const [showBadIDPopUp, setShowBadIDPopUp] = useState(false)
  const [showDeletedPopUp, setShowDeletedPopUp] = useState(false)
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

  const allFlightsBeside = (id) => {
    let allWantedFlights = []
    for (let i = 0; i < props.flights.length; i++)
    {
        if (id == props.flights[i].id)
          continue;
        else
        {allWantedFlights = [...allWantedFlights, props.flights[i]]}
    }
    return allWantedFlights;
  }

  const areDetailsValid = () => {
    let flightid = document.getElementById("flightId").value

    if (!doesFlightExist(flightid))
    {
      setShowBadIDPopUp(true);
      setPopUpInfo({
        name: "No ID Found",
        content: <p>There isn't a flight with this id</p>
      })
      return;
    }
    
    let wantedFlights = allFlightsBeside(flightid)
    let amountOfTravelersOnFlights = 0;

    for (let i = 0; i< wantedFlights.length; i++)
    {
      amountOfTravelersOnFlights += wantedFlights[i].travelersNum;
    }

    props.DeleteFlightById(flightid)
    setPopUpInfo({
      name: "Flight deleted!",
      content: (<p> Going back to the control panel
      <br/> Amount of active flights: {wantedFlights.length} 
      <br/> Amount of travelers on all flights: {amountOfTravelersOnFlights}</p>)
    })
    setShowDeletedPopUp(true)

  }

  const showFlightsStatus = () => {
    setShowDeletedPopUp(false)
    navigate('/controlpanel')
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
        
        {showBadIDPopUp ? <PopUp close={()=> setShowBadIDPopUp(false)} isTimed={true} info ={popUpInfo} /> : null}
        {showDeletedPopUp ? <PopUp close={showFlightsStatus} isTimed={false} info ={popUpInfo} /> : null}

        <div>
            <div className='flexCol'>
              <br />
              <input type="number" min={0} max={99999} id='flightId' className='inputLabel' placeholder='Enter flight id' />
              <br />
              <button onClick={areDetailsValid} className='clickBtn'>Delete</button>
              <br />
            </div>
        </div>
    </div>
  )
}
