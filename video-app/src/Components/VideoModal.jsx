import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { addHistory } from "../features/history/historySlice";

const VideoModal = ({ icon, link, id, title }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(addHistory({ id: id, link: link, title: title }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary[600],
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0.5rem",

          "&:hover": {
            backgroundColor: "red",
            color: theme.palette.secondary.light,
          },
        }}
        onClick={handleClickOpen}
      >
        <FlexBetween gap="0.5rem" alignItems="center">
          <>{icon}</>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.secondary[200],
            }}
          >
            Watch
          </Typography>
        </FlexBetween>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[200],
          },
        }}
      >
        <DialogTitle variant="h3" fontWeight="bold">
          ENJOY THE VIDEO
        </DialogTitle>
        <DialogContent>
          <Box>
            <iframe
              style={{
                width: "60vw",
                height: "40vh",
                border: "none",
                borderRadius: "10px",
              }}
              title="video"
              src={link}
              allowFullScreen
            ></iframe>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.secondary[700],
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoModal;
