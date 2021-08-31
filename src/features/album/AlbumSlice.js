import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/axios";

const namespace = "album";

// ============= Create Thunks Start =====================

export const getAlbum = createAsyncThunk(
  namespace + "/getAlbumStatus",
  async (data) => {
    const { token, albumId } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("album/one/" + albumId, config);

    return res.data;
  }
);

export const uploadPhoto = createAsyncThunk(
  namespace + "/uploadPhotoStatus",
  async (data) => {
    const { photo, title, token, albumId } = data;

    const payload = { photo, title, album: albumId };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("photo/create/", payload, config);
    console.log('Photo upload response')
    console.log(res.data)
    return res.data;
  }
);

export const deletePhoto = createAsyncThunk(
  namespace + "/deletePhotoStatus",
  async (data) => {
    const { photoId, token } = data;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete("photo/" + photoId, config);
    
    return res.data;
  }
);

// =============== Create Thunks End ======================

export const albumSlice = createSlice({
  name: namespace,
  initialState: {
    photos: [],
    loading: false,
  },

  extraReducers: {
    // get album
    [getAlbum.pending](state) {
      state.loading = true;
    },
    [getAlbum.fulfilled](state, action) {
      state.loading = false;
      state.photos = action.payload.album.photos;
    },
    [getAlbum.rejected](state) {
      state.loading = false;
    },

    // upload photo

    [uploadPhoto.pending](state) {
      state.loading = true;
    },
    [uploadPhoto.fulfilled](state, action) {
      state.loading = false;
      state.photos = state.photos.concat(action.payload.newPhoto);
    },
    [uploadPhoto.rejected](state) {
      state.loading = false;
    },
    // delete photo
    [deletePhoto.pending](state) {
      state.loading = true;
    },
    [deletePhoto.fulfilled](state, action) {
      state.loading = false;

      const updatedPhotos = state.photos.filter(
        (photo) => photo._id !== action.payload.deletedPhotoId
      );

      state.photos = updatedPhotos;
    },
    [deletePhoto.rejected](state) {
      state.loading = false;
    },
    //
  },
});

export default albumSlice.reducer;
