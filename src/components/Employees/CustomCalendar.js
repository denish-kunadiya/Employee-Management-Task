import React, { useState } from "react";
import { DatePicker, LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import { Button, Box, Typography } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const handleNextMondayClick = () => {
    const today = new Date();
    const daysUntilNextMonday = (8 - today.getDay()) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    setSelectedDate(nextMonday);
  };

  const handleNextTuesdayClick = () => {
    const today = new Date();
    const daysUntilNextTuesday = (9 - today.getDay()) % 7;
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);
    setSelectedDate(nextTuesday);
  };

  const handleAfterOneWeekClick = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    setSelectedDate(nextWeek);
  };

  return (
    <div>
      <Typography variant="h4">Material-UI Calendar</Typography>
      {/* <Box>
        <Button variant="contained" onClick={handleTodayClick}>
          Today
        </Button>
        <Button variant="contained" onClick={handleNextMondayClick}>
          Next Monday
        </Button>
        <Button variant="contained" onClick={handleNextTuesdayClick}>
          Next Tuesday
        </Button>
        <Button variant="contained" onClick={handleAfterOneWeekClick}>
          After 1 Week
        </Button>
      </Box> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <DesktopDatePicker {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomCalendar;
