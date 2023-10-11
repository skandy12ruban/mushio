import { createSlice } from '@reduxjs/toolkit'

export const UserTypeSlice = createSlice({
    name: 'usertype',
    initialState: {
      usertypeData: null,
      usertype_status: false,
    },
    reducers: {
        setusertype(state, action) {
          state.usertypeData = action.payload
          state.usertype_status = true
        },
        clearusertype(state, action) {
          state.usertypeData = {}
          state.usertype_status = false
        }
      }
})
export const { setusertype, clearusertype } = UserTypeSlice.actions;

export default UserTypeSlice.reducer;