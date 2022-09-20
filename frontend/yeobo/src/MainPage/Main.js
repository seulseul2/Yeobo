import './Main.scss';
import MainTop from './MainTop';
import MainRecom from './MainRecom';
import MainBoddari from './MainBoddari';

const Main = () => {
  return (
    <div className="Main back">
      {/* <h2>Main Page</h2> */}
      <MainTop />
      <MainRecom />
      <MainBoddari />
      <div className='bottom'>
        sdf
      </div>
    </div>
  );
};

export default Main;