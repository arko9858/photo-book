import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Input, Stack, Box, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const PhotoUploadDialog = ({ open, handleClose, handleSubmit }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(true);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const checkFormValid = (imageFile, imageTitle) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        const size = imageFile.size;
        const sizeLimit = 5 * 1024 * 1024; //5 MB
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        if (
          width < 1500 &&
          height < 1500 &&
          size < sizeLimit &&
          imageTitle.length > 0
        ) {
          setUploadDisabled(false);
        } else {
          setUploadDisabled(true);
        }
      };
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
    } else {
      checkFormValid(file, title);
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    checkFormValid(selectedFile, e.target.value);
  };

  const handleDialogSubmit = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      const payload = { title, base64EncodedImage: e.target.result };
      handleSubmit(payload);
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
          <Box>
            <Typography variant="body2">
              1. Image resolution cannot exceed 1500x1500
            </Typography>
            <Typography variant="body2">
              2. Image size should be less than 5 MB
            </Typography>
            <Typography variant="body2">
              3. Title cannot be empty
            </Typography>
          </Box>
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
            onChange={handleTitleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogOnClose}>Cancel</Button>
        <Button disabled={uploadDisabled} onClick={handleDialogSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoUploadDialog;
