import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { setUser } from "../redux/reducers/user.reducer";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLogin = getAuth();
  console.log(isLogin.currentUser.email)
  dispatch(
    setUser({
      email: isLogin.currentUser.email,
      id: isLogin.currentUser.uid,
      token: isLogin.currentUser.accessToken,
    })
  );
  const { id, email, token } = useSelector((state) => state.user);
  return {
    isAuth: !!id,
    email,
    token,
    id,
  };
};
