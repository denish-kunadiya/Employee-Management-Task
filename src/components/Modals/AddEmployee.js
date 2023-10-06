import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DenseAppBar from "../../HOC/DenseAppBar";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CustomCalendar from "../Employees/ToDateCalendar";
import openRequest from "../../services/indexDB";
import CustomCalendarDesing from "../Employees/CustomCalendarDesing";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ToDateCalendar from "../Employees/ToDateCalendar";
import SouthIcon from "@mui/icons-material/South";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEmployee = ({
  open,
  handleClose,
  handleAddData,
  formValues,
  setFormValues,
  selectedFromDate,
  setSelectedFromDate,
  selectedToDate,
  setSelectedToDate,
  addUser,
  handleDelete,
  selectedUser,
}) => {
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* <DenseAppBar title="Add Employee Details" /> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        fullScreen="lg"
      >
        <DialogTitle className="d-flex justify-content-between align-items-center">
          <Typography>
            {!formValues.name
              ? "Add Employee Details"
              : "Edit Employee Details"}
          </Typography>
          {formValues.name && (
            <Typography>
              <DeleteOutlineIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDelete(selectedUser.id)}
              />
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ height: "80vh" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div class="row">
              <div class="col-12">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <PersonOutlineIcon sx={{ color: "#1DA1F2" }} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Employee Name"
                    aria-label="Employee Name"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                    defaultValue={formValues.name}
                    name="name"
                  />
                </InputGroup>
              </div>

              <div class="col-12">
                <div class="input-group select-group">
                  <span class="input-group-addon input-group-text">
                    <WorkOutlineIcon sx={{ color: "#1DA1F2" }} />
                  </span>
                  <select
                    class="form-control"
                    defaultValue={formValues.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <option key="" value="Product Designer">
                      Product Designer
                    </option>
                    <option key="" value="Flutter Developer">
                      Flutter Developer
                    </option>
                    <option key="" value="QA Tester">
                      QA Tester
                    </option>
                    <option key="" value="Product Owner">
                      Product Owner
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </Box>
          <div class="row mt-3">
            <div class="col-12 col-md-5">
              <CustomCalendarDesing
                selectedFromDate={selectedFromDate}
                setSelectedFromDate={setSelectedFromDate}
                selectedUser={selectedUser}
              />
            </div>
            <div class="col-12 col-md-1">
              <TrendingFlatIcon
                sx={{ color: "#1565c0" }}
                className="d-none d-md-block"
              />
            </div>
            <div class="col-12 d-flex justify-content-center d-block d-md-none">
              <SouthIcon
                sx={{ color: "#1565c0" }}
                className="d-block d-md-none"
              />
            </div>
            <div class="col-12 col-md-6">
              <ToDateCalendar
                selectedToDate={selectedToDate}
                setSelectedToDate={setSelectedToDate}
                selectedUser={selectedUser}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddData} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddEmployee;
