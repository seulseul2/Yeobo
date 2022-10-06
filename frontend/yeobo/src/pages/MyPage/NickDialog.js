import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import settings from "../../assets/images/icons/settings.png";
import nickUpdate from "../../api/user/nickUpdate";
import "../../assets/styles/Dialog.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCookieToken, removeCookieToken } from "../../storage/Cookie";
import { DELETE_TOKEN } from "../../store/Auth";
import { useNavigate } from "react-router";

const NickDialog = (props) => {
  // const nickname = useSelector((state) => state.authToken.nickname);
  // const accessToken = useSelector((state) => state.authToken.accessToken);
  // const dispatch = useDispatch();
  // const [userNick, setUserNick] = useState(nickname);

  const accessToken = useSelector((state) => state.authToken.accessToken);
  const userId = useSelector((state) => state.authToken.userId);
  const refreshToken = getCookieToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userDeleteClick() {
    if (!!window.confirm("정말?")) {
      axios({
        url: `https://j7c103.p.ssafy.io:8080/api/user/${userId}`,
        method: "delete",
        data: userId,
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
        .then((res) => {
          dispatch(DELETE_TOKEN()); // store에 저장된 액세스 토큰 삭제
          removeCookieToken(); // cookie에 저장된 refresh token 삭제
          const response = res.data;
          alert("회원 정보가 삭제되었습니다.");
          console.log(response);
          navigate("/"); // 홈으로 이동
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      alert("저희 서비스를 이용해주셔서 항상 감사합니다.");
    }
  }
  // const userId = 20;
  // const obj = {
  //   userId: userId,
  //   nick: userNick,
  // };
  // const onNickChange = (e) => {
  //   const value = e.target.value;
  //   setUserNick(value);
  // };

  // useEffect(() => {
  //   console.log(userNick);
  // }, []);

  // function handleUpdateNick(e) {
  //   e.preventDefault();
  //   axios({
  //     url: `https://j7c103.p.ssafy.io:8080/api/user/${obj.userId}`,
  //     method: "put",
  //     params: {
  //       nick: obj.nick,
  //     },
  //     headers: {
  //       "X-AUTH-TOKEN": accessToken,
  //     },
  //   })
  //     .then((res) => {
  //       const response = res.data;
  //       alert(response.message);
  //       console.log(response);
  //       dispatch(SET_TOKEN({ nickname: obj.nickname }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
            <div>
              <p className="boxIn" onClick={userDeleteClick}>
                회원 탈퇴하기
              </p>
            </div>
            {/* <div className="nickTitleWrap">
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
            </div> */}
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
