import React, { useState } from "react";
import "./modal.css"


function Modal(props) {
    
    const action = ()=>{
        console.log("action")
    }

    return(
        props.modal.state?<div className="modal">
            <h5>{props.modal.text}</h5>
            {props.close===null||props.close===undefined||props.close===true?<button onClick={()=>{props.setModal({state:false, text:""})}}>Close</button>:""}
            {
                props.modal.action?
                <button onClick={()=>props.action()} className="btn--flat">Download <i className="material-icons-outlined">file_download</i></button>
                :""
            }
        </div>
        :""
    )
}

export default Modal