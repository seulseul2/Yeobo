// import { Link } from 'react-router-dom';
import "./AdminModule.scss";
import { userDelete } from '../../api/user/userDelete';
import { logout } from '../../api/user/logout';

const userId = 16;

function userDeleteClick() {
  // const conf = confirm('정말?');
  if (!!window.confirm('정말?')) {
    alert('예')
    userDelete(userId)
  } else {
    alert('이용하면 좋은 점 다시 한 번 어필하기..')
  }
}

function logOutClick() {
  logout();
}

const AdminModule = () => {
  return (
    <div>
      <div class="box">
        <p onClick={userDeleteClick}>회원 탈퇴하기</p>
        <p onClick={logOutClick}>로그아웃</p>
      </div>
    </div>
    
  );
};

export default AdminModule;