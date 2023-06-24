import React, { useState, useEffect, useContext } from "react"
import "./tray.css"
import { Context } from "../../app"

function Tray(props) {

    const app = useContext(Context)
    const [holders, setHolders] = useState(["","","","",""])
    const [index, setIndex] = useState(0)
    const [barcode, setBarcode] = useState("")
    // const [selected, setSelected] = useState()


    const changeSelected = ()=>{
        let temp = app.selected
        temp[props.index] = {index:props.index, selected:!temp[props.index].selected}
        app.setSelected([...temp])
    }

    useEffect(()=>{
        if (props.index===0) {
            console.log(document.querySelector(".select"))
        }
    })
    
    

    
    
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
            
            <input className="select" type="checkbox" checked={app.selected[props.index].selected} onChange={changeSelected} />
            {/* <button>{"Run Tray "+(props.index+1)}</button> */}
            
        </div>
    )
}

export default Tray