// import { BrowserView, MobileView } from 'react-device-detect';
import { Route, Routes } from 'react-router-dom';
import Main from './MainPage/Main';
import Location from './location';
import './App.css';
import BottomNavBar from './BottomNavBar';

function App() {
  return (
    <div className='App'>
      <h2>App.js</h2>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='location' element={<Location />} />
      </Routes>
      <BottomNavBar/>
    </div>
  );
}

export default App;
