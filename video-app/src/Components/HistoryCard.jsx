import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { YouTube } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import VideoModal from "./VideoModal";
import { deleteHistoryCard } from "../features/history/historySlice";

const HistoryCard = ({ title, link, id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
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
      <FlexBetween>
        <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        <div>
          <IconButton
            sx={{
              color: theme.palette.secondary[100],
            }}
            onClick={() => {
              dispatch(deleteHistoryCard({ cardId: id }));
            }}
          >
            <DeleteOutlineOutlined />
          </IconButton>
        </div>
      </FlexBetween>
      <Box>
        <VideoModal icon={<YouTube />} link={link} />
      </Box>
      <Typography>{link}</Typography>
    </Box>
  );
};

export default HistoryCard;
