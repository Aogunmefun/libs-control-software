import React, { useState, useEffect } from 'react';
import './app.css';
import axios from 'axios';
import Modal from "./components/modal/modal"

function App() {

  const [modal, setModal] = useState({text:"", state:false, action:false})

  const queryUpdate = async ()=>{
    let res = await window.server.queryUpdate()
    if (res.res === false) {
      setModal({text:"Error querying if there is an update. Check server and try again.", state:true, action:false})
    }
    else if (res.update === true) {
      setModal({text: "There is a newer update available. Would you like to download it?", state:true, action:true})
    }
    console.log(res)
  }

  const downloadUpdate = async ()=>{
    console.log("About to fetch update")
    let res = await window.server.getUpdate()
    console.log("downloading", res)
  }

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
      <Modal 
        modal={modal}
        setModal = {setModal}
        action={downloadUpdate}
      />
      <button onClick={()=>queryUpdate()}>Check for Update</button>
    </div>
  );
}

export default App;
