import React, { useState, useContext } from "react";
import "./connect.css"
import { Context } from "../../app";
import Modal from "../modal/modal"
import axios from "axios";


function Connect(props) {
    
    const [busy, setBusy] = useState("")
    const [modal, setModal] = useState({state:false, text:""})
    const [ports, setCom] = useState("")

    const app = useContext(Context)

    const connect = (device, connect)=>{
        axios({
            url:"/connect",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data: {
                function: device,
                arguments:[connect]
            }
        }).then((res)=>{
            console.log(res.data)
            let temp = app.connected
            temp = temp.map((dev)=>{
                if (dev.function === device) {
                    return {...dev, state:res.data.res}
                }
                else{
                    return dev
                }
            })
            app.setConnected(temp)
            
        }).catch((e)=>console.log(e))
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
                                        device.state?
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
                                <button onClick={()=>connect(device.function, device.state?false:true)} className={"connect"+device.device}>{device.state?"Disconnect":"Connect"}</button>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Connect