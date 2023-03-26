import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addCard } from "../features/buckets/bucketSlice";
import { useLocation } from "react-router-dom";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardLink, setNewCardLink] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newIncrease, setNewIncrease] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const bucketName = useLocation().pathname.split("/")[1];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          "&:hover": {
            backgroundColor: "#444",
            color: theme.palette.secondary.light,
          },
        }}
        onClick={handleClickOpen}
      >
        <AddCircleOutlined sx={{ mr: "10px" }} />
        ADD CARD
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[200],
          },
        }}
      >
        <DialogTitle>Add Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Card Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCardTitle(e.target.value)}
            sx={{
              color: theme.palette.secondary[200],
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Link"
            label="Video Link"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCardLink(e.target.value)}
            sx={{
              color: theme.palette.secondary[200],
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Link"
            label="Views(100k)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewIncrease(e.target.value)}
            sx={{
              color: theme.palette.secondary[200],
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Link"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCardDescription(e.target.value)}
            sx={{
              color: theme.palette.secondary[200],
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.secondary[700],
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(
                addCard({
                  bucketName: bucketName,
                  card: {
                    id: nanoid(),
                    title: newCardTitle,
                    link: newCardLink,
                    description: newCardDescription,
                    increase: newIncrease,
                  },
                })
              );
              handleClose();
            }}
            sx={{
              color: theme.palette.secondary[700],
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
