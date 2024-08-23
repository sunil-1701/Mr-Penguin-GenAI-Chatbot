import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { TypingAnim } from "../components/typer/TypingAnim";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "col", sm: "column" },
            gap: 3,
            my: 10,
          }}
        >
          <div className="banner" style={{ width: "300px", margin: "auto" }}>
            <img src="penguin-logo.png" alt="penguin logo" />
          </div>

          <img
            src="gemini.jpeg"
            alt="gemini logo"
            style={{ width: "300px", margin: "auto" }}
          />
        </Box>
        <Box
          sx={{ display: "flex", width: isBelowMd ? "80%" : "60%", mx: "auto" }}
        >
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 90px #64f3d5",
              marginTop: 20,
            }}
            
          />
          
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
