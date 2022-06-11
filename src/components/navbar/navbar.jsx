import React from "react";
import classes from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/reducers/user.reducer";
const Navbar = ({ isAuth, email }) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let logout = () => {
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <div className={classes.navbar}>
      <Link to="/" className={classes.navbar_title}>
        Todo
      </Link>
      {isAuth ? (
        <ul className={classes.navbar_list}>
          <li>Привет {email}</li>
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
