import React, { useState, useEffect } from "react"
import "./tray.css"

function Tray(props) {

    const [holders, setHolders] = useState(["","","","",""])
    const [index, setIndex] = useState(0)
    const [barcode, setBarcode] = useState("")

    useEffect(()=>{

    }, [index])
    
    

    
    
    return(
        <div className="tray">
            <div className="trayHolder">
            {
                props.tray.map((holder,holderindex)=>{
                    return(
                        <div style={{backgroundColor:`${props.current&&props.sampleind===holderindex?"var(--primaryColor)":""}`}} key={"Tray"+props.index+"holder"+holderindex} onClick={()=>{
                                props.setIndex([props.index, holderindex])
                                // document.querySelector("[data-modal]").showModal()
                            }} className="holder">
                            {holder}
                        
                        </div>
                    )
                })
            }
            </div>
            
            <button>{"Run Tray "+(props.index+1)}</button>
            
        </div>
    )
}

export default Tray