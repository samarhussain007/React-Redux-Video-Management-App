import React from "react";
import Header from "../../Components/Header";
import { Button, useTheme, Box, useMediaQuery } from "@mui/material";
import HistoryCard from "../../Components/HistoryCard";
import { clearHistory } from "../../features/history/historySlice";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "../../Components/FlexBetween";

const History = () => {
  const { historyBucket } = useSelector((state) => state.history);
  const isNonMediumScreen = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box m="1.5rem 2rem">
      <FlexBetween>
        <Header title="History" subtitle="Previously watched videos" />
        <Box>
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
              dispatch(clearHistory());
            }}
          >
            Clear History
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="210px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreen ? undefined : "span 12",
          },
        }}
      >
        {historyBucket &&
          historyBucket.map((el) => {
            return (
              <HistoryCard
                key={el.id}
                id={el.id}
                link={el.link}
                title={el.title}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default History;
