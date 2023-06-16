import React, { useState, useEffect, useContext } from "react";
import "./runButtons.css"
import { Context } from "../../app";

function RunButtons(props) {
    
    const app = useContext(Context)

    return(
        <div className="runButtons">
            {
                   
                <button onClick={()=>window.server.runAll()} style={{pointerEvents:`${app.connected.some((item)=>!item.state)?"none":""}`}}>{ app.connected.some((item)=>!item.state)?"All devices must be conneted":"Run"}</button>
            }
            <div className="traySelection">
                <button onClick={()=>{
                    let selectedIndexes = [] 
                    document.querySelectorAll(".trayOption").forEach((item,ind)=>{
                        // console.log(item.className)
                        if (item.className.includes("traySelected")) selectedIndexes.push(ind)
                    })
                    console.log("indexes", selectedIndexes)
                    app.eel.runSelected(selectedIndexes)
                }}>Run Selected</button>
                <div className="selectTrays">
                    <div className="trayOption">1</div>
                    <div className="trayOption">2</div>
                    <div className="trayOption">3</div>
                    <div className="trayOption">4</div>
                    <div className="trayOption">5</div>
                    <div className="trayOption">6</div>
                    <div className="trayOption">7</div>
                    <div className="trayOption">8</div>
                    <div className="trayOption">9</div>
                    <div className="trayOption">10</div>
                </div>
            </div>
        </div>
    )
}

export default RunButtons