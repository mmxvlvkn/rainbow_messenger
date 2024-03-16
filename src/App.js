import {Route, Routes} from 'react-router-dom'
import {News} from './pages/News'
import React, {useState} from 'react'
import ColorProvider from './providers/ColorProvider'

function App() {
  console.log(process.env)

  return (
    <>
        <Routes>
          <Route path="/" element={<News/>}/>
        </Routes>
    </>
  );
}

export default App;
