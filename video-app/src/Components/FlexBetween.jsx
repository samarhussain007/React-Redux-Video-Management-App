const { styled } = require("@mui/system");
const { Box } = require("@mui/material");

/** Styled component for styling purpose */
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
