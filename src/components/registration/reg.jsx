import React from "react";
import FormAuth from "../Forms/auth-reg.form";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user.reducer";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Reg = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleReg = ({ email, password }) => {
    const isLogin = getAuth();
    createUserWithEmailAndPassword(isLogin, email, password)
      .then((snap) => {
        dispatch(
          setUser({
            email: snap.user.email,
            id: snap.user.uid,
            token: snap.user.accessToken,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <FormAuth title="Регистрация" handelclick={handleReg}></FormAuth>
    </div>
  );
};
export default Reg;
