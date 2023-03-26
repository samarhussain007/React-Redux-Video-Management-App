import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { DeleteOutlineOutlined, Edit } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { deleteCard, updateCard } from "../features/buckets/bucketSlice";
import { useLocation } from "react-router-dom";
import VideoModal from "./VideoModal";

const Card = ({ title, value, increase, icon, description, id, link }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editLink, setEditLink] = useState(link);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let content;

  if (isEditing) {
    content = (
      <Box
        gridColumn="span 2"
        gridRow="span 1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor={theme.palette.background.alt}
        borderRadius="0.55rem"
      >
        <Box width="100%" display="flex" justifyContent="space-between">
          <TextField
            value={editTitle}
            label="Edit Title"
            sx={{
              color: theme.palette.secondary[100],
              width: "30%",
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            value={editLink}
            label="Edit Link"
            sx={{
              color: theme.palette.secondary[100],
              width: "60%",
              "& label.Mui-focused": {
                color: theme.palette.secondary[200],
              },
            }}
            onChange={(e) => setEditLink(e.target.value)}
          />
        </Box>
        <Box ml="auto">
          <FlexBetween gap="1rem">
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
              onClick={() => setIsEditing(!isEditing)}
            >
              CANCEL
            </Button>
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
              onClick={() => {
                dispatch(
                  updateCard({
                    bucketName: pathname.split("/")[1],
                    card: {
                      id: id,
                      title: editTitle,
                      link: editLink,
                      increase: increase,
                      description: description,
                    },
                  })
                );
                setIsEditing(!isEditing);
              }}
            >
              SUBMIT
            </Button>
          </FlexBetween>
        </Box>
      </Box>
    );
  } else {
    content = (
      <Box
        gridColumn="span 2"
        gridRow="span 1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor={theme.palette.background.alt}
        borderRadius="0.55rem"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "card",
            JSON.stringify({ id, title, value, increase, link })
          );
        }}
      >
        <FlexBetween>
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {title}
          </Typography>
          <div>
            <IconButton
              sx={{
                color: theme.palette.secondary[100],
              }}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{
                color: theme.palette.secondary[100],
              }}
              onClick={() =>
                dispatch(
                  deleteCard({
                    bucketName: pathname.split("/")[1],
                    cardId: id,
                  })
                )
              }
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </div>
        </FlexBetween>
        <Box>
          <VideoModal icon={icon} link={link} id={id} title={title} />
        </Box>
        <FlexBetween gap="1rem">
          <Typography>{description}</Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: theme.palette.secondary[200] }}
          >
            {increase}
          </Typography>
        </FlexBetween>
      </Box>
    );
  }

  return <>{content}</>;
};

export default Card;
