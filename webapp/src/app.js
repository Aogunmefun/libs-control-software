import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import './app.css';
import HomePage from "./pages/home/homePage";
import Splash from "./pages/splash/splash";
import DashBoard from "./pages/dashboard/dashboard";
import Capture from "./pages/capture/capture";
import Devices from "./pages/devices/devices";
import Camera from "./pages/camera/camera";
import Storage from "./pages/storage/storage";
import Navbar from "./components/sidnav/sidenav"


export const Context = React.createContext()

function App() {

  // const [grid, setGrid] = useState(Array(720).fill(0))
  // const [grid, setGrid] = useState(predictions)
  // const [index, setIndex] = useState(0)
  const [index, setIndex] = useState([0,0])
  const [data, setData] = useState([
    // {libs: 1, assay: 2, id:111},
    // {libs: 2, assay:4, id: 222},
    // {libs: 3, assay: 6, id: 333},
    // {libs: 4, assay:8, id: 444}
  ])
  const [navbar, setNavbar] = useState(true)
  const [connected, setConnected] = useState([
    {device: "Spectrometer", state: false, connectType: "Channels", options:[]},
    {device: "PDG", state: false, connectType: "Port:", options: []},
    {device: "Laser", state: true},
    {device: "Robot", state :false, connectType: "IP:", options: []},
  ])
  const [server, setServer] = useState({
    connected: false,
    
  })
  const [page, setPage] = useState("splash")
  const [storage, setStorage] = useState(["F:/"])
  const [explorer, setExplorer] = useState([])
  const [file, setFile] = useState("F:/LIBS DB")



  const app = {

    // grid:grid,
    // setGrid:setGrid,
    index: index,
    setIndex: setIndex,
    samples: [
      
  ],
    data:data,
    setData: setData,
    navbar: navbar,
    setNavbar: setNavbar,
    connected: connected,
    setConnected: setConnected,
    server: server,
    setServer: setServer,
    page: page,
    setPage: setPage,
    storage: storage,
    setStorage: setStorage,
    explorer: explorer,
    setExplorer: setExplorer,
    file: file,
    setFile: setFile
    
  }

  window.server.response((event, val) => {
    console.log(val)
    let temp = connected
    if (val.function === "connectPDG") {
      if (val.res) {
        temp[1].state = true
      }
      else {
        temp[1].state = false
      }
    }
    else if (val.function === "connectSpectrometer") {
      if (val.res) {
        console.log("Yo")
        temp[0].state = true
      }
      else {
        temp[0].state = false
      }
    }
    else if (val.function === "connectRobot") {
      if (val.res) {
        temp[3].state = true
      }
      else {
        temp[3].state = false
      }
    }
    setConnected([...temp])
  })

  useEffect(()=>{
    
    

  }, [file])

  return (
    
    <HashRouter>
      <Context.Provider value={app} >
        <Navbar expanded={navbar} setExpanded={setNavbar} />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/storage" element={<Storage />} />
        </Routes>
      </Context.Provider>
    </HashRouter>

  );
}

export default App;
