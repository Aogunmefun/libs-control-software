import React, { useState, useEffect, useContext } from "react"
import "./measurement.css"
import { Context } from "../../app"
import Modal from "../modal/modal"


function Measurement(props) {
    
    const [msmName, setMsmName] = useState("my measurement")
    const [frames, setFrames] = useState("")
    const [period, setPeriod] = useState(50000)
    const [uvExposure, setUVExposure] = useState(10000)
    const [visibleExposure, setVisibleExposure] = useState(10000)
    const [busy, setBusy] = useState(false)
    const [modal, setModal] = useState({state:false, text:""})
    

    const app = useContext(Context)

    useEffect(()=>{
        // setUVExposure(uvExposure + " us")
    }, [uvExposure])

    const changeMsmName = (ev)=>{
        setMsmName(ev.target.value)
    }

    const changeFrames = (ev)=>{
        if (ev.target.value.length === 0) setFrames("")
        if (!parseInt(ev.target.value)) return
        setFrames(ev.target.value)
    }

    const changePeriod = (ev)=>{
        // if (typeof ev.target.value === "string") return
        if (ev.target.value.length === 0) setPeriod("")
        if (!parseInt(ev.target.value)) return
        setPeriod(ev.target.value)
    }

    const changeUVExposure = (ev)=>{
        console.log(parseInt(ev.target.value))
        if (ev.target.value.length === 0) setUVExposure("")
        if (!parseInt(ev.target.value)) return
        if(ev.target.value === "e") return
        setUVExposure(ev.target.value)
    }

    const changeVisibleExposure = (ev)=>{
        if (ev.target.value.length === 0) setVisibleExposure("")
        if (!parseInt(ev.target.value)) return
        setVisibleExposure(ev.target.value)
    }

    const startRoutine = ()=>{
        setBusy(true)
        // console.log("busy", busy)
        if(!uvExposure||!visibleExposure||!msmName||!frames) {
            setModal({state:true, text:"Please make sure all configuration fields are filled in"})
            setBusy(false)
            return
        }
        // if(!.spectrometer||!props.connected.laser||!props.connected.laser)
        console.log("uvexposure", uvExposure, "period", period)
        app.eel.beginRoutine(msmName, parseInt(uvExposure), parseInt(visibleExposure), parseInt(period), parseInt(frames))((res)=>setBusy(false))
        
        // setBusy(false)
    }

    return(
        <div className="measurement">
            <Modal close={true} modal={modal} setModal={setModal} />
            {   
                !props.connected.pdg?
                <p>Make sure all devices are connected</p>
                :<button onClick={startRoutine} className={`${busy?"disabled":""}`}>Run</button>
            }
            <div className="msmSection">
                <p style={{fontSize:"18px", color:"var(--primaryColor)"}}>Measurement Config</p>
                <form className="msmForm" >
                    
                    <div className="msmInput">   
                        {/* <p>Measurement Name:</p> */}
                        <label htmlFor="msmName">Measurement Name:</label>
                        <input id="msmName" type="text" placeholder="Measurement Name" value={msmName} onChange={changeMsmName} />
                        {/* <i className="material-icons">check</i> */}
                    </div>
                    <div className="msmInput">
                        <label htmlFor="frames">Frame Number:</label>
                        <input id="frames" type="number" placeholder="Enter numer of frames" value={frames} onChange={changeFrames}  />
                    </div>
                    <div className="msmInput">
                        <label htmlFor="pdgPeriod">PDG period:</label>
                        <input id="pdgPeriod" type="number" placeholder="PDG Period" value={period} onChange={changePeriod} />
                    </div>
                    <div className="msmInput">
                        <label htmlFor="uvExposure">UV Exposure (Channel A):</label>
                        <input id="uvExposure" type="number" placeholder="UV exposure time" value={uvExposure} onChange={changeUVExposure} />
                        <span className="unitInput">us</span>
                    </div>
                    <div className="msmInput">
                        <label htmlFor="visibleExposure">Visible Exposure (Channel B):</label>
                        <input id="visibleExposure" type="number" placeholder="Visible exposure time" value={visibleExposure} onChange={changeVisibleExposure} />
                        <span className="unitInput">us</span>
                    </div>

                </form>
                
               
            </div>
        </div>
    )
}

export default Measurement