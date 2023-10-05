import React, { useRef, useState } from "react";
import { isToday } from "date-fns";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
// import { timeBoxes } from "./timeBoxes";
import "react-datepicker/dist/react-datepicker.css";
// import "./styles.css";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function CustomCalendarDesing({
  selectedFromDate,
  setSelectedFromDate,
}) {
  const MAX_DATE_MONTH_SELECTION = 2000;

  //   const [selectedFromDate, setSelectedFromDate] = useState(new Date());

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
          <span className="ms-2 mt-1">{dayjs(date).format("DD MMM YYYY")}</span>
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
            onClick={handleCalendarClose}
            style={{ background: "#1DA1F2", color: "#fff" }}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };

  const handleNextMondayClick = () => {
    const today = new Date();
    const daysUntilNextMonday = (8 - today.getDay()) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    setSelectedFromDate(nextMonday);
  };

  const handleNextTuesdayClick = () => {
    const today = new Date();
    const daysUntilNextTuesday = (9 - today.getDay()) % 7;
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);
    setSelectedFromDate(nextTuesday);
  };

  const handleAfterOneWeekClick = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    setSelectedFromDate(nextWeek);
  };
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedFromDate(today);
  };

  const datePickerRef = useRef(null);
  const handleCalendarClose = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const handleCancel = () => {
    setSelectedFromDate(new Date());
  };
  return (
    <div className="App">
      <div class="input-group select-group">
        <span class="input-group-addon input-group-text">
          <CalendarTodayIcon sx={{ color: "#1565c0" }} />
        </span>

        <DatePicker
          selected={selectedFromDate}
          onChange={(date) => {
            setSelectedFromDate(date);
            console.log("date", date);
          }}
          style={{ borderRadius: "0px" }}
          className="form-control"
          onMonthChange={(date) => {
            // setSelectedFromDate(date);
            // setSelectedTime(null);
            // console.log("date", date);
          }}
          ref={datePickerRef}
          onCalendarClose={handleCalendarClose}
          shouldCloseOnSelect={false}
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
                        defaultValue={1}
                        style={{ maxWidth: 300 }}
                      >
                        <ToggleButton
                          id="tbg-radio-1"
                          value={1}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleTodayClick}
                        >
                          Today
                        </ToggleButton>
                        {/* </Col>
                      <Col md={6}> */}
                        <ToggleButton
                          id="tbg-radio-2"
                          value={2}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleNextMondayClick}
                        >
                          Next Monday
                        </ToggleButton>
                        <br />
                        {/* </Col>
                      <Col md={6}> */}
                        <ToggleButton
                          id="tbg-radio-3"
                          value={3}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleNextTuesdayClick}
                        >
                          Next Tuesday
                        </ToggleButton>
                        {/* </Col>
                      <Col md={6}> */}
                        <ToggleButton
                          id="tbg-radio-4"
                          value={4}
                          style={{ width: 130, margin: "0.5rem" }}
                          className="toggleButton"
                          onClick={handleAfterOneWeekClick}
                        >
                          After 1 week
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
                        margin: "0 .6rem",
                        fontSize: "2rem",
                      }}
                    />

                    <span>{dayjs(date).format("MMMM YYYY")}</span>

                    <ArrowRightIcon
                      onClick={increaseMonth}
                      sx={{
                        color: "grey",
                        margin: "0 .6rem",
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
}
