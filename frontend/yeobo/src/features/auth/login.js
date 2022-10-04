import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isloading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err) {
      // if (!err?.response)
      if (!err?.originalStatus) {
        setErrMsg("서버 응답이 없습니다.");
      } else if (err.response?.status === 400) {
        setErrMsg("필수정보인 이메일 혹은 비밀번호가 누락되었습니다.");
      } else if (err.response?.state === 401) {
        setErrMsg("허가되지 않았습니다.");
      } else {
        setErrMsg("로그인에 실패하였습니다.");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
  <section className="login">
    <p
      ref={errRef}
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      {errMsg}
    </p>

    <h1>Employee Login</h1>

    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        ref={userRef}
        value={user}
        onChange={handleUserInput}
        autoComplete="off"
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        onChange={handlePwdInput}
        value={pwd}
        required
      />
      <button>Sign In</button>
    </form>
  </section>;
  )
  return content
};
export default Login;
