import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

export default function ProgressNav() {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // loader duration

    return () => clearTimeout(timer);
  }, [location]); // 👈 runs only when route changes

  if (!loading) return null;

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
     
      }}
    >
      <LinearProgress 
      sx={{
        backgroundColor: "#eee",
        height:6,
        borderRadius:5, // background track
        "& .MuiLinearProgress-bar": {
          backgroundColor: "#6750A4", 
          borderRadius:5// bar color
        },
      }}
      />
    </Box>
  );
}