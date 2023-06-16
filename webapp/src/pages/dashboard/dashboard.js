import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css"
import Connect from "../../components/connect/connect";
import { Context } from "../../app";
import Explorer from "../../components/explorer/explorer";

function DashBoard(props) {
    
    const app = useContext(Context)

    useEffect(()=>{
        app.setPage("dashboard")
    },[app])

    return(
        <div className="dashboard">
            <Explorer />
            <h1>Dashboard</h1>
            <Connect />
        </div>
    )
}

export default DashBoard

