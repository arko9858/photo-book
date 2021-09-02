import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/axios";

const namespace = "auth";

// create thunk
export const signInWithGoogleToken = createAsyncThunk(
  namespace + "/signInWithGoogleTokenStatus",
  async (token, thunkAPI) => {
    const res = await axios.post("auth/google", { token });

    return res.data;
  }
);

export const signInWithLocal = createAsyncThunk(
  namespace + "signInWithLocalStatus",
  async (credentials, thunkAPI) => {
    const res = await axios.get(
      "auth/login/" + credentials.username + "/" + credentials.password
    );
    // console.log("signin local res data");
    // console.log(res.data);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: namespace,
  initialState: {
    token: "",
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = '';
    },
  },
  extraReducers: {
    // signin google
    [signInWithGoogleToken.pending](state) {
      state.loading = true;
    },
    [signInWithGoogleToken.fulfilled](state, action) {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    [signInWithGoogleToken.rejected](state) {
      state.loading = false;
    },
    // signin local
    [signInWithLocal.pending](state) {
      state.loading = true;
    },
    [signInWithLocal.fulfilled](state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    [signInWithLocal.rejected](state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
