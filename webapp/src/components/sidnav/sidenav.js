import React, {useEffect, useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import "./sidenav.css"
import Loader from "../loader/loader"

function Sidenav(props) {

    let navigate = useNavigate()

    useEffect(()=>{
        // console.log(document.querySelector(".tab--active"))
        
        
    },[])

    const handleChange = (el)=>{
        
        
    }


    return(
        <div className={`sidenav-container ${props.expanded?"sideContainerout":""}`}>
            <div className="sidenav">
                <button onClick={()=>props.setExpanded(!props.expanded)} className="btn--sidenav">
                    <i className="material-icons">{props.expanded?"close":"menu"}</i>
                    <p>{props.expanded?"Close":"Open"}</p>
                </button>
                <button onClick={()=>navigate("/dashboard")} className="btn--sidenav">
                    <i className="material-icons-outlined">dashboard</i>
                    <p>Dashboard</p>
                </button>
                <button onClick={()=>navigate("/capture")} className="btn--sidenav">
                    <i className="material-icons-outlined">camera</i>
                    <p>Capture</p>
                </button>
                <button onClick={()=>navigate("/storage")} className="btn--sidenav">
                    <i className="material-icons-outlined">folder</i>
                    <p>Storage</p>
                </button>
            </div>
            
           
        </div>
        
        
        
    )
}

export default Sidenav