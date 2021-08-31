import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import albumCollectionReducer from "../features/albumCollection/albumCollectionSlice";
import albumReducer from "../features/album/AlbumSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    albumCollection: albumCollectionReducer,
    album: albumReducer,
  },
});
