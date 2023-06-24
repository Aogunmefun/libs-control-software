import React, { useState, useContext } from "react";
import "./config.css"
import { Context } from "../../app";
import { useNavigate } from "react-router-dom";


function Config() {
    
    const app = useContext(Context)
    const [file, setFile] = useState("")
    let navigate = useNavigate()

    const changeFile = (ev)=>{
        console.log(ev.target.files[0])
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {

            app.setConfig(JSON.parse(event.target.result));
            navigate('/dashboard')

        });

        reader.readAsText(ev.target.files[0]);
    }


    return(
        <div className="config">
            <h1>Configuration</h1>
            <div className="configSelect">
                <p>Select Config file</p>
                <input type="file" value={file} onChange={changeFile}  />
            </div>
            
        </div>
    )
}

export default Config