import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DenseAppBar from "../../HOC/DenseAppBar";
import { TextField, InputAdornment, MenuItem, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CustomCalendar from "../Employees/CustomCalendar";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEmployee = ({ open, handleClose }) => {
  return (
    <div>
      {/* <DenseAppBar title="Add Employee Details" /> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="input-with-icon-textfield"
              label="Employee Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: "#1565c0" }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ mt: 4 }}
              size="small"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select Role"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkOutlineIcon sx={{ color: "#1565c0" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem key="" value="Product Designer">
                Product Designer
              </MenuItem>
              <MenuItem key="" value="Flutter Developer">
                Flutter Developer
              </MenuItem>
              <MenuItem key="" value="QA Tester">
                QA Tester
              </MenuItem>
              <MenuItem key="" value="Product Owner">
                Product Owner
              </MenuItem>
            </TextField>
            <CustomCalendar />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddEmployee;
