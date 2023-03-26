import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import ListItemComponent from "./ListItem";

import {
  SchoolOutlined,
  MusicNoteOutlined,
  SportsEsportsOutlined,
  SportsSoccerOutlined,
  AddCircleOutlined,
  ChevronLeftOutlined,
} from "@mui/icons-material";

import { useState } from "react";
import FlexBetween from "./FlexBetween";

import { useSelector, useDispatch } from "react-redux";
import { addBuckets } from "../features/buckets/bucketSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialIcons = [
  {
    text: "Sports",
    icon: <SportsSoccerOutlined />,
  },
  {
    text: "Gaming",
    icon: <SportsEsportsOutlined />,
  },
  {
    text: "Education",
    icon: <SchoolOutlined />,
  },
  {
    text: "Songs",
    icon: <MusicNoteOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const navItems = useSelector((state) => state.buckets.initialBuckets);
  const navItemswithIcons = navItems.map((el) => {
    return {
      ...el,
      icon: initialIcons.find((icon) => icon.text === el.text)?.icon,
    };
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const [newBucket, setnewBucket] = useState(false);
  const [newBucketValue, setNewBucketValue] = useState("");

  return (
    <Box>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="2rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    React Video App
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <Divider sx={{ width: "100%" }} />

            <List>
              {navItemswithIcons.map(({ text, icon, id }) => {
                return (
                  <ListItemComponent
                    key={text}
                    text={text}
                    icon={icon}
                    id={id}
                  />
                );
              })}
            </List>
            {newBucket && (
              <Box width="100%" m="0.5rem">
                <FlexBetween>
                  <TextField
                    label="Bucket Name"
                    onChange={(e) => setNewBucketValue(e.currentTarget.value)}
                  />
                  <IconButton
                    onClick={() => {
                      dispatch(
                        addBuckets({
                          id: nanoid(),
                          text: newBucketValue,
                          cards: [],
                          icon: null,
                        })
                      );
                      setNewBucketValue("");
                      setnewBucket(!newBucket);
                    }}
                  >
                    <AddCircleOutlined
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                  </IconButton>
                </FlexBetween>
              </Box>
            )}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              m="2rem"
            >
              <FlexBetween>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Button
                    sx={{
                      backgroundColor: theme.palette.secondary[300],
                      color: theme.palette.secondary[600],
                      borderRadius: "0.5rem",
                      padding: "1rem 2rem",
                    }}
                    onClick={() => setnewBucket(!newBucket)}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {!newBucket ? "Add Bucket" : "Cancel"}
                    </Typography>
                  </Button>
                </Box>
              </FlexBetween>
            </Box>
            <Divider sx={{ width: "100%" }} />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
