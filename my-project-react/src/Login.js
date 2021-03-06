import React, { useEffect, useRef, useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "./components/CurrentUser";
import { useHistory } from "react-router-dom";
import { callApi } from "./utils";
import LoginImg from "./images/login_img.png"
export default function Login() {
  const dispatch = useDispatchCurrentUser();
  const currentUser = useCurrentUser();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory()

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null);
    try {
      const response = await callApi("/auth/local", "POST", {
        identifier: emailRef.current.value,
        password: passwordRef.current.value
      })

      if(!response.user) {
        throw "Неправильный логин или пароль. Попробуйте ещё раз"
      }

      dispatch({ type: "LOGIN", user: response.user });
      history.push("/")
    } catch (err) {
      setErrorMsg(err)
    }
  }
   
  return (
    <main>
      {errorMsg && <p>{errorMsg}</p>}
      <form className="measure center mt4" onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <img src={LoginImg} style={{ objectFit: "cover", width: "350px", height: "350px"}}/>
        </div>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Авторизация</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
              <input ref={emailRef} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Пароль</label>
              <input ref={passwordRef} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Войти" />
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db">Забыли пароль?</a>
            <a href="#0" className="f6 link dim black db">Регистрация</a>
          </div>
        </form>
    </main>
  );
}