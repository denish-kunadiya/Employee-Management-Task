import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import DenseAppBar from "../../HOC/DenseAppBar";
import AddEmployee from "../Modals/AddEmployee";
import SwipeCard from "./SwipeCard";
import openRequest from "../../services/indexDB";

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
    role: "",
    date: "",
  });
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getAllData();
  }, [refresh]);

  // const handleAddData = () => {
  //   const db = openRequest.result;
  //   const transaction = db.transaction(["myObjectStore"], "readwrite");
  //   const store = transaction.objectStore("myObjectStore");

  //   // const dataToAdd = { name, role, date };
  //   const id = uuidv4();
  //   const request = store.add(...formValues, id);

  //   request.onsuccess = function (event) {
  //     console.log("Data added successfully");
  //     setRefresh(refresh + 1);
  //     setOpen(false);
  //   };

  //   request.onerror = function (event) {
  //     console.error("Error adding data", event.target.error);
  //   };
  // };

  const getAllData = () => {
    const dbPromise = window.indexedDB.open("Employee", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("userData", "readonly");
      var userData = tx.objectStore("userData");
      const users = userData.getAll();

      users.onsuccess = (query) => {
        console.log("query.srcElement", query.srcElement);
        setAllUsers(query.srcElement.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };
  console.log("allUsers", allUsers);
  const handleAddData = (event) => {
    const dbPromise = window.indexedDB.open("Employee", 1);
    // console.log(addUser, editUser);

    if (formValues) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("userData", "readwrite");
        var userData = tx.objectStore("userData");

        // console.log(addUser, editUser);
        console.log(addUser, editUser);
        if (addUser) {
          const users = userData.put({
            id: allUsers?.length + 1,
            ...formValues,
          });

          console.log("add");
          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            // alert("User adde/d!");
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
          });
          console.log("edit");

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
        alert("User deleted!");
        getAllData();
      };
    };
  };
  return (
    <div>
      <DenseAppBar title="Employee List" />
      {allUsers?.map((item) => (
        <SwipeCard
          key={item.id}
          item={item}
          onDelete={handleDelete}
          setOpen={setOpen}
          setFormValues={setFormValues}
          setSelectedUser={setSelectedUser}
          setEditUser={setEditUser}
        />
      ))}
      <Toolbar>
        <Box position="fixed" sx={{ top: "auto", bottom: 50, right: 100 }}>
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
          handleClose={() => setOpen(false)}
          handleAddData={handleAddData}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      )}
    </div>
  );
};

export default Employees;
