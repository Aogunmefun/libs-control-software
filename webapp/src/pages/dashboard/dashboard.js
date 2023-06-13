import React, { useState } from "react";
import "./dashboard.css"
import Connect from "../../components/connect/connect";

function DashBoard(props) {
    

    return(
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Connect />
        </div>
    )
}

export default DashBoard

