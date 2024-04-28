import {Route, Routes} from 'react-router-dom'
import {News} from './pages/News.jsx'
import React, {useContext, useLayoutEffect} from 'react'
import ColorService from './services/ColorService.js';
import { ColorContext } from './providers/ColorProvider.jsx'
import { Header } from './components/Header.jsx';
import { Navigation } from './components/Navigation.jsx';

function App() {
  const {color, setColor} = useContext(ColorContext);

  useLayoutEffect(() => {
    ColorService.setTheme(setColor, localStorage.getItem("color"));
  }, []);

  return (
    <>
        <Header/>
        <main>
          <Navigation/>
          <div className='content'>
            <Routes>
              <Route path="/" element={<News/>}/>
            </Routes>
          </div>
        </main>
    </>
  );
}

export default App;
