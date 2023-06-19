import React, { useState } from "react";
import "./tabs.css"

function Tabs(props) {
    

    return(
        <div className="tabs">
            {
                props.pages.map((page)=>{
                    return(
                    <div className={`page ${props.page===page?"tabPageActive":""}`}>
                        <p onClick={()=>props.setPage(page)}>{page}</p>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Tabs