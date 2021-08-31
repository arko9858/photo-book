import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Input, Stack, Box } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const PhotoUploadDialog = ({ open, handleClose, handleSubmit }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [title, setTitle] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
    } else {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const handleDialogSubmit = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const payload = { title, base64EncodedImage: reader.result };
      handleSubmit(payload);
      console.log('payload')
      console.log(payload)
    };
    handleDialogOnClose();
  };

  const handleDialogOnClose = () => {
    handleClose();
    setTitle("");
    setPreviewSource(null);
  };

  return (
    <Dialog open={open} onClose={handleDialogOnClose} fullScreen={fullScreen}>
      <DialogTitle>Upload Photo</DialogTitle>
      <DialogContent
        sx={{ maxWidth: "500px", width: "100%", minWidth: "300px" }}
      >
        <Stack>
          {previewSource && (
            <img
              src={previewSource}
              alt="selected_image"
              style={{ height: "300px", width: "100%", overflow: "hidden" }}
            />
          )}
          <Box sx={{ my: "16px" }}>
            <label htmlFor="choose-image-button">
              <Input
                sx={{ display: "none" }}
                accept="image/*"
                id="choose-image-button"
                onChange={handleFileChange}
                type="file"
              />
              <Button
                variant="contained"
                component="span"
                endIcon={<PhotoCamera />}
              >
                Choose Image
              </Button>
            </label>
          </Box>

          <TextField
            fullWidth
            required
            size="small"
            label="Photo Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogOnClose}>Cancel</Button>
        <Button onClick={handleDialogSubmit}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoUploadDialog;
