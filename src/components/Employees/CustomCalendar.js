import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  usePickerLayout,
  pickersLayoutClasses,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from "@mui/x-date-pickers/PickersLayout";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function ActionList(props) {
  const { onAccept, onClear, onCancel, onSetToday, ownerState } = props;
  console.log("props", ownerState.value);
  const actions = [
    { text: "Accept", method: onAccept },
    { text: "Clear", method: onClear },
    { text: "Cancel", method: onCancel },
    { text: "Today", method: onSetToday },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Button>sds</Button>
      </div>
      <div>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAccept}>Save</Button>
      </div>
    </div>
  );
}

function RestaurantHeader() {
  const [selectedDate, setSelectedDate] = React.useState(null);

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
    <Box
      sx={{
        // Place the element in the grid layout
        gridColumn: 1,
        gridRow: 1,
        // Center the icon
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{ margin: "0 5px" }}
        onClick={handleTodayClick}
      >
        Today
      </Button>
      <Button
        variant="contained"
        sx={{ margin: "0 5px" }}
        onClick={handleNextMondayClick}
      >
        Next Monday
      </Button>
      <Button
        variant="contained"
        sx={{ margin: "0 5px" }}
        onClick={handleNextTuesdayClick}
      >
        Next Tuesday
      </Button>
      <Button
        variant="contained"
        sx={{ margin: "0 5px" }}
        onClick={handleAfterOneWeekClick}
      >
        After 1 Week
      </Button>
    </Box>
  );
}

function CustomLayout(props) {
  const { toolbar, tabs, content, actionBar } = usePickerLayout(props);

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        [`.${pickersLayoutClasses.actionBar}`]: {
          gridColumn: 1,
          gridRow: 2,
        },
        [`.${pickersLayoutClasses.toolbar}`]: {
          gridColumn: 2,
          gridRow: 1,
        },
      }}
    >
      <RestaurantHeader />

      <PickersLayoutContentWrapper
        className={pickersLayoutClasses.contentWrapper}
      >
        {/* {toolbar} */}
        {tabs}
        {content}
        {actionBar}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  );
}
export default function AddComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Small picker"
        slotProps={{ textField: { size: "small" } }}
        slots={{
          layout: CustomLayout,
          actionBar: ActionList,
        }}
      />
    </LocalizationProvider>
  );
}
