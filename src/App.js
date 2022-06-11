import "./App.scss";
import React from "react";
import Navbar from "./components/navbar/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/home";
import Auth from "./components/auth/auth";
import Reg from "./components/registration/reg";
import {useAuth} from "./hooks/IsAuth";

const App = () => {
    const { isAuth, email } = useAuth();
  return (
    <div>
      <Navbar email={email}></Navbar>
      <div className="container">
        {isAuth ? (
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route path="/registration" element={<Reg></Reg>}></Route>
            <Route path="/auth" element={<Auth></Auth>}></Route>
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
