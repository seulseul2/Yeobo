import image from '../../assets/images/daejeon.jpeg';
import './BoddariSearch.scss'
const BoddariSearch = () => {
  return (
    <div className='BoddariSearch'>
      <div className='BoddariImg'>
        <img src={image} alt='BoddariImg'/>
      </div>
      <div className='BoddariName'>
        <h1>보따리이름</h1>
      </div>
    </div>
  )
}

export default BoddariSearch;