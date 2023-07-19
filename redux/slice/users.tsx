import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  loginStatus: boolean;
}

const initialState: CounterState = {
  value: 0,
  loginStatus: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLogin} =
  userSlice.actions;

export default userSlice.reducer;
