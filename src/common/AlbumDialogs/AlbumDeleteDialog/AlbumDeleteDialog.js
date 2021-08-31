import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlbumDeleteDialog = ({
  open,
  handleClose,
  handleSubmit,
  initialData,
}) => {
  const [albumName, setAlbumName] = useState("this album");

  const handleDialogSubmit = () => {
    handleSubmit();
    handleClose();
  };

  useEffect(() => {
    if (initialData) {
      setAlbumName(initialData.albumName);
    }
  }, [initialData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Album</DialogTitle>
      <DialogContent sx={{ maxWidth: "360px" }}>
        <DialogContentText>
          {"Are you sure you want to delete " + albumName + "?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDialogSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlbumDeleteDialog;
