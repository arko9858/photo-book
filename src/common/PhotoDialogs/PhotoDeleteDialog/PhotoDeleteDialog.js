import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const PhotoDeleteDialog = ({
  open,
  handleClose,
  handleSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState("this photo");

  const handleDialogSubmit = () => {
    handleSubmit();
    handleClose();
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
    }
  }, [initialData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Photo</DialogTitle>
      <DialogContent sx={{ maxWidth: "360px" }}>
        <DialogContentText>
          {"Are you sure you want to delete " + title + "?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDialogSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDeleteDialog;
