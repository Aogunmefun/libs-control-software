import React, { useState, useContext, useEffect } from "react";
import "./capture.css"
import { Context } from "../../app";
import Tray from "../../components/tray/tray"
import DataRun from "../../components/dataRun/dataRun";

function Capture() {
    
    const app = useContext(Context)
    const [trays, setTrays] = useState([
        [18006027550,
            17502452100,
        18006038550,
        18006090550,
        18006084550,
        ],
            [18006035550,
        18006058550,
        17502436100,
        17001280550,
        17001365550,
        ],
            [17001273550,
        18005986550,
        17001282550,
        17001335550,
        17001284550
        ],
            [17001320550,
        17001293550,
        17507146550,
        17001292550,
        17507136550
        ],
            [17001315550,
        17502388100,
        17507191550,
        18006018550,
        18006041550
        ],
            [17001373550,
        17001354550,
        17502476100,
        18006063550,
        17001343550
        ],
            [17001316550,
        17502394100,
        17507193550,
        17001327550,
        17507199550
        ],
            [17502396100,
        17502421100,
        17502463100,
        17507126550,
        17507138550
        ],
            [17507106550,
        17001313550,
        17507099550,
        17507089550,
        17001355550
        ],
            [17001338550,
        17001308550,
        17001279550,
        17001366550,
        17507155550
        ]
    ])
    const [index, setIndex] = useState([0,0])

    useEffect(()=>{
        app.setPage("capture")
    },[app])

    return(
        <div className="capture">
            <h1>Capture</h1>
            {/* <DataRun trays={trays} /> */}
            
        </div>
    )
}

export default Capture