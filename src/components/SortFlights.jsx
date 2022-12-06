import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FlightPreview from './FlightPreview';

export default function SortFlights(props) {
    const navigate = useNavigate()

    const [filteredFlights, setFilteredFlights] = useState(props.flights)
    const [sortMethod, setSortMethod] = useState("Choose")

    const setFilterMethod = (e) => {
        setSortMethod(e.target.value);
    }

    const filterByName = (e) => {
        let nameInput = e.target.value;
        let flightsAfterFilter = [];
        if (e.target.value == "") 
        {
            setFilteredFlights(props.flights)
            return;
        }

        flightsAfterFilter = filteredFlights.filter((flight) => 
        {let nameSoFar = flight.company.substring(0,nameInput.length);
            if (nameSoFar == nameInput)
                return flight});

        if (flightsAfterFilter.length == 0 && nameInput.length > 0)
        {
            flightsAfterFilter = props.flights.filter((flight) => 
            {let nameSoFar = flight.company.substring(0,nameInput.length);
                if (nameSoFar == nameInput)
                    return flight});
        }

        setFilteredFlights(flightsAfterFilter);
        
    }

    const filterTravelersLowToHigh = () => {
        let lowestTravelersNum = 9999;
        let AllFlights = []
        let newFilteredFlights = [];
        let amountToRemove = 0;

        for (let i = 0; i < filteredFlights.length; i++)
            AllFlights = [...AllFlights, filteredFlights[i]]
        
        for ( let j = 0; j < filteredFlights.length;)
        {
            for (let i = 0; i < AllFlights.length; i++)
            {
                if (AllFlights[i].travelersNum <= lowestTravelersNum)
                    lowestTravelersNum = AllFlights[i].travelersNum
            }

            for (let i = 0; i < AllFlights.length; i++)
            {
                if (AllFlights[i].travelersNum == lowestTravelersNum)
                {
                    newFilteredFlights = [...newFilteredFlights, AllFlights[i]];
                    amountToRemove++;
                }
            }

            j += amountToRemove;
            amountToRemove = 0;
            AllFlights = removeFlightFromArrByTravelers(AllFlights, lowestTravelersNum);
            lowestTravelersNum = 9999

        }

        setFilteredFlights(newFilteredFlights);

    }

    const filterTravelersHighToLow = () => {
        let highestTravelersNum = -1;
        let AllFlights = []
        let newFilteredFlights = [];
        let amountToRemove = 0;

        for (let i = 0; i < filteredFlights.length; i++)
            AllFlights = [...AllFlights, filteredFlights[i]]
        
        for ( let j = 0; j < filteredFlights.length;)
        {
            for (let i = 0; i < AllFlights.length; i++)
            {
                if (AllFlights[i].travelersNum >= highestTravelersNum)
                    highestTravelersNum = AllFlights[i].travelersNum
            }

            for (let i = 0; i < AllFlights.length; i++)
            {
                if (AllFlights[i].travelersNum == highestTravelersNum)
                {
                    newFilteredFlights = [...newFilteredFlights, AllFlights[i]];
                    amountToRemove++;
                }
            }

            j += amountToRemove;
            amountToRemove = 0;
            AllFlights = removeFlightFromArrByTravelers(AllFlights, highestTravelersNum);
            highestTravelersNum = -1

        }

        setFilteredFlights(newFilteredFlights);

    }

    const removeFlightFromArrByTravelers = (arr, travelersNum) => {

        let returnedArr = [];

        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i].travelersNum == travelersNum)
                continue;
            else
                returnedArr = [...returnedArr, arr[i]]
        }

        return returnedArr;

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
            {filteredFlights.map((flight) => {
                return <FlightPreview key={`activeFlight${flight.id}`} flightData = {flight} /> })}
            </div>
            <br />
        </div>
            
        <div>
            <div className='flexCol'>
                <br />
                <input type="text" onChange={filterByName} id='sortByName' className='inputLabel' placeholder='Enter company name' />
                <br />
                <select onChange={setFilterMethod} className='selectOptions' name="selectByTravelers" id='sortByTravelers'>
                    <option value="Choose">Choose sort type</option>
                    <option value="Low">From low to high</option>
                    <option value="High">From high to low</option>
                </select>
                <br />

                {sortMethod == 'Low' ? <button onClick={filterTravelersLowToHigh} className='clickBtn'>Sort</button> : 
                sortMethod == 'High' ? <button onClick={filterTravelersHighToLow} className='clickBtn'>Sort</button> : 
                sortMethod == 'Choose' ? <div className='chooseSortType'>Choose the way to sort by amount of travelers</div> : null}

                <br />
            </div>
        </div>

    </div>
  )
}
