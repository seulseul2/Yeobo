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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SET_TOKEN } from "../../store/Auth";
import { red } from "@mui/material/colors";

const NickDialog = (props) => {
  const nickname = useSelector((state) => state.authToken.nickname);
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const dispatch = useDispatch();
  const [userNick, setUserNick] = useState(nickname);

  const userId = 20;
  const obj = {
    userId: userId,
    nick: userNick,
  };
  const onNickChange = (e) => {
    const value = e.target.value;
    // console.log(e.target.value);
    setUserNick(value);
    // console.log(userNick);
  };

  useEffect(() => {
    // if (nickname !== "") {
    //   setUserNick(nickname);
    // }
    console.log(userNick);
    // console.log(props.name);
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
        dispatch(SET_TOKEN({ nickname: obj.nickname }));
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
              <label className="nickTitle" id="nick">
                닉네임 변경하기
              </label>
              <br />
            </div>
            <div>
              <input
                className="nickInput"
                for="nick"
                type=""
                name=""
                placeholder={nickname}
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
            <Button
              classname="closeBtn"
              variant="outlined"
              color="primary"
              onClick={handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default NickDialog;
