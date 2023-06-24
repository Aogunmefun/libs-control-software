import React, { useState, useContext, useEffect } from "react";
import "./graph.css"
import { Context } from "../../app";
import Chart, { Colors, Tooltip } from 'chart.js/auto';
import { toFont } from 'chart.js/helpers'

function Graph(props) {

    const app = useContext(Context)

    useEffect(()=>{
        console.log("dataPoints", app.data)
    }, [app.data])
    
    const pointDetails = (ctx)=>{
        
    }

    useEffect(()=>{
        let chart = new Chart(
            document.getElementById("graph"),
            {
                type: 'scatter',
                data: {
                    labels: props.contents.libsPeaks,
                    datasets: [
                        
                        {
                            label: "Assay Values vs LIBS peaks",
                            data: props.contents.assayValue,
                            pointBackgroundColor: "black",
                            pointHoverRadius: 10,
                            pointHoverBackgroundColor: "black"
                        }
                    ]
                },
                options: {
                    color: "black",
                    tickColor: "white",
                    plugins:{
                        tooltip: {
                            enabled: false,
                            external: function (ctx){
                                        console.log("ctx")
                                        // Tooltip Element
                                        let tooltipEl = document.getElementById('chartjs-tooltip');

                                        // Create element on first render
                                        if (!tooltipEl) {
                                            console.log("no tooltip")
                                            tooltipEl = document.createElement('div');
                                            tooltipEl.id = 'chartjs-tooltip';
                                            tooltipEl.innerHTML = '<table></table>';
                                            document.body.appendChild(tooltipEl);

                                        }

                                        // Hide if no tooltip
                                        const tooltipModel = ctx.tooltip;
                                        if (tooltipModel.opacity === 0) {
                                            tooltipEl.style.opacity = 0;
                                            return;
                                        }

                                        // Set caret Position
                                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                                        if (tooltipModel.yAlign) {
                                            tooltipEl.classList.add(tooltipModel.yAlign);
                                        } else {
                                            tooltipEl.classList.add('no-transform');
                                        }

                                        function getBody(bodyItem) {
                                            return bodyItem.lines;
                                        }

                                        // Set Text
                                        if (tooltipModel.body) {
                                            let pointIndex = props.contents.libsPeaks.indexOf(tooltipModel.dataPoints[0].label)
                                            console.log()
                                            const titleLines = tooltipModel.title || [];
                                            const bodyLines = tooltipModel.body.map(getBody);
                                            console.log(bodyLines)

                                            let innerHtml = '<thead>';

                                            titleLines.forEach(function(title) {
                                                innerHtml += '<tr><th> Sample: ' + props.contents.sampleID[pointIndex] + '</th></tr>';
                                            });
                                            innerHtml += '</thead><tbody>';

                                            bodyLines.forEach(function(body, i) {
                                                const colors = tooltipModel.labelColors[i];
                                                let style=""
                                                // let style = 'background:' + colors.backgroundColor;
                                                // style += '; border-color:' + colors.borderColor;
                                                // style += '; border-width: 2px';
                                                const span = `<span style=${style}>libs: ${props.contents.libsPeaks[pointIndex]}, assay: ${props.contents.assayValue[pointIndex]}</span>`;
                                                innerHtml += '<tr><td>' + span + '</td></tr>';
                                            });
                                            innerHtml += '</tbody>';

                                            let tableRoot = tooltipEl.querySelector('table');
                                            tableRoot.innerHTML = innerHtml;
                                        }

                                        const position = ctx.chart.canvas.getBoundingClientRect();
                                        const bodyFont = toFont(tooltipModel.options.bodyFont);

                                        // Display, position, and set styles for font
                                        tooltipEl.style.opacity = 0.8;
                                        tooltipEl.style.position = 'absolute';
                                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                                        tooltipEl.style.font = bodyFont.string;
                                        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                                        tooltipEl.style.pointerEvents = 'none';
                                    }
                        }
                    }
                    
                }
                
            }
        )

        return ()=>{
            chart.destroy()
        }
    },[app.data])



    return(
        <div className="graph">
            <div className="dataPoints">
                <canvas id="graph"></canvas>
                <div  id="chartjs-tooltip"><table></table></div>
            </div>
            <div className="graphControls">
                <button onClick={()=>app.setData([])} className="btn--flat">Clear</button>
            </div>
        </div>
    )
}

export default Graph