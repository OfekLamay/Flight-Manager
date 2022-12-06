import './App.css';
import {useState} from 'react';
import {HashRouter as Router, Routes , Route} from 'react-router-dom';
import Home from './components/Home';

import ControlPanel from './components/ControlPanel';
import SortFlights from './components/SortFlights';
import DeleteFlight from './components/DeleteFlight';
import NewFlight from './components/NewFlight';

function App() {

  const [allFlights, setAllFlights] = useState([
    {id: 1234, company: "EL-AL", travelersNum: 230},
    {id: 2234, company: "EL-AL", travelersNum: 232},
    {id: 4234, company: "Arkia", travelersNum: 220},
    {id: 5234, company: "Arkia", travelersNum: 222},
    {id: 6234, company: "Arkia", travelersNum: 223},
    {id: 7234, company: "Arkia", travelersNum: 224}
  ])

  const addFlight = (flight) => {
    setAllFlights([...allFlights, flight])
  }

  const deleteFlightById = (id) => {
    let afterDeleteFlights = []
    for (let i = 0; i < allFlights.length; i++)
    {
      if (id == allFlights[i].id)
      {}
      else
      afterDeleteFlights = [...afterDeleteFlights, allFlights[i]]
    }
    setAllFlights(afterDeleteFlights);
  }

  // {id: , company: , travelersNum: }

  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path={'/'} element={<Home  />} />
            <Route path={'/controlpanel/sort'} element={ <SortFlights flights={allFlights}/>} />
            <Route path={'/controlpanel/add'} element={<NewFlight flights={allFlights} addFlight={addFlight}/>} />
            <Route path={'/controlpanel/delete'} element={<DeleteFlight flights={allFlights} DeleteFlightById={deleteFlightById} />} />
            <Route path={'/controlpanel'} element={<ControlPanel flights={allFlights} />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
