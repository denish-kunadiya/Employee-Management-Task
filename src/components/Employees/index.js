import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";

import DenseAppBar from "../../HOC/DenseAppBar";
import AddEmployee from "../Modals/AddEmployee";
import SwipeCard from "./SwipeCard";
import openRequest from "../../services/indexDB";
import dayjs from "dayjs";
import PrevEmployee from "./PrevEmployee";
import { Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";

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
  const [refresh, setRefresh] = useState(0);
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
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [formValues, setFormValues] = React.useState({
    name: "",
    role: "Product Designer",
  });
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  useEffect(() => {
    getAllData();
  }, [refresh]);

  const getAllData = () => {
    const dbPromise = window.indexedDB.open("Employee", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("userData", "readonly");
      var userData = tx.objectStore("userData");
      const users = userData.getAll();

      users.onsuccess = (query) => {
        setAllUsers(query.srcElement.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };
  const handleAddData = (event) => {
    const dbPromise = window.indexedDB.open("Employee", 1);

    if (
      formValues.name &&
      formValues.role &&
      dayjs(selectedFromDate).format("DD MMM YYYY")
    ) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("userData", "readwrite");
        var userData = tx.objectStore("userData");

        if (addUser) {
          const users = userData.put({
            id: allUsers?.length + 1,
            ...formValues,
            fromDate: dayjs(selectedFromDate).format("DD MMM YYYY"),
            toDate:
              selectedToDate !== null
                ? dayjs(selectedToDate).format("DD MMM YYYY")
                : null,
          });

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            setOpen(false);
            setAddUser(false);
            getAllData();
            event.preventDefault();
            setFormValues({
              name: "",
              role: "",
              from: "",
            });
          };
        } else {
          const users = userData.put({
            id: selectedUser?.id,
            ...formValues,
            fromDate: dayjs(selectedFromDate).format("DD MMM YYYY"),
            toDate:
              selectedToDate !== null
                ? dayjs(selectedToDate).format("DD MMM YYYY")
                : null,
          });

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            alert("User updated!");
            setOpen(false);
            setEditUser(false);
            getAllData();
            setSelectedUser({});
            event.preventDefault();
            setFormValues({
              name: "",
              role: "",
              from: "",
            });
          };
        }
      };
    } else {
      alert("Please enter all details");
    }
  };

  const handleDelete = (itemId) => {
    const dbPromise = window.indexedDB.open("Employee", 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;
      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");
      const deleteUser = userData.delete(itemId);

      deleteUser.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        setOpen(false);
        alert("User deleted!");
        getAllData();
      };
    };
  };
  return (
    <div>
      <DenseAppBar title="Employee List" />
      {allUsers?.filter((i) => i.toDate === null).length ? (
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ color: "#1DA1F2", background: "#d3d3d321", px: 3 }}
        >
          Current Employee
        </Typography>
      ) : (
        ""
      )}
      {allUsers.length ? (
        allUsers
          ?.filter((i) => i.toDate == null)
          ?.map((item) => (
            <SwipeCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              setOpen={setOpen}
              setFormValues={setFormValues}
              setSelectedUser={setSelectedUser}
              setEditUser={setEditUser}
              setSelectedFromDate={setSelectedFromDate}
              setSelectedToDate={setSelectedToDate}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
            />
          ))
      ) : (
        <div>
          <h5
            className="d-flex justify-content-center align-items-center gx-2 text-muted"
            style={{ height: "90vh" }}
          >
            No Records Found
          </h5>
        </div>
      )}

      {allUsers?.filter((i) => i.toDate !== null || i.toDate !== "Invalid Date")
        .length ? (
        <>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ color: "#1DA1F2", background: "#d3d3d321", px: 3 }}
          >
            Previous employee
          </Typography>
          {allUsers
            ?.filter((i) => i.toDate !== null && i.toDate !== "Invalid Date")
            ?.map((item) => (
              <PrevEmployee
                key={item.id}
                item={item}
                onDelete={handleDelete}
                setOpen={setOpen}
                setFormValues={setFormValues}
                setSelectedUser={setSelectedUser}
                setEditUser={setEditUser}
                setSelectedFromDate={setSelectedFromDate}
                setSelectedToDate={setSelectedToDate}
                selectedFromDate={selectedFromDate}
                selectedToDate={selectedToDate}
              />
            ))}
        </>
      ) : (
        ""
      )}
      <Toolbar>
        {allUsers.length ? (
          <Typography
            position="fixed"
            sx={{ top: "auto", bottom: 20, left: 10, color: "#949C9E" }}
            // className="text-muted"
          >
            Swipe left to delete
          </Typography>
        ) : (
          ""
        )}
        <Box position="fixed" sx={{ top: "auto", bottom: 50, right: 70 }}>
          <StyledFab color="primary" aria-label="add">
            <AddIcon
              onClick={() => {
                setOpen(true);
                setEditUser(false);
                setAddUser(true);
              }}
            />
          </StyledFab>
        </Box>
      </Toolbar>
      {open && (
        <AddEmployee
          open={open}
          handleClose={() => {
            setOpen(false);
            setEditUser(false);
            setAddUser(true);
            setFormValues({
              name: "",
              role: "",
            });
          }}
          handleAddData={handleAddData}
          setFormValues={setFormValues}
          formValues={formValues}
          selectedFromDate={selectedFromDate}
          setSelectedFromDate={setSelectedFromDate}
          selectedToDate={selectedToDate}
          setSelectedToDate={setSelectedToDate}
          addUser={addUser}
          handleDelete={handleDelete}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default Employees;
