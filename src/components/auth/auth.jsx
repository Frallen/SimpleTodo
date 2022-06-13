import React from "react";
import  FormAuth from "../Forms/auth-reg.form"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../../redux/reducers/user.reducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const Auth = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleLogin=({email, password})=>{
        const isLogin=getAuth()
        signInWithEmailAndPassword(isLogin,email,password)
            .then((snap) => {
                dispatch(setUser({
                    email:snap.user.email,
                    id:snap.user.uid,
                }))
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return <div>
        <FormAuth title="Авторизация" handelclick={handleLogin} ></FormAuth>
    </div>;
};
export default Auth;
