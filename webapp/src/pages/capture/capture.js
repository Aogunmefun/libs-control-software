import React, { useState, useContext, useEffect } from "react";
import "./capture.css"
import { Context } from "../../app";
import Tray from "../../components/tray/tray"
import DataRun from "../../components/dataRun/dataRun";
import Explorer from "../../components/explorer/explorer";
import Tabs from "../../components/tabs/tabs";
import axios from "axios"

function Capture() {
    
    const app = useContext(Context)
    const [trays, setTrays] = useState([])
    const [index, setIndex] = useState([0,0])
    const [page, setPage] = useState("Capture")

    useEffect(()=>{
        app.setPage("capture")
    },[app])

    const getMap = ()=>{
        axios({
            url:"http://localhost:5000/getMap",
            method:"GET"
        }).then((res)=>{
            let temp = []
            for (let i = 0; i < 10; i++) {
                temp.push(JSON.parse(res.data.res)[i])
            } 
            console.log(temp)
            app.setTrays(temp)
        }).catch((e)=>console.log(e))
    }

    return(
        <div className="capture">
            <h1>Capture</h1>
            {/* <Tabs pages={["Capture", "Load"]} page={page} setPage={setPage} /> */}
            {/* <Explorer /> */}
            <button onClick={()=>getMap()} className="btn--flat">Get Map <i className="material-icons-outlined">file_download</i></button>
            {
                page==="Capture"
                ?<DataRun trays={app.trays} />
                :""
            }
            
            
        </div>
    )
}

export default Capture