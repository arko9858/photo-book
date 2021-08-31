import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  Container,
  IconButton,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { Refresh, AddAPhoto } from "@material-ui/icons";
import { getAlbum, uploadPhoto, deletePhoto } from "./AlbumSlice";
import PhotoCard from "../../common/PhotoCard/PhotoCard";
import PhotoUploadDialog from "../../common/PhotoDialogs/PhotoUploadDialog/PhotoUploadDialog";
import PhotoDeleteDialog from "../../common/PhotoDialogs/PhotoDeleteDialog/PhotoDeleteDialog";

const Album = () => {
  const { albumId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { photos, loading } = useSelector((state) => state.album);

  const [initialData, setInitialData] = useState(null);

  // photo upload dialog
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const openUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleUploadSubmit = (payload) => {
    const { title, base64EncodedImage } = payload;

    const data = { photo: base64EncodedImage, title, token, albumId };
    dispatch(uploadPhoto(data));
  };
  // =====================

  // photo delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (data) => {
    setInitialData(data);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleDeleteSubmit = () => {
    const photoId = initialData._id;
    const data = { token, photoId };

    dispatch(deletePhoto(data));
  };
  // ========================

  // const uploadImage = async (base64EncodedImage) => {
  //   try {
  //     const body = {
  //       photo: base64EncodedImage,
  //       title: "Fox",
  //       album: albumId,
  //     };

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     axios
  //       .post("/photo/create", body, config)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err.response));
  //   } catch (err) {
  //     console.error(err.response);
  //   }
  // };

  // load
  const loadAlbum = () => {
    const data = { token, albumId };

    dispatch(getAlbum(data));
  };

  // ================================

  useEffect(() => {
    loadAlbum();
    // eslint-disable-next-line
  }, []);

  // componets
  const PhotoList = () => {
    if (photos && photos.length > 0) {
      return (
        <Grid container spacing={3}>
          {photos.map((item) => (
            <Grid item key={item._id} lg={3} md={4} sm={6} xs={12}>
              <PhotoCard openDeleteDialog={openDeleteDialog} data={item} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Typography align="center" color="GrayText">
          List Empty
        </Typography>
      );
    }
  };

  // ======================================

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box sx={{ my: 3, display: "flex" }}>
          <Button onClick={openUploadDialog} startIcon={<AddAPhoto />}>
            Upload Photo
          </Button>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={loadAlbum} aria-label="refresh">
            <Refresh />
          </IconButton>
        </Box>
        <Box sx={{ py: 3 }}>
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              {" "}
              <CircularProgress sx={{ mt: 4 }} />
            </Box>
          ) : (
            <PhotoList />
          )}
        </Box>
      </Container>
      <PhotoUploadDialog
        open={uploadDialogOpen}
        handleClose={closeUploadDialog}
        handleSubmit={handleUploadSubmit}
      />
      <PhotoDeleteDialog
        open={deleteDialogOpen}
        handleClose={closeDeleteDialog}
        handleSubmit={handleDeleteSubmit}
        initialData={initialData}
      />
    </Fragment>
  );
};

export default Album;
