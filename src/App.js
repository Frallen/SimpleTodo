import "./App.scss";
import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/home";
import Auth from "./components/auth/auth";
import Reg from "./components/registration/reg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser, selectUser } from "./redux/reducers/user.reducer";
import Task from "./components/task/task";

const App = ({db}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const isLogin = getAuth();

  useEffect(() => {
    onAuthStateChanged(isLogin, (user) => {
      if (user) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        {user ? (
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/task" element={<Task db={db}></Task>}></Route>
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route path="/registration" element={<Reg></Reg>}></Route>
            <Route path="/auth" element={<Auth></Auth>}></Route>
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
