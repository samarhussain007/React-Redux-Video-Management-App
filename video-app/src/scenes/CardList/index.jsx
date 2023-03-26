import React from "react";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import Card from "../../Components/Card";
import { YouTube } from "@mui/icons-material";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import FlexBetween from "../../Components/FlexBetween";
import Modal from "../../Components/Modal";

const CardList = () => {
  const { pathname } = useLocation();
  const name = pathname.slice(1).toUpperCase();
  const bucketDetails = useSelector((state) =>
    state.buckets.initialBuckets.find((el) => el.text.toUpperCase() === name)
  );

  const cards = bucketDetails ? bucketDetails.cards : null;

  const isNonMediumScreen = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem">
      <FlexBetween>
        <Header title={name} subtitle="Videos" />
        <Box>
          <Modal />
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
        {cards &&
          cards.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                link={el.link}
                title={el.title}
                increase={el.increase}
                description={el.description}
                icon={
                  <YouTube
                    sx={{
                      fontSize: "26px",
                      color: theme.palette.secondary[300],
                    }}
                  />
                }
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default CardList;
