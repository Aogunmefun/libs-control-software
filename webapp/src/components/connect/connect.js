import React, { useState, useContext } from "react";
import "./connect.css"
import { Context } from "../../app";
import Modal from "../modal/modal"


function Connect(props) {
    
    const [busy, setBusy] = useState("")
    const [modal, setModal] = useState({state:false, text:""})
    const [ports, setCom] = useState("")

    const app = useContext(Context)


    const connectSpectrometer = (val)=>{
        setBusy(true)
        app.eel.connectSpectrometer(val)((res)=>{
            setBusy(false)
            if(val) {
                if (res) {
                    app.setConnected({
                        ...app.connected,
                        spectrometer:val
                        })
                }
                else {
                    setModal({
                        state:true,
                        text:"Make sure that Both Channels of Spectrometer are connected"
                    })
                }
            }
            else {

            }
            
        })
    }

    const connectPDG = (val)=>{
        setBusy(true)
        app.eel.connectPDG(val)((res)=>{
            setBusy(false)
            if(val){
                if (res) {
                    app.setConnected({
                        ...app.connected,
                        pdg:true
                    })
                }
                else {
                    setModal({state:true, text:"Failed to Connect to PDG. Make sure USB is connected"})
                }
            }
            else {
                if(res) {
                    app.setConnected({
                        ...app.connected,
                        pdg:false
                    })
                }
                else {
                    setModal({state:true, text:"Failed to Close PDG connection"})
                }
            }
            
        })
    }

    const connectLaser = (val) =>{
        setBusy(false)
        app.eel.connectLaser()(()=>{
            app.setConnected({
                ...app.connected,
                laser:  !app.connected.laser
            })
        })
    }

    const connectRobot = (val)=>{
        setBusy(true)
        
        app.eel.connectRobot(val)((res)=>{
            setBusy(false)
            if(val) {
                if(res) {
                    app.setConnected({
                        ...app.connected,
                        robot: true
                    })
                }
                else {
                    setModal({state:true, text:"Failed to Connect to robot"})
                }
            }
            else {
                if (res) {
                    app.setConnected({
                        ...app.connected,
                        robot:false
                    })
                }
                else {
                    setModal({state:true, text:"Failed to disconnect from robot"})
                }
            }
            
        })
        

    }

    return(
        <div className="connect">
            <Modal close={true} modal={modal} setModal={setModal} />
            {app.page==="devices"?<button className="btn--flat"><i className="material-icons">refresh</i></button>:""}
            <div className="connectBoxes">
                {
                    app.connected.map((device,index)=>{
                        if (device.device !== "Laser") return(
                            <div key={"DeviceConnect"+device.device} className="connectBox">
                                <p>{device.device}</p>
                                <div className="connectStatus">
                                    {
                                        device.status?
                                        <i className="material-icons">usb</i>:
                                        <i style={{color:"var(--gray)"}} className="material-icons">usb_off</i>
                                    }
                                </div>
                                {
                                    app.page === "devices"?
                                    <div className="connectField">
                                        <p>{device.connectType}</p>
                                        <select >
                                            <option value=""></option>
                                            {
                                                device.options?.map((option,index)=>{
                                                    return(
                                                        <option key={"ConnectionOption"+device.connectType+option} value={option}>{option}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>:""
                                }
                                <button onClick={()=>window.server.connect(device.device)} className={"connect"+device.device}>{device.status?"Disconnect":"Connect"}</button>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Connect