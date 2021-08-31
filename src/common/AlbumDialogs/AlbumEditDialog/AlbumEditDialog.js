import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlbumEditDialog = ({ open, handleClose, handleSubmit, initialData }) => {
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    if (initialData) {
      setAlbumName(initialData.albumName);
    }
    // eslint-disable-next-line
  }, [initialData]);

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleDialogSubmit = () => {
    const data = { albumName };
    handleSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Album</DialogTitle>
      <DialogContent sx={{ maxWidth: "360px" }}>
        <TextField
          autoFocus
          margin="dense"
          size="small"
          label="Album Name"
          value={albumName}
          onChange={handleAlbumNameChange}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDialogSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlbumEditDialog;
