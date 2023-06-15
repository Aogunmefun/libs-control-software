import React, { useState, useEffect, useContext } from "react";
import "./storage.css"
import { Context } from "../../app";

function Storage() {
    
    const app = useContext(Context)
    const [storage, setStorage] = useState("")

    const changeStorage = (ev)=>{
        ev.preventDefault()
        console.log(ev.target.value)
        setStorage(ev.target.value)
    }

    const addStorage = async ()=>{
        // app.setStorage([...app.storage, storage])
        // setStorage("")
        const dirHandle = await window.showDirectoryPicker();
        console.log(dirHandle)
    }

    return(
        <div className="storage">
            <h1>Storage</h1>
            <div className="storageDrives">
                {
                    app.storage.map((storage,index)=>{
                        return(
                            <div className="storageDrive">
                                <p>{storage}</p>
                            </div>
                        )
                    })
                }
                <button className="btn--flat"><i className="material-icons-outlined">add_circle_outline</i></button>
            </div>
           <dialog open className="addDrive">
                <p>Select Location</p>
                <input directory="" webkitdirectory="" type="file" value={storage} onChange={changeStorage}  />
                <div className="buttonRow">
                    <button onClick={addStorage} className="btn--flat"><i className="material-icons">check</i></button>
                    <button className="btn--flat"><i className="material-icons">cancel</i></button>
                </div>
           </dialog>
        </div>
    )
}

export default Storage