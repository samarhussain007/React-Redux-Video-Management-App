import React, { useState, useEffect } from "react";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  TextField,
} from "@mui/material";
import {
  Edit,
  DeleteOutlineOutlined,
  ShuffleOnOutlined,
  DoneOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import {
  editBucketName,
  deleteBucket,
  addCard,
  deleteCard,
} from "../features/buckets/bucketSlice";

const ListItemComponent = ({ text, icon, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lcText = text.toLowerCase();
  const theme = useTheme();
  const [active, setActive] = useState("");

  /** Drag and Drop feature */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = theme.palette.secondary[300];
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dataString = e.dataTransfer.getData("card");
    e.currentTarget.style.backgroundColor = "transparent";
    const { id, link, title, description, increase } = JSON.parse(dataString);

    dispatch(
      addCard({
        bucketName: text.toLowerCase(),
        card: {
          id: id,
          link: link,
          title: title,
          description: description,
          increase: increase,
        },
      })
    );

    dispatch(
      deleteCard({ bucketName: pathname.slice(1).toLowerCase(), cardId: id })
    );
  };

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  let content;
  if (isEditing) {
    content = (
      <>
        <FlexBetween>
          <TextField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              navigate(`/${value.toLowerCase()}`);
              dispatch(editBucketName({ id: id, editedName: value }));
              setIsEditing(!isEditing);
            }}
            sx={{
              color:
                active === lcText
                  ? theme.palette.secondary[600]
                  : theme.palette.secondary[200],
            }}
          >
            <DoneOutlined />
          </IconButton>
        </FlexBetween>
      </>
    );
  } else {
    content = (
      <ListItemButton
        onClick={() => {
          navigate(`/${lcText}`);
          setActive(lcText);
        }}
        sx={{
          backgroundColor:
            active === lcText ? theme.palette.secondary[300] : "transparent",
          color:
            active === lcText
              ? theme.palette.secondary[600]
              : theme.palette.secondary[100],
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <ListItemIcon
          sx={{
            color:
              active === lcText
                ? theme.palette.secondary[600]
                : theme.palette.secondary[200],
          }}
        >
          {!icon ? <ShuffleOnOutlined /> : icon}
        </ListItemIcon>
        <ListItemText primary={text} />

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        >
          <Edit
            sx={{
              color:
                active === lcText
                  ? theme.palette.secondary[600]
                  : theme.palette.secondary[200],
            }}
          />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteBucket({ id: id }));
          }}
        >
          <DeleteOutlineOutlined />
        </IconButton>
      </ListItemButton>
    );
  }

  return <ListItem disablePadding>{content}</ListItem>;
};

export default ListItemComponent;
