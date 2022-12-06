import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()

    const areDetailsValid = () => {
        let date = new Date().toJSON().slice(0, 10).toString();
        let password = document.getElementById("password").value

        if (password == date)
            navigate('controlpanel')
        else
            alert("Wrong password, try again");
    }

  return (
    <div >
        <h1>WELCOME!</h1>
        <br/>
        <div className='flexCol'>
            <br /><br />
            <input type="text" minLength={0} maxLength={10} id='password' className='inputLabel' placeholder='Enter password' />
            <br /><br />
            <button onClick={areDetailsValid} className='clickBtn'>Enter</button>
            <br /><br />
        </div>
    </div>
  )
}
