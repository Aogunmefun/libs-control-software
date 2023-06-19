import React, { useState, useEffect, useContext } from "react";
import "./explorer.css"
import { Context } from "../../app";
import Folder from "../folder/folder";
import axios from "axios"


function Explorer(props) {
    
    const app = useContext(Context)
    const [path, setPath] = useState("F:/LIBS DB")
    const [dir, setDir] = useState([])

    useEffect(()=>{
        getDir()
    },[path])

    const getDir = async ()=>{
        // let res = await window.server.getFiles(path)
        // setDir(res)
        // console.log(res)
        axios({
            url: "/getDir",
            method: "GET"
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

    return(
        <div className="explorer">
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
                                            <div className="explorerFolderTitle">
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