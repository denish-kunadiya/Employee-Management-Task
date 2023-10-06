import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
// import { timeBoxes } from "./timeBoxes";
import "react-datepicker/dist/react-datepicker.css";
// import "./styles.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Button } from "@mui/material";

const ToDateCalendar = ({
  selectedToDate,
  setSelectedToDate,
  selectedUser,
}) => {
  //   const [selectedToDate, setSelectedToDate] = useState(new Date());

  const CustomTimeInput = ({
    date,
    value,
    onChange,
    handleCalendarClose,
    handleCancel,
  }) => {
    return (
      <div
        style={{ maxWidth: "100%" }}
        className="d-flex justify-content-between"
      >
        <span class="d-flex align-items-center">
          <CalendarTodayIcon sx={{ color: "#1565c0" }} />
          <span className="ms-2 mt-1">
            {dayjs(date).format("DD MMM YYYY") === "01 Jan 1970"
              ? "No Date"
              : dayjs(date).format("DD MMM YYYY")}
          </span>
        </span>
        <div>
          <Button
            style={{
              background: " #EDF8FF",
              color: "#1DA1F2",
              marginRight: "15px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            style={{ background: "#1DA1F2", color: "#fff" }}
            onClick={handleCalendarClose}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };
  let placeholder;
  const handleNextMondayClick = () => {
    placeholder = "No Date";
    setSelectedToDate(null);
  };
  const datePickerRef = useRef(null);
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedToDate(today);
  };
  const handleCalendarClose = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };
  const handleCancel = () => {
    setSelectedToDate(new Date());
    handleCalendarClose();
  };
  return (
    <div className="App">
      <div class="input-group">
        <span class=" input-group-text">
          <CalendarTodayIcon sx={{ color: "#1565c0" }} />
        </span>

        <DatePicker
          selected={
            dayjs(selectedToDate).format("DD MMM YYYY") === "01 Jan 1970"
              ? null
              : selectedToDate
          }
          onChange={(date) => {
            setSelectedToDate(date);
          }}
          ref={datePickerRef}
          placeholderText="No Date"
          className="form-control"
          shouldCloseOnSelect={false}
          onCalendarClose={handleCalendarClose}
          showTimeInput
          customTimeInput={
            <CustomTimeInput
              handleCalendarClose={handleCalendarClose}
              handleCancel={handleCancel}
            />
          }
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
            return (
              <div>
                <div style={{ maxWidth: 300 }}>
                  <Row>
                    {" "}
                    <Col md={12}>
                      <ToggleButtonGroup
                        type="radio"
                        name="options"
                        defaultValue={selectedUser.toDate === null ? 1 : null}
                        style={{ maxWidth: 300 }}
                      >
                        <ToggleButton
                          id="tbg-radio-2"
                          value={1}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleNextMondayClick}
                        >
                          No Date
                        </ToggleButton>
                        <ToggleButton
                          id="tbg-radio-1"
                          value={2}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleTodayClick}
                        >
                          Today
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ maxWidth: 200, margin: "0 auto" }}>
                    <ArrowLeftIcon
                      onClick={decreaseMonth}
                      sx={{
                        color: "grey",
                        margin: "0 .4rem",
                        fontSize: "2rem",
                      }}
                    />

                    <span
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        // margin: "0 15px 0 15px",
                      }}
                    >
                      {dayjs(date).format("MMMM YYYY")}
                    </span>

                    <ArrowRightIcon
                      onClick={increaseMonth}
                      sx={{
                        color: "grey",
                        margin: "0 .4rem",
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                  {/* <div>{dayjs(date).format("DD.MM.YYYY")}</div> */}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ToDateCalendar;
