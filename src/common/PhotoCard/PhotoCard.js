import React, { Fragment } from "react";
import moment from "moment";
import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem
} from "@material-ui/core";

import { Download, MoreVert } from "@material-ui/icons";

const PhotoCard = ({ data , openDeleteDialog}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleEditClick = ()=>{
    
  }

  const handleDeleteClick = ()=>{
    handleClose();
    openDeleteDialog(data)
  }

  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia
            sx={{ height: 256 }}
            image={data.photoUrl}
            title={data.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          
          <Typography variant="body2" color="GrayText">
            {"Size: " + (data.bytes / 1024).toFixed(2) + " KB"}
          </Typography>

          <Typography variant="body2" color="GrayText">
            {"Uploaded: " +
              moment(data.createdAt).format("h:mm a , DD MMM YYYY")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<Download />}>Download</Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={openEditMenu} aria-label="options">
            <MoreVert />
          </IconButton>
        </CardActions>
      </Card>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default PhotoCard;
