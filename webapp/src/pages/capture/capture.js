import React, { useState, useContext } from "react";
import "./capture.css"
import { Context } from "../../app";
import Tray from "../../components/tray/tray"

function Capture() {
    
    const app = useContext(Context)
    const [trays, setTrays] = useState([
        [18006027550,
            17502452100,
        18006038550,
        18006090550,
        18006084550,
        ],
            [18006035550,
        18006058550,
        17502436100,
        17001280550,
        17001365550,
        ],
            [17001273550,
        18005986550,
        17001282550,
        17001335550,
        17001284550
        ],
            [17001320550,
        17001293550,
        17507146550,
        17001292550,
        17507136550
        ],
            [17001315550,
        17502388100,
        17507191550,
        18006018550,
        18006041550
        ],
            [17001373550,
        17001354550,
        17502476100,
        18006063550,
        17001343550
        ],
            [17001316550,
        17502394100,
        17507193550,
        17001327550,
        17507199550
        ],
            [17502396100,
        17502421100,
        17502463100,
        17507126550,
        17507138550
        ],
            [17507106550,
        17001313550,
        17507099550,
        17507089550,
        17001355550
        ],
            [17001338550,
        17001308550,
        17001279550,
        17001366550,
        17507155550
        ]
    ])
    const [index, setIndex] = useState([0,0])

    return(
        <div className="capture">
            <h1>Capture</h1>
            <h3>Tower 1</h3>
            <div className="measurementInfo">
                    
                {/* <Measurement connected={connected} /> */}
                {/* <Camera /> */}
                
                <i className="material-icons">arrow_back_ios</i>
                <div className="sampleLoader">
                    {
                        trays.map((tray, index)=>{
                            return(
                            <Tray key={"tray"+index} 
                                index={index} 
                                tray={tray}
                                setIndex={setIndex} 
                                current = {app.index[0]===index?true:false}
                                sampleind = {app.index[1]}  
                                />
                            )
                        })
                    }
                </div>
                <i className="material-icons">arrow_forward_ios</i>
                
            </div>
            <div className="capture-buttons">
                {
                   
                    <button style={{pointerEvents:`${app.connected.some((item)=>!item.state)?"none":""}`}}>{ app.connected.some((item)=>!item.state)?"All devices must be conneted":"Run"}</button>
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
        </div>
    )
}

export default Capture