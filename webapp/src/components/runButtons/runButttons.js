import React, { useState, useEffect, useContext } from "react";
import "./runButtons.css"
import { Context } from "../../app";
import axios from "axios"
import Modal from "../../components/modal/modal";

function RunButtons(props) {
    
    const app = useContext(Context)
    const [modal, setModal] = useState({text: "Running...", state: false})

    const runAll = ()=>{
        setModal({text: "Running...", state: true})
        console.log(app.selected.filter((tray,index)=>tray.selected).map((tray,index)=>tray.index))
        axios({
            url:"http://"+app.config.serverIp+":"+app.config.serverPort+"/runSelected",
            method:"POST",
            headers:{"Content-Type":"application/json"},
            data: {
                indexes:app.selected.filter((tray,index)=>tray.selected).map((tray,index)=>tray.index)
            }
        }).then((res)=>{
            setModal({text:"", state: false})
            if (res.data.res) {
                alert("Finished running")
            }
            else {
                alert("Error encountered while running")
            }
        }).catch((e)=>{
            alert("Error encountered while running")    
        })
    }

    return(
        <div className="runButtons">
            <Modal
                modal={modal}
                close={false}
                setModal={setModal}
            />
            {
                   
                <button onClick={()=>runAll()} style={{}}>{ app.connected.some((item)=>!item.state)?"All devices must be conneted":"Run"}</button>
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