import React, { useState, useEffect, useContext } from "react";
import "./devices.css"
import Connect from "../../components/connect/connect";
import { Context } from "../../app";

function Devices() {

    const app = useContext(Context)

    useEffect(()=>{
        app.setPage("devices")
    }, [app])
    
    return(
        <div className="devices">
            <h1>Devices</h1>
            <Connect />
        </div>
    )
}

export default Devices