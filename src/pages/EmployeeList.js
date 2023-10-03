import React from "react";
import DenseAppBar from "../HOC/DenseAppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  borderRadius: "10px",
});

const EmployeeList = () => {
  return (
    <div>
      <DenseAppBar title="Employee List" />
      {/* <AppBar > */}

      <Toolbar>
        {/* <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}

        <Box position="fixed" sx={{ top: "auto", bottom: 50, right: 100 }}>
          <StyledFab color="primary" aria-label="add">
            <AddIcon />
          </StyledFab>
        </Box>
      </Toolbar>
      {/* </AppBar> */}
    </div>
  );
};

export default EmployeeList;
