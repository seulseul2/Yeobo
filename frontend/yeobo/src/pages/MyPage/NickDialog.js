import React, { useState } from 'react'
// import { post } from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import settings from '../../assets/images/icons/settings.png';
import nickUpdate from '../../api/user/nickUpdate'
import { styled } from '@mui/system';
import { borders } from '@mui/system';
import '../../assets/styles/Dialog.scss';


const NickDialog = () => {

  const [nick, setNick] = useState();
  const userId = 14;
  const obj = {
    userId: userId,
    nick: nick
  }
  const onNickChange = (e) => {
    const { value } = e.target;
    setNick(value);
  };

  function handleUpdateNick(e) {
    e.preventDefault();
    nickUpdate(obj);
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleClickOpen() {
    setModalIsOpen(true);
  }

  function handleClose() {
    setModalIsOpen(false);
  }

  return <div>
    <img className='mypageTopIcon' src={settings} alt="" onClick={handleClickOpen} />
    <Dialog
      sx={{ display: 'flex', justifyContent: 'center', width: 'auto'  }}
      open={modalIsOpen}
      onClose={handleClose}
    >
      <div className='dialog-content'>
        <DialogContent
          sx={{ borderRadius: '16px', border: '2', borderColor: 'primary.main', }}>
          <div className='nickTitleWrap'>
            <label className='nickTitle' for="nick" >닉네임 변경하기</label><br/>
          </div>
          <div>
            <input className='nickInput' id="nick" type="" name="" value={nick} onChange={onNickChange} /><br/>
          </div>
          <div className='buttonWarp'>
            <button className='nickButton' onClick={handleUpdateNick} type="">닉네임 변경</button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </div>
    </Dialog>
  </div>
}

export default NickDialog;


