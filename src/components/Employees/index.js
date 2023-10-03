import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";

import DenseAppBar from "../../HOC/DenseAppBar";
import AddEmployee from "../Modals/AddEmployee";
import SwipeCard from "./SwipeCard";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  borderRadius: "10px",
});

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Samantha Lee",
      role: "Full-Stack Developer",
      from: "21 sep,2022",
      to: "",
    },
    {
      id: 2,
      name: "David Kim",
      role: "React Developer",
      from: "21 sep,2022",
      to: "",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Flutter Developer",
      from: "21 sep,2022",
      to: "",
    },
  ]);

  const handleDelete = (itemId) => {
    // Implement your delete logic here
    console.log(`Deleting item with ID ${itemId}`);
    setItems((prev) => prev.filter((row) => row.id !== itemId));
  };
  return (
    <div>
      <DenseAppBar title="Employee List" />
      {/* < /> */}
      {items.map((item) => (
        <SwipeCard key={item.id} item={item} onDelete={handleDelete} />
      ))}
      <Toolbar>
        <Box position="fixed" sx={{ top: "auto", bottom: 50, right: 100 }}>
          <StyledFab color="primary" aria-label="add">
            <AddIcon onClick={() => setOpen(true)} />
          </StyledFab>
        </Box>
      </Toolbar>
      {open && <AddEmployee open={open} handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default Employees;
