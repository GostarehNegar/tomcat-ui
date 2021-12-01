import React, { useState, useEffect } from "react";
import Bot from './components/bot'
import Mohsen from './Mohsen'

function App() {
  const [bots, setBots] = useState([])
  const [createNewBot, setCreateNewBot] = useState(false)
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((response) => {
        return response.json()
      }).then((res) => {
        setBots(res);
      })
  }, [])
  return (
    <>
      {bots.map((bot) => {
        return (
          <>
            <Bot {...bot} />
          </>
        )
      })}
      {createNewBot ? <Mohsen /> : <button  onClick={() => { setCreateNewBot(!createNewBot) }}>Create New Bot</button>}
    </>
  );
}

export default App;
