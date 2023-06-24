import React, { useState, useEffect, useContext } from "react";
import "./explorer.css"
import { Context } from "../../app";
import Folder from "../folder/folder";
import Modal from "../../components/modal/modal";
import axios from "axios"


function Explorer(props) {
    
    const app = useContext(Context)
    const [path, setPath] = useState("F:/LIBS DB")
    const [dir, setDir] = useState([])
    const [modal, setModal] = useState({text: "Loading...", state: false})

    useEffect(()=>{
        getDir()
    },[path])

    const getDir = async ()=>{
        // let res = await window.server.getFiles(path)
        // setDir(res)
        // console.log(res)
        axios({
            url: "http://"+app.config.serverIp+":"+app.config.serverPort+"/getDir",
            method: "GET",
        }).then((res)=>{
            console.log(res.data.res)
            if (res.data.res) {
                setDir(res.data.res)
            }
            else {
                alert("Can't querry DB structure")
            }
        }).catch((e)=>alert("Error querrying DB structure"))
    }

    const analyze = (folder)=>{
        setModal({text: "Loading...", state: true})
        axios({
            url: "http://"+app.config.serverIp+":"+app.config.serverPort+"/analyze",
            method: "POST",
            headers: {"Content-Type":"application/json"},
            data:{
                folder: folder
            }
        }).then((res)=>{
            console.log(res.data)
            props.setContents(res.data.res)
            setModal({text:"", state: false})
        }).catch((e)=>console.log(e))
    }

    return(
        <div className="explorer">
            <Modal
                modal={modal}
                close={false}
                setModal={setModal}
            />
            <h1>Explorer</h1>
            {
                dir?.map((dir, index)=>{
                    return(
                        <div className="explorerFolder">
                            <div className="explorerFolderTitle">
                                <i className="material-icons">schedule</i>
                                <p>{dir.date}</p>
                            </div>
                            {
                                dir.runs.map((run)=>{
                                    return(
                                        <div className="explorerFolder explorerRun">
                                            <div onClick={()=>analyze(dir.date+"/runs/"+run)} className="explorerFolderTitle">
                                                <i className="material-icons">123</i>
                                                <p>{run}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* {
                                dir.sessions.map((session)=>{
                                    return(
                                        <div className="explorerFolder sessionFolder">
                                            <div className="explorerFolderTitle">
                                                <i className="material-icons">view_agenda</i>
                                                <p>{session.name}</p>
                                            </div>
                                            {
                                                session.runs.map((run)=>{
                                                    return(
                                                        <div className="explorerFolder explorerRun">
                                                            <div className="explorerFolderTitle">
                                                                <i className="material-icons">123</i>
                                                                <p>{run.name}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            } */}
                            
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Explorer