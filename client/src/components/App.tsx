import React from 'react';
import { GlobalStateProvider } from "../utils/GlobalStateProvider";
import Layer from './Layer';
import { login } from '../api/login'

function App() {
  login('spotify')
  
  return (
    <div className="App">
      <GlobalStateProvider>
        <Layer />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
