import React, { useState, useEffect, useContext } from "react";
import "./dataRun.css"
import Tray from "../tray/tray";
import { Context } from "../../app";
import RunButtons from "../runButtons/runButttons";

function DataRun(props) {
    
    const app = useContext(Context)
    

    return(
        <div className="dataRun">
            <h3>Tower 1</h3>
            <div className="dataRunMap">
                {/* <Measurement connected={connected} /> */}
                <div className="sampleLoader">
                    {
                        props.trays.map((tray, index)=>{
                            return(
                            <Tray key={"tray"+index} 
                                index={index} 
                                tray={tray}
                                // setIndex={setIndex} 
                                current = {app.index[0]===index?true:false}
                                sampleind = {app.index[1]}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <RunButtons />

        </div>
    )
}

export default DataRun