import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Box,
  Button,
  IconButton,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { CreateNewFolder, Sort, Refresh } from "@material-ui/icons";
import AlbumCard from "../../common/AlbumCard/AlbumCard";
import {
  createAlbum,
  getAllAlbums,
  editAlbum,
  deleteAlbum,
} from "./albumCollectionSlice";
import AlbumCreateDialog from "../../common/AlbumDialogs/AlbumCreateDialog/AlbumCreateDialog";
import AlbumEditDialog from "../../common/AlbumDialogs/AlbumEditDialog/AlbumEditDialog";
import AlbumDeleteDialog from "../../common/AlbumDialogs/AlbumDeleteDialog/AlbumDeleteDialog";

const AlbumCollection = () => {
  const dispatch = useDispatch();
  const { albums, loading } = useSelector((state) => state.albumCollection);
  const { token } = useSelector((state) => state.auth);

  const [initialData, setInitialData] = useState(null);

  // ===============================

  // functions

  // create
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateAlbum = (payload) => {
    const data = { payload, token };
    dispatch(createAlbum(data));
  };

  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  // load
  const loadAllAlbums = () => {
    const data = { token };

    dispatch(getAllAlbums(data));
  };

  // edit
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const openEditDialog = (data) => {
    setInitialData(data);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditAlbum = (payload) => {
    const albumId = initialData._id;
    const data = { payload, token, albumId };

    dispatch(editAlbum(data));
  };

  // delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = (data) => {
    setInitialData(data);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleDeleteAlbum = () => {
    const albumId = initialData._id;
    const data = { token, albumId };

    dispatch(deleteAlbum(data));
  };
  // ================================

  useEffect(() => {
    loadAllAlbums();
    // eslint-disable-next-line
  }, []);

  // ================================

  // componets
  const AlbumList = () => {
    if (albums && albums.length > 0) {
      return (
        <Grid container spacing={3}>
          {albums.map((item) => (
            <Grid item key={item._id} lg={3} md={4} sm={6} xs={12}>
              <AlbumCard
                data={item}
                openEditDialog={openEditDialog}
                openDeleteDialog={openDeleteDialog}
              />
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
  // ================================

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box sx={{ my: 3, display: "flex" }}>
          <Button onClick={openCreateDialog} startIcon={<CreateNewFolder />}>
            Create Album
          </Button>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={loadAllAlbums} aria-label="refresh">
            <Refresh />
          </IconButton>
          <Button startIcon={<Sort />}>Sort By</Button>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {loading ? <CircularProgress sx={{ mt: 4 }} /> : <AlbumList />}
        </Box>
      </Container>
      <AlbumCreateDialog
        open={createDialogOpen}
        handleClose={closeCreateDialog}
        handleSubmit={handleCreateAlbum}
      />
      <AlbumEditDialog
        open={editDialogOpen}
        handleClose={closeEditDialog}
        initialData={initialData}
        handleSubmit={handleEditAlbum}
      />
      <AlbumDeleteDialog
        open={deleteDialogOpen}
        handleClose={closeDeleteDialog}
        initialData={initialData}
        handleSubmit={handleDeleteAlbum}
      />
    </Fragment>
  );
};

export default AlbumCollection;
