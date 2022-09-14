import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';

function App() {
  return (
    <div className="App">
      <BrowserView>
        데스크탑 뷰
      </BrowserView>
      <MobileView>
        모바일 뷰
      </MobileView>
    </div>
  );
}

export default App;
