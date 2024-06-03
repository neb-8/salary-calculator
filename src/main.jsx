import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
  // console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions);
}

ReactDOM.createRoot(document.getElementById('root')).render(

  < React.StrictMode >
    <React.Profiler id="App" onRender={onRender}>
      <App />
    </React.Profiler>
  </React.StrictMode >,
)
