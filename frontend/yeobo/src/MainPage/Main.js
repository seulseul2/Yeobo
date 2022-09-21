import './Main.scss';
import MainTop from './MainTop';
import MainRecom from './MainRecom';
import MainBoddari from './MainBoddari';
import MainPopularBoddari from './MainPopularBoddari';
import MainThisMonth from './MainThisMonth';

const Main = () => {
  return (
    <div className="Main back">
      {/* <h2>Main Page</h2> */}
      <MainTop />
      <MainRecom />
      <MainBoddari />
      <MainPopularBoddari />
      <MainThisMonth />
      <div className='bottom'>
        sdf
      </div>
    </div>
  );
};

export default Main;