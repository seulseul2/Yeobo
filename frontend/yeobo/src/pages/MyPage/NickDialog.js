import React, { useEffect, useState } from "react";
// import { post } from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import settings from "../../assets/images/icons/settings.png";
import nickUpdate from "../../api/user/nickUpdate";
import { styled } from "@mui/system";
import { borders } from "@mui/system";
import "../../assets/styles/Dialog.scss";
import { useSelector } from "react-redux";
import axios from "axios";

const NickDialog = (props) => {
  const nickname = useSelector((state) => state.authToken.nickname);
  const accessToken = useSelector((state) => state.authToken.accessToken);

  const [userNick, setUserNick] = useState(props.name);

  const userId = 20;
  const obj = {
    userId: userId,
    nick: props.name,
  };
  const onNickChange = (e) => {
    const { value } = e.target;
    setUserNick(value);
  };

  useEffect(() => {
    if (nickname !== "") {
      setUserNick(nickname);
    }
    console.log(nickname);
    console.log(props.name);
  }, []);

  // const [nick, setNick] = useState();

  function handleUpdateNick(e) {
    e.preventDefault();
    // nickUpdate(obj);
    axios({
      url: `https://j7c103.p.ssafy.io:8080/api/user/${obj.userId}`,
      method: "put",
      params: {
        nick: obj.nick,
      },
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        const response = res.data;
        alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleClickOpen() {
    setModalIsOpen(true);
  }

  function handleClose() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <img
        className="mypageTopIcon"
        src={settings}
        alt=""
        onClick={handleClickOpen}
      />
      <Dialog
        sx={{ display: "flex", justifyContent: "center", width: "auto" }}
        open={modalIsOpen}
        onClose={handleClose}
      >
        <div className="dialog-content">
          <DialogContent
            sx={{
              borderRadius: "16px",
              border: "2",
              borderColor: "primary.main",
            }}
          >
            <div className="nickTitleWrap">
              <label className="nickTitle" for="nick">
                닉네임 변경하기
              </label>
              <br />
            </div>
            <div>
              <input
                className="nickInput"
                id="nick"
                type=""
                name=""
                value={userNick}
                onChange={onNickChange}
              />
              <br />
            </div>
            <div className="buttonWarp">
              <button className="nickButton" onClick={handleUpdateNick} type="">
                닉네임 변경
              </button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              닫기
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default NickDialog;
