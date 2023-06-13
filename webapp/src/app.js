import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import HomePage from "./pages/home/homePage";
import Splash from "./pages/splash/splash";
import DashBoard from "./pages/dashboard/dashboard";
import Capture from "./pages/capture/capture";
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
    {device: "spectrometer", state: false},
    {device: "pdg", state: false},
    {device: "laser", state: false},
    {device: "robot", state :false}
  ])


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
    setConnected: setConnected
    
  }

  return (
    
    <BrowserRouter>
      <Context.Provider value={app} >
        <Navbar expanded={navbar} setExpanded={setNavbar} />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/capture" element={<Capture />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>

  );
}

export default App;
