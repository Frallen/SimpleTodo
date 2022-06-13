import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user=action.payload
    },
    removeUser(state) {
      state.user=null
    },
  },
});

export const { setUser, removeUser } = userReducer.actions;

export  const selectUser=state=>state.user.user

export default userReducer.reducer;
