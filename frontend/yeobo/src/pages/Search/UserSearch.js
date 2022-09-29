import image from '../../assets/images/user.png';
import './UserSearch.scss';

const UserSearch = () => {
  return (
    <div className='userSearch'>
      <div className='UserImg'>
        <img src={image} alt='userImg'/>
      </div>
      <div className='userName'>
        <h1>유저이름</h1>
      </div>
    </div>
  )
}

export default UserSearch;
