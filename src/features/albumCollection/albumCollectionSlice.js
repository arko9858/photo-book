import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/axios";

const namespace = "albumCollection";

// ============= Create Thunks Start =====================

export const createAlbum = createAsyncThunk(
  namespace + "/createAlbumStatus",
  async (data, thunkAPI) => {
    const { payload, token } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("album/create", payload, config);
    // console.log("create album response");
    // console.log(res.data);
    return res.data;
  }
);

export const editAlbum = createAsyncThunk(
  namespace + "/editAlbumStatus",
  async (data, thunkAPI) => {
    const { payload, token, albumId } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("album/" + albumId, payload, config);
    // console.log("edit album response");
    // console.log(res.data);
    return res.data;
  }
);

export const getAllAlbums = createAsyncThunk(
  namespace + "/getAllAlbumsStatus",
  async (data) => {
    const { token } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("album/all", config);

    // console.log("get all albums response");
    // console.log(res.data);
    return res.data;
  }
);

export const deleteAlbum = createAsyncThunk(
  namespace + "/deleteAlbumStatus",
  async (data, thunkAPI) => {
    const { token, albumId } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete("album/" + albumId, config);
    // console.log("delete album response");
    // console.log(res.data);
    return res.data;
  }
);

// =============== Create Thunks End ======================

export const albumCollectionSlice = createSlice({
  name: namespace,
  initialState: {
    albums: [],
    loading: false,
  },

  extraReducers: {
    // create album
    [createAlbum.pending](state) {
      state.loading = true;
    },
    [createAlbum.fulfilled](state, action) {
      state.loading = false;
      state.albums = state.albums.concat(action.payload.newAlbum);
    },
    [createAlbum.rejected](state) {
      state.loading = false;
    },

    // edit album
    [editAlbum.pending](state) {
      state.loading = true;
    },
    [editAlbum.fulfilled](state, action) {
      state.loading = false;
      let updatedAlbums = state.albums.slice();
      for (let i in updatedAlbums) {
        if (updatedAlbums[i]._id === action.payload.updatedAlbum._id) {
          updatedAlbums[i] = action.payload.updatedAlbum;
          break;
        }
      }
      state.albums = updatedAlbums;
    },
    [editAlbum.rejected](state) {
      state.loading = false;
    },

    // get all albums
    [getAllAlbums.pending](state) {
      state.loading = true;
    },
    [getAllAlbums.fulfilled](state, action) {
      state.loading = false;
      state.albums = action.payload.albums;
    },
    [getAllAlbums.rejected](state) {
      state.loading = false;
    },

    // delete album
    [deleteAlbum.pending](state) {
      state.loading = true;
    },
    [deleteAlbum.fulfilled](state, action) {
      state.loading = false;

      const updatedAlbums = state.albums.filter(
        (album) => album._id !== action.payload.deletedAlbumId
      );

      state.albums = updatedAlbums;
    },
    [deleteAlbum.rejected](state) {
      state.loading = false;
    },
  },
});

export default albumCollectionSlice.reducer;
