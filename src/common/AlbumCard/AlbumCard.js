import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  CardActionArea,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { InsertPhotoOutlined, MoreVert } from "@material-ui/icons";
import { Fragment } from "react";

const AlbumCard = ({ data, openEditDialog, openDeleteDialog }) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
    openEditDialog(data);
  };

  const handleDeleteClick = () => {
    handleClose();
    openDeleteDialog(data);
  };

  const openAlbum = () => {
    history.push("/album/" + data._id);
  };

  return (
    <Fragment>
      <Card sx={{ display: "flex" }}>
        <CardActionArea onClick={openAlbum}>
          <CardContent sx={{ flexGrow: 1, display: "flex" }}>
            <InsertPhotoOutlined />

            <Typography sx={{ ml: 2 }}>{data.albumName}</Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <IconButton onClick={openEditMenu} aria-label="settings">
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

export default AlbumCard;
