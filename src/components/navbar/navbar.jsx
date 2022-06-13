import React from "react";
import classes from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/reducers/user.reducer";
import { getAuth, signOut } from "firebase/auth";
const Navbar = ({ isAuth, email }) => {
  const dispatch = useDispatch();
  const isLogin = getAuth();

  let navigate = useNavigate();
  let logout = () => {
    signOut(isLogin)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className={classes.navbar}>
      <Link to="/" className={classes.navbar_title}>
        Todo
      </Link>
      {isLogin.currentUser ? (
        <ul className={classes.navbar_list}>
          <li>Привет {isLogin.currentUser.email}</li>
          <li onClick={() => logout()}>Выход</li>
        </ul>
      ) : (
        <ul className={classes.navbar_list}>
          <li>
            <Link to="/auth">Авторизация</Link>
          </li>
          <li>
            <Link to="/registration">Регистрация</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Navbar;
