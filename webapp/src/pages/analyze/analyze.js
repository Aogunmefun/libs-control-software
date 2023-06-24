import React, { useState, useEffect } from "react";
import "./analyze.css"
import Explorer from "../../components/explorer/explorer";
import Tabs from "../../components/tabs/tabs";
import Graph from "../../components/graph/graph"
import Chart, { Colors, Tooltip } from 'chart.js/auto';



function Analyze() {

    const [contents, setContents] = useState({})
    const [pages, setPages] = useState(["Table", "Graph"])
    const [page, setPage] = useState("Table")
    const [graph, setGraph] = useState([{x:5,y:10}])
    

    useEffect(()=>{
        // if (page==="Graph") {
        //     let temp = contents.libsPeaks?.map((peaks, index)=>{
        //         return(
        //             {x: peaks, y: contents.assayValue[index]}
        //         )
        //     })
        //     console.log("Graph", temp)
        //     setGraph(temp)    
        // }
        // console.log("document", document.getElementById("graph"))
        // if (document.getElementById("graph")) {
        //     let chart = new Chart(
        //         document.getElementById("graph"),
        //         {
        //             type: 'scatter',
        //             data: {
        //                 labels: contents.libsPeaks,
        //                 datasets: [
                            
        //                     {
        //                         label: "Assay Values vs LIBS peaks",
        //                         data: contents.assayValue,
        //                         pointBackgroundColor: "black",
        //                         pointHoverRadius: 10,
        //                         pointHoverBackgroundColor: "black"
        //                     }
        //                 ]
        //             },
        //             options: {
        //                 color: "FFFFFF",
        //             }
        //         }
        //     )
        // }
        
        
    }, [page])
    

    return(
        <div className="analyze">
            
            <Explorer 
                setContents={setContents}
            />
            <Tabs 
                pages={pages}
                page={page}
                setPage={setPage}
            />
            {
                page==="Table"
                ?<div className="analysisTable">
                <div className="analysisColumn">
                    <h3>SampleID</h3>
                        {
                            contents.sampleID?.map((id)=>{
                                return(
                                    <p>{id}</p>
                                )
                            })
                        }
                    </div>
                    <div className="analysisColumn">
                        <h3>LIBS Peaks</h3>
                        {
                            contents.libsPeaks?.map((peaks)=>{
                                return(
                                    <p>{peaks}</p>
                                )
                            })
                        }
                    </div>
                    <div className="analysisColumn">
                        <h3>Prediction</h3>
                        {
                            contents.prediction?.map((prediction)=>{
                                return(
                                    <p>{prediction}</p>
                                )
                            })
                        }
                    </div>
                    <div className="analysisColumn">
                        <h3>AssayValue</h3>
                        {
                            contents.assayValue?.map((assay)=>{
                                return(
                                    <p>{assay}</p>
                                )
                            })
                        }
                    </div>
                    <div className="analysisColumn">
                        <h3>Error</h3>
                        {
                            contents.error?.map((error)=>{
                                return(
                                    <p>{error}</p>
                                )
                            })
                        }
                    </div>

                </div>
                :<Graph contents={contents} />
                
            }
            <h1>Analyze</h1>
            
        </div>
    )
}

export default Analyze