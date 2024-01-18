import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    login_status: false,
    profileData:null
  },
  reducers: {
    setuser(state, action) {
      state.userData = action.payload
      state.login_status = true
    },
    logout(state, action) {
      state.userData = {}
      state.login_status = false
    },
    setProfile(state, action){
      state.profileData = action.payload
    }
  }
})
export const { setuser, logout, setProfile } = UserSlice.actions;

export default UserSlice.reducer;